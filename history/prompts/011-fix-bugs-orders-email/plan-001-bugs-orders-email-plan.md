---
id: 011-fix-bugs-orders-email-plan-001
title: plan bugs orders email
stage: plan
date: 2026-09-19
surface: cli
model: opencode/mimo-v2.5-free
feature: 011-fix-bugs-orders-email
branch: 011-fix-bugs-orders-email
user: user
command: /sp.plan
labels: [plan, bug-fixes, orders, email, research, design]
links:
  spec: specs/011-fix-bugs-orders-email/spec.md
  plan: specs/011-fix-bugs-orders-email/plan.md
  research: specs/011-fix-bugs-orders-email/research.md
  data-model: specs/011-fix-bugs-orders-email/data-model.md
  contracts: specs/011-fix-bugs-orders-email/contracts/api.yaml
  quickstart: specs/011-fix-bugs-orders-email/quickstart.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - specs/011-fix-bugs-orders-email/plan.md
  - specs/011-fix-bugs-orders-email/research.md
  - specs/011-fix-bugs-orders-email/data-model.md
  - specs/011-fix-bugs-orders-email/contracts/api.yaml
  - specs/011-fix-bugs-orders-email/quickstart.md
  - AGENTS.md
tests: []
---

## Prompt

/sp.plan — Generate implementation plan for fixing critical bugs (category dropdown navigation, search navigation, cart reactivity, quantity controls) and adding order persistence (unique order numbers, thank you page, real-time tracking via polling) and email notifications (Resend integration for order confirmations). Skip payment gateway. Use Resend test domain. Restaurant email: abdurrazzakjiwani.work@gmail.com.

## Response snapshot

Completed Phase 0 (Research) and Phase 1 (Design) planning:

**Phase 0 Research (11 decisions)**:
- R1: Cart reactivity → React Context + Provider pattern
- R2: Category dropdown → read ?category= searchParam in menu page
- R3: Search navigation → fix MainNav to call router.push()
- R4: Quantity controls → local state (1-20) in MenuItemModal
- R5: Order numbers → server-side generation with Supabase unique constraint
- R6: Email → Resend with test domain, React Email templates
- R7: Thank you page → /thank-you?order=GGS-YYYYMMDD-XXXX
- R8: Tracking → order number lookup + 30-second polling
- R9: Checkout → POST API first, then WhatsApp as secondary
- R10: Database → add columns via Supabase dashboard (no migration files)
- R11: Types → update CustomerOrder and Order interfaces

**Phase 1 Design**:
- data-model.md: CustomerOrder entity with 16 fields, status values, validation rules
- contracts/api.yaml: POST /api/orders, GET /api/orders, POST /api/email/send
- quickstart.md: Environment setup, DB migration SQL, file changes summary, testing checklist
- AGENTS.md updated with new technologies (resend, react-email)

## Outcome

- ✅ Impact: Full implementation plan ready. All NEEDS CLARIFICATION items resolved. 3-phase approach (Bug Fixes → Order Persistence → Email) with clear file-by-file changes.
- 🧪 Tests: N/A (plan phase)
- 📁 Files: 5 files created/updated (plan.md, research.md, data-model.md, contracts/api.yaml, quickstart.md, AGENTS.md)
- 🔁 Next prompts: `/sp.tasks` to generate task list, then implementation
- 🧠 Reflection: Research identified 11 key decisions covering cart architecture, navigation fixes, order number generation, email integration, and database schema. Design produced complete data model, API contracts, and quickstart guide. All decisions align with spec requirements and existing codebase patterns.

## Evaluation notes (flywright)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): `/sp.tasks` to generate implementation task list
