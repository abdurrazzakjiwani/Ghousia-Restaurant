---
id: 002
title: Menu Images Chatbot Pages Plan
stage: plan
date: 2026-09-15
surface: agent
model: opencode/mimo-v2.5-free
feature: 003-menu-images-chatbot-fix
branch: 003-menu-images-chatbot-fix
user: user
command: /sp.plan
labels: [plan, menu, chatbot, images, unsplash, whatsapp]
links:
  spec: specs/003-menu-images-chatbot-fix/spec.md
  plan: specs/003-menu-images-chatbot-fix/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-menu-images-chatbot-fix/plan.md
  - specs/003-menu-images-chatbot-fix/research.md
  - specs/003-menu-images-chatbot-fix/data-model.md
  - specs/003-menu-images-chatbot-fix/quickstart.md
  - specs/003-menu-images-chatbot-fix/contracts/chat-api.md
  - AGENTS.md
tests:
  - Plan covers all 14 functional requirements from spec
  - Research resolves all technical unknowns

---

## Prompt

(sp.plan - empty user input, triggered by /sp.plan command)

## Response snapshot

Generated implementation plan with technical context (TypeScript, Next.js 14, Tailwind, Supabase, Groq SDK). Phase 0 research resolved 5 key decisions: Unsplash direct URLs (no API key), wa.me WhatsApp format, keyword-based order intent detection, client-side conversation history, image onError fallback. Phase 1 produced data model (OrderIntent, OrderIntentItem entities), API contract for enhanced /api/chat endpoint, quickstart guide, and AGENTS.md update.

## Outcome

- ✅ Impact: Complete technical plan ready for task breakdown
- 🧪 Tests: All 5 research items resolved, no NEEDS CLARIFICATION markers
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md, contracts/chat-api.md, AGENTS.md
- 🔁 Next prompts: /sp.tasks
- 🧠 Reflection: Keyword-based order detection is the right approach for 39 items — simpler and more reliable than LLM-only. Unsplash direct URLs avoid API key dependency.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
