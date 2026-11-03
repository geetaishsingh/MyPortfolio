# Contact form email setup

The contact form sends mail through Gmail SMTP on the Node server. Gmail credentials are only read by the server and must never use a `VITE_` variable.

1. Revoke any Gmail app password exposed outside Render.
2. Enable 2-Step Verification on the Gmail account, then create a new app password from Google Account security settings.
3. Copy `.env.example` to `.env` and set `EMAIL_USER` (or legacy `EMAIL`), `EMAIL_PASS`, and optionally `CONTACT_EMAIL`. Gmail app-password grouping spaces are removed by the server. `.env` is ignored by Git.
4. Run `npm run dev`. The Vite development server proxies `/api/contact` to the mail server.
5. Submit the contact form. It reports success only after Gmail's SMTP server accepts the message.

For production, deploy this project as a Node.js web service, not as a static site. The included `render.yaml` configures a Render web service with the required build and start commands and checks `/api/health` after deploy. Set `EMAIL_USER` (or existing `EMAIL`) and `EMAIL_PASS` as private Render environment variables; `EMAIL_PASS` must be a Gmail app password. SMTP uses `smtp.gmail.com` over TLS on port 465 with bounded connection, greeting, socket, and send timeouts. The backend allows `https://myportfolio-1zqp.onrender.com` by default; set `FRONTEND_URL` only if you need to allow additional exact frontend origins (comma-separated, scheme and hostname only). Optionally set `CONTACT_EMAIL`; if omitted, messages are delivered to the configured sender address.

The contact form posts to `/api/contact`. In production it uses `VITE_API_URL` when set, or defaults to `https://myportfoliobackend-rfum.onrender.com`; set `VITE_API_URL` to the backend origin in the frontend host's build environment if you use a different backend. Local development keeps using the Vite `/api` proxy. The frontend and backend reuse an idempotency key for retries of the same form contents to prevent duplicate sends on a running backend process. After deployment, open `https://<your-node-service>.onrender.com/api/health`; it must return `{"status":"ok"}`. The health endpoint confirms the Node service is up, but only a successful `/api/contact` request confirms Gmail accepted the email; it cannot guarantee final inbox placement.
