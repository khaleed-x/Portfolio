# Analytics hub setup (Stage 2)

## 1. Turn on Vercel's built-in tools
Vercel → your project → **Analytics** tab → Enable. Then **Speed Insights** tab → Enable.

## 2. Install the two small packages
```bash
npm install @vercel/analytics @vercel/speed-insights
```

## 3. Connect a free Redis database (stores the visit log)
Vercel → your project → **Storage** (or Marketplace) → add **Upstash Redis** → pick the free plan → connect it to the project.
Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. Then **redeploy**.
Check the plan's command limit in the Upstash/Vercel dashboard. If it is ever used up, only the visit log pauses. The site keeps working.

## 4. Code edits (see the chat message): RootLayout, router, index.css, footer link

## 5. Test
Open your site in a private window, visit a page or two, then open `/khalid/admin` → Analytics.
Your own visits (while signed in to the admin) are not counted.

## What is stored (matches /privacy)
Page, time, country/region/city (approximate), device/OS/browser, referrer or utm_source,
and a daily-changing scrambled visitor code. The raw IP is never stored. Entries are removed after about 90 days.
