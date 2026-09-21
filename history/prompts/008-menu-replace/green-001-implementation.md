---
id: green-001
title: menu overhaul implementation
stage: green
date: 2026-09-18
surface: terminal
model: opencode/mimo-v2.5-free
feature: 008-menu-replace
branch: 008-menu-replace
user: opencode
command: /sp.implement
labels: [menu, images, overhaul, implementation]
links:
  spec: specs/008-menu-replace/spec.md
  plan: specs/008-menu-replace/plan.md
  tasks: specs/008-menu-replace/tasks.md
  ticket:
  adr:
  pr:
files:
  created:
    - public/images/food/paratha-breads/Puri Paratha.png
    - public/images/food/paratha-breads/Roghni Kulcha.png
    - public/images/food/desserts/Halwa.png
    - public/images/food/burgers/ (5 files)
    - public/images/food/sandwiches/ (11 files)
    - public/images/food/broast/ (4 files)
    - public/images/food/bbq/ (16 files)
    - public/images/food/chargha/ (1 file)
    - public/images/food/karahi/ (6 files)
    - public/images/food/handi/ (3 files)
    - public/images/food/chinese/ (11 files)
    - public/images/food/rolls/ (19 files)
    - public/images/food/pasta/ (2 files)
    - public/images/food/extras/ (4 files)
  modified:
    - src/lib/menu-data.ts
    - specs/008-menu-replace/tasks.md
tests:
  lint: pass (pre-existing warning only)
  build: pass (zero errors)
  deploy: success (Vercel production)
---

## Prompt

Execute implementation tasks for 008-menu-replace: copy 85 food images from D:\ to organized directories, rewrite menu-data.ts with 15 categories and 85 items, fix typos, preserve prices, verify chatbot integration, lint, build, and deploy to Vercel.

## Response snapshot

Phase 1: Created paratha-breads/ and desserts/ directories, copied 85 images across 13 category folders. Phase 2: Rewrote menu-data.ts with 15 categories (removed Fried/Beverages, added Paratha & Breads/Desserts), 85 items with corrected typos (Sandwitch→Sandwich, Cicken→Chicken), preserved Zinger Burger at Rs. 600, all prices validated 0-5000. Phase 3: Verified website-context.ts and groq.ts auto-pick up new menu data via buildMenuContext(). Phase 4: Lint passed, build passed, deployed to Vercel production.

## Outcome

- Impact: Menu overhaul complete — 85 real food photos replacing Unsplash stock images, 15 categories, corrected item names
- Tests: Lint clean (1 pre-existing warning), build zero errors, Vercel deploy success
- Files: 85 images copied, menu-data.ts fully rewritten (13→15 categories, 41→85 items)
- Next prompts: Validate live site at https://ghousiaagoldenweb.vercel.app/menu, run quickstart.md scenarios
- Reflection: 85 images found on D:\ (spec said 86 — one fewer). Fried and Beverages categories removed as planned. All Unsplash URLs eliminated.

## Evaluation notes (flywright)

- Failure modes observed: PowerShell variable expansion issues with inline scripts — resolved by using script files
- Graders run and results: Lint pass, build pass, deploy success
- Prompt variant: N/A
- Next experiment: User validation of live menu page
