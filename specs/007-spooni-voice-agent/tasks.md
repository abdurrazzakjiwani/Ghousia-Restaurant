# Tasks: ElevenLabs Voice Agent Integration

**Input**: Design documents from `/specs/007-spooni-voice-agent/`
**Prerequisites**: plan.md, spec.md, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: No project setup needed — existing Next.js project with all dependencies in place

(No tasks — skip to Phase 2)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the SpooniWidget component that ALL user stories depend on. MUST complete before user stories.

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T001 Create SpooniWidget component in src/components/chat/SpooniWidget.tsx with "use client" directive, next/script loading of @elevenlabs/convai-widget-embed, and <elevenlabs-convai> web component rendering
- [X] T002 Configure SpooniWidget with agent-id="agent_8401m2qjrwryfh2b900egeqdnc7m", disable-banner attribute, variant="compact", and custom brand colors (avatar-orb-color-1="#667eea", avatar-orb-color-2="#764ba2")
- [X] T003 Add script load/error state handling in SpooniWidget with fallback UI when ElevenLabs script fails to load

**Checkpoint**: SpooniWidget component ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Voice Conversation with SPOONI (Priority: P1) MVP

**Goal**: Customer can click floating button and have voice conversation with SPOONI

**Independent Test**: Open website, click SPOONI button, grant microphone, speak a question, verify voice response

### Implementation for User Story 1

- [X] T004 [US1] Replace ChatWidget import with SpooniWidget import in src/app/layout.tsx
- [X] T005 [US1] Replace <ChatWidget /> with <SpooniWidget /> in src/app/layout.tsx

**Checkpoint**: Voice agent accessible from all pages — customers can talk to SPOONI

---

## Phase 4: User Story 2 - Zero ElevenLabs Branding (Priority: P1)

**Goal**: No ElevenLabs branding visible anywhere in the widget

**Independent Test**: Open widget, visually inspect every element for "ElevenLabs" or "Powered by" text

### Implementation for User Story 2

- [X] T006 [P] [US2] Add branding suppression CSS to src/app/globals.css (hide banner, footer, tooltip elements via shadow DOM selectors)
- [X] T007 [P] [US2] Add CSS custom property override for --elevenlabs-convai-banner-display: none in src/app/globals.css

**Checkpoint**: Zero ElevenLabs branding — clean white-labeled experience

---

## Phase 5: User Story 3 - Old Chatbot Archived (Priority: P2)

**Goal**: Old chatbot files preserved in archive directory, removed from active codebase

**Independent Test**: Verify files exist in archive/chat/, verify no imports reference old chatbot, verify build passes

### Implementation for User Story 3

- [X] T008 [US3] Create archive/chat/ directory structure
- [X] T009 [US3] Move src/components/chat/ChatWidget.tsx to archive/chat/ChatWidget.tsx
- [X] T010 [US3] Move src/components/chat/ChatMessage.tsx to archive/chat/ChatMessage.tsx
- [X] T011 [US3] Move src/hooks/useChat.ts to archive/chat/useChat.ts
- [X] T012 [US3] Move src/app/api/chat/route.ts to archive/chat/route.ts
- [X] T013 [US3] Verify no remaining imports or references to old chatbot components in active codebase

**Checkpoint**: Clean codebase — old chatbot archived, no stale references

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, performance check, and deployment

- [X] T014 Run npm run build and verify no compilation errors
- [X] T015 Run npm run lint and verify no lint errors
- [X] T016 Deploy to Vercel with --force flag for clean build
- [X] T017 Verify widget loads and functions on live site (click button, grant mic, speak, hear response)
- [X] T018 Verify zero ElevenLabs branding on live site (visual inspection)
- [X] T019 Verify all existing features work without regression (menu, reservations, ordering, reviews, dark mode)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — skipped (no setup needed)
- **Foundational (Phase 2)**: No dependencies — can start immediately
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (P1): Can start after Foundational — No dependencies on other stories
  - US2 (P1): Can start after Foundational — Independent of US1
  - US3 (P2): Can start after Foundational — Independent of US1/US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — No dependencies on other stories
- **US2 (P1)**: Can start after Foundational — Independent of US1
- **US3 (P2)**: Can start after Foundational — Independent of US1/US2

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Build verification after each story

### Parallel Opportunities

- US1 and US2 can run in parallel (different files: layout.tsx vs globals.css)
- US3 is independent and can run any time after Foundational
- Within US2: both CSS tasks can run in parallel (T006, T007)

---

## Parallel Example: User Stories 1 + 2 (Both P1)

```bash
# US1 and US2 can run in parallel (different files):
Task: "Replace ChatWidget with SpooniWidget in layout.tsx" (US1)
Task: "Add branding suppression CSS to globals.css" (US2)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (SpooniWidget component)
2. Complete Phase 3: US1 (voice conversation)
3. **STOP and VALIDATE**: Test voice conversation works
4. Deploy to Vercel for live review

### Incremental Delivery

1. Foundational → Widget component ready
2. Add US1 (voice chat) → Test → Deploy (core feature!)
3. Add US2 (branding) → Test → Deploy (professional polish!)
4. Add US3 (archive) → Test → Deploy (clean codebase!)
5. Polish → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- This is a simple feature — only 19 tasks total across 6 phases
