# PITCH — LogLens (SOLAR FLARES, HK26-0014)

Live: https://loglens-solarflares.pages.dev (QR on every page footer)

## 1. Three-minute script (simple English, short sentences)

**0:00-0:15 Hook**
"Imagine this. It is result week in our college. One morning, a student's DBMS marks have changed from 42 to 92. The professor says: I did not log in last night. Now the IT cell has thousands of log lines. And one big question: can we even trust these logs?"

**0:15-0:35 Solution**
"We built LogLens. You give it a log. It does three things. One: it builds a timeline and flags suspicious events, with a reason for each. Two: AI explains what happened, and every point cites an event number. Three: it locks the evidence with a SHA-256 hash, so any change is caught."

**0:35-2:05 Live demo** (see DEMO_SCRIPT.md for clicks)
- 0:35 Click **ERP marks tampering**. "Nineteen events, sorted by time. Red rows are high risk. Here: five failed logins in two minutes. Then a login from a new IP at 2:07 AM. Then marks 42 to 92. Then the audit log is deleted."
- 1:00 Click **Analyze with AI**. "Gemini gives a verdict: incident. Each point has event numbers, so the investigator can check it. This box is what AI found beyond our rules: the student tried first, failed, and then the professor's account was attacked from the same IP."
- 1:25 Choose **हिंदी**, click again. "Same analysis in Hindi, for a non-technical committee."
- 1:35 In the box, change 92 to 93. Click **Verify integrity**. "One character changed. The hash is completely different. TAMPERED."
- 1:50 Open **Audit trail**, click **Tamper test**. "Our own audit trail is hash-chained. Edit one old entry and the chain breaks at that entry."
- 2:00 Click **Download report**. "Everything in one report: hashes, flags, AI summary, audit trail."

**2:05-2:30 Tech and AI**
"It runs on Cloudflare. Ten rules are plain TypeScript, fast and explainable. Gemini runs on the server, with an 8-second limit and backup models. If AI fails, we show a rule-based summary, clearly marked not AI. We remove any AI point that cites an event that does not exist."

**2:30-2:50 Impact and next steps**
"This helps college IT cells, small company admins and cyber cells do the first hour of an investigation in minutes. We tested 14 cases we wrote: 14 out of 14 in three runs. Before our fixes it was 11. Next: more log formats, and storing hashes on a server so the trail cannot be wiped."

**2:50-3:00 Close**
"LogLens: find what happened, and prove the evidence was not changed. Scan the QR and try your own log. Thank you."

## 1b. Sixty-second opening (short version)
- **0-10s:** "A professor says: my account changed marks at 2 AM, but I was asleep." Screen: the ERP sample log in the box.
- **10-20s:** "NCRB recorded 65,893 cyber crime cases in India in 2022." (Source: NCRB data in a Government of India document on PIB: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/mar/doc2025318522301.pdf. News reports say the 2024 edition shows 1,01,928 cases. Check ncrb.gov.in before you say that number.)
- **20-40s:** Click sample, then Analyze, then change one digit and Verify. "Now scan the QR and paste your own log."
- **40-50s:** "We wrote 14 test cases. First run: 11 of 14. AI called normal logs high confidence, missed impossible travel, once answered English for Hindi. We fixed all three: now 14 of 14, three runs in a row."
- **50-60s:** "Rules find, AI explains, SHA-256 proves. Next: more log formats and a server copy of the hashes."

## 2. Slides (max 6)
1. **The 2 AM problem.** One line: "Marks changed at 2 AM. Who did it, and can we trust the logs?" Screenshot of the raw log.
2. **LogLens in one line + 3 icons-free steps:** Timeline flags, AI summary with event numbers, SHA-256 evidence lock.
3. **Live demo** (just the QR + URL, big).
4. **How it works:** browser (parse, rules, hash) → Pages Function → Gemini (only parsed lines). Fallback box: "AI down → rules summary".
5. **Honest testing:** table 11/14 → 14/14, three failures and their fixes.
6. **Next + team:** more log formats, server-side hash receipts, PDF reports. Team SOLAR FLARES, HK26-0014.

## 3. Likely judge questions (2-line answers)
1. **Why not an existing tool (Splunk, ELK, Autopsy)?** Those are powerful but heavy and costly to set up. LogLens is a browser tool for small IT cells: paste a log, get a timeline, an explanation and a hash proof in a minute.
2. **Is this real AI or just rules?** Rules do fast detection that you can explain. Gemini correlates events, writes the story, and shows patterns the rules did not state, in the "AI found beyond the rules" box.
3. **What if the AI is wrong?** Every AI point must cite event numbers. We drop points that cite events not in the log. The label says "AI generated, can be wrong". The verdict has a confidence level, and "unsure" tells the investigator what to collect next.
4. **What if Gemini is down?** 8-second limit, three backup models, then a rule-based summary clearly marked "Not AI generated". The demo still works.
5. **Where does the data come from?** The demo logs are made-up sample data we wrote, labelled "sample". Real use: export from the ERP audit table or `/var/log/auth.log`.
6. **Privacy?** Hashing happens in the browser. Only parsed event lines (max 200) go to Gemini, and the page says so. We do not store logs on our server.
7. **How does SHA-256 prove anything?** Any change, even one character, gives a totally different hash. The hash in our app matches the standard `sha256sum` command, so anyone can check it with any tool.
8. **Can someone edit your audit trail?** Each entry includes the hash of the previous one. Editing any entry breaks the chain, and we show where. Deleting the whole trail is still possible: our next step is a server copy of the hashes.
9. **How will it scale?** Parsing is in the browser: 5,000 lines in about 15 ms in our test. The AI gets at most 200 events, flagged ones first. Bigger setups would add server storage and streaming.
10. **How accurate is it?** On our 14 test cases: 14/14 in three runs, after we fixed three failures. It is a small set we wrote, so it shows stability, not real-world accuracy.
11. **What did AI do and what did you do?** We chose the problem, story, scope and the demo, and reviewed every result. Claude Code helped write the code, rules and test cases. Gemini does the analysis inside the app.
12. **Business or impact model?** Free tool for colleges and small offices. Possible paid version: saved cases, team sharing, server-side hash receipts.
13. **Is the report legal evidence?** No. It supports an investigation. A court process needs proper chain of custody; we say this in the report.
14. **Why Hindi?** Inquiry committees in colleges are often non-technical. A Hindi summary helps them understand the case.
15. **What formats work?** ERP audit CSV and Linux auth.log for timelines. Any file (PDF, image) can be hashed and verified.

## 4. Backup plan
- Record the demo screen twice now (90 seconds each, no editing). Keep both on the laptop and on a phone.
- Local run: `npm install` → `cp .env.example .dev.vars` (add key) → `npm run build && npx wrangler pages dev dist` → http://localhost:8788
- No internet at all: open the screenshots folder; AI part falls back to rules automatically if Gemini fails.
- Keep 4 screenshots: timeline with red rows, AI summary (English), TAMPERED, CHAIN BROKEN.

## 5. AI disclosure (also in README)
"Built with Claude Code (code, UI, rules and test cases, written under our direction and reviewed by us) and Google Gemini API (analysis inside the app). Problem choice, story, scope, demo design and testing decisions are ours."

## 6. Hinglish cheat-sheet (rehearse)
1. Hook: "Result week, marks 42 se 92, professor bole maine login nahi kiya."
2. Problem: "Hazaron log lines, aur sawaal: kya logs pe bharosa kar sakte hain?"
3. Solution: "Rules dhundhte hain, AI samjhata hai, SHA-256 prove karta hai."
4. Demo 1: "Sample dabao, red rows dikhao: 5 failed logins, 2:07 naya IP, 42 to 92, log delete."
5. Demo 2: "AI ka verdict incident, har point pe event number. Beyond the rules wala box dikhao."
6. Demo 3: "92 ko 93 karo, Verify: TAMPERED. Ek character, poora hash badal gaya."
7. Demo 4: "Audit trail kholo, Tamper test dabao: chain broken at entry 1."
8. AI galat ho to: "Event number se khud check karo, label clear hai, unsure pe next step batata hai."
9. Testing: "Pehle 11/14, teen fail theek kiye, ab 14/14 teen baar."
10. Close: "QR scan karo, apna log daal ke try karo. Thank you."
