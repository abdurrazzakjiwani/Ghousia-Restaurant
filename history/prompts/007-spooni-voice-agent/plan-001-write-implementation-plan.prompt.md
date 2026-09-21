---
id: "007-spooni-voice-agent-plan-001"
title: "Write implementation plan"
stage: plan
date: 2026-09-17
surface: cli
model: mimo-v2.5-free
feature: 007-spooni-voice-agent
branch: 007-spooni-voice-agent
user: user
command: /sp.plan
labels: [plan, elevenlabs, voice-agent, integration]
links:
  spec: specs/007-spooni-voice-agent/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - specs/007-spooni-voice-agent/plan.md
  - specs/007-spooni-voice-agent/research.md
  - specs/007-spooni-voice-agent/data-model.md
  - specs/007-spooni-voice-agent/quickstart.md
  - specs/007-spooni-voice-agent/contracts/README.md
  - AGENTS.md
tests:
  - Plan covers all 13 functional requirements from spec
  - Research resolves all 6 technical decisions
  - No NEEDS CLARIFICATION markers remain
---

## Prompt

/sp.plan — Create implementation plan for feature 007-spooni-voice-agent (ElevenLabs voice agent integration).

## Response snapshot

Created complete implementation plan with all Phase 0 and Phase 1 artifacts:

**plan.md**: Technical context (TypeScript 5.x, Next.js 14, React 18.3, Tailwind CSS 3.x), project structure (1 new + 2 modified + 4 archived files), constitution check (template — no gates).

**research.md**: 6 technical decisions resolved:
1. Widget embedding: Official `<elevenlabs-convai>` web component via CDN
2. Branding suppression: `disable-banner` attribute + CSS fallback rules
3. Script loading: `next/script` with `strategy="lazyOnload"`
4. Widget positioning: CSS custom properties matching existing FAB location
5. Archival strategy: Move to `archive/chat/` directory
6. Next.js integration: `next/script` in client component

**data-model.md**: No new entities — voice agent managed by ElevenLabs.

**quickstart.md**: 5-step implementation guide with file change summary.

**contracts/README.md**: No API contracts needed — widget communicates directly with ElevenLabs.

**Agent context**: AGENTS.md updated with new technology from plan.

## Outcome

- ✅ Impact: Plan complete, ready for task generation
- 🧪 Tests: All 6 research decisions resolved, no NEEDS CLARIFICATION markers
- 📁 Files: 6 files created/modified (plan.md, research.md, data-model.md, quickstart.md, contracts/README.md, AGENTS.md)
- 🔁 Next prompts: `/sp.tasks` to generate task breakdown
- 🧠 Reflection: Simple feature — minimal code changes (1 new component, 2 modifications, 4 archives). Main complexity is ensuring complete branding suppression.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results: Plan complete
- Prompt variant: N/A
- Next experiment: N/A
