# Tasks: UI/UX Fixes

**Feature**: 001-ui-fixes
**Date**: 2026-09-19
**Branch**: `001-ui-fixes`

## Summary

- **Total Tasks**: 14
- **User Stories**: 5 (US1-P1, US2-P2, US3-P2, US4-P1, US5-P3)
- **Parallel Opportunities**: 6 tasks can run in parallel
- **MVP Scope**: US1 + US4 (both P1 - scroll progress bar removal + category filter fix)

## Phase 1: Setup

No setup tasks needed. Project already has all required dependencies.

## Phase 2: Foundational

These tasks must complete before user stories as they affect global styling.

- [x] T001 Update gradient color definitions in tailwind.config.ts for light mode
- [x] T002 [P] Add dark mode gradient override in tailwind.config.ts

## Phase 3: US1 - Remove Scroll Progress Bar (P1)

**Goal**: Remove the orange progress line that appears above the header on all pages.
**Independent Test**: Visit any page and confirm no progress line appears above the navbar.

- [x] T003 [US1] Remove ScrollProgress import from src/app/layout.tsx
- [x] T004 [US1] Remove ScrollProgress JSX from src/app/layout.tsx
- [x] T005 [US1] Delete or mark unused src/components/ui/ScrollProgress.tsx

## Phase 4: US2 - Change Gradient Colors (P2)

**Goal**: Change all site-wide orange gradients to white/light gray in light mode only.
**Independent Test**: Visit homepage, menu, and checkout pages in light mode confirming white/light gradients.

- [x] T006 [P] [US2] Update AboutPreview.tsx gradient classes if needed
- [x] T007 [P] [US2] Update CTABanner.tsx gradient classes if needed
- [x] T008 [P] [US2] Verify dark mode retains orange gradients

## Phase 5: US3 - Unique SVG Avatars (P2)

**Goal**: Replace letter initials with unique colored SVG avatars for each testimonial.
**Independent Test**: Scroll through testimonials confirming each has a distinct colored avatar.

- [x] T009 [US3] Define rotating color palette (12-16 colors) in Testimonials.tsx
- [x] T010 [US3] Replace SketchAvatar component with SVG-based avatar in src/components/home/Testimonials.tsx
- [x] T011 [US3] Assign colors by testimonial index using modulo operation

## Phase 6: US4 - Fix Category Filter Bug (P1)

**Goal**: Ensure clicking category filters correctly displays matching menu items.
**Independent Test**: Visit menu page, click each category, confirm correct items appear.

- [x] T012 [US4] Fix URL parameter sync in src/app/menu/page.tsx
- [x] T013 [US4] Add empty state handling for categories with no available items

## Phase 7: US5 - Remove Order Mode Gradient (P3)

**Goal**: Remove gradient overlay from order mode selector, keep border styling only.
**Independent Test**: Go to checkout, select each order mode, confirm clean border highlight.

- [x] T014 [US5] Remove motion.div gradient overlay from src/components/order/OrderModeSelector.tsx

## Phase 8: Polish & Verification

- [x] T015 Run npm run lint and fix any issues
- [x] T016 Run npm run build and verify success
- [x] T017 [P] Verify all acceptance scenarios from spec.md
- [x] T018 Deploy to production with npx vercel --prod --yes

## Dependencies

```text
Phase 2 (T001-T002) → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3) → Phase 8
                    → Phase 6 (US4) → Phase 8
Phase 7 (US5) → Phase 8
```

## Parallel Execution Examples

**Batch 1** (after Phase 2):
- T003, T004, T005 (US1 - all independent)
- T006, T007, T008 (US2 - all independent)
- T012, T013 (US4 - all independent)

**Batch 2** (after Batch 1):
- T009, T010, T011 (US3 - sequential within story)
- T014 (US5 - independent)

**Batch 3** (after all stories):
- T015, T016, T017, T018 (Polish - mostly independent)

## Implementation Strategy

1. **MVP First**: Start with US1 (scroll progress bar) and US4 (category filter bug) as they are P1
2. **Incremental Delivery**: Each user story is independently deployable
3. **Global Change First**: Complete Phase 2 (tailwind.config.ts) before any story work
4. **Verification**: Run lint + build after each story completion
