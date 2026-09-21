# Data Model: World-Class Restaurant Website Upgrade

**Date**: 2026-09-16  
**Feature**: 006-worldclass-web

## Summary

This feature introduces **no new data entities**. All changes are UI behavior and animation modifications to existing components. The data model from previous features (menu items, reviews, reservations, orders, contacts) remains unchanged.

## Existing Entities (unchanged)

The following entities from the existing Supabase schema are referenced but NOT modified:

- **MenuItem**: Menu items with categories, prices, images
- **Review**: Customer reviews with ratings
- **Reservation**: Table reservation bookings
- **Order**: WhatsApp order records
- **Contact**: Contact form submissions
- **Category**: Menu categories

## New UI State (not persisted)

The following new state variables are introduced in client components (not persisted to database):

### ChatWidget State

| State Variable | Type | Purpose |
|---------------|------|---------|
| `isNearBottom` | `boolean` | Tracks whether user is within 100px of chat bottom |
| `showScrollFAB` | `boolean` | Controls visibility of "scroll to bottom" button |

### ScrollProgress State

| State Variable | Type | Purpose |
|---------------|------|---------|
| `scrollYProgress` | `MotionValue<number>` | Framer Motion value (0-1) mapping scroll position |

### BackToTop State

| State Variable | Type | Purpose |
|---------------|------|---------|
| `isVisible` | `boolean` | Controls visibility after scrolling past 500px |

### CategoryFilter State

| State Variable | Type | Purpose |
|---------------|------|---------|
| `selectedId` | `string` | Used as `layoutId` for animated pill indicator |

### Form States (ContactForm, ReservationForm, ReviewForm)

| State Variable | Type | Purpose |
|---------------|------|---------|
| `status` | `"idle" \| "loading" \| "success" \| "error"` | Drives animated transitions between form states |
| `errorMessage` | `string \| null` | Error message for animated error display |

### useCountUp Hook

| Parameter | Type | Purpose |
|-----------|------|---------|
| `end` | `number` | Target number to count to |
| `duration` | `number` (default 2000) | Animation duration in ms |
| `startOnView` | `boolean` (default true) | Start counting when element enters viewport |

Returns: `ref` (for viewport detection) and `count` (current animated value)
