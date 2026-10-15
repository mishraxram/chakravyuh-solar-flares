---
paths:
  - "**/*.astro"
  - "astro.config.*"
  - "functions/**"
  - "wrangler.*"
---
# Web stack rules (Astro + Cloudflare)
- Astro multi-page site. Use plain .astro pages and components. Add client JavaScript only where interaction needs it.
- Server code goes in functions/ (Cloudflare Pages Functions). Read secrets from env, never from source files.
- Keep dependencies few. Run `npm run build` before every commit that touches config or functions.
- Add a custom 404 page, a page title and meta description on every page.
- Deploy with `npx wrangler pages deploy dist --project-name <name>` (ask the user for the project name once).
