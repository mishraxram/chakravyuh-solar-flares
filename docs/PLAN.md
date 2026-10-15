# PLAN — LogLens (working name), ABCS-02 AI-Assisted Digital Forensics

**One line:** Paste or upload a server/ERP log, get a red-flagged incident timeline, an AI investigation summary, and a SHA-256 proof that the evidence was not changed.

## MUST-HAVES (exactly 3, build in this order)
1. **Timeline + suspicious flags (no AI, pure rules).**
   Check: user clicks "Try sample: ERP marks tampering" and sees events sorted by time, with red rows and a reason ("login at 02:07, outside working hours", "5 failed logins in 60s", "marks UPDATE by student role", "log cleared").
2. **AI investigation summary (Gemini, server-side).**
   Check: user clicks "Analyze with AI" and within 8s sees: what happened (3-5 lines), attack indicators with event numbers, confidence (low/medium/high), next steps. Toggle English / Hindi. Label "AI generated, verify before action".
3. **Evidence locker: SHA-256 + audit trail + report.**
   Check: on upload the file gets a SHA-256 hash and an audit entry; user edits one character and clicks "Verify" and sees "TAMPERED: hash mismatch"; user clicks "Download report" and gets an HTML report with hashes, flags, timeline and AI summary.

**FAILURE PATH:** AI down/slow (>8s) -> show rule-based findings only + banner "AI summary unavailable — Sample result (offline)" with the stored sample summary. AI unsure (confidence low or <2 flags) -> "Not enough evidence. Next: collect auth logs / DB audit logs for the same time window." Unparsable lines -> counted and shown as "N lines not understood", never silently dropped.

## PARKED (see BACKLOG.md)
Multi-case dashboard, YARA rules, file metadata (EXIF), PDF export, login/roles, MITRE ATT&CK mapping, charts.

## Architecture
- Astro single page `src/pages/index.astro` = the tool (input -> result). Tailwind + small TS.
- `src/lib/parse.ts` parses 2 formats: ERP audit CSV and Linux `auth.log`. `src/lib/rules.ts` = flag rules.
- `src/lib/hash.ts` SHA-256 via browser Web Crypto (file never leaves browser for hashing).
- `functions/api/analyze.ts` Cloudflare Pages Function -> Gemini API (key in env `GEMINI_API_KEY`), 8s timeout.
- `src/lib/prompts.ts` all prompts in one file. Evidence locker + audit trail in localStorage.
- Report = generated HTML file download. Deploy: Cloudflare Pages via wrangler.

## Data and API
- REAL: parsing, rules, SHA-256, tamper check, audit trail, Gemini call, report download.
- SAMPLE (labelled "sample"): 3 log files in `public/samples/` that we write ourselves; offline fallback summary.
- Needs key: `GEMINI_API_KEY` in `.env` (local) and Cloudflare secret (live). Only parsed event lines (max ~200) go to Gemini; UI says so.

## Timeline (T+0 = 2026-10-15 11:58 IST, assumed — change if event start differs)
| Gate | T | Clock |
|---|---|---|
| A: hello-world live | T+2:00 | 13:58 |
| B: full demo path | T+4:00 | 15:58 |
| C: feature freeze | T+5:30 | 17:28 |
| Submission ready | T+7:00 | 18:58 |
| Submit (30 min buffer) | T+7:30 | 19:28 |

## Top 5 risks -> fallback
1. Gemini key/quota fails live -> labelled offline sample summary, rules still work.
2. Real-world log formats too varied -> support only 2 formats, show "N lines not understood".
3. Cloudflare deploy blocked (login) -> run locally + recorded demo video.
4. Judge says "rules are not AI" -> rules = fast triage, Gemini = correlation + explanation; show both honestly.
5. Time overrun -> cut Hindi toggle and report download first; keep tamper demo (the wow).
