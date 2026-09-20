# Quickstart: UI Styling Updates

**Feature**: 013-ui-styling-updates
**Date**: 2026-09-19

## Prerequisites

- Node.js 18+ installed
- Project dependencies installed (`npm install`)
- Branch `013-ui-styling-updates` checked out

## Step-by-Step Setup

### 1. Install DM Sans Font

The DM Sans font will be added to `src/app/layout.tsx` via `next/font/google`. No manual installation needed — Next.js handles downloading and self-hosting automatically.

### 2. Update Tailwind Config

Change `gradient-start` and `gradient-end` in `tailwind.config.ts` to the same solid orange value (`#f97316`).

### 3. Update Global Styles

Modify `globals.css` to:
- Change `.btn-primary` from gradient to solid orange
- Update scrollbar thumb from gradient to solid orange

### 4. Fix Reserve Table Button

Update `CTABanner.tsx` to:
- Remove `text-white` from parent container
- Change button to `bg-orange-500 text-white hover:bg-orange-600`

### 5. Restyle Stats Card

Update `AboutPreview.tsx` to:
- Change gradient background to white card styling
- Add `shadow-md border-l-4 border-orange-500`
- Apply DM Sans font to numbers
- Change label colors to gray

### 6. Update Remaining Gradient Instances

Fix hardcoded gradients in:
- `MainNav.tsx` — gradient text → solid orange
- `MobileDrawer.tsx` — gradient text → solid orange
- `contact/page.tsx` — 3 icon circles → solid orange
- `Button.tsx` — primary variant → solid orange

### 7. Update Email Templates

Replace inline CSS gradients in:
- `OrderConfirmation.tsx` — 2 instances
- `RestaurantAlert.tsx` — 1 instance

### 8. Verify

Run `npm run build` to verify no TypeScript or build errors.

## Testing Checklist

- [ ] Visit homepage — all orange elements are solid color
- [ ] Scroll to "Ready to Order" — Reserve Table button is visible with orange background
- [ ] Hover Reserve Table — shows orange-600 hover state
- [ ] Click Reserve Table — navigates to /reservation
- [ ] Scroll to "Our Story" — stats card is white with shadow and orange left border
- [ ] Stats numbers display in DM Sans font
- [ ] Visit menu page — category filters, + buttons, Order buttons are solid orange
- [ ] Visit checkout — Continue button is solid orange
- [ ] Check chat widget scrollbar — solid orange thumb
- [ ] Check email preview — solid orange headers/buttons
- [ ] Test on mobile (375px) — all elements responsive
- [ ] Test on tablet (768px) — all elements responsive
- [ ] `npm run build` passes with no errors
