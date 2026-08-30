Portfolio site scaffold for Henin L.

Files:
- index.html — main site
- styles.css — styling
- script.js — interactions

Resume download links to the PDF in the site root: `HENIN_L_FlowCV_Resume_2026-07-22.pdf`. Include this file when deploying.

Local preview (static):

```bash
# Python 3 from repository root
cd portfolio-site
python -m http.server 8000
# Visit: http://localhost:8000
```

Vercel deployment (recommended):

1. Install Vercel CLI and log in:

```bash
npm i -g vercel
vercel login
```

2. From the `portfolio-site` folder, run:

```bash
vercel --prod
```

3. To enable the contact API to send emails, add a provider (SendGrid, Mailgun) and set environment variables in the Vercel dashboard. Update `api/contact.js` to call the provider with `process.env.SENDGRID_API_KEY` or similar.

Notes:
- The resume file is expected at the site root: `HENIN_L_FlowCV_Resume_2026-07-22.pdf`. Vercel will serve it from the root if included in the deployment bundle.
- Add project screenshots by replacing `images/placeholder-*.svg` with your PNG/JPEG screenshots keeping the same filenames.

Lighthouse audit (how to run locally)

1. Start the local server (from the `portfolio-site` folder):

```bash
python -m http.server 8000
# or use: vercel dev
```

2. Run Lighthouse from Chrome DevTools: Open `http://localhost:8000` in Chrome, open DevTools > Lighthouse, then run the audit for Performance, Accessibility, Best Practices, and SEO.

Or run Lighthouse CLI (requires Node and Chrome installed):

```bash
# from portfolio-site
npx -y lighthouse http://localhost:8000 --output html --output-path=./lighthouse-report.html --chrome-flags="--headless"
```

Note: I attempted to run the Lighthouse CLI from this environment but `npx` failed due to network/permission issues. Please run the commands above locally; if you share the generated `lighthouse-report.html` or `lighthouse-report.json`, I will parse it and fix any remaining issues.
