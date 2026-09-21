# Research: About Page Redesign

**Feature**: 012-about-page-redesign
**Date**: 2026-09-19
**Status**: Complete

## Research Questions

### R1: Hero Image Selection

**Decision**: Use `public/images/hero/hero1.webp` as the hero background image.
**Rationale**: WebP format is already optimized for web. Hero images are the highest quality restaurant photos available in the project. `hero1.webp` is the primary hero image used on the homepage, ensuring visual consistency.
**Alternatives considered**:
- Using a food close-up (rejected: hero should show the restaurant atmosphere, not a single dish)
- Using a branch photo (rejected: lower quality than dedicated hero images)
- Creating a new image (rejected: no new assets per spec constraints)

### R2: Origin Story Image Selection

**Decision**: Use 3 images from existing assets: `BBQ Platter.png` (heritage), `Chicken Malai Boti.png` (craft), `family-hall-1.jpg` (community).
**Rationale**: These images map to the three story beats: heritage/tradition (BBQ represents charcoal grilling legacy), craft/technique (Malai Boti represents hand-ground spices), and community/growth (restaurant interior represents scale).
**Alternatives considered**:
- Using burger/sandwich images (rejected: doesn't match the "authentic Pakistani cuisine" narrative)
- Using all food images (rejected: need at least one restaurant/interior shot for the growth story beat)

### R3: Philosophy Card Image Selection

**Decision**: Use food photography backgrounds: `Sizzling Tikka.png` (charcoal grilling), `Chicken Red Karahi.png` (spices), `Beef Bihari Boti.png` (love/care).
**Rationale**: Each image directly illustrates the philosophy it represents. Sizzling tikka shows charcoal grilling, karahi shows spice-rich cooking, beef boti shows slow-prepared care.
**Alternatives considered**:
- Using icons only (rejected: spec requires food photography backgrounds)
- Using abstract textures ( rejected: not appetizing enough for a restaurant)

### R4: Stats Bar Data

**Decision**: Reuse statistics from existing `AboutPreview.tsx`: 39+ Menu Items, 13 Categories, 1000+ Weekly Customers, Since Family Kitchen.
**Rationale**: These stats already exist in the codebase and are verified. No need to create new data.
**Alternatives considered**:
- Adding new stats (rejected: no new data source available)
- Using different numbers ( rejected: would be inaccurate)

### R5: Animation Approach

**Decision**: Reuse existing animation utilities (`fadeInUp`, `staggerContainer`, `staggerItem`, `viewportConfig`) and the `useCountUp` hook.
**Rationale**: These are already tested and working in the project. No new animation dependencies needed. Framer Motion handles `prefers-reduced-motion` automatically.
**Alternatives considered**:
- Adding GSAP (rejected: overkill for simple scroll animations, adds bundle size)
- Custom CSS animations (rejected: less control than framer-motion, harder to respect reduced motion)

### R6: Image Fallback Strategy

**Decision**: Use Tailwind CSS `bg-gradient-to-br from-gray-200 to-gray-300` as fallback for failed hero images. Use `object-cover` with `bg-gray-100` for origin story and philosophy images.
**Rationale**: Gradient fallback maintains visual quality even if images fail. `object-cover` ensures images scale properly within their containers.
**Alternatives considered**:
- Using a solid color fallback (rejected: looks broken, not graceful)
- Using a placeholder image (rejected: adds unnecessary HTTP request)

## Files to Modify

| File | Change | Priority |
|------|--------|----------|
| `src/app/about/page.tsx` | Full rewrite with 5 enhanced sections | All |

## No New Dependencies

All enhancements use existing dependencies (Tailwind CSS, Framer Motion, Lucide React, Next.js Image). No new packages needed.
