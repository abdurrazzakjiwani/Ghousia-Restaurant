# Research: Post-Deployment UI Fixes

## Overview

This research document consolidates findings from the clarification workflow for the Post-Deployment UI Fixes feature (017-post-deploy-fixes). Five clarification questions were asked and resolved, each with documented decisions, rationale, and alternatives considered.

---

## Q1: About Page Hero Image Fallback

**Decision**: Option A - Solid dark background color

**Rationale**: Maintains the dark overlay aesthetic consistently across the About page. If the hero image fails to load, a solid dark background (`bg-black`) provides visual continuity with the 50% dark overlay already applied to the home page hero. This is the simplest fallback requiring no additional assets.

**Alternatives Considered**:
- **Option B** (Solid orange background): Would create visual discontinuity with the dark overlay aesthetic; orange on dark can feel jarring without the image context.
- **Option C** (Error placeholder with text): Adds unnecessary complexity; the spec already handles this gracefully with dark fallback.
- **Option D** (Default fallback image): Requires maintaining a library of fallback images; over-engineering for a simple image-load-failure scenario.

**Implementation Note**: Edge Cases section updated to: "The system should fall back to a solid dark background color to maintain the dark overlay aesthetic."

---

## Q2: Hamburger Menu Accessibility

**Decision**: Option C - Add both aria-labels, focus trap, and screen reader support (Option A + B)

**Rationale**: The hamburger drawer menu in dark mode requires comprehensive accessibility support. Dark mode users may rely on assistive technology, and the 4.5:1 contrast ratio alone is insufficient for full accessibility compliance. Adding `aria-label="Close menu"` on the close button, `role="dialog"` on the drawer, and a focus trap when open ensures keyboard and screen reader users can navigate the menu effectively.

**Alternatives Considered**:
- **Option A** (aria-labels + focus trap only): Missing screen reader descriptive text.
- **Option B** (focus-visible rings + aria-describedtext): Missing the structural accessibility elements (role, dialog, focus trap).
- **Option D** (handle by useTheme hook): The existing hook manages color scheme, not structural accessibility.

**Implementation Note**: Functional Requirement FR-004 updated to include: "System MUST display mobile header icons (phone, hamburger, close) with sufficient color contrast in dark mode AND appropriate ARIA labels and focus management."

---

## Q3: Brand Color Accessibility

**Decision**: Option C - System respects `prefers-contrast` media query and adjusts accent colors automatically

**Rationale**: Provides automated accessibility without requiring users to manually toggle settings. The `prefers-contrast` media query is supported in all modern browsers and allows the system to adjust colors for users with visual impairments or preference settings. This is less disruptive to the brand design than user-toggleable high contrast mode.

**Alternatives Considered**:
- **Option A** (No override - brand colors fixed): Provides brand consistency but ignores users with contrast sensitivity or visual impairments.
- **Option B** (User-toggleable high contrast mode): Requires users to manually enable a feature they may not know about; creates inconsistent experience across users.
- **Option D** (Both B and C): Adds unnecessary complexity; media query support alone addresses the majority of accessibility needs without UI clutter.

**Implementation Note**: Assumption updated in spec: "System respects `prefers-contrast` media query and adjusts accent colors automatically for accessibility." SC-004 updated with measurable criteria.

---

## Q4: About Page Hero Image Alternative Text

**Decision**: Option C - `alt="Ghousia Restaurant story and ambiance"`

**Rationale**: Provides balanced context that's descriptive without being overly verbose. Works well for both screen readers (describes the image content) and SEO (contains brand name and relevant terms). The text "Ghousia Restaurant story and ambiance" conveys the purpose of the hero image on the About page without being too long or too short.

**Alternatives Considered**:
- **Option A** (`alt="Our Story - Ghousia Restaurant"`): More brand-focused but less descriptive of the actual image content.
- **Option B** (`alt="Restaurant interior with dining tables and decor"`): Purely descriptive but misses the brand/story context that's relevant for the About page.
- **Option D** (No alt text): Conflicts with accessibility requirements; decorative image exemption doesn't apply since the image represents the restaurant's story.

**Implementation Note**: User Story 3 (About Page Hero Image) acceptance scenario 2 updated to include: "Additionally, when screen reader technology is active, the image should have alternative text `alt="Ghousia Restaurant story and ambiance"`."

---

## Q5: Hero Overlay Text Readability Measurement

**Decision**: Option C - Both A and B: Minimum 4.5:1 contrast AND max 60 characters per line

**Rationale**: Provides two measurable, testable criteria that together ensure meaningful readability improvement. The 4.5:1 contrast ratio is the WCAG AA standard for normal text, ensuring text is legible against the background. The 60-character line length limit is a well-established typography best practice for optimal reading speed on the web.

**Alternatives Considered**:
- **Option A** (Contrast ratio only): Ensures legibility but doesn't address line length issues that can cause reading fatigue.
- **Option B** (Line length only): Ensures comfortable reading but doesn't guarantee sufficient contrast for users with visual impairments.
- **Option D** (User study with 90% completion rate): Too time-consuming and subjective for a specification; measurable criteria are preferred.

**Implementation Note**: SC-004 updated: "Hero text readability is improved with 50% overlay contrast on the home page. Minimum contrast ratio of 4.5:1 between text and overlay background, with maximum line length of 60 characters."

---

## Summary of All Clarifications

| # | Question | Decision | Key Implementation |
|---|----------|----------|-------------------|
| 1 | About page hero image fallback | Solid dark background | Edge Cases updated |
| 2 | Hamburger menu accessibility | aria-labels + focus trap + screen reader support | FR-004 updated |
| 3 | Brand color accessibility | `prefers-contrast` media query | Assumption + SC-004 updated |
| 4 | About page hero alt text | `alt="Ghousia Restaurant story and ambiance"` | User Story 3 updated |
| 5 | Hero overlay readability | 4.5:1 contrast + max 60 char line length | SC-004 updated |

**All 5 questions resolved within the 5-question quota. No [NEEDS CLARIFICATION] markers remain in the specification.**

---

## Research Tasks Status

All research tasks from the clarification workflow are now complete. The specification has been updated with all 5 clarifications integrated, and the quality checklist passes validation.

**Next Phase**: Phase 1 - Design & Contracts (data-model.md, contracts/, quickstart.md)