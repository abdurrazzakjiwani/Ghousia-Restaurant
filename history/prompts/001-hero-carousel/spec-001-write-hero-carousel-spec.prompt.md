---
id: "001-hero-carousel-spec-001"
title: "Write hero carousel spec"
stage: spec
date: 2026-09-17
surface: cli
model: mimo-v2.5-free
feature: 001-hero-carousel
branch: 001-hero-carousel
user: user
command: /sp.specify
labels: [spec, hero-carousel, ui-fix]
links:
  spec: specs/001-hero-carousel/spec.md
  ticket: ""
  adr: ""
  pr: ""
files:
  - specs/001-hero-carousel/spec.md
  - specs/001-hero-carousel/checklists/requirements.md
tests:
  - 14/14 checklist items PASS
  - 2 user stories (P1: hero carousel, P2: button repositioning)
  - 10 functional requirements
  - 5 success criteria
  - 4 edge cases
---

## Prompt

/sp.specify — Write spec for feature 001-hero-carousel: "Add hero image carousel with 3 rotating images and fix floating button positioning"

## Response snapshot

Created feature branch `001-hero-carousel` and wrote spec with:

**2 User Stories**:
- US1 (P1): Hero Image Carousel — 3 rotating images with crossfade, dot indicators, parallax, reduced-motion support
- US2 (P2): Floating Button Repositioning — SPOONI widget moved above WhatsApp button, no overlap

**10 Functional Requirements**: Carousel display, auto-rotation, dot navigation, text overlay, parallax, reduced-motion, error handling, button positioning, accessibility, regression prevention

**5 Success Criteria**: Image loading, smooth transitions, button accessibility, feature regression, text contrast

**4 Edge Cases**: Image load failure, reduced-motion, narrow screens, script loading delay

**Checklist**: 14/14 PASS — no implementation details, all requirements testable, technology-agnostic success criteria

## Outcome

- ✅ Impact: Spec complete, ready for planning
- 🧪 Tests: 14/14 checklist items pass
- 📁 Files: 2 files created (spec.md, requirements.md)
- 🔁 Next prompts: `/sp.plan` to create implementation plan
- 🧠 Reflection: Simple feature with clear requirements. No clarifications needed — hero images confirmed at project root, button repositioning is straightforward CSS.
