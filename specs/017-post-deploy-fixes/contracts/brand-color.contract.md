# Contract: Brand Color Specification

## Overview
Defines the expected branding color usage across the website, ensuring consistent solid orange accent text.

## Contract ID
BC-001

## Version
1.0.0

## Status
Approved

## Requirements

### BC-001: Solid Orange Accent Color
- **Primary Color**: `#ea580c` (solid orange - Orange-600)
- **Hover Color**: `#c2410c` (darker orange on interaction)
- **Replaces**: All `text-gradient-start` and `text-gradient-end` tokens

### BC-002: Pages Requiring Solid Orange
- Home page: hero section heading, popular categories, FAQ section, about preview
- Location page: branch information headings
- Branches page: branch cards and headings
- Menu detail page: item name heading

### BC-003: Gradient Token Elimination
- **Zero remaining instances**: No `text-gradient-start` or `text-gradient-end` classes should exist in the codebase after implementation
- **Search verification**: Full codebase scan confirms 0 occurrences of gradient text tokens

### BC-004: Hover State
- All orange text links must darken to `#c2410c` on hover/focus
- Must provide visual feedback of interactivity

### BC-005: Exceptions (OK to Keep Gradient Backgrounds)
- Background gradients (not text) may still use gradient tokens:
  - `bg-linear-to-br from-gradient-start to-gradient-end` (WhyChooseUs component)
  - `bg-linear-to-r from-gradient-start to-gradient-end` (SpooniFAB component)
  - Search/focus ring gradients (MenuClientContent, TrackingClientContent)

## Test Criteria
- Codebase scan: 0 occurrences of `text-gradient-start` or `text-gradient-end` in text context
- Visual verification: all heading/text accents render in solid #ea580c
- Hover verification: orange text darkens to #c2410c on mouseover
- No visual regression: non-accent text colors unchanged