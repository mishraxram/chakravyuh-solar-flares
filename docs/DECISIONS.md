# DECISIONS

Short log of choices made, newest last.

## 2026-10-16 Upgrade pass
- (superseded below) First plan was an in-place upgrade on Pages, branch `upgrade`, tag `pre-upgrade-v1`.

## 2026-10-16 Parallel build, safe cutover (user's new plan, replaces the above)
- **v1 stays untouched.** Tag `pre-v2-baseline` on main. The live Pages URL https://loglens-solarflares.pages.dev is never deployed over before cutover.
- **v2 on branch `loglens-v2`**, same repo (so good v2 parts can be backported to v1 as small commits). Deploys as a separate Cloudflare Worker (static assets + Worker routes) with its own URL.
- **Cutover on 20 Oct only if v2 beats v1 on all of:** eval >= 16/16, Lighthouse >= 90 in all four (live URL), zero console errors on the main flow, offline fallback works. Otherwise v1 stays the demo.
- **Feature freeze 20 Oct 23:59.** 21-22 Oct: bug fixes and rehearsal only.
- v1 baseline measured 2026-10-16 00:40 IST (Lighthouse 12.8.2, live URL, mobile): Performance 83, Accessibility 100, Best Practices 100, SEO 100. Eval 16/16. Main perf cost: render-blocking CSS + Google Fonts (~900 ms), LCP 4.9 s.
