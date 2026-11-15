# Portfolio — Khalid Oyekunle

React + TypeScript + Vite portfolio with project case studies, a Markdown blog, and a pluggable AI assistant.

**Live:** https://khalid-oyekunle.vercel.app

## Run

```bash
npm install
npm run dev        # local dev
npm run typecheck  # TypeScript
npm run lint
npm run build
```

## Structure

```text
src/
├── app/          # app shell: router, layout, theme provider
├── pages/        # route components (thin; compose features)
├── features/     # self-contained feature modules
│   ├── profile/  # hero, about, services, skills, experience, contact
│   ├── projects/ # cards, grid, gallery, status badge
│   ├── blog/     # post loader + components
│   └── ai-chat/  # ChatClient contract, mock + HTTP clients, useChat, widget
├── content/      # ALL site content as typed data (edit here, not in components)
│   └── posts/    # blog posts as Markdown files
├── shared/       # reusable ui, hooks, lib
└── styles/       # design tokens and CSS
```

## Updating content

| To change | Edit |
| --- | --- |
| Bio, links, role | `src/content/profile.ts` |
| Skills / experience / services | `src/content/skills.ts`, `experience.ts`, `services.ts` |
| Add or update a project | `src/content/projects.ts` (images go in `public/projects/<slug>/`) |
| Write a blog post | new `.md` file in `src/content/posts/` (frontmatter: title, date, summary, tags, draft) |

A project's `liveUrl` and `repoUrl` are optional; buttons appear only when set.

## AI assistant

Runs on a mock until `VITE_AI_API_URL` is set. See [docs/ai-integration.md](docs/ai-integration.md).

## Deploying

`vercel.json` rewrites all routes to `index.html` so deep links like `/projects/aurher` work.
