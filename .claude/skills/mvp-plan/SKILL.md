---
name: mvp-plan
description: "Use when the user picks a concept (go A, go B, go C, ye wala, isi pe chalo) after ps-decode. Writes PLAN.md with 3 must-haves, DEMO_SCRIPT.md and gates."
argument-hint: "[go A or go B or go C, plus any change]"
---
Input from the user: $ARGUMENTS
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
5. docs/TESTSET.md: 10-20 realistic test inputs (include tricky and Hindi/Hinglish ones) with the expected result. Mark which ones become the 3 "Try sample" buttons.
6. In PLAN.md add a FAILURE PATH line: what the app shows when the AI is unsure, wrong, slow or down.

Rules: the demo must contain at least one really working integration, not only mock screens. If the plan needs more than 3 must-haves to make sense, cut scope, do not add.
End by asking the user for "go". Reply in simple Hinglish, under 50 lines.
