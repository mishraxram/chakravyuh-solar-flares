---
name: pitch
description: "Use when the user asks for the pitch, PPT, slides, presentation script or demo script for judges."
argument-hint: "[team name and anything special to mention]"
---
Input: $ARGUMENTS
Read docs/PROBLEM.md, docs/PLAN.md, docs/DEMO_SCRIPT.md, README.md.

Create docs/PITCH.md with:
1. A 3-minute spoken script in simple English with short sentences (easy to say in an Indian accent), with timing marks:
   hook 0:00-0:15 (a real human problem, not a statistic you cannot source), solution 0:15-0:35, live demo 0:35-2:05 (exact words and clicks from DEMO_SCRIPT), tech and AI 2:05-2:30, impact and next steps 2:30-2:50, close 2:50-3:00.
1b. A 60-second opening: 0-10s a real person and the real input on screen; 10-20s one sourced number (official source only, with the link in the notes); 20-40s live demo, then the judge tries their own input via QR; 40-50s test-set result including failures ("17/20 right, these 3 failed because..."); 50-60s honest tech line + next step.
2. Slide outline: at most 6 slides, one idea each, what goes on the slide.
3. 15 likely judge questions with 2-line answers. Include: why not an existing solution, how will it scale, where does the data come from, what did AI do versus what you did, what is the business or impact model, what happens when the AI is wrong, privacy and safety.
4. Backup plan: record the demo screen twice (90 seconds, no editing), keep a local run command, keep screenshots.
5. One honest AI disclosure line (also add it to README): "Built with Claude Code (scaffolding and UI) and <AI API> (analysis). Problem framing, scope, prompt design, test set and rule logic are ours." Only keep parts that are true.
6. A Hinglish cheat-sheet (10 lines) so the speaker can rehearse naturally.

Never invent numbers or user testimonials. Reply in simple Hinglish with the file name.
