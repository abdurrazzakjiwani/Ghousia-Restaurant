# Quickstart: Full Responsive Overhaul

**Feature**: 016-full-responsive  
**Date**: 2026-09-21  
**Status**: Complete

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Browser with responsive dev tools (Chrome DevTools recommended)

## Setup

```bash
# Checkout feature branch
git checkout 016-full-responsive

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

## Verification Checklist

### Phase 1: Critical Fixes

#### Safe-Area Insets (Notched iPhones)

- [ ] Open site on iPhone with notch (or use Chrome DevTools device simulation)
- [ ] Verify WhatsApp button is above home indicator bar
- [ ] Verify SpooniFAB (chatbot) is above home indicator bar
- [ ] Verify BackToTop button is above home indicator bar
- [ ] Verify chat widget input is above home indicator bar

#### Chat Widget Responsive Height

- [ ] Open chat widget on mobile viewport (320px height)
- [ ] Verify chat messages area doesn't push input below fold
- [ ] Verify input field is always visible and tappable

#### Map Embed Responsive Height

- [ ] Visit `/location` page on mobile
- [ ] Verify map doesn't take more than 50% of viewport height
- [ ] Verify map is still usable (pinch-to-zoom works)

### Phase 2: High Priority Fixes

#### Mobile Navigation Cart Badge

- [ ] On mobile, verify cart badge is visible in the hamburger header area
- [ ] Verify cart count updates when items are added

#### Info Bar Mobile Visibility

- [ ] On mobile (320px), verify phone icon is visible in top bar
- [ ] Verify "Track Order" link is visible in top bar
- [ ] Verify bar doesn't take excessive vertical space

#### Dark Mode - Navigation

- [ ] Enable dark mode
- [ ] Verify navbar background is dark
- [ ] Verify all nav links are visible (light text on dark background)
- [ ] Verify hamburger icon is visible
- [ ] Verify mobile drawer has dark background with visible links

#### Dark Mode - Footer

- [ ] Enable dark mode
- [ ] Verify footer text is visible
- [ ] Verify footer links are visible and tappable
- [ ] Verify phone numbers are readable

#### Testimonials - Touch Navigation

- [ ] On mobile, verify prev/next arrows are visible (at reduced opacity)
- [ ] Verify arrows are tappable (44px touch target)
- [ ] Verify dot indicators show max 8 on mobile

#### Testimonials - SSR Fix

- [ ] Refresh page rapidly on mobile
- [ ] Verify no flash of incorrect dot count
- [ ] Verify no React hydration error in console

#### Checkout Grid Responsive

- [ ] On mobile, verify customer details fields stack to single column
- [ ] Verify "Name" and "Phone" are not cramped side-by-side
- [ ] Verify all form fields are tappable

### Phase 3: Medium Priority Fixes

#### Text Contrast

- [ ] Verify all body text has sufficient contrast (4.5:1 minimum)
- [ ] Verify prices are solid orange (not gradient) and readable
- [ ] Verify order totals are solid orange and readable

#### Touch Targets

- [ ] Verify modal close button is at least 44px
- [ ] Verify star rating buttons are at least 44px
- [ ] Verify quantity +/- buttons are at least 44px
- [ ] Verify chat send button is at least 44px

#### Keyboard Navigation

- [ ] Tab through homepage — verify visible focus indicators on all interactive elements
- [ ] Open mobile drawer — verify Tab cycles within drawer
- [ ] Press Escape — verify drawer closes and focus returns to hamburger
- [ ] Open modal — verify Tab cycles within modal (doesn't escape to page)

#### Hero Section Mobile

- [ ] On mobile, verify CTA buttons are visible above the fold
- [ ] Verify hero text is readable (not too large, not too small)
- [ ] Verify dot indicators don't overlap with chevron

#### Footer Phone Numbers

- [ ] On narrow screen, verify phone numbers wrap gracefully
- [ ] Verify both numbers are tappable (tel: links work)

### Phase 4: Low Priority Polish

#### Reduced Motion

- [ ] Enable "prefers-reduced-motion" in OS settings
- [ ] Verify animations are disabled
- [ ] Verify content is still visible and functional

#### Split-Screen Tablet

- [ ] Open in iPad split-screen mode (~393px width)
- [ ] Verify layout renders as mobile (single column)
- [ ] Verify all content is accessible

## Build Verification

```bash
# Build for production
npm run build

# Check for errors
npm run lint

# Type check
npx tsc --noEmit
```

## Device Testing Matrix

| Device | Viewport | Priority |
|--------|----------|----------|
| iPhone SE (320px) | 375×667 | Critical |
| iPhone 14 (390px) | 390×844 | Critical |
| Samsung Galaxy S23 (360px) | 360×780 | Critical |
| iPad (768px) | 768×1024 | High |
| Desktop (1920px) | 1920×1080 | High |
| iPhone Landscape | 844×390 | Medium |
| iPad Split-Screen | 393×580 | Medium |

## Files Modified

| File | Phase | Change |
|------|-------|--------|
| `src/app/globals.css` | 1 | Remove overflow-x:hidden, add safe-area utilities |
| `src/components/ui/WhatsAppButton.tsx` | 1 | Add safe-area-inset-bottom |
| `src/components/ui/SpooniFAB.tsx` | 1 | Add safe-area-inset-bottom |
| `src/components/ui/BackToTop.tsx` | 1 | Add safe-area-inset-bottom, adjust stacking |
| `src/components/chat/GroqChatWidget.tsx` | 1 | Responsive height, safe-area |
| `src/components/contact/MapEmbed.tsx` | 1 | Responsive aspect-ratio height |
| `src/components/layout/MainNav.tsx` | 2 | Add cart badge to mobile header |
| `src/components/layout/MobileDrawer.tsx` | 2 | Add slide animation, dark mode |
| `src/components/layout/InfoBar.tsx` | 2 | Show compact version on mobile |
| `src/components/layout/Footer.tsx` | 2 | Phone wrapping, dark mode |
| `src/components/home/Hero.tsx` | 2 | Responsive text, fix dot/chevron overlap |
| `src/components/home/Testimonials.tsx` | 2 | Fix SSR hydration, touch-visible arrows |
| `src/components/order/OrderSummary.tsx` | 2 | Better mobile wrapping |
| `src/components/order/CheckoutStep2.tsx` | 2 | Responsive grid |
| `src/components/menu/MenuCard.tsx` | 2 | Better mobile card layout |
| `src/components/order/MapPicker.tsx` | 2 | Responsive height |
| `src/components/layout/Navbar.tsx` | 3 | Dark mode variants |
| `src/components/layout/SearchInput.tsx` | 3 | Responsive dropdown width |
| `src/components/layout/CartBadge.tsx` | 3 | Increase badge size |
| `src/components/ui/Modal.tsx` | 3 | Responsive padding, larger close button |
| `src/components/ui/Button.tsx` | 3 | Responsive button sizes |
| `src/components/reviews/ReviewForm.tsx` | 3 | Larger star touch targets |
| `src/components/menu/MenuItemModal.tsx` | 3 | Responsive button layout |
| `src/components/menu/CategoryFilter.tsx` | 3 | Scroll indicators |
| `src/components/home/FeaturedMenu.tsx` | 3 | Minor responsive tweaks |
| `src/components/home/GrillCharghaShowcase.tsx` | 3 | Responsive image sizing |
| `src/components/home/AboutPreview.tsx` | 3 | Responsive stats grid |
| `src/components/contact/ContactForm.tsx` | 3 | Minor touch target fixes |
| `src/app/about/page.tsx` | 3 | Responsive hero, map height |
| `src/app/contact/page.tsx` | 3 | Touch targets |
