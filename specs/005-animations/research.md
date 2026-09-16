# Research: Website Animations & Chatbot Scroll

**Feature**: 005-animations
**Date**: 2026-09-15

## Research Tasks

### 1. Animation Library Selection

**Decision**: Framer Motion (now called `motion`)

**Rationale**:
- Industry standard for React animation (used by Vercel, Next.js team)
- `whileInView` prop provides scroll-triggered animations without manual IntersectionObserver
- `AnimatePresence` handles exit animations (critical for chatbot open/close)
- Staggered children via `staggerChildren` in variants
- Built-in `prefers-reduced-motion` support via `useReducedMotion` hook
- Tree-shakeable — only imports what's used
- 40KB gzipped (acceptable for a restaurant website)

**Alternatives considered**:
- **Pure CSS keyframes + Tailwind**: No scroll-trigger detection, no exit animations, no stagger control
- **react-spring**: More complex API, less React-idiomatic, smaller community
- **GSAP**: Overkill for subtle animations, larger bundle, commercial license concerns
- **Anime.js**: Less React integration, manual DOM manipulation needed

### 2. Scroll Animation Approach

**Decision**: Framer Motion `whileInView` + `viewport={{ once: true }}`

**Rationale**:
- `whileInView` automatically triggers when element enters viewport
- `once: true` ensures animations only play once (not repeated on re-scroll)
- No manual IntersectionObserver setup needed
- `amount: 0.2` (20% visible) triggers early enough to feel responsive

**Alternatives considered**:
- **IntersectionObserver directly**: More code, no exit animation support
- **CSS `animation-timeline: scroll()`**: Limited browser support (Chrome only)
- **AOS library**: Extra dependency, less control, less React-idiomatic

### 3. Chatbot Animation Strategy

**Decision**: Framer Motion `AnimatePresence` + `motion.div` with custom variants

**Rationale**:
- `AnimatePresence` enables exit animations (widget slides down when closing)
- `layout` prop handles layout shifts smoothly
- Custom variants define slide-up (open) and slide-down (close) directions
- `variants` on parent + children for staggered message entrance

**Implementation**:
```tsx
// Widget open/close
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* chat content */}
    </motion.div>
  )}
</AnimatePresence>

// Message entrance
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
```

### 4. Custom Scrollbar Strategy

**Decision**: CSS custom properties + WebKit scrollbar pseudo-elements

**Rationale**:
- Pure CSS solution — no JS overhead
- `::-webkit-scrollbar` for Chrome/Safari/Edge
- `scrollbar-width: thin` + `scrollbar-color` for Firefox
- CSS custom properties for theme colors (light/dark mode)
- 6px width matches the "thin" requirement

**Implementation**:
```css
.chat-scroll::-webkit-scrollbar {
  width: 6px;
}
.chat-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.chat-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 3px;
}
/* Firefox */
.chat-scroll {
  scrollbar-width: thin;
  scrollbar-color: #667eea transparent;
}
```

### 5. Reduced Motion Accessibility

**Decision**: Framer Motion `useReducedMotion` hook + CSS `prefers-reduced-motion` media query

**Rationale**:
- Framer Motion automatically disables animations when `prefers-reduced-motion: reduce` is set
- CSS fallback for scrollbar and any non-Framer Motion animations
- Ensures WCAG 2.1 compliance

**Implementation**:
```tsx
import { useReducedMotion } from "framer-motion";

function AnimatedSection({ children }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
```

### 6. Animation Timing Configuration

**Decision**: Centralized animation presets in `lib/animations.ts`

**Rationale**:
- Single source of truth for timing values
- Easy to adjust globally
- Consistent feel across all components

**Presets**:
| Preset | Duration | Ease | Use Case |
|--------|----------|------|----------|
| `fadeInUp` | 0.4s | easeOut | Section reveals, page entrance |
| `stagger` | 0.1s delay | easeOut | Grid items, list items |
| `chatOpen` | 0.2s | easeOut | Chat widget open |
| `chatClose` | 0.15s | easeIn | Chat widget close |
| `messageIn` | 0.2s | easeOut | Chat message entrance |
| `hoverScale` | 0.15s | easeInOut | Card/button hover |

### 7. Performance Considerations

**Decision**: GPU-accelerated transforms only (opacity, transform)

**Rationale**:
- `opacity` and `transform` are GPU-accelerated — no layout/paint recalculation
- Avoid animating `height`, `width`, `margin`, `padding` (triggers layout thrashing)
- `will-change: transform` on animated elements for browser optimization
- Framer Motion automatically uses GPU-accelerated properties

### 8. Server Component Compatibility

**Decision**: Wrap server components with `"use client"` where animations are needed, or extract animated parts into separate client components

**Rationale**:
- Framer Motion requires client-side JavaScript
- Some components (Hero, AboutPreview, Footer) are currently server components
- Strategy: Either add `"use client"` to the component, or create a thin client wrapper
- For Hero: Add `"use client"` (it's already interactive with buttons)
- For Footer: Create a `FooterReveal` client wrapper
- For AboutPreview: Add `"use client"` (minimal impact)
