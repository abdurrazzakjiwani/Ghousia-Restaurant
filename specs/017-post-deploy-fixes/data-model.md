# Data Model: Post-Deployment UI Fixes

## Overview

This feature involves visual/UI fixes across the Ghousia Golden Spoon website. Unlike traditional features that involve database entities, this specification focuses on CSS class changes, image swaps, and overlay adjustments. The "entities" below represent UI components and their visual states.

---

## Entity: Navigation Menu (Hamburger Drawer)

**Description**: The mobile hamburger menu that expands into a full drawer with navigation links.

**Fields/Attributes**:
- `isOpen`: boolean - Whether the drawer is currently open
- `isDarkMode`: boolean - Whether dark mode is active (from useTheme hook)
- `links`: array of link objects {
  - `name`: string - Link text (Home, Menu, Order, Branches, About, Contact)
  - `href`: string - Navigation destination
  - `colorContrastRatio`: number - Minimum 4.5:1 against background
  - `ariaLabel`: string - Accessibility label (e.g., "Close menu")
- `focusState`: string - Current focused element within drawer
- `keyboardNavigation`: boolean - Whether keyboard navigation is enabled

**Relationships**:
- Uses `useTheme` hook for `dark` class toggling on `<html>`
- Coordinates with `MobileDrawer.tsx` component
- Interacts with `MainNav.tsx` mobile header icons

**State Transitions**:
- `closed` → `opening` → `open` → `closing` → `closed`
- Triggered by hamburger menu icon click
- ESC key closes drawer
- Click outside drawer closes it

**Validation Rules**:
- All non-active links must have color contrast ≥ 4.5:1 in both light and dark mode
- Active link must have color `text-amber-400` (existing behavior)
- Close button must have `aria-label="Close menu"` for screen readers

---

## Entity: Hero Section

**Description**: The large banner image with text overlay at the top of home and About pages.

**Fields/Attributes**:
- `pageType`: string - "home" or "about"
- `backgroundImage`: string - Path to hero image (e.g., "/images/hero/hero1.webp" or "/images/about/our-story-bg.jpg")
- `overlayDarkness`: number - Percentage (50 for both home and about)
- `textContrastRatio`: number - Minimum 4.5:1 between text and overlay
- `maxLineLength`: number - Maximum 60 characters for optimal reading
- `altText`: string - Alternative text for About page hero (`"Ghousia Restaurant story and ambiance"`)

**Relationships**:
- Home page: Uses `Hero.tsx` component, `bg-black/50` overlay, original hero images
- About page: Uses `about/page.tsx`, `bg-black/50` overlay (already correct), dedicated "Our Story" image

**State Transitions**:
- Image load → apply overlay → render text → user interaction
- Fallback: if image fails to load, display solid dark background

**Validation Rules**:
- Overlay must be exactly 50% opacity on both home and about pages
- Text contrast ratio ≥ 4.5:1 against overlay background
- Line length ≤ 60 characters for body text
- About page must have descriptive alt text for hero image

---

## Entity: Accent Text

**Description**: Text elements styled with the brand's solid orange color (#ea580c) for headings and highlights across multiple pages.

**Fields/Attributes**:
- `color`: string - Fixed to `#ea580c` (solid orange)
- `hoverColor`: string - `#c2410c` (darker orange on hover)
- `pages`: array of page paths {
  - "home/hero-heading",
  - "home/popular-categories",
  - "home/faq-section",
  - "location/branch-headings",
  - "branches/branch-card-headings",
  - "menu/[id]/item-heading"
- `replaces`: array of old color tokens {
  - "text-gradient-start",
  - "text-gradient-end"
- `accessibility`: string - `prefers-contrast` media query support

**Relationships**:
- Replaces all gradient text tokens across 7 files as specified
- Consistent color across all pages ensures brand cohesion
- Honors `prefers-contrast` media query for accessibility

**Validation Rules**:
- All accent text must render in `#ea580c` (solid orange)
- Hover state must darken to `#c2410c`
- No gradient text tokens should remain in the codebase
- System respects `prefers-contrast` and adjusts colors automatically

---

## Entity: Dark Mode

**Description**: Color scheme preference that uses dark backgrounds with light text, managed by the `useTheme` hook.

**Fields/Attributes**:
- `isActive`: boolean - Whether dark mode is currently active
- `prefersColorScheme`: string - OS-level preference ("light", "dark", "no-preference")
- `localStorage`: string - Stored preference ("light" or "dark")
- `htmlClass`: string - `"dark"` class when active, absent when inactive

**Relationships**:
- Toggles `dark` class on `<html>` element
- Affects: hamburger menu text colors, hero overlays, accent text visibility
- Respects `prefers-color-scheme` media query
- Now also respects `prefers-contrast` media query (from clarification Q3)

**Validation Rules**:
- Dark mode must not break hamburger menu visibility (all 4 acceptance scenarios must pass)
- Phone link text must be visible in dark mode
- Close button must be visible in dark mode
- All navigation links must have ≥ 4.5:1 contrast ratio

---

## Summary: Entity Relationship Diagram

```
┌─────────────────┐      ┌────────────────────┐
│   Navigation    │      │     Hero Section   │
│   (Drawer)      │      │ (Home/About)       │
│ • isOpen        │      │ • backgroundImage  │
│ • isDarkMode    │      │ • overlayDarkness  │
│ • links[]       │      │ • textContrast     │
│ • focusState    │      │ • maxLineLength    │
└───────▲─────────┘      └───────▲──────────────┘
        │                        │
        │                        │
        ▼                        ▼
┌─────────────────┐      ┌────────────────────┐
│   Accent Text   │      │   Dark Mode        │
│ • color: #ea580c│      │ • isActive         │
│ • hoverColor    │      │ • prefersContrast  │
│ • pages[]       │      │ • htmlClass        │
└─────────────────┘      └────────────────────┘
```

**Note**: This data model describes UI component states and visual attributes rather than database entities. All "fields" map to CSS classes, component props, or application state managed by React/context. No database persistence is required for these UI fixes.

**Phase 1 Output Complete**: data-model.md created with 4 entities documenting UI component states and visual attributes.