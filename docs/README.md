# Health Green World — Bahawalpur Website

A premium green-and-white, fully responsive static website. No build step, no paid API, no server.

## Pages
Home, About Us, Products (search + category filter), Product Categories, Careers, Contact Us.

## What is verified, what is not
- **Verified from greenworld.pk (26 Oct 2026):** product names, shop prices in `data/products.json`, phone/WhatsApp +92 300 8786895, email order@greenworld.pk, city Bahawalpur, Pakistan, COD mention on the source site.
- **Flagged, not silently chosen:** a few products show a different price on their individual product page than on greenworld.pk/shop. Those cards say “confirm before payment”.
- **NOT verified, NOT published:** a specific Bahawalpur street address, opening hours, certifications, reviews, and any job vacancy. Careers is an open-application form only. Rehman Abad / Model Town A are not published as branch addresses.
- **No medical claims** are made on this site.

## Quick start
1. Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000`
2. Edit ONLY `assets/js/config.js` for branch/contact/form settings (see docs/BRANCH-CONFIG.md).
3. Complete docs/GOOGLE-SETUP.md in the owner's Google account (ahadworksspace@gmail.com) — this project cannot and does not log into that account for you.
4. Deploy with docs/GITHUB-PAGES.md or docs/HOSTINGER.md.

## Submission flow
Website form → (if configured) Google Apps Script Web App (`backend/Code.gs`) → owner's private Sheet (HGW Orders / HGW Careers) + email to ahadworksspace@gmail.com.
If the Apps Script URL is not set, the form shows the Google Form fallback and clearly says nothing was saved. Never claim a save without a backend `{ok:true}` response.

## Owner checklist
See docs/CHECKLIST.md.
