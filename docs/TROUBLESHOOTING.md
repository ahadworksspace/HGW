# Troubleshooting

- Blank product grid: open the browser console; `data/products.json` must load (serve over http, not file:// in some browsers, or use `python3 -m http.server`). Check JSON validity.
- Images not loading: greenworld.pk thumbnails are hotlinked; if that site blocks hotlinking, download product images with permission and put them in `assets/img/` and update `data/products.json` image paths.
- Form says “not configured”: set appsScriptUrl in config.js (GOOGLE-SETUP.md step 3).
- Form error after submit: check the Apps Script Executions log; redeploy as a NEW version after code changes (old /exec URLs keep old code).
- Duplicate submissions: the submit button disables while sending; if a user double-clicks before that, the backend rate limit (10/hour per key) and the Sheet timestamp help staff spot duplicates — do not charge or confirm duplicates.
- Mobile menu not opening: ensure assets/js/main.js loads after config.js (it does in every page footer).
- GitHub Pages 404: check the repo's Pages branch/folder is main + / (root), and that index.html is at the repo root.
