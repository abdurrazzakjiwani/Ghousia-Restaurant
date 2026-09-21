# Data Model: Hero Image Carousel

**Date**: 2026-09-17  
**Feature**: 001-hero-carousel

## Summary

This feature introduces **no new data entities**. The carousel state is managed entirely in React component state (not persisted). The hero images are static files served from the public directory.

## Existing Entities (unchanged)

No existing entities are modified by this feature.

## New UI State (not persisted)

The following new state is introduced in the Hero component (not persisted to database):

### Hero Carousel State

| State Variable | Type | Purpose |
|---------------|------|---------|
| `currentIndex` | `number` | Index of the currently displayed hero image (0, 1, or 2) |
| `isPaused` | `boolean` | Whether auto-rotation is paused (e.g., on hover, reduced motion) |

These are local component state only — no database changes, no API changes, no new tables.

## Image Assets

| File | Location | Purpose |
|------|----------|---------|
| hero1.png | public/images/hero/ | First hero carousel image |
| hero2.png | public/images/hero/ | Second hero carousel image |
| hero3.png | public/images/hero/ | Third hero carousel image |

Images are moved from project root (`Hero 1.png`, `Hero 2.png`, `Hero 3.png`) to `public/images/hero/` with renamed filenames (no spaces).
