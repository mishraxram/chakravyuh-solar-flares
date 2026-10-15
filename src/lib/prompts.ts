// All AI prompts live here so they are easy to read and explain.

export type AiEvent = {
  n: number; timeText: string; user: string; role: string; ip: string;
  action: string; target: string; detail: string; flags: string[];
};

export function investigationPrompt(events: AiEvent[], notes: string[], lang: 'en' | 'hi') {
  const language = lang === 'hi'
    ? 'Write all text values in simple Hindi (Devanagari script). Keep usernames, IPs and event numbers as they are.'
    : 'Write all text values in simple English.';
  return `You are a digital forensics assistant helping a college IT investigator.
Below are log events (already parsed and sorted by time). Some have rule-based flags.
Investigator case notes (may be Hinglish): ${notes.length ? notes.join(' | ') : 'none'}

Task:
1. Explain what most likely happened, in 2-4 short sentences.
2. List at most 5 attack indicators, max 25 words each. Each indicator MUST cite the event numbers (#n) it is based on. Do not invent events.
3. Give confidence: "low", "medium" or "high". Use "low" if the evidence is thin or could be normal activity.
4. Give 2-3 concrete next steps (max 20 words each) for the investigator (what to check or collect next).
Never claim certainty about a person's identity; say "the account" or "the IP" unless logs prove more.
${language}

Reply ONLY with JSON in this shape:
{"summary": string, "indicators": [{"events": number[], "text": string}], "confidence": "low"|"medium"|"high", "next_steps": string[]}

Events:
${events.map((e) => `#${e.n} ${e.timeText} user=${e.user || '-'} role=${e.role || '-'} ip=${e.ip || '-'} ${e.action} ${e.target} ${e.detail}${e.flags.length ? ` [flags: ${e.flags.join('; ')}]` : ''}`).join('\n')}`;
}
