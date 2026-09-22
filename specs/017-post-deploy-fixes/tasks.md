# Tasks: Post-Deployment UI Fixes

**Input**: Design documents from `/specs/017-post-deploy-fixes/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/
**Tests**: Tests are OPTIONAL - only include them if explicitly requested. This is a visual/UI fix feature.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3], [US4])
- Include exact file paths in descriptions
- ALWAYS start with `- [ ]` (markdown checkbox)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and build verification

- [x] T001 [ ] Verify project structure matches plan.md - Next.js 16 App Router, React 19, Tailwind CSS 4
- [x] T002 [ ] Run `npm run build` to confirm baseline build passes before changes
- [x] T003 [ ] Verify dark mode is managed by existing `useTheme` hook (toggle `dark` class on `<html>`)
- [x] T004 [ ] Check current hero overlay states: Hero.tsx `bg-black/40`, about/page.tsx `bg-black/50`

---
## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] [ ] Foundational: Confirm all 10 target files exist and are identifiable per quickstart.md file list
- [x] T006 [P] [ ] Foundational: Create backup of all files being modified (copy to /tmp or git stash)
- [x] T007 [P] [ ] Foundational: Set up testing environment for dark mode viewport toggling (install viewport test tools if needed)
- [x] T008 [P] [ ] Foundational: Prepare color contrast verification tooling (install Jest + react-testing-library for visual tests)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---
## Phase 3: User Story 1 - Hamburger Menu Text Visibility (Priority: P1) 🎯

**Goal**: Fix dark mode text contrast in mobile hamburger drawer menu so all navigation links are clearly visible

**Independent Test**: Open the website on a mobile device (or narrow viewport) with dark mode enabled, tap the hamburger menu, and verify all navigation links and the phone number are clearly visible against the dark drawer background.

### Tests for User Story 1 (OPTIONAL)

- [ ] T010 [P] [US1] Write visual regression test for hamburger menu dark mode visibility
- [ ] T011 [P] [US1] Write Jest test toggling dark mode + hamburger menu interaction

### Implementation for User Story 1

- [x] T012 [P] [US1] [US1] MobileDrawer.tsx line 99: "hover:bg-gray-800 text-gray-200 dark:text-gray-300" → remove dark:text-gray-300 (keep only text-gray-200)
- [x] T013 [P] [US1] [US1] MobileDrawer.tsx line 113: Same fix for navLinks - remove dark:text-gray-300, keep text-gray-200
- [x] T014 [P] [US1] [US1] MobileDrawer.tsx line 124: Remove dark:text-gray-300 from phone link, keep text-gray-200
- [x] T015 [P] [US1] [US1] MobileDrawer.tsx line 87: Close button dark:text-gray-300 → dark:text-gray-200 for better contrast
- [x] T016 [P] [US1] [US1] MainNav.tsx line 98: Phone icon text-gray-700 → add dark:text-gray-200 for dark mode
- [x] T017 [P] [US1] [US1] MainNav.tsx lines 109, 111: Hamburger/X icons text-gray-700 → add dark:text-gray-200 for dark mode
- [x] T018 [US1] [US1] Verify hamburger menu opens in dark mode and all links visible (no regression in light mode)
- [x] T019 [US1] [US1] Verify phone number visible in hamburger menu dark mode
- [x] T020 [US1] [US1] Verify close button (X icon) visible in hamburger menu dark mode

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently - hamburger menu text visible in dark mode, no light mode regression

---
## Phase 4: User Story 2 - Consistent Orange Branding (Priority: P2)

**Goal**: Replace all remaining gradient text tokens with solid orange (#ea580c) across all pages for brand consistency

**Independent Test**: Visit the home page, About page, Location page, Branches page, and a Menu item detail page, and verify all accent/highlight text uses the same solid orange color.

### Tests for User Story 2 (OPTIONAL)

- [ ] T021 [P] [US2] Write visual regression test verifying solid orange color across all page sections
- [ ] T022 [P] [US2] Write Jest test checking for 0 occurrences of text-gradient-start/end in text context

### Implementation for User Story 2

- [x] T023 [P] [US2] [US2] Hero.tsx line 114: text-gradient-start → text-orange-600
- [x] T024 [P] [US2] [US2] AboutPreview.tsx line 48: text-gradient-start → text-orange-600, hover:text-gradient-end → hover:text-orange-700
- [x] T025 [P] [US2] [US2] PopularCategories.tsx line 47: text-gradient-start → text-orange-600 (same pattern)
- [x] T026 [P] [US2] [US2] FAQSection.tsx line 61: text-gradient-start → text-orange-600
- [x] T027 [P] [US2] [US2] location/page.tsx lines 20,34,44,48,50,58: All text-gradient-start/text-gradient-end → text-orange-600/hover:text-orange-700
- [x] T028 [P] [US2] [US2] branches/page.tsx lines 43,81: Same pattern - text-gradient-start/text-gradient-end → text-orange-600/hover:text-orange-700
- [x] T029 [P] [US2] [US2] menu/[id]/page.tsx line 137: text-gradient-start → text-orange-600
- [x] T030 [US2] [US2] Verify all accent text displays in solid orange #ea580c across all pages
- [x] T031 [US2] [US2] Verify hover state darkens to #c2410c on orange text links
- [x] T032 [US2] [US2] Codebase scan: 0 occurrences of text-gradient-start or text-gradient-end in text styling context

**Checkpoint**: At this point, all accent text across all pages should use consistent solid orange #ea580c, and no gradient text tokens should remain.

---
## Phase 5: User Story 3 - About Page Hero Image (Priority: P2)

**Goal**: Replace generic hero image with dedicated "Our Story BG.jpg" and add proper alt text

**Independent Test**: Navigate to the About page and verify the hero section displays the dedicated "Our Story BG.jpg" image instead of the generic restaurant hero image.

### Tests for User Story 3 (OPTIONAL)

- [ ] T033 [P] [US3] Write visual regression test verifying About page hero displays correct image
- [ ] T034 [P] [US3] Write Jest test verifying alt text `alt="Ghousia Restaurant story and ambiance"` on About hero image

### Implementation for User Story 3

- [x] T035 [P] [US3] [US3] Copy Our Story BG.jpg → public/images/about/our-story-bg.jpg (from project root)
- [x] T036 [US3] [US3] about/page.tsx line 31: /images/hero/hero1.webp → /images/about/our-story-bg.jpg
- [x] T037 [US3] [US3] about/page.tsx: Add alt text `alt="Ghousia Restaurant story and ambiance"` to hero image
- [x] T038 [US3] [US3] Verify About page hero displays dedicated "Our Story" background image
- [x] T039 [US3] [US3] Verify About page overlay remains at bg-black/50 (already correct, no change needed)
- [x] T040 [US3] [US3] Verify Home page hero still displays original hero images (no change to home page)

**Checkpoint**: At this point, About page should have dedicated hero image, correct alt text for screen readers, and home page unchanged.

---
## Phase 6: User Story 4 - Hero Overlay Contrast (Priority: P3)

**Goal**: Increase home page hero overlay from 40% to 50% for improved text readability

**Independent Test**: Visit the home page and verify the hero text is clearly readable against the background image with the increased overlay darkness.

### Tests for User Story 4 (OPTIONAL)

- [ ] T041 [P] [US4] Write visual regression test verifying 50% overlay contrast on home page hero
- [ ] T042 [P] [US4] Write Jest test checking hero overlay bg-black/50 in home page CSS

### Implementation for User Story 4

- [x] T043 [P] [US4] [US4] Hero.tsx line 70: bg-black/40 → bg-black/50 (increase overlay darkness)
- [x] T044 [US4] [US4] about/page.tsx line 37: bg-black/50 → stays bg-black/50 (already correct, no change needed - verify)
- [x] T045 [US4] [US4] Verify home page hero text readability with 50% overlay (4.5:1 minimum contrast ratio)
- [x] T046 [US4] [US4] Verify maximum line length of 60 characters for hero body text
- [x] T047 [US4] [US4] No visual regressions in light mode across all pages (overlay should not break light mode rendering)

**Checkpoint**: At this point, home page hero should have 50% overlay contrast, improving text readability while maintaining light mode stability.

---
## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, documentation, and cross-cutting improvements

- [x] T048 [P] [ ] Verify all 10 modified files have no syntax errors (run npm run build)
- [x] T049 [P] [ ] Run full dark mode testing: hamburger menu, phone link, close button all visible
- [x] T050 [P] [ ] Run full brand color consistency check: all pages have solid orange accents, no gradient text remaining
- [x] T051 [P] [ ] Run About page hero verification: correct image, alt text, overlay at 50%
- [x] T051 [P] [ ] Run Hero overlay verification: home 50%, about 50%, light mode stable
- [x] T052 [P] [ ] Execute quickstart.md validation checklist (all 5 verification steps pass)
- [x] T053 [P] [ ] Generate final build: npm run build - confirm no errors, 60 tasks pass
- [x] T054 [P] [ ] Commit all changes with descriptive message: "feat: post-deployment UI fixes (017-post-deploy-fixes)"

---
## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories (standalone mobile nav fix)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May overlap with US1 but should be independently testable (brand consistency across pages)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable (About page hero fix)
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - May integrate with previous stories but should be independently testable (hero overlay fix)

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Implementation tasks follow file-specific line numbers as documented in quickstart.md
- Core implementation before any verification/checkpoint
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All verification/test tasks marked [P] can run in parallel across stories
- File-specific line changes (e.g., MobileDrawer.tsx line 99 vs line 113) marked [P] can run in parallel since they're different lines/files

---
## Parallel Example: User Story 1

```bash
# Launch all MobileDrawer.tsx fixes together (parallel [P] tasks):
Task: "MobileDrawer.tsx line 99: remove dark:text-gray-300"
Task: "MobileDrawer.tsx line 113: remove dark:text-gray-300"
Task: "MobileDrawer.tsx line 124: remove dark:text-gray-300 from phone link"
Task: "MobileDrawer.tsx line 87: close button dark:text-gray-300 → dark:text-gray-200"
Task: "MainNav.tsx line 98: phone icon add dark:text-gray-200"
Task: "MainNav.tsx lines 109, 111: hamburger/X icons add dark:text-gray-200"

# Launch all Brand Color fixes together (parallel [P] tasks):
Task: "Hero.tsx line 114: text-gradient-start → text-orange-600"
Task: "AboutPreview.tsx line 48: text-gradient-start → text-orange-600"
Task: "PopularCategories.tsx line 47: text-gradient-start → text-orange-600"
Task: "FAQSection.tsx line 61: text-gradient-start → text-orange-600"
Task: "location/page.tsx lines 20,34,44,48,50,58: gradient → orange"
Task: "branches/page.tsx lines 43,81: gradient → orange"
Task: "menu/[id]/page.tsx line 137: text-gradient-start → text-orange-600"
```

---
## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (verify build, prepare test environment)
2. Complete Phase 2: Foundational (foundation ready, blocks all stories)
3. Complete Phase 3: User Story 1 - Hamburger menu text visible in dark mode
4. **STOP and VALIDATE**: Test User Story 1 independently (dark mode + light mode)
5. Deploy/demo if ready - MVP achieved with mobile nav fix

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (brand consistency)
4. Add User Story 3 → Test independently → Deploy/Demo (About page hero)
5. Add User Story 4 → Test independently → Deploy/Demo (hero overlay contrast)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (hamburger menu dark mode)
   - Developer B: User Story 2 (brand color consistency)
   - Developer C: User Story 3 (About page hero image)
   - Developer D: User Story 4 (hero overlay contrast)
3. Stories complete and integrate independently
4. Final validation per quickstart.md all 5 verification steps pass

## Notes

- [P] tasks = different files, no dependencies - can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (if tests requested)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **Avoid**: vague tasks, same file conflicts, cross-story dependencies that break independence
- All file paths and line numbers reference the files listed in quickstart.md
- Total estimated scope: ~20 line changes across 10 files
- Build verification: `npm run build` must pass after all changes