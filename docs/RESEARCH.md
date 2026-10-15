# RESEARCH (v2, 2026-10-16)

## Event (verified 2026-10-16 from the event site + Unstop page)
- **अvinya '26 Hackathon 4.0**, Dept. of CSE (AIML), BIET Lucknow. Offline at BIET. Sources: https://github.com/virtual-atharvv/Avinya26 (index.html), https://unstop.com/p/avinya26-bansal-institute-of-engineering-and-technology-1764266
- **Round 1: Idea Submission & Shortlisting, deadline 18 Oct 2026, 12:00 PM IST** ("Teams are required to submit their innovative project ideas for evaluation"). Submission format is not stated on the page.
- Event schedule (tentative): Day 1, 22 Oct 10:00 "Hackathon Kick-off, 6-hour sprint begins". Day 2, **23 Oct 09:30 "Hackathon: Submission & Judging, prototype demos"**.
- Domains include Cybersecurity and AI/ML. Team size 1-6 (the description says "up to 5"). Registration fee 149.
- Key guidelines (quoted): "Work on the official problem statements/domains provided by the organizers." "Submissions must demonstrate original work and meaningful contribution by the participants." "AI-assisted development tools may be used subject to the hackathon guidelines." "Teams must be able to explain their solution, technology stack, implementation, and prototype during evaluation."
- **Evaluation (quoted, no weights given):** "Innovation, Problem Relevance, Technical Implementation, Prototype Quality, Feasibility, Impact, and Presentation." We treat these as equal weight (1/7 each) until told otherwise.
- **Open risk:** a "6-hour sprint" on 22 Oct suggests on-site building. It is not stated whether a project built before the event may be shown. Ask the organizers (WhatsApp community) before relying on it.

## Comparable projects / sources
1. **SANS "Find Evil!" AI forensics hackathon 2026**, winner "Mulder" (autonomous forensic investigator: plan, run tools, analyze, *challenge its own conclusions*, report). 90 incident responders judged on **accuracy, safeguards, audit trails, and the agent's ability to recognize and correct its own errors**. 123 of 291 entries met the technical and documentation bar. Sources: [GovInfoSecurity](https://www.govinfosecurity.com/cyber-novice-takes-top-prize-in-sans-ai-forensics-contest-a-32662), [SANS](https://www.sans.org/go/find-evil-hackathon-winners)
2. **"Ensemble"** (Find Evil entry, placement not confirmed): runs the investigation on local LLMs so evidence stays in-house. Shows that judges care where evidence goes. Source: LinkedIn post (unconfirmed).
3. **NFSU team, SIH 2023 winner (SIH1389)**: centralized log collection for the power sector (CEA 2021 guidelines). Log analysis is a recognized problem space in Indian hackathons. Source: [nfsu.ac.in](https://nfsu.ac.in/details/194)
4. **IJICS paper (Jul 2026), web Digital Evidence Integrity System** with SHA-256 + audit trail. It caught only 4 of 9 manipulation attempts, and the authors state that hashing **is not enough if the attacker also controls the hash or the log**. Source: [garuda / IJICS](https://garuda.kemdiktisaintek.go.id/documents/detail/6522251)
5. **LogDefend.AI (Devfolio)**: website log analysis with AI. Shows that "upload log, get AI summary" is a common pattern. Source: [devfolio](https://devfolio.co/projects/logdefendai-c686)
6. General rubrics (UofTHacks: 35% technical, 25% idea, 10% "does it work", 10% pitch; others: difficulty and cleverness, live demo functionality and responsiveness). Sources: [LexisNexis](https://hackathon.lexisnexis.com/fall2019/scoringcriteria.html), [SWECC](https://swecc.notion.site/Judging-Criteria-eabbc4b4287d43e5a2b41887f859814b)

## What judges reward
- A live demo that works and responds fast. A simple project that works beats an ambitious one that breaks.
- Verifiable output: every AI claim traceable to evidence, plus safeguards and an audit trail.
- AI that checks itself instead of being trusted blindly.
- Real technical depth beyond one LLM call.

## What is saturated
- "Upload a log, get an AI summary" chatbots (LogDefend-style).
- SHA-256 hash shown on screen. Common, and it proves nothing if the attacker can re-hash.

## What v1 lacks against this
1. **Integrity has no anchor.** The SHA-256 and the hash-chained audit trail live in the browser's localStorage. An insider who edits the log can recompute every hash, and nothing outside their control proves the original (src/lib/evidence.ts). This is exactly the weakness the IJICS paper names.
2. **The AI is not challenged.** The rules and the AI run side by side, but nothing flags a case where they disagree (e.g. the AI says "normal" while high-risk rules fired).
3. **No standard vocabulary.** Flags are custom names, not mapped to MITRE ATT&CK, so a security judge cannot place them.
4. **Performance 83 on mobile** (render-blocking CSS + Google Fonts, LCP 4.9 s). Missing robots.txt, sitemap.xml, about/privacy pages, and dark mode.
5. **No rate limiting** on /api/analyze (anyone can burn the Gemini quota during the demo).

## Our ONE differentiator (decided)
**"Evidence you don't have to trust us on."** On lock, the server issues a **signed evidence receipt** (Ed25519 signature over hash + time + size). The public key is on the page, so anyone can verify the receipt, even offline, and an insider who edits the log and re-hashes it cannot forge the signature. On top of that, an **AI cross-check** flags every place where the AI and the deterministic rules disagree.
Why: it directly answers the top Find Evil criteria (safeguards, self-correction, audit) and the published hashing weakness. It builds on v1's strongest part (integrity) instead of adding another chatbot.

## Rubric used for ranking
The 7 official criteria above, equal weight (no weights published).
