# Link previews (WhatsApp, X, LinkedIn…)

`npm run build` runs `scripts/prerender-meta.mjs` after Vite. It writes a static HTML file per page
(`dist/blog/<slug>/index.html`) containing Open Graph + Twitter tags, plus `sitemap.xml` and `robots.txt`.
Crawlers don't run JavaScript, so this is what makes the preview card appear.

**Publishing a post:** add `src/content/posts/my-post.md`, set `title`, `date`, `summary`, optionally
`image: /blog/my-post.png`, and `draft: false`. Push. Share `https://<your-domain>/blog/my-post`.

**Cover image:** 1200×630 px, PNG/JPG, under ~300 KB, placed in `public/` (e.g. `public/blog/my-post.png`).
No `image` set → `public/og-default.png` is used.

**Different domain?** Set the `SITE_URL` environment variable in Vercel (default: https://khalid-oyekunle.vercel.app).

**Preview not updating?** WhatsApp caches aggressively. Add `?v=2` to the link, or test with
Facebook's Sharing Debugger (developers.facebook.com/tools/debug) which also refreshes the cache.
