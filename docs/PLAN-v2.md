# PLAN v2 (branch `loglens-v2`)

Goal: a v2 on Cloudflare Workers that beats v1 on every cutover check by 20 Oct. v1 (main, https://loglens-solarflares.pages.dev) stays untouched.
Ranking uses the proxy rubric in docs/RESEARCH.md until the real rubric arrives.

## Architecture
- Astro static build (`dist/`), same pages and libs as v1, minimal client JS.
- One Worker script `worker/index.ts` (verified config: `assets.directory`, `binding: "ASSETS"`, `run_worker_first: ["/api/*"]`, Cloudflare docs "Static Assets binding").
  - `POST /api/analyze` (ported from functions/api/analyze.ts)
  - `POST /api/seal` signs an evidence receipt (Ed25519, Workers Web Crypto, verified in Cloudflare docs)
  - `GET /api/health`
  - Everything else goes to `env.ASSETS.fetch(request)`.
- Rate limit: Workers rate limit binding (`ratelimits`, `limit({ key })`, period 10 or 60 s, verified in Cloudflare docs; free-plan availability **UNVERIFIED**, so we check it on first deploy and fall back to a per-isolate counter if it is unavailable).
- Secrets: `GEMINI_API_KEY`, `SEAL_PRIVATE_KEY` (JWK) via `wrangler secret put`. The public key lives in source.
- Separate Worker name `loglens-v2`, so its URL never overwrites v1.

## Features ranked by (criteria impact / build time)
| # | Feature | Criterion (proxy) | Impact | Time | Pros | Cons / risks | Drawback fix |
|---|---|---|---|---|---|---|---|
| F1 | Port to Workers (static assets + /api routes), eval 16/16 | Working demo | Must | 1 h | Required by the cutover rule | Config mistakes; route differences vs Pages | Use the verified config only; run the same eval against the v2 URL |
| F2 | Perf: inline CSS, self-hosted subset fonts, preload | Working demo / UX | H | 45 m | Lighthouse 83 -> 90+ target; faster on venue Wi-Fi | Font subsetting can drop Devanagari glyphs | Keep Noto Devanagari full; check the Hindi sample visually |
| F3 | **Signed evidence receipt** (Ed25519): server signs {sha256, size, name, server time}; the browser verifies with the public key on the page, also offline; receipt shown on the evidence tag + in the report | Technical depth, Innovation, PS point 4 | H | 2.5 h | Fixes v1's main flaw (a re-hash defeats localStorage integrity); differentiator | Browser Ed25519 support per version not verified; claim must stay honest (proves "server saw this hash at time T", not that the log was original before upload) | Test in Chrome during the slice; if browser verify fails, verify via the server and say so in the UI; exact wording in UI + README |
| F4 | **AI cross-check**: compare the AI verdict and cited events with the rule flags; show "AI and rules disagree on X" | Technical depth, Innovation, PS point 2 | H | 1 h | Answers the "can AI be trusted?" question; deterministic, no extra API call | Too many warnings on noisy logs | Show at most 3, high-severity first |
| F5 | MITRE ATT&CK ID per rule flag (static table) | Problem fit, Technical depth | M | 45 m | Security judges recognise IDs | A wrong ID is a credibility hit | Verify every ID on attack.mitre.org before shipping; unverified = not shown |
| F6 | Hardening: rate limit /api/*, body size cap, schema checks, JSON errors, lint + typecheck | Working demo | M | 45 m | Protects the Gemini quota on demo day | Rate limiting the judge by mistake | Generous limit (e.g. 20/min per IP); friendly 429 message + offline result |
| F7 | Offline shell: small service worker caches pages + samples after the first visit | Working demo | M | 1 h | Demo survives with no Wi-Fi | Stale cache after a deploy | Versioned cache name from the build hash; network-first for HTML |
| F8 | Polish gaps: dark mode, about/privacy/terms/contact, robots.txt, sitemap.xml, 404/500, OG image | UX | L-M | 1.5 h | Bootstrap DoD, Lighthouse SEO | Dark mode can break the evidence-tag look | Token-based colours from DESIGN.md; check both themes at 360 px |

Cut (stay in BACKLOG): multi-case dashboard, YARA, EXIF metadata, login, charts, Windows Event Log, local LLM.

## Schedule
| Day | Work |
|---|---|
| 16 Oct | F1, F2, F6 -> first v2 deploy + Lighthouse |
| 17 Oct | F3 signed receipt |
| 18 Oct | F4, F5, F7 |
| 19 Oct | F8, skeptical-judge round 1 + fixes |
| 20 Oct | judge round 2 + fixes, DEMO.md, final deploy, **cutover check** (freeze 23:59) |
| 21-22 Oct | bug fixes + rehearsal only |

## Rules for every slice
Commit + push `loglens-v2` after each green slice. Run `node tests/eval.ts <v2-api-url>` after each change; any fail = revert that change.

## Cutover check (20 Oct)
| Check | v1 (16 Oct) | v2 |
|---|---|---|
| Eval | 16/16 | |
| Lighthouse P / A / BP / SEO (mobile, live) | 83 / 100 / 100 / 100 | |
| Console errors on main flow | 0 (STATE.md e2e) | |
| Offline fallback demo | AI fallback yes, page shell no | |
