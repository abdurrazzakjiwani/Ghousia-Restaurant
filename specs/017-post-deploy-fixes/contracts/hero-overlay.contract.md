# Contract: Hero Overlay Specification

## Overview
Defines the expected behavior and styling for hero section dark overlays across all pages.

## Contract ID
HO-001

## Version
1.0.0

## Status
Approved

## Requirements

### HO-001: Home Page Hero Overlay
- **Overlay Darkness**: 50% (`bg-black/50`)
- **Text Color**: Must inherit from existing text colors
- **Minimum Contrast**: 4.5:1 ratio between text and overlay background
- **Maximum Line Length**: 60 characters
- **Background Image**: Must not be changed (existing hero1-3.webp/hero1-3.png)
- **Build Verification**: `npm run build` must pass without errors

### HO-002: About Page Hero Overlay
- **Overlay Darkness**: 50% (`bg-black/50`) — already correct, no change needed
- **Text Color**: Must inherit from existing text colors
- **Minimum Contrast**: 4.5:1 ratio between text and overlay background
- **Maximum Line Length**: 60 characters
- **Background Image**: Must be `/images/about/our-story-bg.jpg` (replaced from `/images/hero/hero1.webp`)
- **Alt Text**: `alt="Ghousia Restaurant story and ambiance"` (for screen readers)

### HO-003: Overlay Consistency
- Both home and About pages must use identical 50% overlay darkness
- No regression in light mode (overlay should not affect light mode rendering)
- Fallback behavior: if background image fails to load, solid dark background maintains aesthetic

## Test Criteria
- Visual regression testing: hero sections on both home and About pages render with 50% dark overlay
- Accessibility testing: contrast ratio measured at 4.5:1 minimum using automated tools
- Build verification: no TypeScript or Tailwind CSS errors during build
- Image optimization: hero images properly sized and not distorted