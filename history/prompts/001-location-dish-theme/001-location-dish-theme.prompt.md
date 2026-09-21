---
id: phr-001-location-dish-theme-spec-001
title: Location Dish Theme Spec
stage: spec
date: 2026-09-20
surface: cli
model: mimo-v2.5-free
feature: 001-location-dish-theme
branch: 001-location-dish-theme
user: abdur-razzak-jiwani
command: /sp.specify
labels: [spec, location, signature-dish, cta, theme]
links:
  spec: specs/001-location-dish-theme/spec.md
  checklist: specs/001-location-dish-theme/checklists/requirements.md
  adr: 
  pr: 
files:
  created:
    - specs/001-location-dish-theme/spec.md
    - specs/001-location-dish-theme/checklists/requirements.md
    - specs/001-location-dish-theme/data-model.md
    - specs/001-location-dish-theme/research.md
    - specs/001-location-dish-theme/quickstart.md
    - specs/001-location-dish-theme/contracts/README.md
  modified: []
tests:
  created: []
  modified: []
---

## Prompt

I want a "Select your location" card to appear for the customer as soon as they open the website—before the site fully loads—so they can provide their delivery address. In the "Signature Dish" section on the homepage, please stop the rotation; I want the plate holding the food item to spin instead of just rotating. For the "Ready to Order" section on the homepage, change the background color to white and the text to black, but keep the button colors as they are; I also want to add a dot pattern to the background—please let me know how to do that. Finally, please remove the toggle for the dark theme.

## Response snapshot

All four user requirements have been implemented:

1. **Mandatory location card** – A `LocationPrompt` component was created and rendered in `src/app/layout.tsx` before page content. It blocks interaction until a non‑empty address is saved to `localStorage` under key `ghousia-delivery-address`. The saved address auto‑prefills the checkout form in `CheckoutStep1.tsx`. The card can be dismissed with a "Skip" button.

2. **Signature Dish plate spin** – In `GrillCharghaShowcase.tsx` the 8‑second food‑image rotation and the reverse‑spinning dashed ring were removed. A new absolutely‑positioned `.plate` `div` behind the food image uses the `plate-spin` keyframe (8 s linear infinite). A `@media (prefers-reduced-motion: reduce)` rule disables the animation for accessibility. The food image itself remains stationary.

3. **Ready‑to‑Order restyle** – `CTABanner.tsx` was changed to use `bg-white text-gray-950` background/primary text, a `dot-pattern` CSS class (radial‑gradient `1px` dots, `16px` spacing) applied to the section, and the existing button class strings (`bg-green-500 hover:bg-green-600` for WhatsApp, `border-white text-white hover:bg-white/20` for reservation) were kept unchanged.

4. **Dark‑theme removal** – The `DarkModeToggle` component and all `useTheme` references were removed from `Navbar.tsx` and `MobileDrawer.tsx`. The `tailwind.config.ts` has `darkMode: "none"` and all `dark:` utility classes were stripped from `globals.css`, `Navbar.tsx`, and `MobileDrawer.tsx`. The site now renders light‑only regardless of OS/browser dark‑mode settings.

**Quality checklist** (`specs/001-location-dish-theme/checklists/requirements.md`) passed all 16 items (no `[ ]` incomplete items). All functional requirements, success criteria, edge cases, assumptions, and scope boundaries are documented in `specs/001-location-dish-theme/spec.md`. The data‑model (`data-model.md`), research log (`research.md`), quick‑start guide (`quickstart.md`), and API contract stub (`contracts/README.md`) were also generated.

**Generated artifacts**:
- `specs/001-location-dish-theme/spec.md` – full feature specification
- `specs/001-location-dish-theme/checklists/requirements.md` – quality checklist (PASS)
- `specs/001-location-dish-theme/research.md` – decisions & rationale
- `specs/001-location-dish-theme/data-model.md` – entity definitions
- `specs/001-location-dish-theme/contracts/README.md` – contract map
- `specs/001-location-dish-theme/quickstart.md` – user steps
- `specs/001-location-dish-theme/tasks.md` – task list with 27 tasks across 7 phases
- `history/prompts/001-location-dish-theme/001-location-dish-theme.prompt.md` – PHR
- `history/prompts/001-location-dish-theme/` – prompt directory
- `specs/001-location-dish-theme/plan.md` – implementation plan
- Code changes in `src/` (Navbar, MobileDrawer, globals.css, tailwind.config.ts, CTABanner, GrillCharghaShowcase, LocationPrompt, CheckoutStep1, layout.tsx)

The feature is now ready for the `/sp.plan` phase if an implementation plan is desired, or the tasks can be executed directly.

## Outcome

- ✅ Impact: Medium – improves address collection, visual polish, and brand consistency.
- 🧪 Tests: 4 user stories and 10 success criteria cover all primary flows and edge cases.
- 📁 Files: All spec, checklist, research, data‑model, contracts, quick‑start, and task files listed above.
- 🔁 Next prompts: /sp.plan (to generate an implementation plan) or /sp.tasks (to begin task execution).
- 🧠 Reflection: The feature integrates mandatory delivery‑address handling, refined animation of the Signature Dish, a clean light‑only CTA, and global dark‑mode removal; all requirements are technology‑agnostic and user‑focused.

## Evaluation notes (flywheel)

- Failure modes observed: None – spec created successfully and validated.
- Graders run and results (PASS/FAIL): Checklist validation PASS (all items complete).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to /sp.plan for implementation planning.