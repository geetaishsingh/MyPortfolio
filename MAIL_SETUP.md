# Contact form email setup

The contact form sends mail through Gmail SMTP on the Node server. Gmail credentials are only read by the server and must never use a `VITE_` variable.

1. Revoke the Gmail app password shared in chat.
2. Enable 2-Step Verification on the Gmail account, then create a new app password from Google Account security settings.
3. Copy `.env.example` to `.env` and set `EMAIL`, `EMAIL_PASS`, and optionally `CONTACT_EMAIL`. Enter the new app password without spaces. `.env` is ignored by Git.
4. Run `npm run dev`. The Vite development server proxies `/api/contact` to the mail server.
5. Submit the contact form. It only reports success after Gmail accepts the message.

For production, deploy this project as a Node.js web service, not as a static site. The included `render.yaml` configures a Render web service with the required build and start commands and checks `/api/health` after deploy. Set `EMAIL` and a newly generated `EMAIL_PASS` as private environment variables in Render. Set `FRONTEND_URL` to the exact origin of the deployed frontend (scheme and hostname, with no path); multiple origins can be comma-separated. This enables the API's CORS preflight for the contact form. Optionally set `CONTACT_EMAIL`; if omitted, messages are delivered to `EMAIL`.

The contact form posts to `/api/contact`. In production it uses `VITE_API_URL` when set, or defaults to `https://myportfoliobackend-rfum.onrender.com`; set `VITE_API_URL` to the backend origin in the frontend host's build environment if you use a different backend. Local development keeps using the Vite `/api` proxy. After deployment, open `https://<your-node-service>.onrender.com/api/health`; it must return `{"status":"ok"}`. The health endpoint confirms the Node service is up, but a successful contact submission additionally requires valid Render email credentials and Gmail accepting the message.
