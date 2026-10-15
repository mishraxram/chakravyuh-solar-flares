# DEMO SCRIPT (3 minutes)

Live: https://loglens-solarflares.pages.dev · Before the demo: click "New case" so the audit trail starts clean.

## Scene 1 — Problem (0:00-0:35)
- Judge sees: the tool page (input box + 3 "Try sample" buttons).
- Say the hook from docs/PITCH.md: marks 42 → 92 at 2 AM, professor says he did not log in.

## Scene 2 — Timeline + flags (0:35-1:00)
- Click: "ERP marks tampering" (loads, locks evidence and builds the timeline).
- Judge sees: HIGH RISK banner, red rows #8-#17: 5 failed logins in 2 min, login at 02:07 from new IP, marks 42→92 and 35→88, audit_log deleted.
- Say: "Rules run instantly, no AI. Each red row has a reason."
- Data: `public/samples/erp-marks-tamper.csv` (sample).

## Scene 3 — AI summary (1:00-1:35)
- Click: "Analyze with AI" (English). Wait 5-8 s.
- Judge sees: "AI generated" label, Verdict: INCIDENT, indicators with #event numbers, dashed "AI found beyond the rules" box, next steps.
- Click: हिंदी → "Analyze with AI" again (Hindi summary).
- Say: "Only parsed lines go to Gemini. Every AI claim cites events, so the investigator can check it."
- If AI is slow/down: the grey "Offline summary from rules — Not AI generated" box appears. Say so honestly and continue.

## Scene 4 — Tamper proof (1:35-2:00)
- In the text box, change `42->92` to `42->93`. Click "Verify integrity".
- Judge sees: red "TAMPERED: hash mismatch" with locked vs now hashes.
- Open "Audit trail (hash-chained)" → click "Tamper test: secretly edit audit entry 1".
- Judge sees: "CHAIN BROKEN at entry 1".
- Say: "One character changed and the hash changed completely. Even our own audit trail shows if someone edits it."

## Scene 5 — Report + any file (2:00-2:10, optional if time)
- Click "Download report" and open it: hashes, flags, AI summary, audit chain status.
- Optional: "Upload log or any evidence file" → pick a PDF → evidence tag shows type + last modified + SHA-256.

## Scene 6 — Close (2:10-3:00)
- Tech line, test result (11/14 → 14/14), next steps, QR code in the footer: "Scan and try your own log."
