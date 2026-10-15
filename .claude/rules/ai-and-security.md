---
paths:
  - "functions/**"
  - "**/*ai*"
  - "**/*.env*"
---
# AI features and security rules
- Call AI models only from server code. Never expose API keys in browser code or in git.
- Wrap each AI call in try/catch with a timeout and a human-readable fallback message.
- Keep prompts in one file so they are easy to explain to judges.
- Validate and limit user input (length, type). Escape anything rendered as HTML.
- Do not log personal data. If the project handles personal data, say how in the README.
- Be honest in the UI: show when an answer is AI generated.
