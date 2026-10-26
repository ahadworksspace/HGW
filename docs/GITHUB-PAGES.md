# GitHub Pages Deployment

1. Unzip the project. No build step is needed — this is plain HTML/CSS/JS (no Vite).
2. On GitHub, create a new repository (e.g. `hgw-bahawalpur`), public or private (Pages works on public repos on free plans).
3. Upload all files from inside the project folder (not the folder itself) — via GitHub web upload, or:
   `git init; git add .; git commit -m "HGW Bahawalpur site"; git branch -M main; git remote add origin <repo-url>; git push -u origin main`
4. Repository → Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, Folder: / (root).
5. Wait for the Pages build, then open the published URL shown on the Pages settings page, e.g. `https://<username>.github.io/hgw-bahawalpur/`.
6. Because all links and asset paths are relative (`assets/...`, `data/...`), the site works at a `/repo/` sub-path without a base-path change. If you later switch to Vite, set `base: '/<repo-name>/'` in vite.config.js — that step does not apply to this plain-HTML project.
7. Custom domain (optional): Settings → Pages → Custom domain → enter your domain → add the DNS records GitHub shows → enable Enforce HTTPS. GitHub Pages does not run server code, so the Apps Script backend stays separate (see GOOGLE-SETUP.md).
