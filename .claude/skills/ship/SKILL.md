---
name: ship
description: "Use when the user asks to deploy, submit or ship, at Gate C (feature freeze), and before final submission."
argument-hint: "[Cloudflare project name]"
---
Project name for deploy: $ARGUMENTS
Read docs/PLAN.md and docs/DEMO_SCRIPT.md.

1. SECRETS SCAN: search tracked files for key-like strings (AIza, sk-, secret, token, password, private key) and check that .env is git-ignored. If anything leaks, stop and tell the user. Do not print the secret itself.
2. BUILD: npm run build (or flutter build). Fix errors with the /fix-loop method.
3. DEPLOY: npx wrangler pages deploy dist --project-name <name>. Show the live URL. If a login is needed, tell the user to run npx wrangler login and wait.
4. SMOKE TEST the live URL: fetch the home page, one API route if any, and walk the DEMO_SCRIPT path as far as possible without a browser. List what passed and what needs a human check.
5. README.md: problem, solution, features, screenshots placeholder, tech stack, how to run in 3 commands, team, AI usage (honest: what AI tools helped), limitations. Keep it short and true.
6. git add -A, git commit -m "ship", git tag demo-v1. If a GitHub remote exists, push the branch and the tag.
7. Output a final checklist: live URL, repo URL, backup plan (local run command, recorded video), things the user must check by hand.

Reply in simple Hinglish.
