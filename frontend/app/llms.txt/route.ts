/**
 * llms.txt — a crawler-friendly guide to RoastMyTube for AI engines
 * (ChatGPT, Perplexity, Claude) and web agents.
 * Served as plain text at /llms.txt
 */
export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const body = `# RoastMyTube

> Connect your YouTube account. AI reads your liked videos, subscriptions and
> playlists, then roasts you with a Brain-Rot Score, red flags and a shareable
> roast card. Free. English + Hinglish. No posting or deleting — read-only access.

## Key pages
- Home (what it is + live demo): ${base}/
- Login (Google OAuth start): ${base}/login
- Sample roast demo (no login needed): ${base}/#demo
- How it works: ${base}/#how
- Features: ${base}/#features
- FAQ: ${base}/#faq
- Privacy Policy: ${base}/privacy
- Terms of Service: ${base}/terms

## What it does
- Fetches YouTube data (subscriptions, liked videos, playlists, stats) via
  YouTube Data API v3 using read-only OAuth scopes.
- Generates roast reports (score 0-100, rank, red flags, personality title,
  channel roasts, love-life prediction) with LLMs (Groq primary, Gemini fallback).
- Offers optional Takeout upload: history JSON parsed 100% in-browser, only
  aggregates reach the server.
- Share Studio exports roast cards (Post/Square/Story) as PNG, JPG, WebP, AVIF.

## What it never does
- Post, delete, like, or modify anything on your YouTube account.
- Store your watch or search history. Only finished roast reports are saved.
- Sell data or run ads.

## Account & data control
- Sign in with Google; sign out anytime.
- Profile page Danger Zone: wipe roast history, disconnect YouTube (revokes the
  Google token), delete the entire account.

## Tech
Next.js 16 + React 19 + TypeScript + Bun + Tailwind v4 + Better Auth +
Neon Postgres + Drizzle ORM.

## Contact / author
Rahul Sain — https://rahulxcode.vercel.app — sainrahul374@gmail.com
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
