# Hostinger Deployment

1. In Hostinger hPanel → File Manager (or FTP) → open `public_html` (or your domain's document root).
2. Upload all files from inside the project folder into `public_html`, preserving folders (`assets/`, `data/`, `backend/`, `docs/` are not required on the server for the site itself, but keeping `docs/` out of public_html is fine — only `*.html`, `assets/` and `data/` are needed to run).
3. Make sure `index.html` is at the root of `public_html`.
4. Open your domain and test every page, the product search/filter, and both forms (see CHECKLIST.md).
5. If you use a custom domain with SSL, enable the free SSL in hPanel and force HTTPS. The Apps Script endpoint must be the `https://script.google.com/.../exec` URL.
