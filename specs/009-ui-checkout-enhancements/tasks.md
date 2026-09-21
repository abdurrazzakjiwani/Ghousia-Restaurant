# Tasks: UI & Checkout Enhancements

**Input**: Design documents from `/specs/009-ui-checkout-enhancements/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: Not explicitly requested. Tests are OPTIONAL.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source code**: `src/` at repository root
- **Components**: `src/components/`
- **Pages**: `src/app/`

---

## Phase 1: Setup (Clock Removal — US1)

**Purpose**: Remove the real-time clock from the header navigation

**⚠️ CRITICAL**: This is a quick-win that should be done first

- [X] T001 Remove `<Clock />` import and usage from `src/components/layout/Navbar.tsx` (line 7 import, line 54 desktop, line 92 mobile)
- [X] T002 Delete `src/components/ui/Clock.tsx` (no other files use this component)

**Checkpoint**: Header displays no clock on any page (desktop or mobile)

---

## Phase 2: User Story 2 — Menu Item Detail Modal (Priority: P1)

**Goal**: Customer clicks menu item → modal opens with image, description, Add to Cart, Continue Order

**Independent Test**: Click any menu item card on `/menu` → modal appears with full details and action buttons

### Implementation for User Story 2

- [X] T003 [P] [US2] Create `src/components/menu/MenuItemModal.tsx` — new component using existing `Modal.tsx` wrapper, receives `MenuItem`, shows full image, complete description, price, "Add to Cart" button, "Continue Order" button
- [X] T004 [US2] Modify `src/components/menu/MenuCard.tsx` — remove `<Link href={/menu/${item.id}}>` wrapper (line 33), add `onViewDetail` prop, call it on card click (image/name area)
- [X] T005 [US2] Modify `src/components/menu/MenuGrid.tsx` — pass `onViewDetail` prop through to each `MenuCard`
- [X] T006 [US2] Modify `src/app/menu/page.tsx` — add `selectedItem` state, pass `onViewDetail` handler to `MenuGrid`, render `<MenuItemModal />` with add-to-cart and continue-order handlers

**Checkpoint**: Clicking a menu item opens a modal with image, description, price, and action buttons

---

## Phase 3: User Story 3 — Two-Step Cart Checkout (Priority: P2)

**Goal**: Two-step checkout: Step 1 (cart + customer details) → Step 2 (confirm + WhatsApp)

**Independent Test**: Add items to cart → navigate to `/order` → fill details → confirm → WhatsApp opens with complete message

### Implementation for User Story 3

- [X] T007 [P] [US3] Create `src/components/order/CheckoutStep1.tsx` — cart items list with quantity controls (reuse `OrderSummary`), customer details form (name, phone, order mode using `OrderModeSelector`), "Continue to Confirm" button, validation
- [X] T008 [P] [US3] Create `src/components/order/CheckoutStep2.tsx` — order summary with all items, customer details display, order mode, total price, "Place Order via WhatsApp" button using `generateFullOrderMessage()` + `generateWhatsAppUrl()`, "Back" button
- [X] T009 [US3] Rewrite `src/app/order/page.tsx` — two-step wizard with `step` state (`"details" | "confirm"`), render `CheckoutStep1` or `CheckoutStep2` based on step, manage `CheckoutDetails` state, handle empty cart case

**Checkpoint**: Complete 2-step checkout flow sends full order details to WhatsApp (+923013631555)

---

## Phase 4: User Story 4 — Grill Chargha Animation (Priority: P3)

**Goal**: Rotating plate animation on home page below "Our Specialties" section

**Independent Test**: Visit home page → scroll past Our Specialties → see rotating Grill Chargha plate with overlaid text

### Implementation for User Story 4

- [X] T010 [P] [US4] Create `src/components/home/GrillCharghaShowcase.tsx` — CSS `@keyframes` rotation animation (8s linear infinite), circular plate container with Grill Chargha image (`/images/food/chargha/Grill Chargha.png`), static text overlay (name, description, price), Framer Motion scroll-triggered reveal, click navigates to `/menu`
- [X] T011 [US4] Modify `src/app/page.tsx` — import and render `<GrillCharghaShowcase />` after `<FeaturedMenu />` (after "Our Specialties" section)

**Checkpoint**: Home page shows rotating Grill Chargha plate animation with descriptive text overlay

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [X] T012 Run `npm run lint` and fix any ESLint errors
- [X] T013 Run `npm run build` and verify no build errors
- [X] T014 Verify all quickstart.md validation scenarios pass (10 scenarios)
- [X] T015 Deploy to Vercel and verify production build

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **US2 - Modal (Phase 2)**: No dependencies — can start immediately (independent of Phase 1)
- **US3 - Checkout (Phase 3)**: No dependencies — can start immediately (independent of Phase 1 and 2)
- **US4 - Animation (Phase 4)**: No dependencies — can start immediately (independent of all others)
- **Polish (Phase 5)**: Depends on all previous phases being complete

### User Story Dependencies

- **US1 (P1)**: Clock removal — independent
- **US2 (P1)**: Menu modal — independent
- **US3 (P2)**: Checkout flow — independent (but benefits from US2's "Continue Order" button)
- **US4 (P3)**: Animation — independent

### Within Each Phase

- Image copy tasks can run in parallel
- Component creation tasks can run in parallel if different files
- Page modifications must be sequential (same file)

### Parallel Opportunities

- **Phase 1**: T001 and T002 can run in parallel (different files)
- **Phase 2**: T003 can run in parallel with Phase 1 (different files)
- **Phase 3**: T007 and T008 can run in parallel (different files)
- **Phase 4**: T010 can run in parallel with Phase 2 and 3 (different files)
- **Cross-phase**: Phase 1, 2, 3, and 4 can all run in parallel (no shared files)

---

## Implementation Strategy

### MVP First (User Stories 1+2 Combined)

1. Complete Phase 1: Remove clock (2 min)
2. Complete Phase 2: Menu item modal (20 min)
3. **STOP and VALIDATE**: Test modal on menu page
4. Continue with Phase 3 or 4

### Incremental Delivery

1. Complete Phase 1 → Clock removed (deployable)
2. Complete Phase 2 → Modal working (deployable)
3. Complete Phase 3 → Checkout complete (deployable)
4. Complete Phase 4 → Animation added (deployable)
5. Complete Phase 5 → Polish and final deploy

### Recommended Delivery Order

1. **Phase 1**: Clock removal — ~2 min
2. **Phase 2**: Menu modal — ~20 min
3. **Phase 3**: Checkout flow — ~30 min
4. **Phase 4**: Animation — ~20 min
5. **Phase 5**: Polish — ~10 min

**Total estimated time**: ~82 minutes

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All 4 user stories are independent and can be developed in any order
- Reuses existing components: Modal, useCart, OrderSummary, OrderModeSelector, generateFullOrderMessage
- No new API endpoints needed — all changes are client-side
- Cart state unchanged (localStorage via useCart hook)
- WhatsApp integration uses existing wa.me deep linking
