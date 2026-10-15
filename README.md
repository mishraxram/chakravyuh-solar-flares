# SOLAR FLARES

**Team:** SOLAR FLARES | **Registration ID:** HK26-0014 | **Event:** CHAKRAVYUH 1.0, BIET Lucknow

> **Problem Statement ABCS-02: AI-Assisted Digital Forensics** (Domain 3: AI-Based Cybersecurity)
> An AI-assisted platform that analyzes digital artifacts, correlates events, reconstructs incident timelines and maintains evidence integrity with SHA-256 hashing and an audit trail. [Full statement](docs/PROBLEM.md)

**AI usage:** Built with Claude Code (scaffolding and UI) and Gemini API (analysis). Problem framing, scope, prompt design and test set are ours.

**Live:** https://loglens-solarflares.pages.dev

## Problem
Investigators (e.g. a college IT cell after ERP marks were changed at night) must dig through thousands of log lines, rebuild what happened, and prove the logs were not edited.

## Solution: LogLens
1. Paste/upload a log -> sorted incident timeline with rule-based red flags.
2. AI investigation summary (Gemini) linked to event numbers, English/Hindi.
3. Evidence locker: SHA-256 hash, tamper check, audit trail, downloadable report.

## How to run
```bash
npm install
cp .env.example .dev.vars   # add your GEMINI_API_KEY
npm run build && npx wrangler pages dev dist
```

## Tech
Astro + Tailwind, TypeScript, Cloudflare Pages Functions, Gemini API, Web Crypto (SHA-256).

## Team
SOLAR FLARES (HK26-0014)
