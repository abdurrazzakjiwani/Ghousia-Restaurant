# Data Model: Homepage UX Fixes

**Feature**: 015-homepage-ux-fixes  
**Date**: 2026-09-21  
**Status**: Complete

## Entities

### MenuItem (existing - no schema changes)

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| category_id | string | Foreign key to Category |
| name | string | Item name |
| description | string | Item description |
| price | number | Price in PKR |
| image_url | string | Path to image |
| is_available | boolean | Whether item is available |
| is_featured | boolean | **MODIFY**: Set to false for 7 items |
| created_at | string | Creation timestamp |

**Changes**: Set `is_featured: false` on items 301, 401, 601, 801, 1001, 1201, 1301

### Category (existing - no changes)

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Category name |
| slug | string | URL-friendly identifier |
| display_order | number | Sort order |
| icon | string | Emoji icon |
| created_at | string | Creation timestamp |

### CartItem (existing - no changes)

| Field | Type | Description |
|-------|------|-------------|
| menu_item_id | string | Foreign key to MenuItem |
| name | string | Item name (denormalized) |
| price | number | Price at time of addition |
| image_url | string | Image path (denormalized) |
| quantity | number | Quantity selected |

**Storage**: localStorage key `ghousia-cart`

### FloatingActionButton (UI component - no persistence)

| Property | Type | Description |
|----------|------|-------------|
| position | string | CSS position classes |
| icon | component | Lucide icon component |
| onClick | function | Click handler |
| ariaLabel | string | Accessibility label |

## State Transitions

### MenuClientContent State

```
Initial → useEffect reads URL → Set categoryParam → Render items
```

No complex state machine - simple initialization flow.

### Floating Icon Visibility

```
Chatbot: Always visible
WhatsApp: Always visible  
Scroll-to-top: Hidden → Visible (after 500px scroll)
```

## Validation Rules

- `is_featured` must be boolean
- `category_id` must reference valid Category
- `price` must be positive number
- `image_url` must be valid path or empty string

## Data Volume

- Menu items: ~87 (static)
- Categories: 13 (static)
- Cart items: 0-50 (per user, localStorage)
- No database changes required
