# DESIGN

Direction: a forensic evidence desk. Cool archival grey like an evidence form, graphite ink, evidence-tape amber, a red seal for risk. Calm everywhere except one thing: the evidence tag.
Signature element: the evidence tag (amber card with a punched hole and string) that carries the SHA-256. The timeline is a vertical rail with seal dots (red = high, amber = medium) because events are a real sequence.

| Name | Hex | Meaning |
|---|---|---|
| ink | #1B1F24 | text, primary buttons |
| paper | #E8EBE6 | page background |
| sheet | #FBFBF8 | panels |
| line | #CDD2CB | borders, timeline rail |
| tag | #E3A72F | evidence tag, hashes, medium risk |
| flag | #B42318 | high risk, TAMPERED, chain broken |
| match | #1F7A4D | MATCH, normal |
| muted | #5D6670 | secondary text |

Fonts: IBM Plex Sans Condensed (headline, verdicts), IBM Plex Sans (UI, Devanagari via Noto Sans Devanagari), IBM Plex Mono (log lines, hashes, timestamps only).
Layout: desktop two columns (evidence in on the left, findings out on the right); phone one column, scrolls to the result after a case opens.
