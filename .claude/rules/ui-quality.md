---
paths:
  - "**/*.astro"
  - "**/*.css"
  - "**/*.html"
  - "**/*.dart"
  - "**/*.tsx"
  - "**/*.jsx"
---
# UI quality rules (anti "AI-made" look)
Follow docs/DESIGN.md if it exists. If it does not exist, create it first (direction, 4-6 hex tokens with meaning, font pair, one signature element).

Do NOT use these AI tells:
- purple/blue gradients, gradient text, glassmorphism, floating blobs, "AI-powered" sparkle badges
- default Inter/Poppins/Geist without a reason; untouched shadcn grey
- a centred marketing hero + three identical rounded feature cards; decorative 01/02/03 steps
- everything fading in on scroll; animations without a purpose
- the newer AI defaults too: cream background + serif + terracotta, near-black + neon/acid green "hacker" look, newspaper hairline layout
- copy like "Revolutionize / Transform / Elevate your X with AI"

DO:
- Pick a direction from the problem's own world (an official notice, a ration card, a hospital slip, a mandi rate board...) instead of generic tech.
- Colour has meaning: status colours only for status (danger / warning / safe). One primary action colour.
- Real content on screen: realistic Indian inputs, rupee amounts, real helplines (1930, 112, 108) and real portals (cybercrime.gov.in) when relevant. Hindi + English text must both render well (use a font with Devanagari, e.g. Noto Sans + Noto Sans Devanagari).
- One bold signature element (for example: the user's input shown with risky parts highlighted and explained). Everything else calm.
- Vary sizes by importance; dense, useful result screens beat empty whitespace.
- Mobile first at 360px; text 16px+; touch targets 44px+; visible keyboard focus; respect prefers-reduced-motion.
- Every screen: empty, loading, error and success states. Sample data labelled "sample".
- No extra UI libraries for looks. Tailwind or plain CSS.
- Final pass: remove one decorative thing.
