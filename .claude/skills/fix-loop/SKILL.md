---
name: fix-loop
description: "Use when the user pastes an error, says something is broken (kaam nahi kar raha, error aa raha, toot gaya) or a build/test fails twice."
argument-hint: "[paste the error or describe what is wrong]"
---
Problem: $ARGUMENTS

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
