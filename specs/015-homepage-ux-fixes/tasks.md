# Tasks: Homepage UX Fixes

**Input**: Design documents from `/specs/015-homepage-ux-fixes/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Not explicitly requested in feature specification. Manual verification only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

**Status**: Existing Next.js project already set up. No setup tasks required.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**Status**: No foundational tasks required. All changes are component-level modifications within existing architecture.

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Menu Navigation Works Instantly (Priority: P1) 🎯 MVP

**Goal**: Fix all 5 broken menu navigation paths so menu page loads immediately with items visible

**Independent Test**: Click "Menu" in navbar, "View Full Menu" on homepage, "Browse Menu" in empty cart, "Order Now" in Signature Dishes, and "View All Categories" in Popular Categories. All should load menu page with items visible within 1 second.

### Implementation for User Story 1

- [x] T001 [US1] Replace useSearchParams() with useEffect + window.location.search in src/components/menu/MenuClientContent.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Homepage Specialties Shows 4 Items (Priority: P2)

**Goal**: Reduce "Our Specialties" section from 11 items to exactly 4 featured items

**Independent Test**: Scroll to "Our Specialties" section on homepage. Verify exactly 4 items displayed: Zinger Burger, Grill Chargha, Club Sandwich, Boneless Creamy Handi.

### Implementation for User Story 2

- [x] T002 [P] [US2] Set is_featured: false on items 301, 401, 601, 801, 1001, 1201, 1301 in src/lib/menu-data.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - CTA Section Promotes Dine-In (Priority: P2)

**Goal**: Transform CTA section from delivery-focused to dine-in focused with specific text

**Independent Test**: Scroll to CTA section on homepage. Verify heading "Ready to Dine at Our Restaurant", no WhatsApp button, "Reserve a Table" button present, and dine-in text visible.

### Implementation for User Story 3

- [x] T003 [P] [US3] Update CTABanner.tsx: change heading, remove WhatsApp button, add dine-in text, keep Reserve a Table button in src/components/home/CTABanner.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Floating Icons in Correct Positions (Priority: P3)

**Goal**: Rotate floating icons to new positions per user's request

**Independent Test**: Verify chatbot at bottom-6 right-6, WhatsApp at bottom-24 left-6, scroll-to-top at bottom-24 right-6.

### Implementation for User Story 4

- [x] T004 [P] [US4] Update SpooniFAB.tsx position from bottom-24 right-6 to bottom-6 right-6 in src/components/ui/SpooniFAB.tsx
- [x] T005 [P] [US4] Update WhatsAppButton.tsx position from bottom-6 right-6 to bottom-24 left-6 in src/components/ui/WhatsAppButton.tsx
- [x] T006 [P] [US4] Update BackToTop.tsx position from bottom-24 left-6 to bottom-24 right-6 in src/components/ui/BackToTop.tsx
- [x] T007 [P] [US4] Update GroqChatWidget.tsx position from bottom-24 right-6 to bottom-6 right-6 in src/components/chat/GroqChatWidget.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - Hero Section Text Clearly Visible (Priority: P3)

**Goal**: Increase hero overlay opacity for better text readability

**Independent Test**: View hero section. Verify text "Where Every Bite Tells a Story" and all button text clearly readable against background.

### Implementation for User Story 5

- [x] T008 [P] [US5] Change hero overlay from bg-black/20 to bg-black/40 in src/components/home/Hero.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T009 Run npm run build to verify no build errors
- [x] T010 Run npm run lint to verify no lint errors
- [x] T011 Run quickstart.md validation checklist

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

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3/US4 but should be independently testable

### Within Each User Story

- Models before services (N/A - no new models)
- Services before endpoints (N/A - no new endpoints)
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 4 (Floating Icons)

```bash
# Launch all floating icon position updates together (all independent files):
Task: "Update SpooniFAB.tsx position in src/components/ui/SpooniFAB.tsx"
Task: "Update WhatsAppButton.tsx position in src/components/ui/WhatsAppButton.tsx"
Task: "Update BackToTop.tsx position in src/components/ui/BackToTop.tsx"
Task: "Update GroqChatWidget.tsx position in src/components/chat/GroqChatWidget.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (N/A - existing project)
2. Complete Phase 2: Foundational (N/A - no blockers)
3. Complete Phase 3: User Story 1 (Fix menu loading)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Menu loading fix)
   - Developer B: User Story 2 (Specialties) + User Story 3 (CTA)
   - Developer C: User Story 4 (Floating icons) + User Story 5 (Hero overlay)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (N/A - no tests requested)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
