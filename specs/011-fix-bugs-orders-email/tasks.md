# Tasks: Bug Fixes, Order Persistence & Email Notifications

**Input**: Design documents from `/specs/011-fix-bugs-orders-email/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested — manual testing only per quickstart.md checklist.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and configure environment

- [x] T001 Install resend and react-email packages via `npm install resend react-email`
- [x] T002 Add RESEND_API_KEY and RESTAURANT_EMAIL to .env.local
- [x] T003 Run database migration SQL in Supabase dashboard (add order_number, customer_email, order_status, payment_method columns + unique index)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and cart context that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Update CustomerOrder and Order types in src/types/index.ts (add order_number, customer_email, order_status, payment_method fields)
- [x] T005 [P] Create CartContext in src/contexts/CartContext.tsx (React Context with CartProvider, useState + localStorage persistence, addItem/removeItem/updateQuantity/clearCart/total/itemCount)
- [x] T006 Rewrite useCart hook in src/hooks/useCart.ts as thin wrapper around useContext(CartContext)
- [x] T007 Wrap app with CartProvider in src/app/layout.tsx (import CartContext, nest inside ChatProvider)

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — Cart & Navigation Bug Fixes (Priority: P1) 🎯 MVP

**Goal**: Fix category dropdown navigation, search navigation, cart badge reactivity, and add quantity controls to menu modal

**Independent Test**: (1) Click category in navbar → shows only that category's items, (2) Search and click result → navigates to item with highlight, (3) Add/remove cart items → badge updates instantly, (4) Open menu modal → +/- quantity controls visible

### Implementation for User Story 1

- [x] T008 [P] [US1] Fix category dropdown navigation in src/app/menu/page.tsx — read ?category= searchParam and initialize selectedCategory state from it
- [x] T009 [P] [US1] Fix search navigation in src/components/layout/MainNav.tsx — change handleSearchNavigate to call router.push(path) instead of setting local state
- [x] T010 [P] [US1] Update CartBadge in src/components/layout/CartBadge.tsx — replace useCart() with useCart() from CartContext (same API, different source)
- [x] T011 [US1] Add quantity controls to src/components/menu/MenuItemModal.tsx — local quantity state (1-20), minus button (disabled at 1), quantity display, plus button (disabled at 20), update onAddToCart callback to pass quantity
- [x] T012 [US1] Update MenuCard in src/components/menu/MenuCard.tsx — pass quantity parameter to onAddToCart call in modal trigger

**Checkpoint**: All 4 bug fixes complete — category nav, search nav, cart reactivity, quantity controls

---

## Phase 4: User Story 2 — Order Persistence & Tracking (Priority: P1)

**Goal**: Connect checkout to Supabase API with unique order numbers, add thank you page, add real-time tracking with 30-second polling

**Independent Test**: (1) Complete checkout → order saved to DB with order_number, (2) Thank you page shows order number + summary, (3) Tracking page shows order status, (4) Status auto-refreshes every 30 seconds, (5) Invalid order number shows "not found"

### Implementation for User Story 2

- [x] T013 [P] [US2] Create order number generation utility in src/lib/orders.ts — generateOrderNumber() function with GGS-YYYYMMDD-XXXX format, Supabase count query for sequence, retry logic on unique constraint violation
- [x] T014 [US2] Enhance POST /api/orders in src/app/api/orders/route.ts — call generateOrderNumber(), accept customer_email field, insert order_number/customer_email/order_status/payment_method, trigger email send (try/catch, non-blocking), return order_number in response
- [x] T015 [US2] Enhance GET /api/orders in src/app/api/orders/route.ts — accept ?order_number= query param in addition to ?phone=, return 404 for not found, validate at least one param provided
- [x] T016 [US2] Modify CheckoutStep2 in src/components/order/CheckoutStep2.tsx — add fetch() POST to /api/orders before WhatsApp, add loading state, on success redirect to /thank-you?order={orderNumber}, preserve WhatsApp link as secondary action
- [x] T017 [P] [US2] Create thank you page in src/app/thank-you/page.tsx — read ?order= param, fetch order from API, display order number/summary/estimated time (30 min), link to tracking page, loading skeleton
- [x] T018 [US2] Enhance tracking page in src/app/tracking/page.tsx — add order number input field, support ?order= URL param, add 30-second polling with setInterval + cleanup on unmount, show "Order not found" for invalid numbers

**Checkpoint**: Orders persist to DB, thank you page works, tracking with polling works

---

## Phase 5: User Story 3 — Email Notifications (Priority: P2)

**Goal**: Send email notifications to restaurant and customers when orders are placed

**Independent Test**: (1) Place order → restaurant receives email, (2) Provide email → customer receives confirmation, (3) Email failure doesn't block order

### Implementation for User Story 3

- [x] T019 [P] [US3] Create Resend client in src/lib/email/resend.ts — initialize Resend with RESEND_API_KEY, export sendEmail function
- [x] T020 [P] [US3] Create restaurant email template in src/emails/RestaurantAlert.tsx — React Email component with order number, customer name/phone, items list, total, address, order mode
- [x] T021 [P] [US3] Create customer email template in src/emails/OrderConfirmation.tsx — React Email component with order number, order summary, total, tracking link
- [x] T022 [US3] Create email send utility in src/lib/email/send.ts — sendRestaurantAlert() and sendCustomerConfirmation() functions, call Resend, wrap in try/catch for non-blocking
- [x] T023 [US3] Wire email into order API in src/app/api/orders/route.ts — call sendRestaurantAlert after order insert, call sendCustomerConfirmation if customer_email provided, both in try/catch (non-blocking)
- [x] T024 [P] [US3] Create email API endpoint in src/app/api/email/send/route.ts — POST handler for manual email sending (internal use), validate to/subject/order_number, call Resend

**Checkpoint**: Email notifications working — restaurant and customer both receive emails

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, validation, deployment

- [x] T025 Run `npm run lint` and fix any warnings
- [x] T026 Run `npm run build` and verify no errors
- [x] T027 Validate all acceptance scenarios from spec.md manually
- [x] T028 Deploy to production via `npx vercel --prod --yes`
- [x] T029 Verify production deployment at https://ghousiagoldenweb.vercel.app

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (npm install for CartContext) — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 (CartContext must exist) — No dependency on US2/US3
- **US2 (Phase 4)**: Depends on Phase 2 (types must be updated) — No dependency on US1/US3
- **US3 (Phase 5)**: Depends on Phase 1 (resend installed) and Phase 2 (types) — Depends on US2 (email wired into order API)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (Cart & Nav Fixes)**: Independent — can start after Phase 2
- **US2 (Order Persistence)**: Independent — can start after Phase 2
- **US3 (Email)**: Depends on US2 (email is triggered from order creation flow)

### Within Each User Story

- Types/models before services
- Services before endpoints
- Endpoints before UI integration
- Core implementation before polish

### Parallel Opportunities

- **Phase 1**: T001, T002, T003 can all run in parallel
- **Phase 2**: T004 and T005 can run in parallel
- **Phase 3**: T008, T009, T010 can all run in parallel (different files)
- **Phase 4**: T013 and T017 can run in parallel (different files)
- **Phase 5**: T019, T020, T021 can all run in parallel (different files)
- **Cross-story**: US1 and US2 can be worked on in parallel after Phase 2

---

## Parallel Example: User Story 1

```text
# Launch all parallel US1 tasks together:
Task: "Fix category dropdown navigation in src/app/menu/page.tsx"
Task: "Fix search navigation in src/components/layout/MainNav.tsx"
Task: "Update CartBadge in src/components/layout/CartBadge.tsx"

# Then sequential US1 tasks:
Task: "Add quantity controls to src/components/menu/MenuItemModal.tsx"
Task: "Update MenuCard in src/components/menu/MenuCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (install deps, env vars, DB migration)
2. Complete Phase 2: Foundational (types, CartContext, layout)
3. Complete Phase 3: User Story 1 (category nav, search nav, cart reactivity, quantity)
4. **STOP and VALIDATE**: Test all 4 bug fixes independently
5. Deploy if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy (MVP — all bugs fixed!)
3. Add US2 → Test independently → Deploy (orders persist + tracking!)
4. Add US3 → Test independently → Deploy (email notifications!)
5. Polish → Final validation → Production deployment

### Recommended Order

Since US1 and US2 are both P1 and independent, implement in this order:
1. US1 first (bug fixes — quickest win, improves UX immediately)
2. US2 second (order persistence — core business value)
3. US3 third (email — depends on US2's order API)

---

## Notes

- [P] tasks = different files, no dependencies between them
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Database migration (T003) is manual — run SQL in Supabase dashboard
- Email uses Resend test domain — no DNS verification needed
- WhatsApp flow is preserved as secondary option alongside API-based ordering
