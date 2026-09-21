---
id: 010-double-navbar-implement-002
title: implement phase 4 category dropdown
stage: plan
date: 2026-09-18
surface: cli
model: opencode/mimo-v2.5-free
feature: 010-double-navbar
branch: 010-double-navbar
user: user
command: /sp.implement
labels: [implementation, navbar, phase-4, category-dropdown]
links:
  spec: specs/010-double-navbar/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - src/components/layout/CategoryDropdown.tsx
  - src/components/layout/MainNav.tsx
  - src/components/layout/Navbar.tsx
  - src/components/layout/MobileDrawer.tsx
  - specs/010-double-navbar/tasks.md
tests: []
---

## Prompt

/sp.implement — Execute Phase 4 (CategoryDropdown T006-T007). Create CategoryDropdown component with 13 category pills, Framer Motion animation, hover open/close with 200ms delay. Integrate into MainNav replacing the plain Menu link.

## Response snapshot

**T006**: Created `CategoryDropdown.tsx` — horizontal pill buttons for 13 categories. Framer Motion animation for open/close. 200ms hover delay via setTimeout/clearTimeout. Escape key closes. Calls onSelect(slug) on click. Categories imported from `src/lib/menu-data.ts`.

**T007**: Modified `MainNav.tsx` — replaced plain Menu link with CategoryDropdown on desktop. Added `useRouter` for navigation. Added `handleCategorySelect` callback that navigates to `/menu?category={slug}`. Added Menu link to MobileDrawer for mobile users.

**Additional changes**: Removed "Menu" from navLinks array in `Navbar.tsx` (only Home, About, Contact remain). Added Menu link to MobileDrawer nav section.

**Build**: Passed ✓
**Lint**: Passed ✓

**Tasks marked complete**: T006, T007 (8 of 21 total)

## Outcome

- ✅ Impact: CategoryDropdown created and integrated. Hover Menu → 13 category pills appear → click → navigate to /menu with category. Mobile: Menu link navigates to /menu directly.
- 🧪 Tests: N/A
- 📁 Files: 1 new (CategoryDropdown.tsx), 3 modified (MainNav.tsx, Navbar.tsx, MobileDrawer.tsx)
- 🔁 Next prompts: Continue with Phase 5 (Simplified Links T008-T009), Phase 6 (Mobile T011-T012), Phase 7 (Accessibility T013-T015), Phase 8 (Polish T016-T021)
- 🧠 Reflection: Menu link now has two behaviors: desktop shows CategoryDropdown, mobile navigates directly to /menu. The 200ms hover delay prevents flickering when moving mouse from link to dropdown.

## Evaluation notes (flywright)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): BUILD PASS, LINT PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Phase 5 — Simplified links + Contact page
