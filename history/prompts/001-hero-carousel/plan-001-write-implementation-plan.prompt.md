---
id: "001-hero-carousel-plan-001"
title: "Write implementation plan"
stage: plan
date: 2026-09-17
surface: cli
model: mimo-v2.5-free
feature: 001-hero-carousel
branch: 001-hero-carousel
user: user
command: /sp.plan
labels: [plan, hero-carousel, ui-fix]
links:
  spec: specs/001-hero-carousel/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - specs/001-hero-carousel/plan.md
  - specs/001-hero-carousel/research.md
  - specs/001-hero-carousel/data-model.md
  - specs/001-hero-carousel/quickstart.md
  - AGENTS.md
tests:
  - 5 research decisions resolved
  - No new data entities
  - No API contracts needed
  - Agent context updated
---

## Prompt

/sp.plan — Write implementation plan for feature 001-hero-carousel (hero image carousel + button repositioning).

## Response snapshot

### Plan Artifacts Created

**plan.md**: Technical context (TypeScript 5.x, Next.js 14, Framer Motion 13.3.0), project structure (2 modified files, 3 moved images), constitution check (no violations)

**research.md**: 5 decisions resolved:
1. Carousel: React state + Framer Motion AnimatePresence (no external library)
2. Images: Next.js `<Image>` with `priority` and `fill` for optimization
3. SPOONI repositioning: CSS override on `elevenlabs-convai` element
4. Reduced motion: `matchMedia` hook to disable auto-rotation
5. Fallback: `onError` skip to next image, gradient background as final fallback

**data-model.md**: No new entities — carousel state is local React state only

**quickstart.md**: 4-step implementation guide with file change summary

**Agent context**: AGENTS.md updated with new feature technologies

## Outcome

- ✅ Impact: Plan complete, ready for task generation
- 🧪 Tests: 5 research decisions, no clarifications needed
- 📁 Files: 4 plan artifacts created, 1 agent file updated
- 🔁 Next prompts: `/sp.tasks` to generate implementation tasks
- 🧠 Reflection: Simple feature — no API contracts, no data model changes. Main work is Hero.tsx carousel logic and CSS repositioning. All technical unknowns resolved from existing codebase context.
