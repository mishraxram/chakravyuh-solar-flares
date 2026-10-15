---
name: defend
description: "Use when the user wants to prepare for judge questions, understand the code, or practise Q&A."
argument-hint: "[optional: what the judges seem to care about]"
---
Focus: $ARGUMENTS
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
