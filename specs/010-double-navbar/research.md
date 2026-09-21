# Research: Double Navbar Redesign

**Date**: 2026-09-18
**Feature**: 010-double-navbar

## Research Items

### R1: Double-Row Sticky Navbar Pattern

**Decision**: Use a single `<nav>` element with `sticky top-0 z-30` containing two internal `<div>` bands (info bar + main nav). Both rows share the same sticky container so they pin together at the top.

**Rationale**: Two separate `sticky top-0` elements would fight each other and create z-index conflicts. A single sticky wrapper with two internal bands guarantees they scroll as one unit and both pin at the top together. This is the standard pattern for multi-row sticky headers.

**Alternatives considered**:
- Two separate sticky elements: Rejected because they would overlap or create gaps during scroll
- Fixed positioning: Rejected because it would cover content and require manual scroll management
- Non-sticky double row: Rejected because the user expects the navbar to persist on scroll

### R2: Expandable Search Input

**Decision**: Use React `useState` to toggle between search icon and expanded input. Animate width expansion with Framer Motion `AnimatePresence`. Auto-focus input when expanded. Use `useRef` for focus management.

**Rationale**: Framer Motion is already used throughout the codebase. The expandable pattern is well-established and provides smooth UX. Auto-focus ensures the input is ready for typing immediately.

**Alternatives considered**:
- CSS-only transition: Rejected because it doesn't integrate well with Framer Motion's AnimatePresence
- Modal/overlay search: Rejected because the spec requires inline expansion
- Redirect to /menu search: Rejected because the spec requires inline expansion in navbar

### R3: Category Dropdown with Hover Delay

**Decision**: Use `onMouseEnter`/`onMouseLeave` with `setTimeout` for the 200ms close delay. Clear timeout on re-enter. Use Framer Motion for open/close animation.

**Rationale**: The 200ms delay prevents the dropdown from closing immediately when the mouse briefly leaves the dropdown area (common UX pattern). Clearing the timeout on re-enter prevents flickering.

**Alternatives considered**:
- No delay: Rejected because it causes flickering when mouse moves diagonally
- Longer delay (500ms): Rejected because it feels sluggish
- Click-only: Rejected because the spec requires hover behavior on desktop

### R4: Cart Badge with Real-Time Updates

**Decision**: Extract `useCart()` into a dedicated `CartBadge` component. The component calls `useCart()` directly and re-renders when cart state changes. Use `mounted` flag to avoid hydration mismatch.

**Rationale**: Isolating cart state in its own component prevents the entire navbar from re-rendering on every cart change. The `mounted` flag is already used in the codebase for this pattern.

**Alternatives considered**:
- React Context for cart: Rejected because the existing `useCart` hook already works
- Redux/Zustand: Rejected as unnecessary complexity for a single cart
- Props drilling from layout: Rejected because it would cause unnecessary re-renders

### R5: Search Result Scroll-to-Item with Highlight

**Decision**: After navigating to `/menu`, use `useEffect` to find the target item element by ID, call `scrollIntoView({ behavior: 'smooth', block: 'center' })`, and apply a temporary CSS class (border + background) that fades out after 2-3 seconds via `setTimeout`.

**Rationale**: `scrollIntoView` is the standard browser API for scrolling to elements. A temporary CSS class with animation is simpler than Framer Motion for this use case (the element may not be a Framer Motion component).

**Alternatives considered**:
- URL hash navigation: Rejected because it doesn't support smooth scrolling or highlight
- Framer Motion layout animation: Rejected because the target element may not be a Framer Motion component
- Query parameter-based: Rejected because it's more complex than needed

### R6: Mobile Drawer Navigation

**Decision**: Replace the current slide-down mobile menu with a full-width drawer that slides in from the right. Use Framer Motion `AnimatePresence` for enter/exit animation. Include all nav links, dark mode toggle, and search option.

**Rationale**: A right-side drawer is a common mobile pattern that provides more space for links and controls. It avoids the layout shift of the current height animation.

**Alternatives considered**- Full-screen overlay: Rejected because it's too invasive for a restaurant website
- Bottom sheet: Rejected because it conflicts with the existing floating action buttons
- Keep current slide-down: Rejected because it doesn't scale well with more links

### R7: Info Bar Responsive Behavior

**Decision**: Hide the info bar entirely on mobile (< 640px). On tablet (640px-768px), show only the phone number. On desktop (> 768px), show full info bar with phone, hours, and Track Order.

**Rationale**: Mobile screens have limited vertical space. The phone number is the most critical info for mobile users (tap-to-call). Hours and Track Order are less urgent on mobile.

**Alternatives considered**:
- Always show info bar: Rejected because it wastes vertical space on mobile
- Collapse to icons only: Rejected because icons without labels are ambiguous
- Show hours on tablet: Rejected because phone number is more actionable

### R8: Contact Page Integration

**Decision**: Add a new section to the Contact page with three card-style links: Branches (with branch image), Location (with map preview), and Reservation (with booking icon). Use existing `branches-data.ts` for branch info.

**Rationale**: Card-style links are visually consistent with the existing Contact page design. Using existing data avoids duplication.

**Alternatives considered**:
- Simple text links: Rejected because they're less visually engaging
- Full branch/location/reservation sections: Rejected because that would duplicate existing pages
- Footer links: Rejected because the spec requires them on the Contact page

## Summary of Decisions

| Decision | Choice | Risk |
|----------|--------|------|
| Sticky container | Single wrapper, two bands | Low |
| Search expansion | Framer Motion + auto-focus | Low |
| Category dropdown | Hover + 200ms delay | Low |
| Cart badge | Isolated component with useCart() | Low |
| Search highlight | scrollIntoView + CSS class | Low |
| Mobile drawer | Right-side slide-in | Low |
| Info bar responsive | Hide mobile, phone-only tablet | Low |
| Contact page | Card-style links with existing data | Low |

All decisions use established patterns with low risk. No complex architectural choices required.
