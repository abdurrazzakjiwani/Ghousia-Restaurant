---
id: "007-spooni-voice-agent-green-001"
title: "Implement spooni voice agent"
stage: green
date: 2026-09-17
surface: cli
model: mimo-v2.5-free
feature: 007-spooni-voice-agent
branch: 007-spooni-voice-agent
user: user
command: /sp.green
labels: [green, elevenlabs, voice-agent, implementation]
links:
  spec: specs/007-spooni-voice-agent/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - src/components/chat/SpooniWidget.tsx
  - src/app/layout.tsx
  - src/app/globals.css
  - src/types/elevenlabs.d.ts
  - tsconfig.json
  - archive/chat/ChatWidget.tsx
  - archive/chat/ChatMessage.tsx
  - archive/chat/useChat.ts
  - archive/chat/route.ts
tests:
  - Build: npm run build passed
  - Lint: npm run lint passed (1 pre-existing warning)
  - Deploy: Vercel production deploy successful
---

## Prompt

/sp.green — Implement all 19 tasks for feature 007-spooni-voice-agent (ElevenLabs voice agent integration).

## Response snapshot

### Files Created
- `src/components/chat/SpooniWidget.tsx` — New voice agent component with next/script loading, compact variant, disable-banner, brand colors, script load/error state handling, fallback UI
- `src/types/elevenlabs.d.ts` — TypeScript declaration for `<elevenlabs-convai>` custom element

### Files Modified
- `src/app/layout.tsx` — Replaced ChatWidget import/usage with SpooniWidget
- `src/app/globals.css` — Added 10+ CSS rules for ElevenLabs branding suppression (banner, footer, header, branding parts, data-testid selectors)
- `tsconfig.json` — Added `archive` to exclude array (archived files excluded from compilation)

### Files Archived (→ archive/chat/)
- `ChatWidget.tsx`, `ChatMessage.tsx`, `useChat.ts`, `route.ts`

### Build Issues Resolved
1. **Archive compilation error**: Archived files inside repo root were included by tsconfig — fixed by adding `archive` to exclude array
2. **Custom element type error**: TypeScript didn't know about `<elevenlabs-convai>` — fixed by creating `elevenlabs.d.ts` type declaration

### Verification
- Build: ✅ Compiled successfully
- Lint: ✅ Passed (1 pre-existing img warning)
- Deploy: ✅ https://ghousiagoldenweb.vercel.app (production alias)
- Archive: ✅ 4 files in archive/chat/
- No stale references: ✅ No active imports of old chatbot components

## Outcome

- ✅ Impact: All 19 tasks complete, voice agent deployed
- 🧪 Tests: Build + lint passed, Vercel deploy successful
- 📁 Files: 2 created, 3 modified, 4 archived
- 🔁 Next prompts: Verify widget on live site, visual branding inspection
- 🧱 Blockers: None
- 🧠 Reflection: Simple feature — main work was SpooniWidget component and CSS branding suppression. Two build issues resolved (archive compilation, custom element types). Old chatbot archived cleanly.
