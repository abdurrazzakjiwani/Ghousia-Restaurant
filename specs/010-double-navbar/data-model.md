# Data Model: Double Navbar Redesign

**Date**: 2026-09-18
**Feature**: 010-double-navbar

## Entities

### NavItem (existing, extended)

Represents a navigation link. Currently hardcoded in `Navbar.tsx`. Will be restructured for the double navbar.

| Field | Type | Description |
|-------|------|-------------|
| label | string | Display text (e.g., "Home", "Menu") |
| href | string | Destination URL (e.g., "/", "/menu") |
| icon | LucideIcon \| null | Optional icon for mobile/icon-only display |
| children | NavItem[] \| null | Optional sub-items for dropdown (e.g., categories under Menu) |

**Current navLinks** (to be reduced):
```typescript
// BEFORE: 8 links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/branches", label: "Branches" },      // REMOVE from nav
  { href: "/location", label: "Location" },       // REMOVE from nav
  { href: "/contact", label: "Contact" },
  { href: "/reservation", label: "Reserve" },     // REMOVE from nav
  { href: "/tracking", label: "Track Order" },    // MOVE to info bar
];

// AFTER: 4 links
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu", children: categories },  // with dropdown
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

### Category (existing, unchanged)

Represents a food category. Already defined in `src/lib/menu-data.ts`. Used by the category dropdown.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Display name (e.g., "Burgers") |
| slug | string | URL-safe identifier (e.g., "burgers") |
| icon | string \| null | Emoji icon (e.g., "🍔") |
| display_order | number | Sort order |

**13 categories**: Burgers, Sandwiches, Broast, BBQ, Chargha, Karahi, Handi, Chinese, Rolls, Pasta, Extras, Paratha & Breads, Desserts

### CartItem (existing, unchanged)

Represents an item in the user's cart. Already defined in `src/types/index.ts`. The navbar cart badge reads the count from this.

| Field | Type | Description |
|-------|------|-------------|
| menu_item_id | string | References MenuItem.id |
| name | string | Display name |
| price | number | Price in PKR |
| quantity | number | Quantity selected |
| image_url | string \| null | Path to image |

**Storage**: localStorage via `useCart` hook (key: `"ghousia-cart"`)

### SearchResult (ephemeral, not stored)

Represents a menu item matching the user's search query. Generated client-side by `searchItems()`.

| Field | Type | Description |
|-------|------|-------------|
| item | MenuItem | The matching menu item |
| highlight | boolean | Whether to apply highlight animation (set when navigated from search) |

### InfoBarConfig (static, not stored)

Configuration for the info bar content. Read from environment variables.

| Field | Type | Source |
|-------|------|--------|
| phone | string | `NEXT_PUBLIC_RESTAURANT_PHONE2` or default |
| hours | string | `NEXT_PUBLIC_RESTAURANT_HOURS` or default |
| trackOrderHref | string | Hardcoded: "/tracking" |

## Relationships

```
NavItem (1) ──> (many) NavItem (children/categories)
Category (many) ──> (0..1) NavItem (as dropdown child)
CartItem (many) ──> (1) MenuItem (via menu_item_id)
SearchResult (1) ──> (1) MenuItem (generated from search)
```

## State Transitions

### Search Input State

```
[Closed] ──click search icon──> [Open] ──type query──> [Open + Results]
    ^                                |
    └──press Escape / click outside──┘
    └──select result────────────────> [Closed] + navigate to /menu
```

### Category Dropdown State

```
[Closed] ──hover Menu link──> [Open] ──mouse leaves (200ms delay)──> [Closed]
    ^                              |
    └──mouse re-enters─────────────┘ (clears close timeout)
    └──click category─────────────> [Closed] + navigate to /menu?category=slug
    └──press Escape────────────────> [Closed]
```

### Mobile Menu State

```
[Closed] ──tap hamburger──> [Open] ──tap link──> [Closed] + navigate
    ^                            |
    └──tap close / backdrop──────┘
```

## Validation Rules

- `phone` must be a valid Pakistani phone number format
- `hours` must be a string (no validation needed)
- `category.slug` must match URL-safe format
- `cart badge count` must be non-negative integer, display "99+" if > 99
- `search query` must be non-empty to trigger search
- `dropdown close delay` must be 200ms (configurable)

## Migration Notes

- No database changes required
- No schema changes required
- Cart data format unchanged (CartItem interface unchanged)
- Category data unchanged (13 categories, 85 items)
- NavItem structure extended (added `children` field for dropdown)
- Environment variables already configured for phone and hours
