# Quickstart: About Page Redesign

**Feature**: 012-about-page-redesign
**Date**: 2026-09-19

## Setup

No setup changes needed. This feature uses existing project dependencies and assets.

## File Changes Summary

### 1. Hero Section — Background Image

**File**: `src/app/about/page.tsx`
- Replace gradient-only hero with `hero1.webp` background image using `next/image`
- Add dark overlay (`bg-black/50`) for text contrast
- Add scroll-down chevron indicator at bottom
- Set `min-h-[70vh]` for proper viewport coverage
- Add gradient fallback for failed image load

### 2. Origin Story — Visual Timeline

**File**: `src/app/about/page.tsx`
- Convert text-only origin story to alternating two-column layout
- Beat 1: "Born from a family kitchen" → `BBQ Platter.png` (image right)
- Beat 2: "Traditional techniques" → `Chicken Malai Boti.png` (image left)
- Beat 3: "Serving thousands weekly" → `family-hall-1.jpg` (image right)
- Add pull-quote styling for key phrase with left accent border
- Stack vertically on mobile

### 3. Cooking Philosophy — Image Cards

**File**: `src/app/about/page.tsx`
- Replace icon-only cards with food photography backgrounds
- `Sizzling Tikka.png` for "Charcoal-Grilled Perfection"
- `Chicken Red Karahi.png` for "Hand-Ground Spices"
- `Beef Bihari Boti.png` for "Made with Love"
- Add dark gradient overlay for text readability (4.5:1 contrast)
- Add hover scale + overlay lighten effect

### 4. Stats Bar — Animated Count-Up

**File**: `src/app/about/page.tsx`
- Add new section between philosophy and values
- Reuse `useCountUp` hook from `@/hooks/useCountUp`
- 4 stats: 39+ Menu Items, 13 Categories, 1000+ Weekly Customers, Family Kitchen
- Gradient background, white text
- 2x2 grid on mobile, 4-column on desktop
- Respect `prefers-reduced-motion`

### 5. Contact Section — Styled Map

**File**: `src/app/about/page.tsx`
- Wrap Google Maps iframe in styled card (rounded-2xl, shadow-lg)
- Maintain existing contact info with gradient icon circles
- Keep WhatsApp reservation button functional
- Add fallback link if map fails to load

## Image Assets Used

| Image | Section | Path |
|-------|---------|------|
| Hero background | Hero | `public/images/hero/hero1.webp` |
| BBQ Platter | Origin Story (heritage) | `public/images/food/bbq/BBQ Platter.png` |
| Chicken Malai Boti | Origin Story (craft) | `public/images/food/bbq/Chicken Malai Boti.png` |
| Family Hall | Origin Story (community) | `public/images/branches/family-hall-1.jpg` |
| Sizzling Tikka | Philosophy (charcoal) | `public/images/food/bbq/Sizzling Tikka.png` |
| Chicken Red Karahi | Philosophy (spices) | `public/images/food/karahi/Chicken Red Karahi.png` |
| Beef Bihari Boti | Philosophy (love) | `public/images/food/bbq/Beef Bihari Boti.png` |

## Testing Checklist

- [ ] Hero: background image visible with dark overlay
- [ ] Hero: text readable on all viewports (375px, 768px, 1024px, 1440px)
- [ ] Hero: scroll indicator visible at bottom
- [ ] Hero: gradient fallback shows if image fails
- [ ] Origin: 3 food images displayed alongside text
- [ ] Origin: images stack vertically on mobile
- [ ] Origin: pull quote styled with accent border
- [ ] Philosophy: 3 cards with food photo backgrounds
- [ ] Philosophy: text readable over images (4.5:1 contrast)
- [ ] Philosophy: hover effect works on desktop
- [ ] Stats: numbers animate from 0 to final value
- [ ] Stats: 2x2 grid on mobile, 4-col on desktop
- [ ] Stats: respects prefers-reduced-motion
- [ ] Contact: map in styled card container
- [ ] Contact: all existing info preserved
- [ ] Contact: WhatsApp button functional
- [ ] Build passes with no new errors

## Deployment

```bash
npm run lint
npm run build
npx vercel --prod --yes
```
