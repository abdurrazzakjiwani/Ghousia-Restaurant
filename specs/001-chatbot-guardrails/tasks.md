# Tasks: Chatbot Guardrails & Dynamic Data

**Input**: Design documents from `/specs/001-chatbot-guardrails/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/

**Tests**: Not explicitly requested in the feature specification. Tests are OPTIONAL.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source code**: `src/` at repository root
- **Components**: `src/components/`
- **Lib utilities**: `src/lib/`
- **API routes**: `src/app/api/`
- **Styles**: `src/app/globals.css`

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Create shared guardrail and context-building modules that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 [P] Create `src/lib/guardrails.ts` with English profanity keyword list (20-30 common offensive words)
- [X] T002 [P] Create `src/lib/guardrails.ts` with Roman Urdu/Roman Hindi profanity keyword list (15-20 common Pakistani offensive words)
- [X] T003 [P] Create `src/lib/guardrails.ts` with `isAbusive(message: string): boolean` function (case-insensitive regex with word boundaries)
- [X] T004 [P] Create `src/lib/guardrails.ts` with restaurant-related keyword list (100+ terms covering menu, branches, hours, delivery, food items, etc.)
- [X] T005 [P] Create `src/lib/guardrails.ts` with `isRestaurantContext(message: string): boolean` function
- [X] T006 [P] Create `src/lib/guardrails.ts` with `OFFTOPIC_REFUSALS` array (5 polite refusal messages with varied closings)
- [X] T007 [P] Create `src/lib/guardrails.ts` with `ABUSE_REFUSALS` array (3 polite refusal messages)
- [X] T008 [P] Create `src/lib/guardrails.ts` with `getOffTopicRefusal(): string` function (random selection, no consecutive repeats)
- [X] T009 [P] Create `src/lib/guardrails.ts` with `getAbuseRefusal(): string` function (random selection)
- [X] T010 [P] Create `src/lib/website-context.ts` with `buildMenuContext()` function (reads from menu-data.ts, returns formatted string with all 13 categories and 41 items)
- [X] T011 [P] Create `src/lib/website-context.ts` with `buildBranchContext()` function (reads from branches-data.ts, returns 3 branches + 2 family halls)
- [X] T012 [P] Create `src/lib/website-context.ts` with `buildAboutContext()` function (returns origin story, cooking philosophy, values)
- [X] T013 [P] Create `src/lib/website-context.ts` with `buildFAQContext()` function (returns all 10 FAQ Q&As)
- [X] T014 [P] Create `src/lib/website-context.ts` with `buildTestimonialContext()` function (returns 10 representative customer reviews)
- [X] T015 [P] Create `src/lib/website-context.ts` with `buildWebsiteContext()` function (combines all above into single context string)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 2: User Story 1 - Scrollable Chat History (Priority: P1) 🎯 MVP

**Goal**: Customers can scroll up and down through chat history to review previous messages

**Independent Test**: Open chatbot, send 5+ messages, verify scrolling works and scrollbar is visible

### Implementation for User Story 1

- [X] T016 [US1] Fix scroll container in `src/components/chat/GroqChatWidget.tsx` — change `h-80` to `max-h-[320px]`, add `min-h-0` to messages container class
- [X] T017 [US1] Improve scrollbar visibility in `src/app/globals.css` — increase `.chat-scroll::-webkit-scrollbar` width from `6px` to `8px`, add `transition: background 0.2s ease` on thumb
- [X] T018 [US1] Verify auto-scroll-to-bottom still works when new messages arrive (existing `isNearBottom` + `scrollIntoView` logic)

**Checkpoint**: Scrollbar is visible and functional, chat scrolls automatically on new messages

---

## Phase 3: User Story 2 - Off-Topic Question Refusal (Priority: P1)

**Goal**: Chatbot politely refuses questions unrelated to Ghousia Golden Spoon restaurant

**Independent Test**: Ask "What is Python?" and verify polite refusal response

### Implementation for User Story 2

- [X] T019 [US2] Add message length validation in `src/app/api/chat/route.ts` — reject messages > 500 chars with polite notice before calling Groq
- [X] T020 [US2] Add context check in `src/app/api/chat/route.ts` — call `isRestaurantContext(message)` after order intent check, before Groq call
- [X] T021 [US2] Return `getOffTopicRefusal()` when `isRestaurantContext` returns false (200 OK, not error)
- [X] T022 [US2] Verify context check doesn't block valid restaurant questions (test with "What is Python?" → refusal, "What's on your menu?" → normal response)

**Checkpoint**: Off-topic questions receive polite refusal, restaurant questions work normally

---

## Phase 4: User Story 3 - Abusive Language Handling (Priority: P1)

**Goal**: Chatbot detects and politely handles abusive language in English and Roman Urdu

**Independent Test**: Send message with offensive words, verify polite refusal without echoing content

### Implementation for User Story 3

- [X] T023 [US3] Add abuse detection in `src/app/api/chat/route.ts` — call `isAbusive(message)` after length check, before context check
- [X] T024 [US3] Return `getAbuseRefusal()` when `isAbusive` returns true (200 OK, not error)
- [X] T025 [US3] Verify abuse detection takes priority over context check (message with profanity + restaurant keywords → abuse refusal)
- [X] T026 [US3] Verify offensive content is NOT echoed back in the refusal response

**Checkpoint**: Abusive messages receive polite refusal, offensive content not reflected

---

## Phase 5: User Story 4 - Complete Restaurant Knowledge (Priority: P2)

**Goal**: Chatbot knows everything about the restaurant — menu, branches, hours, delivery, about, FAQ, reviews

**Independent Test**: Ask about branches, delivery, cooking philosophy, vegetarian options, payment methods — verify accurate answers

### Implementation for User Story 4

- [X] T027 [US4] Add `buildMenuContext()` export to `src/lib/menu-data.ts` — reads all categories and items, returns formatted string
- [X] T028 [US4] Add `buildBranchContext()` export to `src/lib/branches-data.ts` — reads all branches and family halls
- [X] T029 [US4] Add `buildTestimonialContext()` export to `src/lib/testimonials-data.ts` — returns 10 representative reviews
- [X] T030 [US4] Rewrite `src/lib/groq.ts` — replace static `CHAT_SYSTEM_PROMPT` with `buildSystemPrompt()` function that combines guardrail rules + restaurant info + dynamic website context
- [X] T031 [US4] Update `src/app/api/chat/route.ts` — import `buildSystemPrompt` from groq.ts, use it instead of static `CHAT_SYSTEM_PROMPT`
- [X] T032 [US4] Verify chatbot answers questions about all 13 menu categories with accurate prices
- [X] T033 [US4] Verify chatbot answers questions about all 3 branches with accurate addresses
- [X] T034 [US4] Verify chatbot answers questions about delivery coverage, hours, payment methods, vegetarian options

**Checkpoint**: Chatbot provides comprehensive answers about all restaurant topics

---

## Phase 6: User Story 5 - Auto-Refresh on Content Changes (Priority: P2)

**Goal**: Chatbot automatically knows about new menu items or content changes after deployment

**Independent Test**: Add new menu item to data file, deploy, verify chatbot knows about it

### Implementation for User Story 5

- [X] T035 [US5] Verify `buildSystemPrompt()` reads from data files on each request (not cached)
- [X] T036 [US5] Test auto-refresh by adding a test menu item to `src/lib/menu-data.ts`, restarting dev server, asking chatbot about it
- [X] T037 [US5] Test auto-refresh by updating a menu item price, verifying chatbot shows updated price

**Note**: Auto-refresh is automatically handled by the dynamic prompt building implemented in Phase 5 (US4). This phase verifies it works correctly.

**Checkpoint**: Chatbot picks up content changes after deployment without manual reconfiguration

---

## Phase 7: User Story 6 - Natural Closing Salutations (Priority: P3)

**Goal**: Chatbot ends responses with "JazakAllah Sir", "Thank you", or "Shukriya" occasionally — not every message

**Independent Test**: Send 10 questions, count responses with closings (should be ~2-4 out of 10)

### Implementation for User Story 6

- [X] T038 [US6] Add closing salutation logic in `src/app/api/chat/route.ts` — after Groq responds, check if closing should be added based on message count
- [X] T039 [US6] Implement counter-based approach: use `history.length` to determine message count, add closing on every 3rd or 4th message
- [X] T040 [US6] Track last closing used to prevent consecutive identical closings (store in session or use history)
- [X] T041 [US6] Pick closing from array `["JazakAllah Sir", "Thank you", "Shukriya"]` — only add if not already present at end of response
- [X] T042 [US6] Verify refusal messages (off-topic, abuse) may include closings as part of the polite refusal

**Checkpoint**: Closing salutations appear naturally on ~25-40% of responses, never consecutively identical

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup

- [X] T043 Run `npm run lint` and fix any ESLint errors
- [X] T044 Run `npm run build` and verify no build errors
- [X] T045 Run quickstart.md validation — test all 7 scenarios (scrollbar, off-topic, abuse, knowledge, auto-refresh, closings, length limit)
- [X] T046 Verify chatbot maintains conversation context across multiple messages (multi-turn coherence)
- [X] T047 Verify existing order intent detection still works alongside new guardrails
- [X] T048 Deploy to Vercel and run end-to-end tests on live site

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies - can start immediately
- **US1 - Scrollbar (Phase 2)**: Can start after Phase 1 or even in parallel (only UI changes)
- **US2 - Off-Topic (Phase 3)**: Depends on Phase 1 (guardrails.ts)
- **US3 - Abuse (Phase 4)**: Depends on Phase 1 (guardrails.ts), can run parallel with US2
- **US4 - Knowledge (Phase 5)**: Depends on Phase 1 (website-context.ts)
- **US5 - Auto-Refresh (Phase 6)**: Depends on Phase 5 (US4)
- **US6 - Closings (Phase 7)**: Depends on Phase 5 (US4) for groq.ts changes
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Independent - only UI changes in GroqChatWidget.tsx and globals.css
- **US2 (P1)**: Depends on guardrails.ts (Phase 1) - modifies route.ts
- **US3 (P1)**: Depends on guardrails.ts (Phase 1) - modifies route.ts (same file as US2)
- **US4 (P2)**: Depends on website-context.ts (Phase 1) - modifies groq.ts, menu-data.ts, branches-data.ts, testimonials-data.ts, route.ts
- **US5 (P2)**: Depends on US4 - auto-refresh is inherent in dynamic prompt building
- **US6 (P3)**: Depends on US4 - modifies route.ts (same file as US2/US3)

### Within Each User Story

- Implementation tasks before validation tasks
- Core logic before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: All 15 tasks (T001-T015) can run in parallel (different files or independent functions)
- **Phase 2 + Phase 3 + Phase 4**: Can run in parallel after Phase 1 (US1 is independent, US2/US3 share route.ts but can be done sequentially)
- **Phase 5**: Can run in parallel with Phase 2/3/4 (different files)
- **Phase 7**: Can run after Phase 5 (depends on groq.ts changes)

---

## Parallel Example: Phase 1 (Foundational)

```bash
# Launch all guardrails.ts tasks together:
Task: "Create src/lib/guardrails.ts with English profanity list"
Task: "Create src/lib/guardrails.ts with Roman Urdu profanity list"
Task: "Create src/lib/guardrails.ts with isAbusive() function"
Task: "Create src/lib/guardrails.ts with restaurant keyword list"
Task: "Create src/lib/guardrails.ts with isRestaurantContext() function"
Task: "Create src/lib/guardrails.ts with OFFTOPIC_REFUSALS array"
Task: "Create src/lib/guardrails.ts with ABUSE_REFUSALS array"
Task: "Create src/lib/guardrails.ts with getOffTopicRefusal() function"
Task: "Create src/lib/guardrails.ts with getAbuseRefusal() function"

# Launch all website-context.ts tasks together:
Task: "Create src/lib/website-context.ts with buildMenuContext()"
Task: "Create src/lib/website-context.ts with buildBranchContext()"
Task: "Create src/lib/website-context.ts with buildAboutContext()"
Task: "Create src/lib/website-context.ts with buildFAQContext()"
Task: "Create src/lib/website-context.ts with buildTestimonialContext()"
Task: "Create src/lib/website-context.ts with buildWebsiteContext()"
```

---

## Parallel Example: User Story 1 (Scrollbar)

```bash
# These can run in parallel (different files):
Task: "Fix scroll container in src/components/chat/GroqChatWidget.tsx"
Task: "Improve scrollbar visibility in src/app/globals.css"

# Then verify:
Task: "Verify auto-scroll-to-bottom still works"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundational (guardrails.ts, website-context.ts)
2. Complete Phase 2: User Story 1 (Scrollbar fix)
3. **STOP and VALIDATE**: Test scrollbar works independently
4. Deploy if ready

### Incremental Delivery

1. Complete Phase 1 → Foundation ready
2. Add US1 (Scrollbar) → Test → Deploy (MVP!)
3. Add US2 (Off-Topic) + US3 (Abuse) → Test → Deploy
4. Add US4 (Knowledge) + US5 (Auto-Refresh) → Test → Deploy
5. Add US6 (Closings) → Test → Deploy
6. Each story adds value without breaking previous stories

### Recommended Delivery Order

1. **Phase 1**: Foundational (guardrails.ts, website-context.ts) — ~30 min
2. **Phase 2**: US1 Scrollbar — ~10 min
3. **Phase 3 + 4**: US2 + US3 Off-Topic + Abuse — ~20 min
4. **Phase 5 + 6**: US4 + US5 Knowledge + Auto-Refresh — ~30 min
5. **Phase 7**: US6 Closings — ~15 min
6. **Phase 8**: Polish — ~15 min

**Total estimated time**: ~2 hours

---

## Notes

- [P] tasks = different files or independent functions, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- The guardrails.ts and website-context.ts files are created in Phase 1 and used by multiple stories
- Route.ts is modified by US2, US3, and US6 — handle merge carefully
- Groq.ts is modified by US4 — this is a significant rewrite
