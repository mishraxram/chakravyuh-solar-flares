---
name: judge-me
description: "Use when the user asks how judges will see it, for a score or review, and automatically once Gate B is reached."
argument-hint: "[optional: theme or rubric if the organizers shared one]"
---
Rubric hint from the user (may be empty): $ARGUMENTS
Read docs/PROBLEM.md, docs/PLAN.md, docs/DEMO_SCRIPT.md, README.md and the code. Open the live URL if one exists.

Act as three judges: a technical judge, a product and impact judge, and a demo and storytelling judge.
If no rubric was given, use this typical one (it is a common pattern, not BIET's official rubric): Innovation 20, Technical depth 20, Impact and relevance 20, Demo quality 20, Completeness 10, Presentation 10.

Also check, and list as attacks if missing:
- Can a judge type their OWN input and get a sensible result? (hardcoded answers get caught)
- Does docs/TESTSET.md exist with an honest pass count?
- Is there a visible fallback/unsure path?
- Any overclaim in UI, README or pitch ("100% private", "100% accurate", "verified", "legally valid", unsourced numbers)?
- Does the UI break any rule in .claude/rules/ui-quality.md (AI-look tells)?
- Can the builder explain the AI request (prompt, input, output JSON) in 30 seconds?

Output:
1. Score table per judge and criterion with a one-line reason.
2. The 3 things a judge will attack first.
3. Top 5 fixes ranked by (score gain) divided by (minutes needed), each with a time estimate.
4. One sentence: "If you only have 30 minutes, do this."

Do not change code unless the user replies "apply 1,2". Reply in simple Hinglish, under 50 lines.
