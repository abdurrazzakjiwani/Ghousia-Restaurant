# Quickstart: Website Animations & Chatbot Scroll

**Feature**: 005-animations
**Date**: 2026-09-15

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Setup

### 1. Install Dependencies

```bash
npm install framer-motion
```

### 2. Create Animation Utilities

Create `src/lib/animations.ts` with shared animation presets:

```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};
```

### 3. Add Scrollbar Styles

Add to `src/app/globals.css`:

```css
/* Custom scrollbar for chat */
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
.chat-scroll::-webkit-scrollbar-thumb:hover {
  opacity: 0.8;
}
.chat-scroll {
  scrollbar-width: thin;
  scrollbar-color: #667eea transparent;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Add "use client" to Server Components

Components that need Framer Motion must be client components:

- `src/components/home/Hero.tsx` — Add `"use client"` at top
- `src/components/home/AboutPreview.tsx` — Add `"use client"` at top
- `src/components/layout/Footer.tsx` — Extract animated parts to client component, or add `"use client"`

### 5. Wrap Components with Motion

Example for any component:

```tsx
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function MyComponent() {
  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={fadeInUp.transition}
    >
      {/* content */}
    </motion.div>
  );
}
```

### 6. Verify

1. Run `npm run build` — should compile without errors
2. Run `npm run dev` — open browser
3. Scroll through home page — sections should fade in
4. Hover over menu cards — should scale slightly
5. Open chatbot — should slide up smoothly
6. Send messages — should animate in
7. Check scrollbar — should be thin and themed
8. Enable `prefers-reduced-motion` — animations should stop

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "framer-motion" not found | Run `npm install framer-motion` |
| Server component error | Add `"use client"` to component |
| Animations not triggering | Check `viewport={{ once: true }}` is set |
| Scrollbar not styled | Ensure `chat-scroll` class is on the scroll container |
| Reduced motion not working | Check CSS media query is in globals.css |
