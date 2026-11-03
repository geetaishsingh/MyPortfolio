# Contact form email setup

The contact form sends mail through Gmail SMTP on the Node server. Gmail credentials are only read by the server and must never use a `VITE_` variable.

1. Revoke the Gmail app password shared in chat.
2. Enable 2-Step Verification on the Gmail account, then create a new app password from Google Account security settings.
3. Copy `.env.example` to `.env` and set `EMAIL`, `EMAIL_PASS`, and optionally `CONTACT_EMAIL`. Enter the new app password without spaces. `.env` is ignored by Git.
4. Run `npm run dev`. The Vite development server proxies `/api/contact` to the mail server.
5. Submit the contact form. It only reports success after Gmail accepts the message.

For production, deploy this project to a Node.js host: run `npm run build`, set `EMAIL`, `EMAIL_PASS`, and optionally `CONTACT_EMAIL` as private host environment variables, then run `npm start`. The server serves the built site and the mail API together. A static-only host cannot run this mail endpoint.
