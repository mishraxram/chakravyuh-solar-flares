# PROMPTS (fallback for chat or Antigravity when Claude Code is unavailable)

Paste one block at a time into any AI chat. Replace [PASTE HERE] with your input.

## ps-decode

```text
Input: the problem statement and theme the user gave (in the conversation or here: [PASTE HERE]).

You are the war-room: a senior product strategist, a judge who has judged 100+ student hackathons in India, and a pragmatic full-stack architect. Event: CHAKRAVYUH 1.0, BIET Lucknow, 8-hour build, about 50-60 teams. The full demo path must work by hour 4. Do NOT write code in this step.

STEP 1 DECODE: restate in 2 lines (who suffers, what hurts, what the solution MUST do). List explicit, implicit and hidden judging criteria, tagged HIGH / MEDIUM / SPECULATIVE. Predict the 3 most common ideas other teams will build (the crowd answer). We must not look like them.

STEP 2 RESEARCH (web search, max 6 searches): existing solutions or government initiatives in India and what they lack; 2-3 credible facts proving the problem, each with a source link (never invent numbers); free APIs, datasets or models usable today without approval.

STEP 3 CONCEPTS: generate 5, keep the best 3 (A safest, B balanced, C boldest). For each: one-line pitch, user, why it is not the crowd answer, the 20-second wow moment, the one REAL working part (real AI call, real data or real detection), tech on our stack, main risk, honest build hours for a beginner with Claude Code, India angle if natural.

STEP 4 SCORE (1-5): Demo-ability x3, Buildable in 4 hours x3, Differentiation x2, Theme fit x2, Impact x1, Explainable by a beginner x1. Weighted totals. Penalize SMS, bank APIs, hardware, official WhatsApp API, or data we cannot get today.

STEP 5 RECOMMEND ONE: why it beats 50-60 teams (3 bullets), 3 must-haves, 2 only-if-time features, kill criteria for hour 2:30, and a 6-beat demo story (hook, sourced problem proof, live demo, the real tech, impact, close).

STEP 6 JUDGE QUESTION BANK: 20 hardest questions grouped as Problem, Solution, Tech, AI, Security/Privacy, Scale/Business, Did-you-build-this, each with a 2-line honest answer. Save to docs/JUDGE_QA.md.

STEP 7 RISKS: top 5 build-day risks with fallbacks.

Save everything else to docs/PROBLEM.md. In chat show only: recommended concept, score table, 3 must-haves, up to 3 questions for the mentor. Under 60 lines, simple Hinglish. End with: Reply "go A", "go B", "go C" or "swap: <idea>".
Never invent statistics, users or results. Prefer the idea a beginner can demo flawlessly over the most impressive-sounding one.
```

## mvp-plan

```text
Input from the user: [PASTE HERE]
Read docs/PROBLEM.md first. Use the concept the user chose.

Create these files:

1. docs/PLAN.md
   - One-sentence product description.
   - MUST-HAVES: exactly 3 features, each with a one-line acceptance check ("user can ... and sees ...").
   - PARKED: nice-to-haves (do not build).
   - Architecture in at most 8 lines (pages, API routes, data, AI call, deploy target).
   - Data and API plan: what is real, what is sample data (labelled sample), what needs a key.
   - Timeline with gates, T = start of the build window:
     Gate A at T+2:00, hello-world deployed live.
     Gate B at T+4:00, the full demo path works end to end.
     Gate C at T+5:30, feature freeze, polish only.
     T+7:00 submission ready, T+7:30 submit with a 30-minute buffer.
   - Top 5 risks, each with a fallback.
2. docs/DEMO_SCRIPT.md: a 3-minute demo, scene by scene. For each scene: what the judge sees, the exact click path, the words to say, and the sample data needed.
3. docs/STATE.md: status table (Gate A, B, C), "done", "doing", "next 3 actions".
4. docs/BACKLOG.md with the parked ideas.

Rules: the demo must contain at least one really working integration, not only mock screens. If the plan needs more than 3 must-haves to make sense, cut scope, do not add.
End by asking the user for "go". Reply in simple Hinglish, under 50 lines.
```

## scaffold

```text
Input: [PASTE HERE]
Read docs/PLAN.md and CLAUDE.md.

1. Pick the stack from CLAUDE.md unless PLAN.md says otherwise. Say the choice in one line.
2. Create the project in the current folder (do not create a nested folder if the folder already has CLAUDE.md).
   - Astro: npm create astro@latest . (minimal template), add Tailwind.
   - Flutter: flutter create . if an app is needed.
3. Make sure .gitignore and .env.example exist. Never create a real .env with keys. Tell the user which keys they must add by hand.
4. Create a basic layout, a home page that shows the product name and one-line pitch, a custom 404 page, and a README skeleton (problem, solution, how to run, tech, team, AI usage).
5. Run the build and the dev server. Show the local URL and confirm the home page loads.
6. Deploy hello-world to Cloudflare Pages (ask for the project name once). Show the live URL. If login is needed, tell the user exactly what to run (npx wrangler login) and wait.
7. git add -A and git commit -m "scaffold". Update docs/STATE.md (Gate A status).

Reply in simple Hinglish. If something fails, use the /fix-loop method.
```

## build-slice

```text
Slice to build: [PASTE HERE]
Read docs/STATE.md and docs/PLAN.md.

1. State the slice and its acceptance check in 2 lines. It must be visible in the browser or terminal.
2. If it touches more than 3 files or needs a new service or key, give a 5-line plan and wait for "go".
3. Implement the smallest version that passes the acceptance check. No extra features.
4. Verify with real output: run the build, run the dev server, open or fetch the page, run any test. Quote the evidence in one or two lines.
5. If it fails, fix and retry. Maximum 3 iterations. After that stop, explain what is wrong in simple words and propose options (see /fix-loop).
6. When green: git add -A, git commit -m "<slice name>", show the hash.
7. Update docs/STATE.md (done, next 3 actions).
8. Tell the user in Hinglish what to click to see it, and what the next slice should be.

Never write fake data and call it real. Keep code readable.
```

## fix-loop

```text
Problem: [PASTE HERE]

Loop. Do not skip steps.
1. REPRODUCE: run the command or open the page that fails. Read the full error, not only the last line.
2. HYPOTHESES: list the 2 most likely causes, most likely first, with one line of evidence each.
3. MINIMAL FIX for the first cause. Change as little as possible. Do not rewrite whole files.
4. VERIFY: run the same command again and show the result.
5. If still broken, try the second cause.
6. After 2 failed attempts, STOP and give the user three options with time estimates:
   a) switch approach (describe it),
   b) go back to the last good commit for the affected files only,
   c) cut the feature and use the fallback from docs/PLAN.md.
   Recommend one. If the cause looks like model limits or a very long chat, suggest /model opus for one hard task, or /clear and /handoff.
7. Once fixed: commit with message "fix: <what>" and add one line to docs/STATE.md.

Explain the cause in simple Hinglish in 3 lines so the user learns it.
```

## polish

```text
Focus: [PASTE HERE]
Rule: no new features. Only make the existing demo path look and feel finished.

Checklist, fix what is missing:
1. Run the demo path from docs/DEMO_SCRIPT.md step by step and note every rough spot.
2. States: empty, loading, error and success on every screen the demo touches.
3. Mobile layout at 360px and desktop. Text readable, contrast strong, buttons large.
4. Copy: clear headings, no lorem ipsum, no jargon, correct spelling, product name consistent.
5. Page title, meta description, favicon, social preview basics.
6. Remove dead code, console logs, unused files (move to _trash/).
7. Sample data is labelled as sample. Numbers shown in the UI are real or clearly marked.
8. Speed: no giant images, no needless libraries.
9. Run the build, then the demo path again. Commit: git commit -m "polish".

List what you changed in 8 lines or fewer, in simple Hinglish.
```

## ship

```text
Project name for deploy: [PASTE HERE]
Read docs/PLAN.md and docs/DEMO_SCRIPT.md.

1. SECRETS SCAN: search tracked files for key-like strings (AIza, sk-, secret, token, password, private key) and check that .env is git-ignored. If anything leaks, stop and tell the user. Do not print the secret itself.
2. BUILD: npm run build (or flutter build). Fix errors with the /fix-loop method.
3. DEPLOY: npx wrangler pages deploy dist --project-name <name>. Show the live URL. If a login is needed, tell the user to run npx wrangler login and wait.
4. SMOKE TEST the live URL: fetch the home page, one API route if any, and walk the DEMO_SCRIPT path as far as possible without a browser. List what passed and what needs a human check.
5. README.md: problem, solution, features, screenshots placeholder, tech stack, how to run in 3 commands, team, AI usage (honest: what AI tools helped), limitations. Keep it short and true.
6. git add -A, git commit -m "ship", git tag demo-v1. If a GitHub remote exists, push the branch and the tag.
7. Output a final checklist: live URL, repo URL, backup plan (local run command, recorded video), things the user must check by hand.

Reply in simple Hinglish.
```

## judge-me

```text
Rubric hint from the user (may be empty): [PASTE HERE]
Read docs/PROBLEM.md, docs/PLAN.md, docs/DEMO_SCRIPT.md, README.md and the code. Open the live URL if one exists.

Act as three judges: a technical judge, a product and impact judge, and a demo and storytelling judge.
If no rubric was given, use this typical one (it is a common pattern, not BIET's official rubric): Innovation 20, Technical depth 20, Impact and relevance 20, Demo quality 20, Completeness 10, Presentation 10.

Output:
1. Score table per judge and criterion with a one-line reason.
2. The 3 things a judge will attack first.
3. Top 5 fixes ranked by (score gain) divided by (minutes needed), each with a time estimate.
4. One sentence: "If you only have 30 minutes, do this."

Do not change code unless the user replies "apply 1,2". Reply in simple Hinglish, under 50 lines.
```

## pitch

```text
Input: [PASTE HERE]
Read docs/PROBLEM.md, docs/PLAN.md, docs/DEMO_SCRIPT.md, README.md.

Create docs/PITCH.md with:
1. A 3-minute spoken script in simple English with short sentences (easy to say in an Indian accent), with timing marks:
   hook 0:00-0:15 (a real human problem, not a statistic you cannot source), solution 0:15-0:35, live demo 0:35-2:05 (exact words and clicks from DEMO_SCRIPT), tech and AI 2:05-2:30, impact and next steps 2:30-2:50, close 2:50-3:00.
2. Slide outline: at most 6 slides, one idea each, what goes on the slide.
3. 15 likely judge questions with 2-line answers. Include: why not an existing solution, how will it scale, where does the data come from, what did AI do versus what you did, what is the business or impact model, what happens when the AI is wrong, privacy and safety.
4. Backup plan: record the demo screen twice (90 seconds, no editing), keep a local run command, keep screenshots.
5. One honest line about AI use that the team can say out loud, for example "We used Claude Code as a coding assistant; we designed the idea, chose the scope and can explain every part."
6. A Hinglish cheat-sheet (10 lines) so the speaker can rehearse naturally.

Never invent numbers or user testimonials. Reply in simple Hinglish with the file name.
```

## defend

```text
Focus: [PASTE HERE]
Read the repo.

Part 1. Create docs/DEFENSE.md:
- Architecture in 5 plain-language bullets.
- File map: each important file and what it does in one line.
- The main demo path as numbered steps: what the user clicks, which file handles it, what data moves.
- 10 hardest questions about the code and design, with honest short answers.
- 5 weak spots, with an honest answer for each ("this is a limitation, next we would ...").

Part 2. Explain-back drill:
- Ask the user ONE question at a time from the list above. Wait for his answer.
- Grade it: correct, partly correct, or wrong. Correct him in 2 lines in simple Hinglish.
- After 10 questions, show a score and the 3 topics to revise.

Rules: never write code in this step. Never help hide that AI tools were used. The goal is that Sagar truly understands his project.
```

## handoff

```text
Write docs/STATE.md (maximum 60 lines) with:
- Product in one line, chosen concept, live URL, repo status, last commit hash.
- Gate status: A, B, C (done, doing or late).
- Done: bullet list. Broken or risky: bullet list with the exact error if any.
- Next 3 actions in order.
- How to run locally (exact commands) and where secrets live (names only, never values).
- Files that matter and what each does (max 10 lines).

Then git add -A and git commit -m "handoff".

Finally print a RESUME PROMPT in a code block that the user can paste into a new Claude Code session, or into claude.ai chat or Antigravity if Claude Code is out of quota. It must say: read CLAUDE.md, docs/STATE.md, docs/PLAN.md; continue with the first next action; follow the same rules.
Tell the user in Hinglish when the usage window resets if known (/usage shows it).
```
