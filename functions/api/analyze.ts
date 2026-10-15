// POST /api/analyze  -> asks Gemini for an investigation summary.
// The API key stays on the server (Cloudflare secret GEMINI_API_KEY).
import { investigationPrompt, type AiEvent } from '../../src/lib/prompts.ts';

type Env = { GEMINI_API_KEY?: string; GEMINI_MODEL?: string };

const MAX_EVENTS = 200;
const TIMEOUT_MS = 8000;
// Tried in order; Gemini models are sometimes busy, so we keep backups
const MODELS = ['gemini-flash-lite-latest', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  // 1. Read and validate input
  let body: { events?: AiEvent[]; notes?: string[]; lang?: string };
  try { body = await request.json(); } catch { return Response.json({ error: 'Bad JSON' }, { status: 400 }); }
  // Keep only known fields, as short strings (limits prompt size and junk input)
  const s = (x: unknown, max = 200) => String(x ?? '').slice(0, max);
  const events: AiEvent[] = (Array.isArray(body.events) ? body.events.slice(0, MAX_EVENTS) : []).map((e: any) => ({
    n: Number(e.n) || 0, timeText: s(e.timeText, 25), user: s(e.user, 60), role: s(e.role, 20), ip: s(e.ip, 45),
    action: s(e.action, 30), target: s(e.target, 100), detail: s(e.detail), flags: (Array.isArray(e.flags) ? e.flags : []).map((f: unknown) => s(f)).slice(0, 6),
  }));
  if (!events.length) return Response.json({ error: 'No events to analyze' }, { status: 400 });
  const notes = (Array.isArray(body.notes) ? body.notes : []).map((n) => String(n).slice(0, 500)).slice(0, 5);
  const lang = body.lang === 'hi' ? 'hi' : 'en';
  if (!env.GEMINI_API_KEY) return Response.json({ error: 'AI not configured' }, { status: 503 });

  // 2. Call Gemini. If a model is busy (503/429), try the next one. Whole thing must finish in 8s.
  const models = env.GEMINI_MODEL ? [env.GEMINI_MODEL] : MODELS;
  const deadline = Date.now() + TIMEOUT_MS;
  const prompt = investigationPrompt(events, notes, lang);
  let lastError = 'AI unavailable';
  for (const model of models) {
    const left = deadline - Date.now();
    if (left < 500) { lastError = 'AI took longer than 8s'; break; }
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
        }),
        signal: AbortSignal.timeout(left),
      });
      if (!res.ok) { lastError = `AI error ${res.status}`; continue; }
      const data: any = await res.json();
      const ai = JSON.parse(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '');
      // Hindi asked but no Devanagari in the reply: try the next model instead of showing English
      if (lang === 'hi' && !/[ऀ-ॿ]/.test(String(ai.summary))) { lastError = 'AI replied in the wrong language'; continue; }
      if (!['incident', 'suspicious', 'normal', 'unsure'].includes(ai.verdict)) ai.verdict = 'unsure';

      // 3. Keep only indicators that cite real event numbers (guards against made-up events)
      const valid = new Set(events.map((e) => e.n));
      const cited = (list: any) => (Array.isArray(list) ? list : []).filter(
        (i: any) => Array.isArray(i.events) && i.events.length && i.events.every((n: number) => valid.has(n)),
      );
      ai.indicators = cited(ai.indicators);
      ai.hidden_patterns = cited(ai.hidden_patterns).slice(0, 3);
      return Response.json({ source: 'ai', model, sent: events.length, ...ai });
    } catch (err) {
      lastError = err instanceof Error && err.name === 'TimeoutError' ? 'AI took longer than 8s' : 'AI reply could not be read';
    }
  }
  return Response.json({ error: lastError }, { status: 504 });
};
