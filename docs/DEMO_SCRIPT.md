# DEMO SCRIPT (3 minutes)

## Scene 1 — Problem (0:00-0:30)
- Judge sees: the tool page (input box + 3 "Try sample" buttons).
- Say: "Raat 2 baje college ERP mein kisi ne marks badal diye. Investigator ke paas hazaron log lines hain. Kaun, kab, kaise, aur kya logs ke saath chhed-chhaad hui? LogLens yehi answer karta hai."

## Scene 2 — Timeline + flags (0:30-1:15)
- Click: "Try sample: ERP marks tampering" -> "Build timeline".
- Judge sees: sorted timeline, red rows: failed logins burst, 02:07 login from new IP, marks UPDATE by student account, audit log cleared.
- Say: "Ye rules turant chalte hain, AI ke bina. Har red row ke saath reason hai."
- Data: `public/samples/erp-marks-tamper.csv` (sample).

## Scene 3 — AI summary (1:15-2:00)
- Click: "Analyze with AI" -> toggle "Hindi".
- Judge sees: summary, indicators with event numbers (#14, #15...), confidence, next steps, "AI generated" label.
- Say: "Sirf parsed lines Gemini ko jaati hain. AI galat ho sakta hai, isliye har claim event number se link hai, investigator khud check kar sakta hai."

## Scene 4 — Tamper proof (2:00-2:40)
- Judge sees: Evidence locker with SHA-256 hash + audit trail.
- Click: "Edit evidence" -> change one digit (marks 42 -> 92) -> "Verify".
- Judge sees: red "TAMPERED: hash mismatch", audit trail entry.
- Say: "Ek character badla aur hash poora badal gaya. Court ya committee ko proof chahiye to ye kaam aata hai."

## Scene 5 — Report + ask (2:40-3:00)
- Click: "Download report" -> open it.
- Say: "Report mein hashes, timeline, flags aur AI summary sab hai. Aap apna log bhi paste karke try kar sakte ho — QR code neeche hai."
