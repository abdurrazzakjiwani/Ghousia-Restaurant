# Implementation Plan: ElevenLabs Voice Agent Integration

**Branch**: `007-spooni-voice-agent` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-spooni-voice-agent/spec.md`

## Summary

Replace the existing text-based Groq chatbot with ElevenLabs Conversational AI voice agent (SPOONI). The integration uses the official ElevenLabs web component widget (`<elevenlabs-convai>`) loaded via CDN script. All ElevenLabs branding is suppressed via the `disable-banner` attribute and supplemental CSS. Old chatbot files are archived (not deleted) for rollback safety.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14 (App Router), React 18.3, Tailwind CSS 3.x
**External Service**: ElevenLabs Conversational AI Widget (`@elevenlabs/convai-widget-embed`)
**Storage**: N/A (no new data entities — the voice agent is managed entirely by ElevenLabs)
**Testing**: Manual browser testing, visual inspection for branding removal
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge), mobile responsive
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Widget script loads asynchronously (< 50KB), no impact on Lighthouse score
**Constraints**: Must not break existing features, must suppress all ElevenLabs branding, HTTPS required for microphone
**Scale/Scope**: 1 new component, 2 modified files, 4 archived files, 1 CSS addition

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The constitution file is a template (not customized for this project). No specific gates to enforce. Standard quality practices apply:
- All code must follow existing TypeScript conventions
- No new external dependencies beyond the ElevenLabs widget CDN script
- All existing functionality must continue to work
- Branding suppression must be complete and verified

## Project Structure

### Documentation (this feature)

```text
specs/007-spooni-voice-agent/
├── plan.md              # This file
├── research.md          # Phase 0 output (widget integration research)
├── data-model.md        # Phase 1 output (no new entities)
├── quickstart.md        # Phase 1 output
├── checklists/          # Spec quality checklists
│   └── requirements.md
└── tasks.md             # Phase 2 output (NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   └── chat/
│       └── SpooniWidget.tsx          # NEW: ElevenLabs voice agent wrapper
├── app/
│   ├── layout.tsx                    # MODIFY: Replace ChatWidget with SpooniWidget
│   └── globals.css                   # MODIFY: Add CSS to suppress ElevenLabs branding
├── components/chat/ChatWidget.tsx    # ARCHIVE → archive/chat/
├── components/chat/ChatMessage.tsx   # ARCHIVE → archive/chat/
├── hooks/useChat.ts                  # ARCHIVE → archive/chat/
└── app/api/chat/route.ts             # ARCHIVE → archive/chat/

archive/
└── chat/
    ├── ChatWidget.tsx
    ├── ChatMessage.tsx
    ├── useChat.ts
    └── route.ts
```

**Structure Decision**: Minimal change — one new wrapper component, two file modifications, four files archived. The ElevenLabs widget is loaded via CDN (not npm), so no `package.json` changes needed.

## Complexity Tracking

No constitution violations — no complexity tracking needed.
