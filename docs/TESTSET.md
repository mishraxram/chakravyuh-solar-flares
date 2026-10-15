# TESTSET (all inputs are sample data we wrote)

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
