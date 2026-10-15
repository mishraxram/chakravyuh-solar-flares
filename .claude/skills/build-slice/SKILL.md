---
name: build-slice
description: "Use to build the next must-have from docs/PLAN.md, one small verified slice at a time, with a commit after each."
argument-hint: "[slice name, for example: login-free upload page]"
---
Slice to build: $ARGUMENTS
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
