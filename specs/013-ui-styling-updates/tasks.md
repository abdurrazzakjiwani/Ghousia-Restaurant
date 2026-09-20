# Tasks: UI Styling Updates

**Input**: Design documents from `/specs/013-ui-styling-updates/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Tests**: No tests requested — this is a pure CSS/styling refactor verified by visual inspection and build validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Font integration and design system foundation

- [x] T001 [P] Add DM Sans font via next/font/google in src/app/layout.tsx
- [x] T002 [P] Update tailwind.config.ts gradient-start and gradient-end to #f97316

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Global styles that affect all user stories

- [x] T003 Update .btn-primary class in src/app/globals.css to solid orange
- [x] T004 Update chat scrollbar thumb in src/app/globals.css to solid orange
- [x] T005 [P] Update Button.tsx primary variant in src/components/ui/Button.tsx to solid orange

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Fix Invisible Reserve Table Button (Priority: P1) MVP

**Goal**: Make the "Reserve Table" button visible and clickable with white text on orange background

**Independent Test**: Visit homepage, scroll to Ready to Order section, confirm button is visible with orange background and white text

### Implementation for User Story 1

- [x] T006 [US1] Fix CTABanner.tsx container text color and button styling in src/components/home/CTABanner.tsx

**Checkpoint**: Reserve Table button is now visible and clickable

---

## Phase 4: User Story 2 - Solid Orange Color Scheme (Priority: P2)

**Goal**: Replace all orange gradient effects with solid orange across the site and email templates

**Independent Test**: Visit homepage, menu, checkout, and other pages confirming all orange elements are solid color

### Implementation for User Story 2

- [x] T007 [P] [US2] Update MainNav.tsx gradient text to solid orange in src/components/layout/MainNav.tsx
- [x] T008 [P] [US2] Update MobileDrawer.tsx gradient text to solid orange in src/components/layout/MobileDrawer.tsx
- [x] T009 [P] [US2] Update contact/page.tsx 3 gradient icon circles to solid orange in src/app/contact/page.tsx
- [x] T010 [P] [US2] Update OrderConfirmation.tsx inline CSS gradients to solid orange in src/emails/OrderConfirmation.tsx
- [x] T011 [P] [US2] Update RestaurantAlert.tsx inline CSS gradient to solid orange in src/emails/RestaurantAlert.tsx

**Checkpoint**: All orange elements across site and emails use solid color

---

## Phase 5: User Story 3 - Restyled Stats Card (Priority: P3)

**Goal**: Transform stats box into a white card with shadow, orange border accent, and DM Sans numbers

**Independent Test**: Visit homepage, scroll to Our Story section, confirm white card with shadow, orange left border, DM Sans numbers

### Implementation for User Story 3

- [x] T012 [US3] Restyle AboutPreview.tsx stats card with white background, shadow-md, border-l-4 border-orange-500, DM Sans numbers in src/components/home/AboutPreview.tsx

**Checkpoint**: Stats card displays as modern white card with orange accent and DM Sans typography

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and build verification

- [x] T013 Run npm run build to verify no TypeScript or build errors
- [x] T014 Run quickstart.md visual testing checklist on homepage, menu, checkout

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on T002 (tailwind config) completion
- **User Story 1 (Phase 3)**: Depends on T005 (Button.tsx) completion
- **User Story 2 (Phase 4)**: Depends on T002 (tailwind config) and T003-T005 (globals.css, Button.tsx)
- **User Story 3 (Phase 5)**: Depends on T001 (DM Sans font) completion
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after T005 - No dependencies on other stories
- **User Story 2 (P2)**: Can start after T002, T003-T005 - No dependencies on US1 or US3
- **User Story 3 (P3)**: Can start after T001 - No dependencies on US1 or US2

### Parallel Opportunities

- T001 and T002 can run in parallel (different files)
- T005 can run in parallel with T003 and T004 (different files)
- T007, T008, T009, T010, T011 can all run in parallel (all different files)
- US1, US2, and US3 can be worked on in parallel after foundational phase

---

## Parallel Example: User Story 2

```bash
# Launch all US2 tasks together (all different files):
Task: "Update MainNav.tsx gradient text to solid orange in src/components/layout/MainNav.tsx"
Task: "Update MobileDrawer.tsx gradient text to solid orange in src/components/layout/MobileDrawer.tsx"
Task: "Update contact/page.tsx 3 gradient icon circles to solid orange in src/app/contact/page.tsx"
Task: "Update OrderConfirmation.tsx inline CSS gradients to solid orange in src/emails/OrderConfirmation.tsx"
Task: "Update RestaurantAlert.tsx inline CSS gradient to solid orange in src/emails/RestaurantAlert.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (DM Sans font, tailwind config)
2. Complete Phase 2: Foundational (globals.css, Button.tsx)
3. Complete Phase 3: User Story 1 (CTABanner.tsx)
4. **STOP and VALIDATE**: Reserve Table button is visible
5. Deploy if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Reserve Table button fixed → Deploy (MVP!)
3. Add User Story 2 → All gradients solid → Deploy
4. Add User Story 3 → Stats card restyled → Deploy
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (CTABanner.tsx)
   - Developer B: User Story 2 (MainNav, MobileDrawer, contact, emails)
   - Developer C: User Story 3 (AboutPreview.tsx)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No tests requested — verification is visual inspection + build validation
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
