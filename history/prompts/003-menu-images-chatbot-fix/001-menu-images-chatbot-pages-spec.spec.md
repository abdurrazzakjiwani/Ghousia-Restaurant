---
id: 001
title: Menu Images Chatbot Pages Spec
stage: spec
date: 2026-09-15
surface: agent
model: opencode/mimo-v2.5-free
feature: 003-menu-images-chatbot-fix
branch: 003-menu-images-chatbot-fix
user: user
command: /sp.specify create specs
labels: [menu, chatbot, images, pages, unsplash, whatsapp]
links:
  spec: specs/003-menu-images-chatbot-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-menu-images-chatbot-fix/spec.md
  - specs/003-menu-images-chatbot-fix/checklists/requirements.md
tests:
  - Spec quality checklist validation passed

---

## Prompt

create specs

## Response snapshot

Created specification for three-part feature: (1) Add Unsplash free stock photos to all 39 menu items replacing emoji placeholders, (2) Fix chatbot order placement so it detects order intent and generates WhatsApp order links with clickable buttons, (3) Upgrade Home and About pages with authentic Ghousia Golden Spoon content. Spec includes 4 user stories (P1: Chatbot Order, P2: Menu Images, P3: Home Page, P4: About Page), 14 functional requirements, 8 success criteria, and 5 edge cases.

## Outcome

- ✅ Impact: Core ordering fix + visual upgrade + content improvement
- 🧪 Tests: Quality checklist passed all items
- 📁 Files: spec.md, checklists/requirements.md
- 🔁 Next prompts: /sp.clarify, /sp.plan
- 🧠 Reflection: Chatbot order detection is highest-impact fix; Unsplash is simplest approach for non-AI-generated photos

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
