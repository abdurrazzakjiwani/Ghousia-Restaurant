# Research: Homepage UX Fixes

**Feature**: 015-homepage-ux-fixes  
**Date**: 2026-09-21  
**Status**: Complete

## Research Questions

### 1. Menu Navigation Loading Issue

**Question**: Why does `useSearchParams()` cause menu pages to not render?

**Finding**: In Next.js 15+ with React 19, `useSearchParams()` suspends the component until the Suspense boundary catches it. The `MenuClientContent` component uses `useSearchParams()` at the top level, which causes the entire component to suspend. While the `Suspense` boundary in `menu/page.tsx` should catch this, the `PageTransition` component (`AnimatePresence mode="wait"`) delays rendering until the exit animation completes, creating a perceived long load time.

**Solution**: Replace `useSearchParams()` with a URL-reading approach that doesn't suspend. Read `window.location.search` inside a `useEffect` on mount and on route changes to extract the `category` param. Use `useState` for the initial category (defaulting to "all").

**Decision**: Use `useEffect` + `window.location.search` instead of `useSearchParams()`  
**Rationale**: Eliminates Suspense dependency, renders immediately, maintains URL sync  
**Alternatives considered**: 
- Keep `useSearchParams()` with better Suspense handling (rejected - still causes delay)
- Use `useRouter().query` (rejected - not available in Next.js App Router)

### 2. Featured Items Filtering

**Question**: How to reduce "Our Specialties" from 11 to 4 items?

**Finding**: The `getFeaturedItems()` function in `menu-data.ts` filters items where `is_featured === true`. Currently 11 items have this flag set. To show only 4 items, we need to set `is_featured: false` on 7 items.

**Items to keep featured** (IDs): 101 (Zinger Burger), 201 (Club Sandwich), 501 (Grill Chargha), 701 (Boneless Chicken Creamy Handi)

**Items to un-feature** (IDs): 301, 401, 601, 801, 1001, 1201, 1301

**Decision**: Set `is_featured: false` on 7 items in `menu-data.ts`  
**Rationale**: Simple data change, no code logic changes needed  
**Alternatives considered**: None - this is the standard approach

### 3. Hero Overlay Opacity

**Question**: What opacity value provides adequate text readability?

**Finding**: Current overlay is `bg-black/20` (20% opacity). For text readability against varied images, WCAG recommends contrast ratio of at least 4.5:1. Testing shows `bg-black/40` (40% opacity) provides sufficient contrast for white text on most background images.

**Decision**: Change `bg-black/20` to `bg-black/40`  
**Rationale**: Doubles overlay darkness, ensures text readability  
**Alternatives considered**: 
- `bg-black/50` (rejected - too dark, obscures images)
- `bg-black/30` (rejected - may still have contrast issues)

### 4. Floating Icon Positions

**Question**: What are the exact Tailwind CSS classes for new positions?

**Finding**: 
- Chatbot (SpooniFAB): Currently `bottom-24 right-6` → Change to `bottom-6 right-6`
- WhatsApp: Currently `bottom-6 right-6` → Change to `bottom-24 left-6`
- Scroll-to-top: Currently `bottom-24 left-6` → Change to `bottom-24 right-6`
- GroqChatWidget: Currently `bottom-24 right-6` → Change to `bottom-6 right-6` (match SpooniFAB)

**Decision**: Update CSS classes in 4 component files  
**Rationale**: Direct implementation of user's requested rotation  
**Alternatives considered**: None - user confirmed the rotation

### 5. CTA Section Text

**Question**: What exact text should replace the order-related content?

**Finding**: User selected Option A: "Visit us at Block 3, Federal B Area, Hussainabad for an unforgettable dining experience"

**Decision**: Use the specified text in CTABanner component  
**Rationale**: User's explicit choice  
**Alternatives considered**: None - user confirmed

## Research Summary

| Question | Decision | Impact |
|----------|----------|--------|
| Menu loading fix | Replace `useSearchParams()` with `useEffect` + `window.location` | High - fixes all 5 broken navigation paths |
| Featured items | Set 7 items `is_featured: false` | Medium - content curation |
| Hero overlay | Change `bg-black/20` to `bg-black/40` | Low - visual improvement |
| Icon positions | Update CSS classes in 4 files | Low - layout adjustment |
| CTA text | Use specified dine-in text | Medium - business messaging |
