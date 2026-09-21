---
id: "016-full-responsive-plan"
title: "Full Responsive Implementation Plan"
stage: "plan"
date: "2026-09-21"
surface: "cli"
model: "mimo-v2.5-free"
feature: "016-full-responsive"
branch: "016-full-responsive"
user: "user"
command: "/sp.plan"
labels: ["plan", "responsive", "accessibility", "dark-mode", "mobile"]
links:
  spec: "specs/016-full-responsive/spec.md"
  plan: "specs/016-full-responsive/plan.md"
  ticket: ""
  adr: ""
  pr: ""
files:
  - "specs/016-full-responsive/plan.md"
  - "specs/016-full-responsive/research.md"
  - "specs/016-full-responsive/data-model.md"
  - "specs/016-full-responsive/quickstart.md"
tests: []
---

## Prompt

(empty — /sp.plan with no arguments)

## Response snapshot

Created comprehensive implementation plan for Full Responsive Overhaul:

**Phase 0 Research** (8 questions resolved):
1. Safe-area insets for notched iPhones → `env(safe-area-inset-bottom)`
2. Chat widget viewport height → `max-h-[min(50vh,400px)]`
3. Info bar mobile visibility → Show compact version with phone + track
4. Testimonials SSR fix → useState + useEffect pattern
5. Testimonial touch navigation → Show arrows at opacity-60 on mobile
6. Gradient text replacement → `text-orange-600` (4.6:1 contrast)
7. Focus trapping → Manual useRef + useEffect implementation
8. Dark mode colors → Extend existing gray-900/gray-100 pattern

**Phase 1 Design**:
- No data entity changes (UI-only feature)
- Documented UI component state changes (MobileDrawer, Testimonials, FocusTrap)
- Defined validation rules for touch targets, contrast, and breakpoints

**Phase 2 Planning**:
- 4-phase implementation plan (Critical → High → Medium → Low)
- ~21 files to modify across the codebase
- Estimated complexity: Medium overall, Low-Medium risk
- Comprehensive quickstart with device testing matrix

## Outcome

- ✅ Impact: Plan created with 4 phases, 8 research decisions, 30+ files documented
- 🧪 Tests: None (planning phase)
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md
- 🔁 Next prompt: /sp.tasks
- 🧠 Reflection: All technical unknowns resolved. Implementation is straightforward CSS/class changes with no architectural decisions remaining.

## Evaluation notes (flywright)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
