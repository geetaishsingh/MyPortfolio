import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 3001;
const apiOnly = process.argv.includes('--api-only');
const projectDirectory = fileURLToPath(new URL('.', import.meta.url));
const requestsByIp = new Map();
const emailRequests = new Map();
const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxRequests = 5;
const apiRequestTimeoutMs = 20_000;
const emailRequestTimeoutMs = 16_000;
const idempotencyRetentionMs = 24 * 60 * 60 * 1000;
const maxIdempotencyEntries = 1000;
const allowedOrigins = new Set(
  [
    'https://myportfolio-1zqp.onrender.com',
    ...(process.env.FRONTEND_URL || '').split(','),
  ]
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => new URL(origin).origin)
);

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.add('http://localhost:5173');
  allowedOrigins.add('http://127.0.0.1:5173');
}

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);

app.disable('x-powered-by');
app.use((req, res, next) => {
  const origin = req.get('Origin');
  const isAllowedOrigin = origin && allowedOrigins.has(origin);

  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.vary('Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(isAllowedOrigin ? 204 : 403);
  }

  return next();
});
app.use('/api', (req, res, next) => {
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(504).json({ error: 'The request timed out. Please check your inbox before trying again.' });
    }
  }, apiRequestTimeoutMs);

  res.once('finish', () => clearTimeout(timeout));
  res.once('close', () => clearTimeout(timeout));
  return next();
});
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  return res.status(200).json({ status: 'ok' });
});

app.post('/api/contact', async (req, res) => {
  const { fullName, email, subject, message } = req.body || {};
  const isText = (value) => typeof value === 'string';

  if (
    !isText(fullName) ||
    fullName.trim().length < 2 ||
    fullName.trim().length > 100 ||
    !isText(email) ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !isText(subject) ||
    subject.trim().length < 3 ||
    subject.trim().length > 150 ||
    !isText(message) ||
    message.trim().length < 10 ||
    message.trim().length > 5000
  ) {
    return res.status(400).json({ error: 'Please check the form fields and try again.' });
  }

  const senderAddress = process.env.EMAIL_USER || process.env.EMAIL;
  const senderPassword = (process.env.EMAIL_PASS || '').replace(/\s/g, '');

  if (!senderAddress || !senderPassword) {
    return res.status(503).json({
      error: 'Email delivery is not configured. Set EMAIL_USER (or EMAIL) and EMAIL_PASS on the server.',
    });
  }

  const now = Date.now();
  for (const [key, entry] of emailRequests) {
    if (entry.completedAt && now - entry.completedAt > idempotencyRetentionMs) {
      emailRequests.delete(key);
    }
  }

  const idempotencyKey = req.get('Idempotency-Key');
  let requestCacheKey;
  let requestFingerprint;

  if (idempotencyKey) {
    if (!/^[\w.:-]{8,128}$/.test(idempotencyKey)) {
      return res.status(400).json({ error: 'Invalid request identifier. Please try again.' });
    }

    requestCacheKey = idempotencyKey;
    requestFingerprint = createHash('sha256')
      .update(JSON.stringify({ fullName, email, subject, message }))
      .digest('hex');
    const previousRequest = emailRequests.get(requestCacheKey);

    if (previousRequest) {
      if (previousRequest.fingerprint !== requestFingerprint) {
        return res.status(409).json({
          error: 'This request identifier was already used for a different message.',
        });
      }

      const previousResult = await previousRequest.result;
      res.setHeader('Idempotency-Replayed', 'true');
      return res.status(previousResult.status).json(previousResult.body);
    }

    if (emailRequests.size >= maxIdempotencyEntries) {
      return res.status(503).json({ error: 'The email service is busy. Please try again shortly.' });
    }
  }

  const clientIp = req.ip || 'unknown';
  const previousRequests = (requestsByIp.get(clientIp) || []).filter(
    (timestamp) => now - timestamp < rateLimitWindowMs
  );

  if (previousRequests.length >= rateLimitMaxRequests) {
    return res.status(429).json({ error: 'Too many messages. Please try again later.' });
  }

  previousRequests.push(now);
  requestsByIp.set(clientIp, previousRequests);

  let transporter;
  let deliveryTimeout;
  const resultPromise = (async () => {
    try {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        connectionTimeout: 8_000,
        greetingTimeout: 8_000,
        socketTimeout: 15_000,
        auth: {
          user: senderAddress,
          pass: senderPassword,
        },
      });
      const deliveryPromise = transporter.sendMail({
      from: {
        name: 'Geetaish Singh Rajput',
        address: senderAddress,
      },
      to: process.env.CONTACT_EMAIL || senderAddress,
      replyTo: email.trim(),
      subject: `Portfolio contact: ${subject.trim().replace(/[\r\n]+/g, ' ')}`,
      text: [
        `Name: ${fullName.trim()}`,
        `Email: ${email.trim()}`,
        `Subject: ${subject.trim()}`,
        '',
        message.trim(),
      ].join('\n'),
      html: `
        <div style="margin:0;padding:32px 12px;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;border-collapse:separate;border-spacing:0;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;background-color:#0a0e17;border-bottom:4px solid #0d9488;">
                <p style="margin:0 0 8px;color:#2dd4bf;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Portfolio contact</p>
                <h1 style="margin:0;color:#f8fafc;font-size:24px;line-height:1.3;">New message received</h1>
                <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">Someone got in touch through your website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 12px;">
                <p style="margin:0 0 6px;color:#64748b;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">From</p>
                <p style="margin:0;color:#0f172a;font-size:20px;font-weight:bold;line-height:1.4;">${escapeHtml(fullName.trim())}</p>
                <p style="margin:5px 0 0;font-size:14px;"><a href="mailto:${escapeHtml(email.trim())}" style="color:#0d9488;text-decoration:none;">${escapeHtml(email.trim())}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 24px;">
                <p style="margin:0 0 6px;color:#64748b;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Subject</p>
                <p style="margin:0;color:#0f172a;font-size:16px;line-height:1.5;">${escapeHtml(subject.trim())}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <p style="margin:0 0 10px;color:#64748b;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Message</p>
                <div style="padding:18px 20px;background-color:#f8fafc;border-left:3px solid #0d9488;border-radius:4px;color:#334155;font-size:15px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere;">${escapeHtml(message.trim())}</div>
                <p style="margin:24px 0 0;">
                  <a href="mailto:${escapeHtml(email.trim())}?subject=${encodeURIComponent(`Re: ${subject.trim()}`)}" style="display:inline-block;padding:12px 20px;background-color:#0d9488;border-radius:8px;color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none;">Reply to ${escapeHtml(fullName.trim())}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
                This message was sent from the contact form on Geetaish Singh Rajput's portfolio.
              </td>
            </tr>
          </table>
        </div>
      `,
      });
      const timeoutPromise = new Promise((_, reject) => {
        deliveryTimeout = setTimeout(() => {
          const error = new Error('SMTP delivery timed out.');
          error.code = 'ETIMEDOUT';
          reject(error);
        }, emailRequestTimeoutMs);
      });
      const delivery = await Promise.race([deliveryPromise, timeoutPromise]);

      if (delivery.accepted.length === 0) {
        throw new Error('The mail provider did not accept the message.');
      }

      return { status: 200, body: { message: 'Your message was sent successfully.' } };
    } catch (error) {
      const safeMessage = String(error?.message || 'Unknown email delivery error')
        .replaceAll(senderPassword, '[redacted]')
        .replaceAll(senderAddress, '[redacted]');
      console.error('Contact email delivery failed:', {
        name: error?.name,
        code: error?.code,
        command: error?.command,
        responseCode: error?.responseCode,
        message: safeMessage,
      });

      if (error?.code === 'EAUTH' || error?.responseCode === 535) {
        return {
          status: 502,
          body: { error: 'Email authentication failed. Check EMAIL_USER (or EMAIL) and the Gmail app password in Render.' },
          retryable: true,
        };
      }

      if (error?.code === 'ETIMEDOUT') {
        return {
          status: 504,
          body: { error: 'The email service timed out. Check your inbox before trying again.' },
        };
      }

      return {
        status: 502,
        body: { error: 'The email service could not send your message. Please try again later.' },
      };
    } finally {
      clearTimeout(deliveryTimeout);
      transporter?.close();
    }
  })();

  if (requestCacheKey) {
    const entry = {
      fingerprint: requestFingerprint,
      result: resultPromise,
      completedAt: 0,
    };
    emailRequests.set(requestCacheKey, entry);
    resultPromise.then((result) => {
      if (result.retryable) {
        if (emailRequests.get(requestCacheKey) === entry) {
          emailRequests.delete(requestCacheKey);
        }
        return;
      }

      entry.completedAt = Date.now();
    });
  }

  const result = await resultPromise;
  return res.status(result.status).json(result.body);
});

app.use((error, _req, res, _next) => {
  console.error('Contact API request failed:', error);
  const status = error.status === 413 ? 413 : 400;
  return res.status(status).json({
    error: status === 413 ? 'The submitted form is too large.' : 'Invalid request. Please try again.',
  });
});

if (!apiOnly) {
  const distDirectory = resolve(projectDirectory, 'dist');
  app.use(express.static(distDirectory));
  app.get(/.*/, (_req, res) => res.sendFile(resolve(distDirectory, 'index.html')));
}

app.listen(port, () => {
  console.log(`Contact server listening on port ${port}`);
});
