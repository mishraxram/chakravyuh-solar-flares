---
name: polish
description: "Use after Gate B (all must-haves work) or when the user asks to make it look better. Polishes UI, states and copy without new features."
argument-hint: "[optional focus, for example: mobile layout]"
---
Focus: $ARGUMENTS
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
9. Anti AI-look pass: check every rule in .claude/rules/ui-quality.md and docs/DESIGN.md; fix the worst 3; remove one decorative element.
10. Run the build, then the demo path again. Commit: git commit -m "polish".

List what you changed in 8 lines or fewer, in simple Hinglish.
