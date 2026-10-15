---
name: scaffold
description: "Use right after the plan is approved (user says go, haan, start karo) and no app code exists yet. Creates the project skeleton and a live hello-world deploy."
argument-hint: "[project name, optional]"
---
Input: $ARGUMENTS
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
