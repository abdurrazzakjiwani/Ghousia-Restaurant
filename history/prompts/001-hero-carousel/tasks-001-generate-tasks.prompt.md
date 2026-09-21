---
id: "001-hero-carousel-tasks-001"
title: "Generate task breakdown"
stage: tasks
date: 2026-09-17
surface: cli
model: mimo-v2.5-free
feature: 001-hero-carousel
branch: 001-hero-carousel
user: user
command: /sp.tasks
labels: [tasks, hero-carousel, task-generation]
links:
  spec: specs/001-hero-carousel/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - specs/001-hero-carousel/tasks.md
tests:
  - 18 tasks across 5 phases
  - All tasks follow checklist format (checkbox, ID, labels, file paths)
  - 2 user stories mapped to phases
  - 1 parallelizable task identified
---

## Prompt

/sp.tasks — Generate task breakdown for feature 001-hero-carousel (hero image carousel + button repositioning).

## Response snapshot

Generated tasks.md with 18 tasks across 5 phases:

**Phase 1 (Setup)**: 4 tasks — Move 3 hero images from project root to public/images/hero/
**Phase 2 (Foundational)**: Skipped — no blocking prerequisites
**Phase 3 (US1 - Hero Carousel)**: 6 tasks — Auto-rotation, reduced-motion, Image components with AnimatePresence, dot navigation, parallax, error handling
**Phase 4 (US2 - Button Fix)**: 1 task — CSS repositioning of elevenlabs-convai element
**Phase 5 (Polish)**: 7 tasks — Build, lint, deploy, verify on live site

**Parallel opportunities**: US1 and US2 can run simultaneously (Hero.tsx vs globals.css)

**MVP scope**: US1 only — hero carousel with rotation and dots (10 tasks total)

## Outcome

- ✅ Impact: Tasks complete, ready for implementation via /sp.green
- 🧪 Tests: 18 tasks, all follow checklist format
- 📁 Files: 1 file created (tasks.md)
- 🔁 Next prompts: `/sp.green` to implement all tasks
- 🧠 Reflection: Simple feature — minimal tasks. Main work is Hero.tsx carousel logic. US2 is a single CSS change.
