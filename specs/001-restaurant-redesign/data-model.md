# Data Model: Restaurant Website Redesign

**Date**: 2026-09-18
**Feature**: 001-restaurant-redesign

## Summary

This feature introduces **no new data entities that require database storage**. All new data is static and managed in-memory or as file assets. The existing database schema (Supabase with 8 tables) is unchanged.

## Existing Entities (unchanged)

No existing entities are modified by this feature. All existing functionality (menu, orders, reservations, reviews, contacts) continues to use the same data model.

## New Static Data (not persisted)

### Branch Data

| Field | Type | Purpose |
|-------|------|---------|
| `name` | string | Branch name (e.g., "Ghousia Golden Spoon") |
| `address` | string | Full address with area and city |
| `image` | string | Path to branch image in public/images/branches/ |
| `mapQuery` | string | Google Maps search query for the location |

**Instances**: 3 branches defined in `branches-data.ts`

### Family Hall Data

| Field | Type | Purpose |
|-------|------|---------|
| `name` | string | Hall name (e.g., "Family Hall 1") |
| `image` | string | Path to hall image in public/images/branches/ |

**Instances**: 2 halls defined in `branches-data.ts`

### Testimonial Data

| Field | Type | Purpose |
|-------|------|---------|
| `name` | string | Customer name (e.g., "Ahmed Khan") |
| `rating` | number | Star rating (4 or 5) |
| `comment` | string | Customer feedback text (1-2 sentences) |
| `seed` | string | Unique seed for avatar generation |

**Instances**: 100 testimonials defined in `testimonials-data.ts`

### Feature Card Data (WhyChooseUs)

| Field | Type | Purpose |
|-------|------|---------|
| `icon` | string | Emoji icon for the card |
| `title` | string | Feature title (e.g., "Fresh Ingredients") |
| `description` | string | Short description (1 sentence) |

**Instances**: 4 cards hardcoded in `WhyChooseUs.tsx`

### Popular Category Data

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Category ID (from menu-data.ts) |
| `name` | string | Category name |
| `icon` | string | Emoji icon |
| `count` | number | Number of items in category |

**Instances**: Top 8 categories displayed, sourced from existing `menu-data.ts`

## Image Assets

| File | Location | Purpose |
|------|----------|---------|
| golden-spoon.png | public/images/branches/ | Ghousia Golden Spoon branch photo |
| silver-spoon.jpg | public/images/branches/ | Ghousia Silver Spoon branch photo |
| fast-food-chinese.jpg | public/images/branches/ | Ghousia Fast Food & Chinese branch photo |
| family-hall-1.jpg | public/images/branches/ | Family Hall 1 photo |
| family-hall-2.jpg | public/images/branches/ | Family Hall 2 photo |
| hero1.webp | public/images/hero/ | Hero carousel image 1 (optimized) |
| hero2.webp | public/images/hero/ | Hero carousel image 2 (optimized) |
| hero3.webp | public/images/hero/ | Hero carousel image 3 (optimized) |

Images are moved from project root to `public/images/branches/` with simplified filenames (no spaces). Hero images are converted from PNG to WebP with max 1920px width.
