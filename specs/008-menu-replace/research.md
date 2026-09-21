# Research: Menu Overhaul with Real Food Images

**Date**: 2026-09-18
**Feature**: 008-menu-replace

## Research Items

### R1: Static Menu Data Organization in Next.js

**Decision**: Keep menu data as TypeScript constants in `src/lib/menu-data.ts`

**Rationale**: The existing codebase already uses this pattern. The menu is static (no admin CMS), so a simple TypeScript file is sufficient. The `buildMenuContext()` function reads from this file on each request, ensuring auto-refresh.

**Alternatives considered**:
- JSON file: Would require parsing, less type safety
- Database: Overkill for 86 static items, adds complexity
- CMS integration: Not requested, would require new admin interface

### R2: Image Format Handling

**Decision**: Copy all image files as-is (PNG, JPG, WEBP, AVIF) to `public/images/food/{category}/`

**Rationale**: Next.js serves static files from `public/` directory. All modern browsers support these formats. The current `MenuCard.tsx` uses `<img>` tags (not Next.js `<Image>` component), so all formats work without configuration.

**Alternatives considered**:
- Convert all to WebP: Would reduce file size but adds build complexity
- Use Next.js Image component: Would require refactoring MenuCard.tsx, adds optimization but also complexity
- Serve via CDN: Vercel already serves static files via CDN

### R3: Menu Page Performance with 86 Items

**Decision**: Keep current rendering approach (all items rendered, category filter via client-side state)

**Rationale**: 86 items is well within browser rendering capacity. The current MenuGrid component already handles this. No pagination or virtualization needed at this scale.

**Alternatives considered**:
- Pagination: Would break the browsing experience for a restaurant menu
- Virtual scrolling: Overkill for 86 items
- Lazy loading images: Could help but adds complexity; not needed at this scale

### R4: Category Icon Assignment

**Decision**: Use emoji icons for new categories: 🫓 for Paratha & Breads, 🍮 for Desserts

**Rationale**: Consistent with existing category icons (🍔, 🥪, etc.). No new icon library needed.

**Alternatives considered**:
- Custom SVG icons: Would require design work, inconsistent with existing approach
- Lucide icons: Available but would need different rendering approach
- Text-only: Less visually appealing

### R5: Price Estimation Strategy

**Decision**: Estimate new item prices based on similar items in the same category

**Rationale**: The user requested "keep existing + estimate new" approach. Category-based estimation ensures consistency (e.g., all rolls priced between Rs. 250-600).

**Price ranges by category**:
- Burgers: Rs. 450-700
- Sandwiches: Rs. 400-650
- Broast: Rs. 350-1000
- BBQ: Rs. 600-1500
- Chargha: Rs. 900-1200
- Karahi: Rs. 1000-2000
- Handi: Rs. 1000-1800
- Chinese: Rs. 500-900
- Rolls: Rs. 250-600
- Pasta: Rs. 500-800
- Extras: Rs. 50-350
- Paratha & Breads: Rs. 80-200
- Desserts: Rs. 100-250
