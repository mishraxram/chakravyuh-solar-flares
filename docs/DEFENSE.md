# DEFENSE — know your project

## Architecture (5 bullets)
1. One web page (`src/pages/index.astro`) is the whole tool. It runs in the browser.
2. The browser parses the log, runs the rules and computes SHA-256. Raw files never leave the browser.
3. For the AI summary, the browser sends only parsed event lines to our server function `/api/analyze` on Cloudflare.
4. The server function adds the secret Gemini key, asks Gemini, checks the answer, and sends JSON back. If Gemini fails, the browser builds a rule-based summary instead.
5. Evidence record + hash-chained audit trail are saved in the browser's localStorage. The report is an HTML file made in the browser.

## File map
| File | What it does |
|---|---|
| `src/lib/parse.ts` | Turns log text into events (time, user, role, ip, action, target, detail). Reads ERP CSV and Linux auth.log. Sorts by time. Keeps lines it cannot read in `unparsed`. |
| `src/lib/rules.ts` | 10 rules that add red/amber flags with a reason (failed-login burst, new IP, marks jump, log deleted...). `ruleVerdict` counts high/medium. |
| `src/lib/evidence.ts` | `sha256()` with Web Crypto, lock evidence (text or any file), verify, hash-chained audit trail, tamper test. |
| `src/lib/prompts.ts` | The one Gemini prompt: what to write and the exact JSON shape. |
| `functions/api/analyze.ts` | Server: validates input, calls Gemini with 8 s budget and 3 backup models, removes AI points that cite fake events, retries if Hindi reply is not Hindi. |
| `src/pages/index.astro` | The page + its script: buttons, timeline, AI box, evidence locker, report download. |
| `src/lib/report.ts` | Builds the downloadable HTML report, escaping all text. |
| `src/layouts/Base.astro` | Page shell, fonts, footer with QR code (made at build time). |
| `tests/eval.ts` | Runs 14 test cases through the real code and the live API. |
| `public/samples/*` | 3 made-up sample logs for the "Try sample" buttons. |

## Demo path (what happens inside)
1. Click "ERP marks tampering" → `index.astro` fetches `/samples/erp-marks-tamper.csv` → `lockEvidence()` in `evidence.ts` hashes the text and writes audit entry 1.
2. `run()` → `parseLog()` (parse.ts) makes 19 events → `applyRules()` (rules.ts) adds flags → page draws red/amber rows → audit entry "TIMELINE_BUILT".
3. Click "Analyze with AI" → browser sends up to 200 events (flagged first) + notes + language as JSON to `/api/analyze`.
4. `analyze.ts` builds the prompt (prompts.ts), calls Gemini, parses JSON, drops bad citations, returns verdict/summary/indicators/hidden_patterns/next_steps. Browser shows it with the "AI generated" label. If it fails → `offlineSummary()` from the rules.
5. Change 92 to 93 → "Verify integrity" → `verifyEvidence()` hashes the box again → different hash → TAMPERED, audit entry added.
6. "Tamper test" → edits audit entry 1 without fixing hashes → `verifyAuditChain()` recomputes → "CHAIN BROKEN at entry 1".
7. "Download report" → `buildReport()` (report.ts) → HTML file download.

## 10 hardest questions
1. **Why do rules first and AI second?** Rules are fast, free and explainable; AI is slow and can be wrong. Rules give the evidence, AI connects it and explains it.
2. **How does the burst rule work?** For each failed login, count failed logins from the same IP in the last 2 minutes. If 5 or more, flag all of them; a successful login from that IP within 15 minutes gets "login after burst".
3. **How do you stop AI from inventing events?** The prompt says cite event numbers. The server then removes any indicator whose event numbers are not in the list we sent.
4. **What is a hash chain?** Each audit entry stores the previous entry's hash, and its own hash covers that. Change one entry and its hash, and every link after it, stops matching.
5. **Why SHA-256 in the browser, not the server?** The file never needs to leave the device, and Web Crypto is standard. The value equals `sha256sum`, so anyone can check.
6. **Why 200 events max?** Keeps the prompt small, fast and cheap. We send flagged events first so important ones are never cut.
7. **Why several Gemini models?** Some models were busy (503) or slow (5-9 s) during our build. We try flash-lite models in order within one 8 s budget.
8. **Where is the API key?** Only in Cloudflare secrets and local `.dev.vars` (git-ignored). The browser never sees it.
9. **Is the HTML report safe against a malicious log?** Yes, every value is escaped in `report.ts`, and the page uses `textContent`, not `innerHTML`.
10. **What does "verdict" vs "confidence" mean?** Verdict = what happened (incident/suspicious/normal/unsure). Confidence = how sure the AI is about that verdict. We split them after the test set showed "high" was confusing on normal logs.

## 5 weak spots (honest answers)
1. **Only 3 log formats.** "Limitation. Next we add Windows event logs and firewall logs; the parser is built so a new format is one function."
2. **Audit trail is in one browser.** "Editing is detected, but deleting the whole trail is not. Next: send each entry hash to a server or a timestamp service as a receipt."
3. **Rules use fixed numbers (5 fails in 2 min, 06:00-23:00).** "They fit our college story. Next: make them settings per organisation."
4. **Test set is small and written by us.** "14 cases show the demo path is stable, not real-world accuracy. Next: test on public log datasets."
5. **AI answers vary run to run.** "That is why every point cites events and we show a label. Temperature is low (0.2) and we validate the JSON."

## AI tools disclosure
Claude Code wrote most of the code, rules and test cases under our direction; we chose the problem, story, scope and demo, and reviewed results. Gemini is used inside the app for analysis. Say this openly if asked.
