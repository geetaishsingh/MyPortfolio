# Contact form email setup

The contact form POSTs `fullName`, `email`, `subject`, and `message` to `/api/contact` with an `Idempotency-Key`. It only reports success after Nodemailer receives an SMTP acceptance response. The form times out after 22 seconds and the API's SMTP attempt is bounded to 16 seconds.

## Render setup

Configure these environment variables on the Render backend:

- `MAIL_PROVIDER=smtp`
- `EMAIL` (or `EMAIL_USER`) — the Gmail account used to authenticate and send
- `EMAIL_PASS` — a Gmail app password, not the normal account password
- `CONTACT_EMAIL` — optional recipient inbox; defaults to `EMAIL`
- `FRONTEND_URL` — optional additional allowed frontend origin; `https://myportfolio-1zqp.onrender.com` is already allowed

The SMTP transport uses `smtp.gmail.com`, port `465`, TLS, and bounded connection, greeting, and socket timeouts. Gmail app-password spaces are removed. A prior live contact request timed out while waiting for SMTP, so changing `MAIL_PROVIDER` alone does not prove that the deployed service can reach Gmail. After configuring these variables, check Render logs and confirm outbound SMTP is available for the service. The health endpoint does not test SMTP.

The checked-in `render.yaml` sets `MAIL_PROVIDER=smtp` and requests `EMAIL`/`EMAIL_PASS` when applying the Blueprint. If the Render service uses manually managed environment values, change `MAIL_PROVIDER` from `resend` to `smtp`, configure the email credentials, and redeploy. Remove obsolete Resend variables if present.

## Frontend setup

Set `VITE_API_URL=https://myportfoliobackend-rfum.onrender.com` in the frontend's Render **build** environment and redeploy the frontend. The application uses this variable in both development and production; if unset, it retains the local Vite proxy and production backend URL fallback. Never put SMTP credentials in a `VITE_` variable.

The CORS preflight for `Content-Type` and `Idempotency-Key` must return 204. A successful `/api/health` response only confirms the backend is up. Confirm actual delivery by sending a controlled contact message and checking the recipient inbox; SMTP acceptance is not a guarantee of inbox placement. Revoke any Gmail app password exposed outside Render and use a newly generated one.
