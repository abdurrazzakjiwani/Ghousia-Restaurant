# Research: UI Styling Updates

**Feature**: 013-ui-styling-updates
**Date**: 2026-09-19

## Research Areas

### 1. Orange Gradient Replacement Strategy

**Decision**: Set `gradient-start` and `gradient-end` to the same value (#f97316) in tailwind.config.ts

**Rationale**: This single change eliminates ~55 gradient usages across ~25 files automatically. The remaining ~13 instances (hardcoded classes, inline CSS, email templates) require individual edits.

**Alternatives considered**:
- Replace each gradient class individually: Rejected — 68+ manual edits, high risk of missing instances
- Create new utility class `.solid-orange`: Rejected — adds unnecessary abstraction
- Use CSS custom property override: Rejected — Tailwind config is the single source of truth

### 2. DM Sans Font Integration

**Decision**: Add DM Sans via `next/font/google` with weights 400, 700

**Rationale**: DM Sans is a Google Fonts typeface, freely available. The `next/font` integration handles automatic subsetting, self-hosting, and layout shift prevention. Weight 700 is sufficient for bold stat numbers; weight 400 for regular text if needed.

**Alternatives considered**:
- Use Inter (already in project) for stats: Rejected — user specifically requested DM Sans
- Load DM Sans via `<link>` tag: Rejected — next/font is the standard Next.js pattern, provides better performance
- Use variable font weight range: Rejected — only 400 and 700 are needed, reduces payload

### 3. Button Visibility Fix

**Decision**: Change "Reserve Table" button to `bg-orange-500 text-white` with `hover:bg-orange-600`

**Rationale**: White text on orange background provides strong contrast (WCAG AA compliant). Orange matches the site's primary color palette. The WhatsApp button is green, so orange creates clear visual differentiation between the two CTAs.

**Alternatives considered**:
- Dark text on white with border: Rejected — looks like a secondary/outline button, less prominent
- Orange border with orange text: Rejected — too subtle, low contrast on white background
- Keep secondary variant with dark colors: Rejected — secondary variant has internal dark mode styles that conflict

### 4. Stats Card Styling

**Decision**: White card with `rounded-2xl shadow-md border-l-4 border-orange-500`

**Rationale**: Material Design shadow-md (4dp elevation) provides visible depth without being heavy. A 4px left border accent is a common card pattern that adds visual interest without overwhelming the content. Rounded corners match the existing `rounded-2xl` pattern used elsewhere.

**Alternatives considered**:
- Full gradient background (current): Rejected — looks like a colored block, not a card
- Shadow-lg with thin border: Rejected — shadow-lg can feel heavy on mobile
- Shadow-sm with thick border: Rejected — thick border can feel unbalanced

### 5. Email Template Gradient Handling

**Decision**: Replace inline `linear-gradient(135deg,#d97706,#ea580c)` with solid `#f97316`

**Rationale**: Email templates use inline CSS (not Tailwind), so they must be edited individually. The gradient-to-solid change is a direct string replacement. Solid orange is simpler and more consistent with the website changes.

**Alternatives considered**:
- Leave email templates unchanged: Rejected — user confirmed they should be updated
- Use a CSS variable in emails: Rejected — email clients have limited CSS variable support
