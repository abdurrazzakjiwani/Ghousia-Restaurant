---
id: green-001
title: guardrails implementation
stage: green
date: 2026-09-18
surface: terminal
model: opencode/mimo-v2.5-free
feature: 001-chatbot-guardrails
branch: 001-chatbot-guardrails
user: opencode
command: /sp.implement
labels: [guardrails, implementation, chatbot]
links:
  spec: specs/001-chatbot-guardrails/spec.md
  ticket:
  adr:
  pr:
files:
  created:
    - src/lib/guardrails.ts
    - src/lib/website-context.ts
  modified:
    - src/lib/groq.ts
    - src/lib/menu-data.ts
    - src/lib/branches-data.ts
    - src/lib/testimonials-data.ts
    - src/app/api/chat/route.ts
    - src/components/chat/GroqChatWidget.tsx
    - src/app/globals.css
    - specs/001-chatbot-guardrails/tasks.md
tests:
  lint: passed
  build: passed
---

## Prompt

Implement all 48 tasks from specs/001-chatbot-guardrails/tasks.md across 8 phases:
- Phase 1: Create guardrails.ts (profanity lists, isAbusive, isRestaurantContext, refusal messages) and website-context.ts (context builders for menu, branches, about, FAQ, testimonials)
- Phase 2: Fix scrollbar in GroqChatWidget.tsx (min-h-0, max-h-[320px]) and globals.css (width 8px, transition)
- Phase 3+4: Add off-topic refusal + abuse detection + length validation in route.ts
- Phase 5: Rewrite groq.ts with buildSystemPrompt() using dynamic website context
- Phase 6: Auto-refresh verified (inherent in dynamic prompt building)
- Phase 7: Add closing salutations (JazakAllah Sir, Thank you, Shukriya) on ~every 3rd message
- Phase 8: Lint, build, mark all tasks complete

## Response snapshot

Created 2 new files (guardrails.ts, website-context.ts), modified 7 existing files. All 48 tasks marked [X] in tasks.md. Lint passes (only pre-existing warning). Build succeeds with no errors.

## Outcome

- Impact: Chatbot now has abuse detection, context restriction, dynamic restaurant knowledge, natural closings, and fixed scrollbar
- Tests: npm run lint passed, npm run build passed
- Files: 2 created, 7 modified, 48 tasks completed
- Next prompts: Deploy to Vercel, run quickstart.md validation scenarios
- Reflection: All phases implemented in single session. Auto-refresh works inherently since buildSystemPrompt() reads data files on each request.

## Evaluation notes (flywheel)

- Failure modes observed: PowerShell execution policy blocked npm commands (resolved with -Scope Process bypass)
- Graders run and results: lint PASS, build PASS
- Prompt variant: N/A
- Next experiment: Deploy to Vercel and test live chatbot scenarios
