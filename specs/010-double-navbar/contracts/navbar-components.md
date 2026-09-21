# Navbar Component Contracts

**Date**: 2026-09-18
**Feature**: 010-double-navbar

## Overview

No new API endpoints are introduced. The double navbar is entirely client-side, using existing hooks and utilities:
- `useCart()` hook for cart state
- `searchItems()` function for search
- `categories` array for category dropdown
- Environment variables for phone and hours

## Component Interfaces

### Navbar (rewritten)

```typescript
// Main container - wraps InfoBar and MainNav in a single sticky container
// No props - reads all state internally
export default function Navbar(): JSX.Element
```

### InfoBar

```typescript
interface InfoBarProps {
  phone: string;
  hours: string;
}
// Renders: phone (tap-to-call), hours, Track Order link
// Hidden on mobile (< 640px), phone-only on tablet (640-768px)
```

### MainNav

```typescript
interface MainNavProps {
  navLinks: NavItem[];
  isDark: boolean;
  onToggleDark: () => void;
  mounted: boolean;
}
// Renders: logo, nav links, SearchInput, CartBadge, DarkModeToggle, hamburger (mobile)
```

### CartBadge

```typescript
// No props - uses useCart() internally
// Renders: cart icon + animated count badge
// Handles mounted guard for hydration safety
export default function CartBadge(): JSX.Element
```

### SearchInput

```typescript
interface SearchInputProps {
  onNavigate: (path: string) => void;
}
// Renders: search icon (collapsed) or expanded input with results dropdown
// Handles: expand/collapse, query state, results, keyboard navigation
// Calls onNavigate when a result is selected
```

### CategoryDropdown

```typescript
interface CategoryDropdownProps {
  categories: Category[];
  onSelect: (slug: string) => void;
}
// Renders: horizontal pill buttons for each category
// Handles: hover open/close with 200ms delay, Escape key
// Calls onSelect when a category is clicked
```

### MobileDrawer

```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavItem[];
  isDark: boolean;
  onToggleDark: () => void;
}
// Renders: full-width slide-in drawer from right
// Contains: nav links, dark mode toggle, search option
// Handles: backdrop click, Escape key, link click closes drawer
```

## Data Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  useCart     │────>│  CartBadge   │     │  InfoBar     │
│  (localStorage)│   │  (count)     │     │  (phone/hours)│
└──────────────┘     └──────────────┘     └──────────────┘
                            │                     │
┌──────────────┐     ┌──────▼───────┐     ┌──────▼───────┐
│  searchItems │────>│ SearchInput  │     │   MainNav    │
│  (menu-data) │     │ (query/results)│   │  (links/logo)│
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
┌──────────────┐     ┌──────────────┐     ┌──────▼───────┐
│  categories  │────>│ CategoryDrop │     │ MobileDrawer │
│  (menu-data) │     │ (pill buttons)│    │  (mobile nav)│
└──────────────┘     └──────────────┘     └──────────────┘
```

## State Management

| State | Location | Type | Purpose |
|-------|----------|------|---------|
| `searchOpen` | SearchInput | boolean | Whether search input is expanded |
| `searchQuery` | SearchInput | string | Current search query |
| `searchResults` | SearchInput | MenuItem[] | Matching menu items |
| `dropdownOpen` | CategoryDropdown | boolean | Whether category dropdown is visible |
| `drawerOpen` | MobileDrawer | boolean | Whether mobile drawer is visible |
| `mounted` | CartBadge | boolean | Hydration guard for cart count |
| `highlightId` | Menu page | string \| null | ID of item to highlight after search |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_RESTAURANT_PHONE2` | "923013631555" | Phone number for info bar |
| `NEXT_PUBLIC_RESTAURANT_HOURS` | "5:30 PM - 2:00 AM" | Operating hours for info bar |

## Integration Points

### Existing Hooks
- `useCart()` from `src/hooks/useCart.ts` — provides `items`, `itemCount`, `mounted`
- `useTheme()` from `src/hooks/useTheme.ts` — provides `isDark`, `toggle`, `mounted`
- `usePathname()` from `next/navigation` — for active link highlighting

### Existing Functions
- `searchItems(query)` from `src/lib/menu-data.ts` — returns matching MenuItem[]
- `categories` from `src/lib/menu-data.ts` — array of 13 Category objects
- `cn()` from `src/lib/utils.ts` — className merging utility

### Existing Components
- `DarkModeToggle` from `src/components/ui/DarkModeToggle.tsx` — reuse as-is
- `CategoryFilter` from `src/components/menu/CategoryFilter.tsx` — adapt for dropdown

### Existing Routes
- `/menu` — accepts category filter (via state or query param)
- `/order` — cart checkout page
- `/tracking` — order tracking page
- `/branches`, `/location`, `/reservation` — preserved routes, linked from Contact
