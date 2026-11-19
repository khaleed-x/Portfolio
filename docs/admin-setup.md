# Admin panel setup (Stage 1)

Address: `/khalid/admin`. Login is GitHub only, and only YOUR numeric GitHub id is accepted.
Publishing commits the post (and compressed images) to your repo in one commit; Vercel then deploys it.

## 1. Create a GitHub OAuth App (for login)
GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
- Homepage URL: `https://khalid-oyekunle.vercel.app`
- Authorization callback URL: `https://khalid-oyekunle.vercel.app/api/auth/callback`
Click Register, then **Generate a new client secret**. Keep the Client ID and the secret.

## 2. Create a fine-grained token (for saving posts)
GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token
- Repository access: **Only select repositories** → your portfolio repo
- Permissions → Repository → **Contents: Read and write** (also Deployments: Read-only, for the status light)
- Pick the longest expiry you are comfortable with, and put a reminder to renew it.

## 3. Find your numeric GitHub id
Open `https://api.github.com/users/khaleed-x` and copy the `"id"` number.

## 4. Add these in Vercel → Project → Settings → Environment Variables (then redeploy)
| Name | Value |
| --- | --- |
| `GITHUB_CLIENT_ID` | from step 1 |
| `GITHUB_CLIENT_SECRET` | from step 1 |
| `ADMIN_GITHUB_ID` | your numeric id (step 3) |
| `SESSION_SECRET` | a long random string, e.g. `openssl rand -base64 32` |
| `GITHUB_TOKEN` | the token from step 2 |
| `GITHUB_REPO` | `your-username/your-repo-name` |
| `GITHUB_BRANCH` | `main` |

## Notes
- The `/api` functions run on Vercel. Plain `npm run dev` will not serve them; test on the deployed site (or use `npx vercel dev`).
- The server only writes `src/content/posts/<slug>.md` and `public/posts/<slug>/*.jpg`. Nothing else in the repo.
- Never put these values in a `VITE_` variable, because those are public.
- If the status light stays on "Publishing…", the post is probably still live. Check Vercel → Deployments.
