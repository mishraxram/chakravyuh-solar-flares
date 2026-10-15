// Simple health check so we know Pages Functions are live
export const onRequestGet = () => Response.json({ ok: true, time: new Date().toISOString() });
