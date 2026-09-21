# Quickstart: Homepage UX Fixes

**Feature**: 015-homepage-ux-fixes  
**Date**: 2026-09-21  
**Status**: Complete

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Setup

```bash
# Checkout feature branch
git checkout 015-homepage-ux-fixes

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

## Verification Checklist

### 1. Menu Navigation (5 entry points)

- [ ] Click "Menu" in navbar → Menu loads with all items
- [ ] Click "View Full Menu" on homepage → Menu loads with all items
- [ ] Click cart icon → Click "Browse Menu" → Menu loads with all items
- [ ] Click "Order Now" in Signature Dishes → Menu loads filtered to Chargha
- [ ] Click "View All Categories" → Menu loads with all items

### 2. Specialties Section

- [ ] Scroll to "Our Specialties" on homepage
- [ ] Verify exactly 4 items displayed
- [ ] Items: Zinger Burger, Grill Chargha, Club Sandwich, Boneless Creamy Handi

### 3. CTA Section

- [ ] Scroll to CTA section on homepage
- [ ] Heading reads "Ready to Dine at Our Restaurant"
- [ ] Text reads "Visit us at Block 3, Federal B Area, Hussainabad for an unforgettable dining experience"
- [ ] No "Order on WhatsApp" button visible
- [ ] "Reserve a Table" button present and functional

### 4. Floating Icons

- [ ] Chatbot icon at bottom-right corner (bottom-6 right-6)
- [ ] WhatsApp icon at bottom-left area (bottom-24 left-6)
- [ ] Scroll-to-top at bottom-right above chatbot (bottom-24 right-6)
- [ ] Scroll-to-top appears after scrolling 500+ pixels

### 5. Hero Section

- [ ] Text "Where Every Bite Tells a Story" clearly readable
- [ ] All button text readable
- [ ] Background image visible through overlay

## Build Verification

```bash
# Build for production
npm run build

# Check for errors
npm run lint
```

## Files Modified

| File | Change |
|------|--------|
| `src/lib/menu-data.ts` | Set 7 items `is_featured: false` |
| `src/components/menu/MenuClientContent.tsx` | Replace `useSearchParams()` |
| `src/components/home/CTABanner.tsx` | Update text, remove WhatsApp button |
| `src/components/home/Hero.tsx` | Change overlay to `bg-black/40` |
| `src/components/ui/SpooniFAB.tsx` | Position `bottom-6 right-6` |
| `src/components/ui/WhatsAppButton.tsx` | Position `bottom-24 left-6` |
| `src/components/ui/BackToTop.tsx` | Position `bottom-24 right-6` |
| `src/components/chat/GroqChatWidget.tsx` | Position `bottom-6 right-6` |
