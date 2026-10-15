// v2 entry point: one Cloudflare Worker serves the static Astro build and the /api routes.
// The API handlers are the same files v1 uses on Pages, so both versions share one tested code path.
import { onRequestPost as analyze } from '../functions/api/analyze.ts';
import { onRequestGet as health } from '../functions/api/health.ts';

type Env = { ASSETS: { fetch: (req: Request) => Promise<Response> }; GEMINI_API_KEY?: string; GEMINI_MODEL?: string };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    try {
      if (pathname === '/api/analyze' && request.method === 'POST') return await analyze({ request, env });
      if (pathname === '/api/health' && request.method === 'GET') return health();
      if (pathname.startsWith('/api/')) return Response.json({ error: 'Not found' }, { status: 404 });
    } catch {
      // Never leak a stack trace; the page shows the offline rule-based result instead
      return Response.json({ error: 'Server error' }, { status: 500 });
    }
    // Everything else is a static file from dist/ (404.html if nothing matches)
    return env.ASSETS.fetch(request);
  },
};
