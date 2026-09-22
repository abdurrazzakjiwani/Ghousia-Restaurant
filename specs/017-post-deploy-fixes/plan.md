# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js 18+, Next.js 16 (App Router), React 19  
**Primary Dependencies**: Tailwind CSS 4, Groq SDK, @supabase/supabase-js, framer-motion  
**Storage**: localStorage (for cart), Supabase PostgreSQL (for order persistence)  
**Testing**: jest, react-testing-library, next test runner  
**Target Platform**: Web browsers (320px–2560px responsive), mobile devices (iOS/Android browsers)  
**Project Type**: Web application (single codebase, Next.js 16 App Router)  
**Performance Goals**: Hero section load < 2s, hamburger menu render < 100ms, no performance regressions in light mode  
**Constraints**: Must maintain existing dark mode via useTheme hook; Tailwind CSS 4 config in globals.css; No breaking changes to navigation or ordering flows  
**Scale/Scope**: 60 existing tasks in feature; ~20 line changes across 10 files for this post-deployment fix

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Post-Design Re-check Status: ALL GATES PASS**

**Gate 1 - Test-First Compliance**: [PASS] - All 4 user stories have independent acceptance tests defined (P1-P3). Visual fixes can be tested via viewport/toggle dark mode. No [NEEDS CLARIFICATION] markers remain.

**Gate 2 - No Breaking Changes**: [PASS] - FR-010 explicitly requires "no breaking changes to navigation, ordering, or other features." All changes are CSS class modifications with fallback strategies. All 5 clarification questions resolved.

**Gate 3 - Accessibility Baseline**: [PASS] - Spec includes `prefers-contrast` media query support (from clarification Q3) and aria-label requirements (from clarification Q2). data-model.md documents accessibility attributes for all entities.

**Gate 4 - Visual Consistency**: [PASS] - Brand color fix (solid orange #ea580c) replaces inconsistent gradients; About page hero image clarified with alt text and fallback. research.md documents all 5 clarification decisions.

**Gate 5 - Data Model Completeness**: [PASS] - data-model.md created with 4 entities (Navigation Menu, Hero Section, Accent Text, Dark Mode) documenting UI component states and visual attributes. All fields, validation rules, and state transitions documented.

**Gate 6 - Contract Coverage**: [PASS] - 3 contracts created:
- `hero-overlay.contract.md` (HO-001 to HO-003)
- `hamburger-menu.contract.md` (HM-001 to HM-004)
- `brand-color.contract.md` (BC-001 to BC-005)

**Gate 7 - Quickstart Availability**: [PASS] - quickstart.md created with verification steps and commands.

*All 7 gates pass. Feature ready for Phase 2 (tasks.md generation via /sp.tasks command).*

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
