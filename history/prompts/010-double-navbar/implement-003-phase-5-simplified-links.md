---
id: 010-double-navbar-implement-003
title: implement phase 5 simplified links
stage: plan
date: 2026-09-18
surface: cli
model: opencode/mimo-v2.5-free
feature: 010-double-navbar
branch: 010-double-navbar
user: user
command: /sp.implement
labels: [implementation, navbar, phase-5, simplified-links]
links:
  spec: specs/010-double-navbar/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - src/app/contact/page.tsx
  - specs/010-double-navbar/tasks.md
tests: []
---

## Prompt

/sp.implement — Execute Phase 5 (Simplified Links T008-T009). Reduce nav links to 4 (Home, Menu, About, Contact). Add Branches/Location/Reserve links to Contact page.

## Response snapshot

**T008**: Already complete from previous phases. NavLinks in Navbar.tsx already only contains Home, About, Contact (Menu removed in Phase 4, Track Order moved to InfoBar in Phase 2). Marked as [X].

**T009**: Modified `src/app/contact/page.tsx` — added "Find Us" section after existing contact form and quick contact. Three card-style links: Our Branches (Store icon, links to /branches), Location & Map (MapPin icon, links to /location), Reserve a Table (Calendar icon, links to /reservation). Each card has gradient icon, title, subtitle, hover effect with amber color transition.

**Build**: Passed ✓
**Lint**: Passed ✓

**Tasks marked complete**: T008, T009 (10 of 21 total)

## Outcome

- ✅ Impact: Navbar shows only Home, Menu (dropdown), About, Contact. Contact page now has three card links to Branches, Location, and Reservation pages. Direct URL access to /branches, /location, /reservation still works.
- 🧪 Tests: N/A
- 📁 Files: 1 modified (contact/page.tsx)
- 🔁 Next prompts: Continue with Phase 6 (Mobile T011-T012), Phase 7 (Accessibility T013-T015), Phase 8 (Polish T016-T21)
- 🧠 Reflection: T008 was already done from Phase 4 changes. The Contact page now serves as the hub for Branches, Location, and Reservation — preserving direct URL access while removing them from main navigation.

## Evaluation notes (flywright)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): BUILD PASS, LINT PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Phase 6 — Mobile integration (T011-T012)
