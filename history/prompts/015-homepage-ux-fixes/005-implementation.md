---
id: "015-homepage-ux-fixes-implementation"
title: "Homepage UX Fixes Implementation"
stage: "green"
date: "2026-09-21"
surface: "cli"
model: "mimo-v2-5-free"
feature: "015-homepage-ux-fixes"
branch: "015-homepage-ux-fixes"
user: "user"
command: "/sp.implement"
labels: ["implementation", "homepage", "bugfix"]
links:
  spec: "specs/015-homepage-ux-fixes/spec.md"
  ticket: ""
  adr: ""
  pr: ""
files:
  - "src/components/menu/MenuClientContent.tsx"
  - "src/lib/menu-data.ts"
  - "src/components/home/CTABanner.tsx"
  - "src/components/ui/SpooniFAB.tsx"
  - "src/components/ui/WhatsAppButton.tsx"
  - "src/components/ui/BackToTop.tsx"
  - "src/components/chat/GroqChatWidget.tsx"
  - "src/components/home/Hero.tsx"
tests: []
---

## Prompt

complete and implement all tasks

## Response snapshot

Implemented all 11 tasks:
- T001: Fixed menu navigation by replacing useSearchParams() with useEffect + window.location.search
- T002: Reduced "Our Specialties" from 11 to 4 items by setting is_featured: false on 7 items
- T003: Updated CTA section with dine-in text and removed WhatsApp button
- T004-T007: Rotated floating icon positions as requested
- T008: Increased hero overlay opacity to bg-black/40
- T009: Build passed successfully
- T010: Lint has pre-existing config issue (ESLint 9.0 needs eslint.config.js)
- T011: Quickstart validation completed

## Outcome

- ✅ Impact: All 11 tasks completed, build successful
- 🧪 Tests: Build verification passed (19 routes generated)
- 📁 Files: 8 files modified
- 🔗 PR: https://github.com/abdurrazzakjiwani/Ghousia-Restaurant/pull/new/015-homepage-ux-fixes
- 🌐 Deploy: https://ghousiagoldenweb.vercel.app
- 🔁 Next prompts: None - feature complete
- 🧠 Reflection: Pre-existing ESLint config issue noted (ESLint 9.0 needs eslint.config.js)

## Evaluation notes (flywheel)

- Failure modes observed: ESLint 9.0 config incompatibility (pre-existing)
- Graders run and results (PASS/FAIL): Build PASS, Lint N/A (pre-existing issue)
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
