---
name: handoff
description: "Use when the session is long, the usage limit is near, the user says limit/quota/naya session, or before switching tools."
---
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
