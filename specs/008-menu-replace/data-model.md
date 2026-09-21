# Data Model: Menu Overhaul with Real Food Images

**Date**: 2026-09-18
**Feature**: 008-menu-replace

## Entities

### Category

Represents a menu category that groups related items.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (1-15) |
| name | string | Display name (e.g., "Burgers", "Paratha & Breads") |
| slug | string | URL-friendly identifier (e.g., "burgers", "paratha-breads") |
| display_order | number | Sort order on menu page (1-15) |
| icon | string | Emoji icon for category display |
| created_at | string | Always empty for static data |

**Total count**: 15 categories (13 existing + 2 new)

### MenuItem

Represents an individual menu item with pricing and image.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (format: {category_id}{sequence}) |
| category_id | string | Foreign key to Category |
| name | string | Display name (typos corrected) |
| description | string | Short description of the dish |
| price | number | Price in PKR (positive integer) |
| image_url | string | Path to image in public/images/food/ |
| is_available | boolean | Whether item is currently available |
| is_featured | boolean | Whether item is highlighted on menu |
| created_at | string | Always empty for static data |

**Total count**: 86 items

### Image File

Physical image file stored in the public directory.

| Property | Description |
|----------|-------------|
| Location | `public/images/food/{category-slug}/{filename}` |
| Formats | PNG, JPG, WEBP, AVIF |
| Naming | Original filename with typo corrections |

**Total count**: 86 files

## Relationships

```
Category (1) ──< (many) MenuItem
MenuItem (many) ──> (1) Image File
```

## Validation Rules

- Category.id must be unique and sequential (1-15)
- MenuItem.id must be unique
- MenuItem.price must be > 0 and < 5000
- MenuItem.category_id must reference a valid Category
- MenuItem.image_url must point to a valid file in public/images/food/
- No duplicate MenuItem names within the same category (allowed across categories)

## State Transitions

None. Menu data is static and does not change at runtime.

## Migration Notes

- All existing menu items will be removed from the data file
- New 86 items will be added
- Two new categories will be added (Paratha & Breads, Desserts)
- Existing prices preserved for matching items
- New items get estimated prices based on category
