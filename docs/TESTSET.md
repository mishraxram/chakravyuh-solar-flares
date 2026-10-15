# TESTSET (all inputs are sample data we wrote)

**Honest result (2026-10-15 12:33, 3 runs of `node tests/eval.ts` against the live API): 11/14, 13/14, 11/14.** Rules and hashing give the same result every run. The AI part varies. Always fails: case 6 (no impossible-travel rule). Sometimes fails: cases 2 and 5 (AI says confidence "high" for a normal log, meaning "sure it is fine": our field mixes verdict and confidence) and case 9 (once, the AI replied in English when Hindi was asked).

Format A = ERP audit CSV (`time,user,role,ip,action,target,detail`). Format B = Linux auth.log.
"Flags" = rule flags expected. "AI" = expected AI verdict.

| # | Input | Expected flags | Expected AI verdict | Button |
|---|---|---|---|---|
| 1 | A: student `21cs045` 5 failed logins 01:58, success 02:07 new IP, UPDATE marks 42->92, DELETE audit_log | burst-fail, off-hours, new-ip, role-misuse, log-clear | Likely unauthorized marks change, high | **Try sample 1 (normal)** |
| 2 | A: faculty updates marks at 11:30 from usual IP | none | No incident, low | |
| 3 | B: 30 `Failed password for root` from 1 IP in 2 min, then `Accepted password` | burst-fail, root-login | Brute force then success, high | **Try sample 2 (tricky: different format)** |
| 4 | B: failed logins from 1 IP, no success | burst-fail | Brute force attempt, not successful, medium | |
| 5 | A: admin bulk UPDATE at 23:50 during result week (legit, ticket ref in detail) | off-hours | Unsure / likely legit, ask for change ticket | |
| 6 | A: same user logs in from 2 cities' IPs within 5 min | impossible-travel | Account sharing or stolen creds, medium | |
| 7 | Empty input | — | Message "Paste a log or try a sample" | |
| 8 | Random text (a poem) | 0 parsed, N not understood | "Not a supported log" | |
| 9 | A + Hinglish investigator note: "kal raat 2 baje marks change hue, kisne kiya?" + log 1, Hindi toggle on | same as #1 | Summary in Hindi, high | **Try sample 3 (Hinglish)** |
| 10 | A: timestamps out of order | flags as #1, timeline sorted | high | |
| 11 | A: 5000 lines | first 200 events to AI, warning shown | depends | |
| 12 | A: audit_log DELETE only | log-clear | Suspicious anti-forensics, medium | |
| 13 | Tamper: sample 1 hashed, then 1 char changed | — | Verify -> TAMPERED | |
| 14 | Tamper: same file re-uploaded unchanged | — | Verify -> MATCH | |

Results: (fill after eval-set) passed _/14.

## Results (run 2 of 3, full table)

Inputs: samples in `public/samples/`, extra cases in `tests/cases/`. Runner: `node tests/eval.ts`.

| # | Got | Result | Why failed |
|---|---|---|---|
| 1 | 19 events, 0 unparsed, flags: off-hours new-ip role-misuse shared-ip burst-fail login-after-burst marks-jump log-clear (2ms) · AI confidence high | PASS |  |
| 2 | 3 events, 0 unparsed, flags: none (0ms) · AI confidence low | PASS |  |
| 3 | 11 events, 0 unparsed, flags: off-hours burst-fail shared-ip login-after-burst root-login (0ms) · AI confidence high | PASS |  |
| 4 | 6 events, 0 unparsed, flags: burst-fail shared-ip (0ms) · AI confidence high | PASS |  |
| 5 | 4 events, 0 unparsed, flags: off-hours (0ms) · AI confidence low | PASS |  |
| 6 | 4 events, 0 unparsed, flags: new-ip (0ms) · AI confidence high | FAIL | missing flag impossible-travel |
| 7 | 0 events, 0 unparsed, flags: none (0ms) | PASS |  |
| 8 | 0 events, 3 unparsed, flags: none (0ms) | PASS |  |
| 9 | 6 events, 0 unparsed, flags: off-hours new-ip shared-ip marks-jump log-clear (0ms) · AI confidence high | PASS |  |
| 10 | 19 events, 0 unparsed, flags: off-hours new-ip role-misuse shared-ip burst-fail login-after-burst marks-jump log-clear (0ms) | PASS |  |
| 11 | 4999 events, 0 unparsed, flags: off-hours new-ip role-misuse shared-ip burst-fail login-after-burst marks-jump log-clear (15ms) | PASS |  |
| 12 | 2 events, 0 unparsed, flags: log-clear (0ms) · AI confidence high | PASS |  |
| 13 | one char changed -> hash differs: true | PASS | |
| 14 | same file re-read -> hash equal: true | PASS | |

## Failures seen across 3 runs
| Case | Runs failed | Reason | Cheap fix |
|---|---|---|---|
| 6 impossible travel | 3/3 | No rule for "same user, 2 different networks within minutes" (only new-ip fires) | add one rule (~10 lines) |
| 2 normal faculty | 2/3 | AI confidence "high" for a clean log: confidence is about its own conclusion, not about risk | add a separate `verdict` field (incident / suspicious / no_incident / unsure) to the prompt and UI |
| 5 admin late, with ticket | 1/3 | same as case 2 | same fix |
| 9 Hinglish -> Hindi | 1/3 | AI replied in English once | check Devanagari on server, retry once / show note |
