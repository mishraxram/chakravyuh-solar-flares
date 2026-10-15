---
name: eval-set
description: "Use automatically at Gate B (all must-haves work), or when the user asks about accuracy, testing, or how often the app is right. Runs the test set and records honest results."
argument-hint: "[optional: number of cases]"
---
Read docs/TESTSET.md (create it with 15 realistic cases if missing: normal, tricky edge cases, Hindi/Hinglish).

1. Run every case through the real app logic (call the API route locally with a small script, or the function directly). Do not fake results.
2. Record in docs/TESTSET.md a table: case, expected, got, pass/fail, one-line reason for each failure.
3. Write the honest summary line at the top, e.g. "14/18 correct. Fails on: very short messages, mixed-script Hindi."
4. If a failure is cheap to fix (prompt wording, one rule), propose it; fix only after the user says "fix".
5. Commit: git commit -m "test set results".

Tell the user in Hinglish, under 15 lines: the score, the 2 most interesting failures, and the exact line to say to judges.
