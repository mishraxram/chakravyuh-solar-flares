# CHECK KIT — test LogLens yourself before judging

Live: https://loglens-solarflares.pages.dev
How to use: open the site → click "New case" → paste one block below into "Log text" → click "Build timeline". Compare with "Should show". All logs here are made-up sample data.

## A. Paste tests (copy each block)

### 1. Normal day, nothing wrong
```
2026-10-13 09:10:00,prof.sharma,faculty,10.0.4.30,LOGIN,erp,success
2026-10-13 11:30:12,prof.sharma,faculty,10.0.4.30,UPDATE,marks/21CS050/OS,33->36
2026-10-13 11:45:00,prof.sharma,faculty,10.0.4.30,LOGOUT,erp,
```
Should show: green banner "No suspicious pattern found". AI verdict: normal.

### 2. Website attack (Apache/Nginx log)
```
49.36.112.7 - - [14/Oct/2026:01:44:10 +0530] "GET /results.php?roll=21CS045'%20OR%20'1'='1 HTTP/1.1" 200 9921 "-" "sqlmap/1.8"
49.36.112.7 - - [14/Oct/2026:01:45:02 +0530] "GET /download.php?file=../../../../etc/passwd HTTP/1.1" 403 199 "-" "curl/8.4"
49.36.112.7 - - [14/Oct/2026:01:46:30 +0530] "GET /.env HTTP/1.1" 404 162 "-" "curl/8.4"
49.36.112.7 - - [14/Oct/2026:02:05:44 +0530] "POST /admin/login.php HTTP/1.1" 302 0 "-" "Mozilla/5.0"
```
Should show: red rows for SQL injection, Path traversal, Secret file probe, and "got a 302 reply on /admin/login.php".

### 3. Same student, two networks in 3 minutes
```
2026-10-15 10:00:00,21cs070,student,10.0.7.12,LOGIN,erp,success
2026-10-15 10:03:00,21cs070,student,103.21.58.9,LOGIN,erp,success
```
Should show: amber flag "logged in from 10.0.7.12 and 103.21.58.9 within 3 min".

### 4. Only a log deletion
```
2026-10-16 13:58:00,admin.it,admin,10.0.1.9,LOGIN,erp,success
2026-10-16 14:00:00,admin.it,admin,10.0.1.9,DELETE,audit_log,rows 1-900
```
Should show: red "audit_log deleted: possible evidence destruction".

### 5. Not a log at all
```
Raat ke do baje chaand akela tha
```
Should show: grey "Not a supported log", and "1 lines not understood" (kept, not dropped).

### 6. Hinglish case note (then pick हिंदी and Analyze)
```
# Case note: kal raat 2 baje marks change hue, kisne kiya?
2026-10-14 02:07:15,prof.verma,faculty,49.36.112.7,LOGIN,erp,success
2026-10-14 02:09:40,prof.verma,faculty,49.36.112.7,UPDATE,marks/21CS045/DBMS,42->92
```
Should show: case note at the top, marks jump flag, AI summary in Hindi.

## B. Tamper checks
1. Click sample "ERP marks tampering" → "Verify integrity" → green MATCH.
2. In the box change `42->92` to `42->93` → "Verify integrity" → red TAMPERED.
3. Open "Audit trail" → "Tamper test" → "CHAIN BROKEN at entry 1".
4. Upload any PDF or photo → evidence tag shows type + modified time → "Verify integrity" → choose the same file → MATCH; choose a different file → TAMPERED.
5. Prove the hash is standard: on a laptop terminal, `sha256sum public/samples/erp-marks-tamper.csv` gives `04a9205d…a2d`, the same as the evidence tag for the sample.

## C. Before you go on stage (5 minutes)
- [ ] Wi-Fi or phone hotspot working. Open the live URL once.
- [ ] Click "New case", then run sample 1 and "Analyze with AI" once (warms up the server).
- [ ] Recorded demo video and 4 screenshots open in another tab.
- [ ] Browser zoom 110-125% so judges can read; close other tabs.
- [ ] If AI shows the grey "Offline summary": say "AI is slow right now, this is the fallback from rules", click again once.

## D. Resources in this repo
| File | Use it for |
|---|---|
| Slide deck (7 slides, speaker notes, download as PPTX/PDF) | https://claude.ai/artifact/C3p7eQ1CCxardURKkz7Mu3 (private until you share it) |
| docs/PITCH.md | 3-minute script, 60-second version, slide outline, 15 judge questions, Hinglish cheat-sheet |
| docs/DEMO_SCRIPT.md | exact clicks for the live demo |
| docs/DEFENSE.md | how the code works, hardest questions, weak spots |
| docs/TESTSET.md | the 16 test cases and honest results |
| README.md | what judges read on GitHub |
| tests/eval.ts | run `node tests/eval.ts` to re-check all cases |
