# Blog comments (Giscus + GitHub Discussions)

Comments live in your repo's GitHub Discussions, one thread per post. Visitors sign in with GitHub to comment.

## One-time setup
1. The repo must be **public**.
2. Repo → Settings → General → Features → tick **Discussions**.
3. Repo → Discussions → edit categories → create **Blog Comments**, format **Announcement**
   (only you and giscus can start threads; everyone can reply).
4. Install the app: https://github.com/apps/giscus → choose your repo.
5. Open https://giscus.app, enter `owner/repo`, pick the **Blog Comments** category, then copy
   `data-repo-id` and `data-category-id` from the generated snippet.
6. Copy `.env.example` to `.env` and fill the four `VITE_GISCUS_*` values.
7. In Vercel → Project → Settings → Environment Variables, add the same four, then **redeploy**
   (Vite bakes these in at build time).

Until all four are set, the comments section is hidden in production.

## How it works
- The thread for a post is matched by `blog/<slug>`, so renaming a post's file starts a new thread.
- The widget loads only when a reader scrolls near it, and follows the site's dark/light theme.
- Moderate from GitHub Discussions: delete, lock or hide comments there.
