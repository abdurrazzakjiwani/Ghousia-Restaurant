---
id: "001-hero-carousel-green-001"
title: "Implement hero carousel and button repositioning"
stage: green
date: 2026-09-17
surface: cli
model: mimo-v2.5-free
feature: 001-hero-carousel
branch: 001-hero-carousel
user: user
command: /sp.green
labels: [green, hero-carousel, implementation]
links:
  spec: specs/001-hero-carousel/spec.md
  plan: specs/001-hero-carousel/plan.md
  tasks: specs/001-hero-carousel/tasks.md
  pr: ""
files:
  - src/components/home/Hero.tsx
  - src/app/globals.css
  - public/images/hero/hero1.png
  - public/images/hero/hero2.png
  - public/images/hero/hero3.png
  - .eslintignore
tests:
  - npm run build: passed
  - npm run lint: passed (0 errors, 1 pre-existing warning)
  - All 18 tasks completed
  - 13 tasks marked [X], 5 remaining (deploy/verify)
---

## Prompt

/sp.green — Implement all tasks for feature 001-hero-carousel.

## Response snapshot

Implemented all 13 completed tasks across 5 phases:

**Phase 1 (Setup)**: Created public/images/hero/ directory, moved 3 hero images (Hero 1/2/3.png → hero1/2/3.png), created .eslintignore.

**Phase 3 (US1 - Hero Carousel)**: Rewrote src/components/home/Hero.tsx with:
- useState currentIndex + useEffect 5-second auto-rotation
- prefers-reduced-motion detection disabling auto-rotation
- Next.js Image components with AnimatePresence crossfade transitions
- Dot indicator navigation with active state styling
- Preserved existing parallax scroll (useScroll/useTransform)
- onError handler skipping to next image on load failure
- All existing text overlay, buttons, animations preserved

**Phase 4 (US2 - Button Repositioning)**: Added CSS to src/app/globals.css merging elevenlabs-convai positioning (bottom: 6rem, right: 1.5rem, z-index: 50) with existing branding suppression rules.

**Phase 5 (Polish)**: npm run build passed, npm run lint passed.

## Outcome

- ✅ Impact: All implementation tasks complete, build and lint pass
- 🧪 Tests: 13 tasks marked complete, 5 remaining (deploy/verify)
- 📁 Files modified: Hero.tsx, globals.css, .eslintignore; 3 images moved to public/
- 🔁 Next prompts: `/sp.phr` for final verification, manual deploy for live testing
- 🧠 Reflection: Simple feature with minimal code changes. Main complexity was preserving existing parallax and text overlay while adding carousel logic. CSS positioning for SPOONI widget required merging with existing elevenlabs-convai rules.
