# Research: Hero Image Carousel

**Date**: 2026-09-17  
**Feature**: 001-hero-carousel  
**Input**: Technical unknowns from spec

## Decisions

### 1. Carousel Implementation Strategy

**Decision**: Use React state (`useState` for current index) + `useEffect` with `setInterval` for auto-rotation, combined with Framer Motion `AnimatePresence` for crossfade transitions.

**Rationale**:
- The project already uses Framer Motion extensively (Hero.tsx, animations.ts)
- `AnimatePresence` with `mode="wait"` provides smooth crossfade between images
- No need for external carousel libraries — the requirement is simple (3 images, auto-rotate, dots)
- Existing `fadeInUp` and parallax patterns can be reused

**Alternatives considered**:
- Swiper.js: Full-featured carousel library but overkill for 3 images with simple requirements
- CSS-only carousel: Limited control over timing and transitions, no React state management
- Custom intersection observer: Unnecessary complexity for a simple auto-rotating carousel

### 2. Image Optimization Strategy

**Decision**: Move images to `public/images/hero/` and use Next.js `<Image>` component with `priority` attribute for the first visible image, and `fill` + `object-cover` for responsive sizing.

**Rationale**:
- Next.js `<Image>` automatically optimizes images (WebP conversion, responsive sizes)
- `priority` attribute ensures the first hero image loads immediately (LCP optimization)
- `fill` with `object-cover` handles any aspect ratio gracefully
- Images in `public/` are served statically with good caching

**Alternatives considered**:
- Unsplash URLs: Would add external dependency and latency
- Base64 inline: Way too large for hero images
- Manual optimization: Unnecessary when Next.js handles it

### 3. SPOONI Widget Repositioning Strategy

**Decision**: Use CSS to set a bottom offset on the `elevenlabs-convai` element, pushing it higher above the WhatsApp button.

**Rationale**:
- The ElevenLabs widget renders its own FAB at default bottom-right position
- CSS custom properties or direct selectors can override the widget's positioning
- WhatsApp button stays at `bottom-6 right-6` (unchanged)
- SPOONI widget moves to approximately `bottom-24 right-6` (above WhatsApp)

**Implementation**:
```css
elevenlabs-convai {
  position: fixed;
  bottom: 6rem !important;  /* 24 * 0.25rem = 6rem */
  right: 1.5rem !important; /* 6 * 0.25rem = 1.5rem */
  z-index: 50;
}
```

**Alternatives considered**:
- Modify SpooniWidget.tsx to pass CSS props: Widget doesn't accept positioning props
- Hide default widget and use custom trigger: Loses built-in widget UX
- Move WhatsApp button instead: User specifically asked to keep WhatsApp at bottom

### 4. Reduced Motion Handling

**Decision**: Use `window.matchMedia('(prefers-reduced-motion: reduce)')` in a `useEffect` to detect preference and disable auto-rotation.

**Rationale**:
- The existing `globals.css` already has `@media (prefers-reduced-motion: reduce)` rules
- React hook approach gives programmatic control to stop `setInterval`
- Shows static first image when reduced motion is preferred
- Dot navigation still works (user-initiated, not animated)

**Alternatives considered**:
- CSS-only approach: Can't stop JavaScript `setInterval` from CSS
- Always show static: Defeats the purpose of the carousel for most users

### 5. Fallback Strategy for Image Load Failures

**Decision**: Use `onError` callback on `<Image>` to skip to next image, with the existing gradient background as final fallback.

**Rationale**:
- Next.js `<Image>` fires `onError` if image fails to load
- Skip to next image provides graceful degradation
- If all images fail, the gradient background (already in place) shows through
- No empty states or broken images visible to users

**Alternatives considered**:
- Show placeholder image: Adds complexity, gradient fallback is already visually appealing
- Hide entire section: Too aggressive — gradient background is fine as fallback
