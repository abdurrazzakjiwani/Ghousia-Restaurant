---
id: 010-double-navbar-implement-001
title: implement navbar phases 1-3
stage: plan
date: 2026-09-18
surface: cli
model: opencode/mimo-v2.5-free
feature: 010-double-navbar
branch: 010-double-navbar
user: user
command: /sp.implement
labels: [implementation, navbar, phases-1-3]
links:
  spec: specs/010-double-navbar/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - src/components/layout/Navbar.tsx
  - src/components/layout/InfoBar.tsx
  - src/components/layout/MainNav.tsx
  - src/components/layout/CartBadge.tsx
  - src/components/layout/SearchInput.tsx
  - src/components/layout/MobileDrawer.tsx
  - specs/010-double-navbar/tasks.md
tests: []
---

## Prompt

/sp.implement — Execute the double navbar implementation starting with Phase 1 (Navbar container rewrite) and Phase 2 (InfoBar) in parallel. Continue with Phase 3 (MainNav, CartBadge, SearchInput, MobileDrawer) since all components are needed for the build to succeed.

## Response snapshot

**Phase 1 (T001)**: Rewrote `Navbar.tsx` as a single sticky container with two-band structure. Imports InfoBar and MainNav. Kept useTheme integration. NavLinks reduced from 8 to 4 (Home, Menu, About, Contact).

**Phase 2 (T002)**: Created `InfoBar.tsx` with phone (tap-to-call via `tel:`), hours, and Track Order link. Responsive: hidden on mobile, phone-only on tablet, full on desktop.

**Phase 3 (T003-T005)**: Created `CartBadge.tsx` (cart icon + animated count badge using useCart hook), `SearchInput.tsx` (expandable inline search with live results), `MainNav.tsx` (logo, 4 links, search, cart, dark mode, hamburger), `MobileDrawer.tsx` (slide-in drawer from right with Framer Motion animation).

**Build**: Passed (`npm run build` — ✓ Compiled successfully)
**Lint**: Passed (`npm run lint` — only pre-existing warning in OrderSummary.tsx)

**Issue encountered**: MenuItem type doesn't have `emoji` field — removed emoji display from SearchInput. Also needed to add React fragment wrapper in MainNav for JSX root element.

**Tasks marked complete**: T001, T002, T003, T004, T005, T010 (6 of 21 tasks)

## Outcome

- ✅ Impact: Phases 1-3 complete. Navbar double-band structure working. InfoBar, MainNav, CartBadge, SearchInput, MobileDrawer all created and building.
- 🧪 Tests: N/A (no test framework configured)
- 📁 Files: 5 files created, 1 file rewritten
- 🔁 Next prompts: Continue with Phase 4 (CategoryDropdown T006-T007), Phase 5 (Simplified Links T008-T009), Phase 6 (Mobile T011-T012), Phase 7 (Accessibility T013-T015), Phase 8 (Polish T016-T021)
- 🧠 Reflection: Created MobileDrawer early since MainNav imports it — better to batch all dependent components together. Need to also create CategoryDropdown before it can be integrated into MainNav.

## Evaluation notes (flywright)

- Failure modes observed: MenuItem type error (emoji field missing), JSX root element issue (two sibling elements returned)
- Graders run and results (PASS/FAIL): BUILD PASS, LINT PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Phase 4 — CategoryDropdown component
