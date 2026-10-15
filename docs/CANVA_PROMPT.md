# Canva prompt — LogLens winning deck

## Step 1: screenshots upload karo
Canva mein **Uploads** pe jao aur `docs/screenshots/` folder ke saare 10 PNG upload karo:

| File | Kis slide pe |
|---|---|
| 01-home.png | Slide 4 (solution) ya cover ke peeche |
| 02-verdict-and-changes.png | Slide 6 (live demo) |
| 03-changes-made.png | Slide 7 (who changed what) |
| 04-timeline-flags.png | Slide 5 (rules find) |
| 05-ai-summary.png | Slide 5 (AI explains) |
| 06-evidence-tag.png | Slide 5 (SHA-256 proves) |
| 07-tampered-and-diff.png | Slide 8 (tamper + restore) |
| 08-restored-and-chain-broken.png | Slide 8 |
| 09-pdf-report.png | Slide 8 ya 9 |
| 10-mobile.png | Slide 6 (phone pe bhi chalta hai) |

## Step 2: ye prompt Canva AI / Magic Design mein paste karo

```
Create a 12-slide, 16:9 hackathon pitch deck for "LogLens", an AI-assisted digital forensics web app. Team SOLAR FLARES, registration HK26-0014, problem statement ABCS-02 (Domain 3: AI-Based Cybersecurity), CHAKRAVYUH 1.0 hackathon, BIET Lucknow.

STYLE: premium, calm, professional, like a forensic evidence lab report. Not a startup cliché. No purple gradients, no neon, no stock photos of hackers in hoodies, no glowing padlocks.
Colours (use only these): graphite #1B1F24 (dark backgrounds, headings), archival grey #E8EBE6 (light backgrounds), off-white #FBFBF8 (cards), evidence amber #E3A72F (highlights, key numbers), red #B42318 (risk, "unauthorized", "tampered"), green #1F7A4D (safe, "match").
Fonts: IBM Plex Sans Condensed Bold for headings, IBM Plex Sans for body, IBM Plex Mono for log lines and hashes.
Signature visual: an amber evidence tag (like a luggage tag with a punched hole and string) carrying a SHA-256 hash. Use it on the cover and the closing slide.
Layout: one idea per slide, big headings, lots of space, max 3 short bullets per slide. Put app screenshots in a clean browser-window frame with a soft shadow. Page number bottom-right on every slide except the cover.

SLIDES:
1. Cover (dark graphite). Title: "LogLens". Headline: "Find who changed what. Prove the log was not touched." Subtitle: "AI-assisted digital forensics for any ERP, server or website log". Bottom: "Team SOLAR FLARES · HK26-0014 · ABCS-02 · CHAKRAVYUH 1.0, BIET Lucknow". Amber evidence tag graphic on the right.
2. The problem (light). Title: "The 2 AM problem". Story: "Result week. A student's DBMS marks change from 42 to 92 overnight. The professor says: I did not log in last night." Show a dark code-style card with 4 log lines: "01:58 LOGIN_FAIL ×5", "02:07 LOGIN 49.36.112.7", "02:09 UPDATE marks 42 → 92" (red), "02:12 DELETE audit_log" (red). Footer: "NCRB recorded 65,893 cyber crime cases in India in 2022 (Government of India data on PIB)".
3. Why it is hard today (light). Two columns. Left "Today" (grey): "Scroll thousands of lines by hand", "Guess which change was fake", "No proof the log itself was not edited". Right "With LogLens" (dark): "One click: timeline with red flags and reasons", "Every change: who, when, IP, before → after", "SHA-256 proof, changed lines shown, original restored".
4. The solution (light). Title: "Three steps, one log". Three cards with coloured top borders: red "1. Rules find" (13 explainable rules flag suspicious events with a reason), amber "2. AI explains" (Gemini gives a verdict and cites an event number for every point; English or Hindi), green "3. SHA-256 proves" (the log is sealed; one changed character shows TAMPERED). Place screenshot 01-home.png below or beside.
5. Inside each step (light). Three screenshots side by side with captions: 04-timeline-flags.png "Red flags with reasons", 05-ai-summary.png "AI verdict with cited events", 06-evidence-tag.png "Evidence sealed with SHA-256".
6. Live demo (dark). Title: "Live demo". Five numbered steps: "Open the sample ERP marks tampering", "Read Changes made: who, when, before → after", "Analyze with AI, then switch to Hindi", "Change 92 to 93, Verify, then Restore original", "Save the report as PDF". Show screenshot 02-verdict-and-changes.png large, and 10-mobile.png as a phone mock-up. Big text: "loglens-solarflares.pages.dev" and a placeholder box labelled "QR code".
7. Who changed what (light). Title: "Who changed what, and can we get it back?". Use screenshot 03-changes-made.png. Add a small table: 13 Oct 09:20 | prof.verma, 10.0.4.21 | DBMS marks | 38 → 42 | Looks normal (green); 14 Oct 01:55 | 21cs045 student | DBMS marks | denied | Blocked attempt; 14 Oct 02:09 | prof.verma, 49.36.112.7 | DBMS marks | 42 → 92 | Unauthorized (red); 14 Oct 02:12 | prof.verma, 49.36.112.7 | audit_log | rows deleted | Unauthorized (red). Note: "Unauthorized because the login came right after 5 failed passwords from a new IP."
8. Tamper proof (dark). Title: "One character changed. Caught, shown, restored." Screenshots 07-tampered-and-diff.png and 08-restored-and-chain-broken.png side by side. Three short points: "SHA-256 hash changes completely", "Changed line shown: before vs after", "Audit trail is hash-chained: editing history breaks the chain". Small image of 09-pdf-report.png labelled "Full report saves as PDF".
9. How it works (light). Flow diagram with arrows: "Browser: reads the log, runs 13 rules, makes the SHA-256 seal. Raw files stay on the device" → "Cloudflare server: keeps the secret key, 8-second limit, 3 backup AI models, removes AI points that cite fake events" → "Google Gemini: gets only parsed event lines (max 200), returns verdict and next steps". Highlighted note: "If the AI is slow or down, the app still works with a rules-based summary marked Not AI generated." Footer: "Astro + TypeScript · Cloudflare Pages · Gemini API · Web Crypto".
10. Honest testing (light). Title: "We tested it, and we show the failures". Three big number cards: "11/14 — first run, before fixes" (grey), "14/14 — after fixes, 3 runs" (green), "16, 16, 15 — 16 cases incl. web logs, 3 runs" (amber on dark). Below: "What failed and what we fixed: AI said high for a normal log → split verdict and confidence; missed impossible travel → new rule; Hindi asked, English came → server retries; one Hindi answer took over 8 s → offline summary shown." Footer: "16 test logs we wrote ourselves. Shows a stable demo path, not accuracy on all real logs."
11. Impact and next (dark). Left "Who it helps": "College registrars and IT cells, office admins, banks and shops, cyber cells: anyone who must find who changed data, and prove it." Right "Next": "Windows event and firewall logs", "Server copy of hashes so history cannot be wiped", "Testing on public log datasets".
12. Close (dark). Big line: "Rules find. AI explains. SHA-256 proves." Evidence tag graphic. "Scan and try your own log" with QR placeholder and "loglens-solarflares.pages.dev". "Thank you · Team SOLAR FLARES · HK26-0014". Small footer: "Built with Claude Code (code, under our direction) and Google Gemini (analysis in the app)."

RULES: Use only the facts written above. Do not invent statistics, user numbers, testimonials, awards, prices or partner logos. Do not write "100% accurate", "unhackable" or "legally valid". All logs shown are made-up sample data.
```

## Step 3: Canva ke baad ye check karo
- **QR code:** Canva mein **Apps → QR Code** kholo, `https://loglens-solarflares.pages.dev` daalo, aur slide 6 aur 12 ke placeholder pe rakh do.
- **Screenshots:** Canva khud images nahi lagata, to har slide pe upar wali table ke hisaab se upload ki hui image khud drag karo. Ek baar zoom karke dekh lo ki text padha ja raha hai.
- **Numbers:** sirf yahi rakho: 65,893 (NCRB 2022), 11/14, 14/14, 16/16/15, 13 rules, 8 second, 200 events. Canva koi naya number jode to hata do.
- **Font:** Canva mein IBM Plex na mile to headings ke liye "Oswald" ya "Archivo Narrow", aur body ke liye "Inter" ya "Open Sans" le lo.
