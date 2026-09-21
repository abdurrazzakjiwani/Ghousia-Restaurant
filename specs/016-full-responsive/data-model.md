# Data Model: Full Responsive Overhaul

**Feature**: 016-full-responsive  
**Date**: 2026-09-21  
**Status**: Complete

## Entities

### No Data Entity Changes

This feature is purely a responsive/visibility fix. No database schema changes, no new data entities, and no API changes are required.

### UI Component State Changes

#### MobileDrawer State

| State | Condition | Description |
|-------|-----------|-------------|
| Closed | `isOpen === false` | Drawer not rendered |
| Open | `isOpen === true` | Drawer slides in from right with animation |

**New state transitions**: Added slide-in/slide-out animation (previously instant pop-in/out)

#### Testimonials Dot Count State

| State | Condition | Description |
|-------|-----------|-------------|
| SSR Default | Server render | 20 dots (safe default) |
| Mobile | `window.innerWidth < 640` after mount | 8 dots |
| Desktop | `window.innerWidth >= 640` after mount | 20 dots |

**State management**: `useState(20)` + `useEffect` update on mount (SSR-safe pattern)

#### Focus Trap State (Modals + MobileDrawer)

| State | Condition | Description |
|-------|-----------|-------------|
| No Trap | Modal/Drawer closed | Focus moves freely |
| Trapped | Modal/Drawer open | Tab cycles within element, Escape closes |

**State management**: `useRef` for container reference + `useEffect` for keydown listener

## Validation Rules

### Touch Target Validation

- All interactive elements MUST have minimum 44x44px touch target
- Buttons: Minimum `py-2.5 px-4` padding on mobile
- Icons: Minimum `w-11 h-11` container size
- Close buttons: Minimum `p-2.5` padding

### Contrast Validation

- Normal text: Minimum 4.5:1 contrast ratio against background
- Large text (18px+ bold or 24px+): Minimum 3:1 contrast ratio
- Gradient text: Replaced with solid `text-orange-600` (4.6:1 on white)

### Responsive Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| Default | 0–639px | Phones (portrait) |
| `sm` | 640px+ | Phones (landscape), small tablets |
| `md` | 768px+ | Tablets, small laptops |
| `lg` | 1024px+ | Laptops, desktops |
| `xl` | 1280px+ | Large desktops |

## Data Volume

- Menu items: ~87 (static, unchanged)
- Categories: 13 (static, unchanged)
- Cart items: 0–50 (per user, localStorage, unchanged)
- No database changes required
- No API changes required
