# Tasks: About Page Redesign

**Feature**: 012-about-page-redesign
**Date**: 2026-09-19
**Branch**: `012-about-page-redesign`

## Summary

- **Total Tasks**: 14
- **User Stories**: 5 (US1-P1, US2-P1, US3-P2, US4-P2, US5-P3)
- **Parallel Opportunities**: 2 tasks
- **MVP Scope**: US1 + US2 (hero + origin story — both P1)
- **Note**: All tasks modify the same file `src/app/about/page.tsx` — must run sequentially

## Phase 1: Setup

No setup tasks needed. Project already has all required dependencies.

## Phase 2: Foundational

No foundational tasks needed. All changes are in a single file.

## Phase 3: US1 — Visually Engaging Hero Section (P1)

**Goal**: Replace gradient-only hero with a background image, dark overlay, and scroll indicator.
**Independent Test**: Visit about page, confirm hero image visible with text overlay, scroll indicator at bottom.

- [x] T001 [US1] Replace gradient hero with hero1.webp background image using next/image in src/app/about/page.tsx
- [x] T002 [US1] Add dark overlay (bg-black/50) and min-h-[70vh] to hero section in src/app/about/page.tsx
- [x] T003 [US1] Add scroll-down chevron indicator at hero bottom in src/app/about/page.tsx

## Phase 4: US2 — Visual Origin Story (P1)

**Goal**: Convert text-only origin story to alternating two-column layout with food images and pull quote.
**Independent Test**: Scroll through origin story, confirm 3 images alongside text, pull quote styled, mobile stacks vertically.

- [x] T004 [US2] Convert origin story to alternating two-column layout with images in src/app/about/page.tsx
- [x] T005 [US2] Add BBQ Platter image for heritage beat, Chicken Malai Boti for craft beat, family-hall-1.jpg for community beat in src/app/about/page.tsx
- [x] T006 [US2] Add pull-quote styling with left accent border for key phrase in src/app/about/page.tsx

## Phase 5: US3 — Cooking Philosophy Image Cards (P2)

**Goal**: Replace icon-only cards with food photography backgrounds and dark overlay.
**Independent Test**: Scroll to philosophy section, confirm 3 cards with food photos, text readable, hover effect on desktop.

- [x] T007 [US3] Replace philosophy cards with food photography backgrounds (Sizzling Tikka, Chicken Red Karahi, Beef Bihari Boti) in src/app/about/page.tsx
- [x] T008 [US3] Add dark gradient overlay on philosophy cards for text contrast (4.5:1 ratio) in src/app/about/page.tsx
- [x] T009 [US3] Add hover scale + overlay lighten effect on philosophy cards in src/app/about/page.tsx

## Phase 6: US4 — Animated Stats Bar (P2)

**Goal**: Add animated count-up stats section between philosophy and values.
**Independent Test**: Scroll to stats section, confirm numbers animate from 0, 2x2 on mobile, respects reduced motion.

- [x] T010 [US4] Add new stats section with gradient background and useCountUp hook in src/app/about/page.tsx
- [x] T011 [US4] Add 4 stats (39+ Menu Items, 13 Categories, 1000+ Weekly Customers, Family Kitchen) with responsive grid in src/app/about/page.tsx

## Phase 7: US5 — Styled Contact Section (P3)

**Goal**: Wrap map in styled card, maintain contact info, add map fallback.
**Independent Test**: Scroll to contact section, confirm map in styled card, all info preserved, WhatsApp button works.

- [x] T012 [US5] Wrap Google Maps iframe in styled card (rounded-2xl, shadow-lg) in src/app/about/page.tsx
- [x] T013 [US5] Add fallback link for map failure and verify contact info preserved in src/app/about/page.tsx

## Phase 8: Polish & Verification

- [x] T014 Run npm run lint and npm run build, fix any issues

## Dependencies

```text
Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 6 (US4) → Phase 7 (US5) → Phase 8
```

All phases are sequential because they modify the same file.

## Parallel Execution Examples

**Batch 1** (within each phase, tasks are sequential):
- T001 → T002 → T003 (US1 - sequential)
- T004 → T005 → T006 (US2 - sequential)
- T007 → T008 → T009 (US3 - sequential)
- T010 → T011 (US4 - sequential)
- T012 → T013 (US5 - sequential)

No true parallelism possible — all tasks modify `src/app/about/page.tsx`.

## Implementation Strategy

1. **MVP First**: Complete US1 (hero) + US2 (origin story) — the two P1 stories
2. **Single File**: All changes go into `src/app/about/page.tsx` — rewrite section by section
3. **Bottom-Up**: Build from bottom of file upward to avoid merge conflicts with own edits
4. **Verify After Each Phase**: Run lint+build after completing each user story
5. **Final Polish**: Single lint+build pass at the end
