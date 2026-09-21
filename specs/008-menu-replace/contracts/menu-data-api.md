# Menu Data Contract

**Date**: 2026-09-18
**Feature**: 008-menu-replace

## Overview

The menu is served as static TypeScript data, not via API endpoints. This document defines the data contract for the menu data file.

## Data Source

`src/lib/menu-data.ts` exports:

### `categories: Category[]`

Array of 15 category objects.

### `menuItems: MenuItem[]`

Array of 86 menu item objects.

### `getItemsByCategory(categorySlug: string): MenuItem[]`

Returns items for a given category slug.

### `getFeaturedItems(): MenuItem[]`

Returns items marked as featured.

### `searchItems(query: string): MenuItem[]`

Returns items matching search query.

### `buildMenuContext(): string`

Returns formatted string of all menu data for chatbot context.

## Schema

### Category

```typescript
interface Category {
  id: string;           // "1" through "15"
  name: string;         // Display name
  slug: string;         // URL-friendly name
  display_order: number; // Sort order
  icon: string;         // Emoji
  created_at: string;   // Always ""
}
```

### MenuItem

```typescript
interface MenuItem {
  id: string;           // Unique ID
  category_id: string;  // References Category.id
  name: string;         // Display name (typos corrected)
  description: string;  // Short description
  price: number;        // Price in PKR
  image_url: string;    // Path to image
  is_available: boolean; // Always true
  is_featured: boolean;  // true for ~10% of items
  created_at: string;   // Always ""
}
```

## Image Paths

All images stored in `public/images/food/{category-slug}/`

Examples:
- `/images/food/burgers/Zinger Burger.png`
- `/images/food/sandwiches/Club Sandwich.jpg`
- `/images/food/paratha-breads/Puri Paratha.png`

## Category Count

| Category | Slug | Items |
|----------|------|-------|
| Burgers | burgers | 5 |
| Sandwiches | sandwiches | 11 |
| Broast | broast | 4 |
| BBQ | bbq | 16 |
| Chargha | chargha | 1 |
| Karahi | karahi | 6 |
| Handi | handi | 3 |
| Chinese | chinese | 11 |
| Rolls | rolls | 19 |
| Pasta | pasta | 2 |
| Extras | extras | 4 |
| Paratha & Breads | paratha-breads | 2 |
| Desserts | desserts | 1 |
