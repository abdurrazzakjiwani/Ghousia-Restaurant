# Tasks: Ghousia Golden Spoon Restaurant Website

**Input**: Design documents from `/specs/001-restaurant-website/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 14 project with TypeScript in project root
- [x] T002 [P] Install dependencies: tailwindcss, @supabase/supabase-js, groq-sdk, lucide-react
- [x] T003 [P] Configure Tailwind CSS with dark mode support in tailwind.config.ts
- [x] T004 [P] Create .env.local with Supabase URL, Supabase Anon Key, Groq API Key, WhatsApp number
- [x] T005 [P] Create TypeScript interfaces in src/types/index.ts (Category, MenuItem, Order, OrderItem, Reservation, Review, Contact, ChatMessage)
- [x] T006 [P] Create Supabase client helper in src/lib/supabase.ts
- [x] T007 [P] Create Groq client helper in src/lib/groq.ts
- [x] T008 [P] Create utility functions in src/lib/utils.ts (formatPrice, generateWhatsAppUrl, cn)
- [x] T009 [P] Create food image directory structure in public/images/food/{category}/
- [x] T010 [P] Move existing food images (Zinger Burger.png, etc.) to correct category folders

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout and shared components that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T011 Create root layout with Navbar and Footer in src/app/layout.tsx
- [x] T012 [P] Create Navbar component with navigation links, logo, and dark mode toggle slot in src/components/layout/Navbar.tsx
- [x] T013 [P] Create Footer component with restaurant info, social links, and WhatsApp in src/components/layout/Footer.tsx
- [x] T014 [P] Create Button UI component in src/components/ui/Button.tsx
- [x] T015 [P] Create Card UI component in src/components/ui/Card.tsx
- [x] T016 [P] Create Modal UI component in src/components/ui/Modal.tsx
- [x] T017 [P] Create WhatsApp floating button component in src/components/ui/WhatsAppButton.tsx
- [x] T018 Create useCart hook with localStorage persistence in src/hooks/useCart.ts
- [x] T019 Create useTheme hook with localStorage persistence in src/hooks/useTheme.ts
- [x] T020 Create menu data configuration with all 13 categories and 57+ items in src/lib/menu-data.ts
- [x] T021 Create globals.css with Tailwind directives and custom styles in src/app/globals.css
- [x] T022 Create home page placeholder in src/app/page.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browse Menu and Place Order (Priority: P1) MVP

**Goal**: Customer can browse 13 food categories, view items with images/prices, add to cart, and order via WhatsApp

**Independent Test**: Visit menu page, filter by category, add items to cart, click order button → WhatsApp opens with pre-filled message to +92 301 3631555

### Implementation for User Story 1

- [x] T023 [P] [US1] Create CategoryFilter component with tab navigation in src/components/menu/CategoryFilter.tsx
- [x] T024 [P] [US1] Create MenuCard component displaying item image, name, price, add-to-cart button in src/components/menu/MenuCard.tsx
- [x] T025 [P] [US1] Create MenuGrid component with responsive grid layout in src/components/menu/MenuGrid.tsx
- [x] T026 [US1] Create menu page with category filter, search, and menu grid in src/app/menu/page.tsx
- [x] T027 [US1] Create OrderSummary component showing cart items, quantities, totals in src/components/order/OrderSummary.tsx
- [x] T028 [US1] Create order page with cart display and WhatsApp order button in src/app/order/page.tsx
- [x] T029 [US1] Implement WhatsApp link generation with pre-filled order message in src/lib/utils.ts
- [x] T030 [US1] Create home page with Hero section, featured menu items, and CTA in src/app/page.tsx
- [x] T031 [P] [US1] Create Hero component with restaurant name, tagline, and order button in src/components/home/Hero.tsx
- [x] T032 [P] [US1] Create FeaturedMenu component showing featured items in src/components/home/FeaturedMenu.tsx

**Checkpoint**: Menu browsing and WhatsApp ordering fully functional - MVP ready

---

## Phase 4: User Story 2 - View Restaurant Information (Priority: P2)

**Goal**: Customer can view About page, Location page with map, Contact page with form, and click-to-call phone numbers

**Independent Test**: Visit About/Location/Contact pages, verify content displays, map loads, contact form submits, phone numbers are clickable

### Implementation for User Story 2

- [x] T033 [P] [US2] Create About page with restaurant story, values, and gallery in src/app/about/page.tsx
- [x] T034 [P] [US2] Create MapEmbed component with Google Maps free embed in src/components/contact/MapEmbed.tsx
- [x] T035 [P] [US2] Create Location page with map, address, and hours in src/app/location/page.tsx
- [x] T036 [P] [US2] Create ContactForm component with name, phone, email, message fields in src/components/contact/ContactForm.tsx
- [x] T037 [US2] Create Contact page with form and phone numbers in src/app/contact/page.tsx
- [x] T038 [US2] Create POST /api/contacts endpoint for form submissions in src/app/api/contacts/route.ts
- [x] T039 [US2] Create AboutPreview component for home page in src/components/home/AboutPreview.tsx

**Checkpoint**: Restaurant information pages fully functional with contact form

---

## Phase 5: User Story 3 - Dark Mode Toggle (Priority: P3)

**Goal**: Customer can toggle dark mode from navbar, preference persists across sessions and pages

**Independent Test**: Click dark mode toggle → entire site switches to dark theme → preference persists after page reload

### Implementation for User Story 3

- [x] T040 [P] [US3] Create DarkModeToggle component with sun/moon icon in src/components/ui/DarkModeToggle.tsx
- [x] T041 [US3] Integrate DarkModeToggle into Navbar component in src/components/layout/Navbar.tsx
- [x] T042 [US3] Add dark mode color variants to all components (MenuCard, Card, Button, etc.)
- [x] T043 [US3] Configure Tailwind dark mode with class strategy in tailwind.config.ts
- [x] T044 [US3] Update globals.css with dark mode base styles in src/app/globals.css

**Checkpoint**: Dark mode fully functional across all pages

---

## Phase 6: User Story 4 - Table Reservation (Priority: P4)

**Goal**: Customer can fill reservation form with name, phone, date, time, guests and submit to database

**Independent Test**: Fill reservation form with valid data → confirmation message → reservation saved to Supabase

### Implementation for User Story 4

- [x] T045 [P] [US4] Create ReservationForm component with validation in src/components/reservation/ReservationForm.tsx
- [x] T046 [US4] Create reservation page with form in src/app/reservation/page.tsx
- [x] T047 [US4] Create POST /api/reservations endpoint with validation in src/app/api/reservations/route.ts
- [x] T048 [US4] Add reservation form validation (future dates, business hours, required fields)

**Checkpoint**: Table reservation system fully functional

---

## Phase 7: User Story 5 - Live Order Tracking (Priority: P5)

**Goal**: Customer can enter phone number and see order status with visual progress indicator

**Independent Test**: Enter phone number with existing order → status displayed with progress indicator

### Implementation for User Story 5

- [x] T049 [P] [US5] Create OrderTracker component with progress indicator in src/components/tracking/OrderTracker.tsx
- [x] T050 [US5] Create tracking page with phone lookup in src/app/tracking/page.tsx
- [x] T051 [US5] Create GET /api/orders endpoint for phone lookup in src/app/api/orders/route.ts

**Checkpoint**: Order tracking fully functional

---

## Phase 8: User Story 6 - Customer Reviews and Ratings (Priority: P6)

**Goal**: Customer can submit reviews with 1-5 star rating and comment, approved reviews display on website

**Independent Test**: Submit review → saved for moderation → approved reviews display with name, rating, comment

### Implementation for User Story 6

- [x] T052 [P] [US6] Create ReviewForm component with star rating and comment in src/components/reviews/ReviewForm.tsx
- [x] T053 [P] [US6] Create ReviewList component displaying approved reviews in src/components/reviews/ReviewList.tsx
- [x] T054 [US6] Create POST /api/reviews endpoint for review submission in src/app/api/reviews/route.ts
- [x] T055 [US6] Create GET /api/reviews endpoint for approved reviews in src/app/api/reviews/route.ts
- [x] T056 [US6] Integrate reviews section into home page in src/app/page.tsx

**Checkpoint**: Review system fully functional with moderation workflow

---

## Phase 9: User Story 7 - AI Chatbot Assistant (Priority: P7)

**Goal**: Customer can chat with AI assistant, browse menu, get recommendations, and place orders via WhatsApp

**Independent Test**: Open chat widget → AI greets → ask about menu → AI responds → confirm order → WhatsApp opens with pre-filled message

### Implementation for User Story 7

- [x] T057 [P] [US7] Create ChatMessage component for displaying messages in src/components/chat/ChatMessage.tsx
- [x] T058 [P] [US7] Create ChatWidget component with open/close, message list, input field in src/components/chat/ChatWidget.tsx
- [x] T059 [US7] Create useChat hook for managing chat state and API calls in src/hooks/useChat.ts
- [x] T060 [US7] Create POST /api/chat endpoint with Groq integration in src/app/api/chat/route.ts
- [x] T061 [US7] Design Groq system prompt with full menu data and order extraction logic in src/lib/groq.ts
- [x] T062 [US7] Integrate ChatWidget into root layout in src/app/layout.tsx
- [x] T063 [US7] Implement WhatsApp URL generation from chat order data

**Checkpoint**: AI chatbot fully functional with menu assistance and order placement

---

## Phase 10: User Story 8 - Delivery Zone Check (Priority: P8)

**Goal**: Customer can enter address and confirm delivery availability for all Karachi areas

**Independent Test**: Enter any Karachi address → system confirms delivery available

### Implementation for User Story 8

- [x] T064 [P] [US8] Create delivery zone checker component (inline on order/contact page)
- [x] T065 [US8] Create POST /api/delivery-check endpoint in src/app/api/delivery-check/route.ts
- [x] T066 [US8] Integrate delivery checker into order page in src/app/order/page.tsx

**Checkpoint**: Delivery zone checker fully functional

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T067 [P] Add SEO metadata to all pages using Next.js Metadata API
- [x] T068 [P] Add Open Graph meta tags for social sharing
- [x] T069 [P] Ensure all pages are responsive on mobile, tablet, and desktop
- [x] T070 [P] Add loading states and error boundaries for all pages
- [x] T071 [P] Optimize images with Next.js Image component
- [x] T072 Run quickstart.md validation checklist
- [x] T073 Final testing across Chrome, Firefox, Safari, Edge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - User stories can proceed in priority order (P1 → P2 → P3...)
  - Or in parallel if team capacity allows
- **Polish (Phase 11)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Independent of US1
- **User Story 3 (P3)**: Can start after Foundational - Affects all components (apply dark mode variants)
- **User Story 4 (P4)**: Can start after Foundational - Independent
- **User Story 5 (P5)**: Can start after Foundational - Uses order data from US1
- **User Story 6 (P6)**: Can start after Foundational - Independent
- **User Story 7 (P7)**: Can start after Foundational - Independent (uses menu data)
- **User Story 8 (P8)**: Can start after Foundational - Independent

### Within Each User Story

- Models/types before components
- Components before pages
- Pages before API routes (or in parallel if different files)
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational completes, all user stories can start in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all US1 components together:
Task: "Create CategoryFilter component in src/components/menu/CategoryFilter.tsx"
Task: "Create MenuCard component in src/components/menu/MenuCard.tsx"
Task: "Create MenuGrid component in src/components/menu/MenuGrid.tsx"
Task: "Create Hero component in src/components/home/Hero.tsx"
Task: "Create FeaturedMenu component in src/components/home/FeaturedMenu.tsx"

# Then pages and integration:
Task: "Create menu page in src/app/menu/page.tsx"
Task: "Create order page in src/app/order/page.tsx"
Task: "Create home page in src/app/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Menu + Ordering)
4. **STOP and VALIDATE**: Test menu browsing and WhatsApp ordering
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Menu + Ordering) → Test → Deploy/Demo (MVP!)
3. Add US2 (Info Pages) → Test → Deploy/Demo
4. Add US3 (Dark Mode) → Test → Deploy/Demo
5. Add US4 (Reservations) → Test → Deploy/Demo
6. Add US5 (Order Tracking) → Test → Deploy/Demo
7. Add US6 (Reviews) → Test → Deploy/Demo
8. Add US7 (AI Chatbot) → Test → Deploy/Demo
9. Add US8 (Delivery Check) → Test → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Total tasks: 73
