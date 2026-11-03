# Contact form email setup

The contact form sends through the Resend HTTPS API in production and Gmail SMTP for local development. Secrets are only read by the backend and must never use a `VITE_` variable.

The deployed Render `/api/contact` request was returning a 504 SMTP timeout. The backend was waiting on Gmail SMTP port 465; the live error confirms the timeout, while the health and CORS endpoints work. Render production is now configured to use Resend over HTTPS instead of SMTP.

## Render setup

1. Create a Resend account and verify a sender domain/address. Create an API key with permission to send from that sender.
2. In Render's backend service environment, set:
   - `MAIL_PROVIDER=resend`
   - `RESEND_API_KEY` to the private Resend API key
   - `RESEND_FROM` to a sender identity verified by Resend (for example, `Portfolio Contact <contact@your-verified-domain.com>`)
   - `CONTACT_EMAIL` to the inbox that should receive portfolio messages
3. Render production no longer needs `EMAIL` or `EMAIL_PASS`; remove those old values from the Render service after switching. Keep local Gmail SMTP credentials only in the ignored local `.env` if needed. Revoke and replace any Gmail app password that was exposed.
4. Deploy the backend. The checked-in `render.yaml` sets `MAIL_PROVIDER=resend` and prompts for the other values when configured as a Blueprint.

The backend sends mail through Resend's HTTPS API with a bounded 16-second request. It returns success only after Resend responds with an email ID. A successful provider response confirms acceptance for sending, not final inbox placement. Check the Resend email logs and destination inbox to confirm delivery. Provider/API errors are logged without the API key and returned as explicit API errors.

## Local development

Local development defaults to Gmail SMTP. Copy `.env.example` to `.env` and set `EMAIL` (or `EMAIL_USER`), `EMAIL_PASS`, and optionally `CONTACT_EMAIL`. Gmail app-password grouping spaces are removed by the server. `.env` is ignored by Git. To test Resend locally, set `MAIL_PROVIDER=resend`, `RESEND_API_KEY`, `RESEND_FROM`, and `CONTACT_EMAIL`.

The form posts to `/api/contact`; local Vite requests are proxied to the Node server. In production, the frontend uses `VITE_API_URL` if set, or defaults to `https://myportfoliobackend-rfum.onrender.com`. The frontend and backend reuse an idempotency key for retries of identical form contents. The `/api/health` endpoint only confirms the service is running; it does not test email delivery.
