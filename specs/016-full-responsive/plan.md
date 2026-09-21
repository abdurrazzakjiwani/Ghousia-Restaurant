# Implementation Plan: Full Responsive Overhaul

**Branch**: `016-full-responsive` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/016-full-responsive/spec.md`

## Summary

Make the entire Ghousia Golden Spoon website fully responsive across all devices (320px–2560px), fixing visibility issues with text, colors, buttons, and interactive elements. Includes dark mode support, touch target fixes, keyboard navigation, contrast improvements, and graceful animation fallback. Approximately 21 files need modification across 4 priority phases.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (framer-motion)  
**Storage**: localStorage for cart (existing), static menu data  
**Testing**: Manual verification, npm run build, npm run lint  
**Target Platform**: Web (last 2 versions of Chrome, Safari, Firefox, Samsung Internet, Edge)  
**Project Type**: Web application (Next.js)  
**Performance Goals**: Content visible within 1 second before JS hydration  
**Constraints**: No new pages/features; purely responsive/visibility fixes  
**Scale/Scope**: Single restaurant website, ~87 menu items, 10+ pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Status**: Constitution file not available. No constitutional gates to check. Proceeding with implementation.

## Project Structure

### Documentation (this feature)

```text
specs/016-full-responsive/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API changes)
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code Changes by Phase

#### Phase 1: Critical Fixes (Breaks mobile UX)

```text
src/app/globals.css                         # MODIFY: Remove overflow-x:hidden, add safe-area utilities
src/components/ui/WhatsAppButton.tsx        # MODIFY: Add safe-area-inset-bottom
src/components/ui/SpooniFAB.tsx             # MODIFY: Add safe-area-inset-bottom
src/components/ui/BackToTop.tsx             # MODIFY: Add safe-area-inset-bottom, adjust stacking
src/components/chat/GroqChatWidget.tsx      # MODIFY: Responsive height (max-h-[50vh]), safe-area
src/components/contact/MapEmbed.tsx         # MODIFY: Responsive aspect-ratio height
```

#### Phase 2: High Priority (Broken/degraded layout)

```text
src/components/layout/MainNav.tsx           # MODIFY: Add cart badge to mobile header
src/components/layout/MobileDrawer.tsx      # MODIFY: Add slide animation, dark mode
src/components/layout/InfoBar.tsx           # MODIFY: Show on mobile (compact version)
src/components/layout/Footer.tsx            # MODIFY: Phone number wrapping, dark mode
src/components/home/Hero.tsx                # MODIFY: Responsive text sizing, fix dot/chevron overlap
src/components/home/Testimonials.tsx        # MODIFY: Fix SSR hydration, touch-visible arrows
src/components/order/OrderSummary.tsx       # MODIFY: Better mobile wrapping
src/components/order/CheckoutStep2.tsx      # MODIFY: Responsive grid (1-col on mobile)
src/components/menu/MenuCard.tsx            # MODIFY: Better mobile card layout
src/components/order/MapPicker.tsx          # MODIFY: Responsive height
```

#### Phase 3: Medium Priority (Degraded experience)

```text
src/components/layout/Navbar.tsx            # MODIFY: Dark mode variants
src/components/layout/SearchInput.tsx       # MODIFY: Responsive dropdown width
src/components/layout/CartBadge.tsx         # MODIFY: Increase badge size
src/components/ui/Modal.tsx                 # MODIFY: Responsive padding, larger close button
src/components/ui/Button.tsx                # MODIFY: Responsive button sizes
src/components/reviews/ReviewForm.tsx       # MODIFY: Larger star touch targets
src/components/menu/MenuItemModal.tsx       # MODIFY: Responsive button layout
src/components/menu/CategoryFilter.tsx      # MODIFY: Scroll indicators
src/components/home/FeaturedMenu.tsx        # MODIFY: Minor responsive tweaks
src/components/home/GrillCharghaShowcase.tsx # MODIFY: Responsive image sizing
src/components/home/AboutPreview.tsx        # MODIFY: Responsive stats grid
src/components/contact/ContactForm.tsx      # MODIFY: Minor touch target fixes
src/app/about/page.tsx                      # MODIFY: Responsive hero, map height
src/app/contact/page.tsx                    # MODIFY: Touch targets
```

#### Phase 4: Low Priority (Polish)

```text
src/components/layout/PageTransition.tsx    # No changes needed
src/components/layout/CategoryDropdown.tsx  # MODIFY: Responsive width on tablet
src/components/order/OrderTracker.tsx       # No changes needed
src/components/chat/ChatMessage.tsx         # No changes needed
```

## Complexity Tracking

| Phase | Files | Est. Complexity | Risk |
|-------|-------|-----------------|------|
| Phase 1 (Critical) | 6 | Low-Medium | Low — isolated CSS/position changes |
| Phase 2 (High) | 10 | Medium | Medium — some layout restructuring |
| Phase 3 (Medium) | 14 | Low | Low — mostly padding/sizing tweaks |
| Phase 4 (Low) | 3 | Low | Low — minor polish |
| **Total** | **~21 unique files** | **Medium** | **Low-Medium** |

**Structure Decision**: All changes are component-level CSS/class modifications within the existing Next.js App Router architecture. No new components, pages, or data structures are required. No API changes.
