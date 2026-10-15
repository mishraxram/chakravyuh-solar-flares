# Hackathon mission: CHAKRAVYUH 1.0 (8-hour build)

User: Sagar, B.Tech CSE student, beginner-to-intermediate coder, speaks Hinglish.
- Talk to him in simple, short Hinglish. Files, code and commit messages stay in English.
- Explain code in plain words so he can defend it in front of judges.

Priority order: 1) a working live demo  2) the 3 must-have features  3) polish. Nothing else matters.

## How to work
- When a session starts or resumes, read docs/STATE.md, docs/PLAN.md and docs/PROBLEM.md first (if they exist).
- Scope is frozen by docs/PLAN.md. New ideas go to docs/BACKLOG.md. Build them only if the user says "swap".
- Work in vertical slices: the smallest end-to-end thing the user can see in the browser. About 15 minutes per slice.
- Before touching more than 3 files or changing architecture: write a 5-line plan and wait for "go".
- Prove it works: run the build, tests or dev server and read the real output. Never say "done" without evidence.
- After every green slice: git add -A, git commit -m "<slice name>", and show the commit hash.
- After EVERY git commit, also run `git push origin main`. Never use force push.
- Prefer boring, readable code with short plain-English comments.
- No fake data presented as real. Sample data must be labelled "sample". No invented metrics, testimonials or API responses.
- Never hardcode keys. Secrets live only in .env (git-ignored) or Cloudflare secrets. Never print or commit them.

## Safety
- Do not delete files. Move unwanted files to _trash/ instead.
- Destructive git commands (reset --hard, clean, force push) and disk tools are denied in settings. Do not try to work around them.
- Stay inside this project folder.

## Default stack (unless the problem statement forces another)
- Web: Astro (multi-page) + Tailwind + small vanilla TypeScript. No React, Next.js or WordPress.
- Backend: Cloudflare Pages Functions in functions/. Storage: KV or D1 only if truly needed, else JSON files.
- AI features: Gemini API or Cloudflare Workers AI, called server-side, with a friendly fallback message if the call fails.
- Mobile: Flutter, only if the problem statement demands an app.
- Deploy: Cloudflare Pages with wrangler, as early as possible (hello-world deploy first).

## Hackathon defaults (v4, from judge research)
- No login/auth, no database setup. localStorage + JSON files are enough unless the problem statement forces more.
- The first screen IS the tool (input -> result). No marketing hero, no feature-card grid.
- Every AI feature: a real API call + a labelled fallback ("Sample result (offline)") if it fails or times out (8s), and an "unsure" path that tells the user what to do next.
- 3 "Try sample" buttons with realistic Indian inputs (one normal, one tricky edge case, one in Hindi/Hinglish). The judge must also be able to type their own input.
- A small test set in docs/TESTSET.md (10-20 real-looking cases with expected result). Report honestly how many pass and which fail.
- Never write claims we cannot prove: no "100% private", "100% accurate", "verified by TRAI/RBI", "legally valid", no invented stats. If text goes to an AI API, say so.
- Mobile-first; show a QR code of the live URL on the page footer or result screen.

## Design (avoid the "AI-made" look) - details in .claude/rules/ui-quality.md
- Before the first UI work, write docs/DESIGN.md: one design direction in 2 lines, 4-6 named hex colours with meaning, one font pair, one signature element. Then follow it everywhere.
- For the main screen, use the frontend-design skill if it is available. Do not use it for every small change (it uses more quota).

## Quota hygiene (Claude Pro)
- Default model sonnet. Suggest the user runs /clear after each finished slice (state lives in docs/STATE.md, so nothing is lost).
- Max 4 web searches per step. Never paste whole files or long logs into the chat; read by path and quote only the relevant 20-30 lines.
- If the same bug survives 2 fix attempts, stop, write what was tried into STATE.md and suggest /clear + a fresh attempt.

## Definition of done
- Runs from a clean clone in 3 commands.
- Live URL or recorded demo video, README (problem, solution, how to run, tech, team, AI usage), and a demo that follows docs/DEMO_SCRIPT.md in 3 minutes.

## Autopilot (the user will NOT type slash commands)
The user just talks. Decide the next step yourself from what he says and from docs/STATE.md, and use the matching skill automatically:
- He pastes a problem statement or theme -> first ask once "T+0 (start) time kya hai?" if unknown, record it in docs/STATE.md, then run ps-decode. Sonnet is fine for this step; do not ask him to switch models.
- He picks a concept ("go A", "B wala", "isi pe chalo") -> mvp-plan, then ask ONE question: "Plan theek hai? go bolo".
- He says go / haan / start -> scaffold, then build-slice for each must-have in order, one after another. After each slice: commit, update STATE.md, tell him in 3 lines what to check in the browser, then continue unless he says stop.
- He pastes an error or says something is broken -> fix-loop.
- When all must-haves work (Gate B) -> eval-set, then judge-me, apply the top 2 fixes, then polish.
- He asks about accuracy / testing / "kitna sahi hai" -> eval-set.
- At Gate C or when he says ship / deploy / submit -> ship.
- He asks for pitch / PPT / script -> pitch. He asks to prepare for questions -> defend.
- He says limit / quota / slow / naya session, or the context is very long -> handoff.
- He says "status" -> show the gate table from STATE.md, time used vs remaining, and the next 3 actions.

Time keeping: check the current time with a shell command at the start of each step. Gates: A at T+2:00 (live hello-world), B at T+4:00 (full demo path works), C at T+5:30 (feature freeze), submit by T+7:30. If a gate is at risk, say it clearly and propose what to cut.

Only stop and ask him at these points: concept choice, plan approval, anything needing his keys or logins (API key in .env, npx wrangler login), deploy project name, and anything risky. Everything else, keep moving.
Slash commands (/ps-decode etc.) still work if he types them.

---

# Upgrade pass (added 2026-10-16, from claude-code-bootstrap.md). Rules above still win.

## Project block
- NAME: LogLens (team SOLAR FLARES, HK26-0014)
- PROBLEM + TARGET USER: ABCS-02 AI-Assisted Digital Forensics. College IT / cyber cell investigators who need a log timeline, AI summary and SHA-256 evidence proof. See docs/PROBLEM.md.
- HACKATHON + THEME: अvinya '26 Hackathon 4.0, Dept. of CSE (AIML), BIET Lucknow (v1 was built for CHAKRAVYUH 1.0). Domain: Cybersecurity / AI-ML. Details in docs/RESEARCH.md.
- JUDGING CRITERIA (official, no weights): Innovation, Problem Relevance, Technical Implementation, Prototype Quality, Feasibility, Impact, Presentation.
- CONSTRAINTS: Round 1 idea submission by 18 Oct 2026 12:00 IST. Team 1-5. Must explain stack and implementation. Original work.
- DEMO DATE: kick-off 22 Oct 2026 10:00, judging 23 Oct 2026 09:30. Feature freeze 20 Oct 23:59.

## Upgrade-pass rules (from the user)
- Work on branch `upgrade` (safety tag `pre-upgrade-v1`). Push the branch after each commit. Merge to main only after the live URL is verified.
- Deploy stays on Cloudflare Pages (no Workers migration). Branch builds go to the Pages preview (`--branch upgrade`); production only after merge.
- After every change run `node tests/eval.ts`. If any case fails, revert that change.
- Measure Lighthouse on the live URL, report before and after.
- Only gaps, polish, hardening and demo reliability. No new major features.

## Stack note
- Bootstrap asked for Astro on Cloudflare Workers. We keep Cloudflare Pages + Pages Functions (see docs/DECISIONS.md). Every live feature has an offline fallback.

## Extra rules (anti-hallucination)
1. Verify every library, API, flag and CLI command by docs or by running it. If unverified, mark UNVERIFIED and do not ship it.
2. No fake stats, testimonials, benchmarks, user counts or awards. Demo data is labelled "sample data".
3. Never claim something works without showing the command output.
4. No marketing language in reports: what was built, how to verify, what is risky.
5. Secrets only via `wrangler pages secret`. Never commit .env or .dev.vars.

## Extra definition of done
- Lighthouse >= 90 on performance, accessibility, best practices, SEO (live URL, mobile).
- Zero console errors on the main flow. Build passes clean.
- Main flow under 60 seconds for a first-time user.
- Works with the network off for AI via the rule-based fallback.
- Every feature maps to at least one judging criterion (or PS solution point until criteria arrive).
