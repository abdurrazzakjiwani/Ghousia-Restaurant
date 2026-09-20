---

description: "Task list for implementing Location, Signature Dish, CTA, and Light‑Only Presentation feature"
---

# Tasks: 001-location-dish-theme

**Input**: Design documents from `/specs/001-location-dish-theme/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ (no new APIs)

**Tests**: No automated tests defined in package.json; only manual testing required.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing Next.js 14 project structure and dependencies
- [x] T002 [P] Ensure Tailwind CSS 3.x configuration is present and correct
- [x] T003 [P] Confirm framer-motion, lucide-react, clsx are installed

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

⚠️ **CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Setup localStorage utility functions for delivery address persistence
- [x] T005 [P] Create base CSS variables for light‑only theme (remove dark‑mode variables)
- [x] T006 [P] Implement global reduced‑motion preference detection hook

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Provide a delivery address before browsing (Priority: P1) 🎯 MVP

**Goal**: Mandatory location card appears on first visit; collects a delivery address; saved address prefills checkout.

**Independent Test**: Open website with no saved address → location card appears → enter valid address → card closes → saved address prefills checkout.

### Implementation for User Story 1

- [x] T007 [P] [US1] Create LocationPrompt component in `src/components/ui/LocationPrompt.tsx`
- [x] T008 [P] [US1] Add localStorage key `ghousia-delivery-address` in `src/lib/localStorage.ts` (or utility file)
- [x] T009 [US1] Implement address validation (non‑empty, min length 3) in `src/lib/validation.ts`
- [x] T010 [US1] Wire LocationPrompt to display when no address saved (use `ghousia-delivery-address` check)
- [x] T011 [US1] Add save functionality that stores address to localStorage and updates UI state
- [x] T012 [US1] Integrate LocationPrompt into `src/app/layout.tsx` (render above all page content)
- [x] T013 [US1] Update `src/components/order/CheckoutStep1.tsx` to prefill address from localStorage
- [x] T014 [US1] Add accessibility: focus management, label, error announcements

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Keep the Signature Dish food stable while its plate spins (Priority: P2)

**Goal**: Food image remains stationary; decorative plate rotates; reduced‑motion disables animation.

**Independent Test**: View Signature Dish section → food static → plate rotates (≥3 rotations in 30 s) → reduced‑motion stops rotation.

### Implementation for User Story 2

- [x] T015 [P] [US2] Create plate‑spin CSS animation in `src/app/globals.css` (keyframe `plate-spin`)
- [x] T016 [P] [US2] Update `src/components/home/GrillCharghaShowcase.tsx` to add `.plate` div behind food image
- [x] T017 [US2] Apply `prefers-reduced-motion` media query to disable rotation
- [x] T018 [US2] Ensure food image stays stationary (no rotation applied)
- [x] T019 [US2] Verify layout stability during animation (no shift in dimensions)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Review a clear light Ready to Order call to action (Priority: P3)

**Goal**: Ready to Order section has white background, black text, dot‑pattern, unchanged button colors.

**Independent Test**: Scroll to Ready to Order → white background → black text → subtle dot pattern → WhatsApp green and reservation buttons unchanged.

### Implementation for User Story 3

- [x] T020 [P] [US3] Add `.dot‑pattern` CSS class in `src/app/globals.css` (radial‑gradient dots)
- [x] T021 [P] [US3] Update `src/components/home/CTABanner.tsx` with `bg-white text-gray-950` and `.dot‑pattern`
- [x] T022 [US3] Ensure WhatsApp button retains `bg-green-500 hover:bg-green-600`
- [x] T023 [US3] Ensure reservation button retains `border-white text-white hover:bg-white/20`
- [x] T024 [US3] Verify responsive layout on mobile and desktop

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Use a consistent light‑only website presentation (Priority: P4)

**Goal**: Site is light‑only; no dark‑theme toggle in desktop or mobile navigation.

**Independent Test**: Set device to dark appearance → site remains light‑only → no dark‑theme toggle in desktop or mobile menu.

### Implementation for User Story 4

- [x] T025 [P] [US4] Remove `DarkModeToggle` component from `src/components/layout/Navbar.tsx`
- [x] T026 [P] [US4] Remove `DarkModeToggle` component from `src/components/layout/MobileDrawer.tsx`
- [x] T027 [US4] Set `darkMode: "none"` in `tailwind.config.ts`
- [x] T028 [US4] Strip all `dark:` utilities from `src/app/globals.css`
- [x] T029 [US4] Strip all `dark:` utilities from `src/components/layout/Navbar.tsx`
- [x] T030 [US4] Strip all `dark:` utilities from `src/components/layout/MobileDrawer.tsx`
- [x] T031 [US4] Verify no remaining dark‑mode references in codebase (grep for `dark:` and `DarkModeToggle`)

---

## Phase 7: Polish & Cross‑Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 [P] Update documentation in `specs/001-location-dish-theme/quickstart.md` with final steps
- [x] T033 Code cleanup and refactoring (remove unused imports, comments)
- [x] T034 Run quickstart.md validation checklist manually
- [x] T035 Verify all checklist items in `specs/001-location-dish-theme/checklists/requirements.md` are still PASS
- [ ] T036 Commit changes with descriptive commit message

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3‑6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed) or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Models before services (if any)
- Services before endpoints (if any)
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models for User Story 1 together:
Task: "Create LocationPrompt component in src/components/ui/LocationPrompt.tsx"
Task: "Add localStorage key in src/lib/localStorage.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (not applicable here as no automated tests)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

*Generated on 2026‑09‑20 as part of the `/sp.tasks` workflow for feature `001-location-dish-theme`.*