# Quickstart: Hero Image Carousel

**Date**: 2026-09-17  
**Feature**: 001-hero-carousel

## What This Feature Does

Adds a rotating image carousel to the homepage hero section:
- 3 hero images rotate automatically every 5 seconds
- Smooth crossfade transitions between images
- Dot indicators for manual navigation
- Parallax scroll effect on current image
- Reduced-motion support (static image)
- SPOONI button repositioned above WhatsApp button

## Prerequisites

- 3 hero images exist at project root (Hero 1.png, Hero 2.png, Hero 3.png)
- Existing Framer Motion installation (already in project)
- Existing animations.ts with fadeInUp, viewportConfig (already in project)

## Quick Start

### 1. Move Hero Images

Move from project root to `public/images/hero/`:
- `Hero 1.png` → `public/images/hero/hero1.png`
- `Hero 2.png` → `public/images/hero/hero2.png`
- `Hero 3.png` → `public/images/hero/hero3.png`

### 2. Update Hero Component

Edit `src/components/home/Hero.tsx`:
- Add `useState` for `currentIndex` (0-2)
- Add `useEffect` with `setInterval` for 5-second auto-rotation
- Add `useEffect` to detect `prefers-reduced-motion`
- Replace static gradient background with 3 `<Image>` components using `AnimatePresence`
- Add dot indicators below the hero content
- Preserve existing parallax, text overlay, and animations

### 3. Add SPOONI Repositioning CSS

Edit `src/app/globals.css`:
- Add CSS to reposition `elevenlabs-convai` element to `bottom: 6rem` (above WhatsApp button)

### 4. Build & Deploy

- Run `npm run build` — verify no compilation errors
- Run `npm run lint` — verify no lint errors
- Deploy to Vercel with `--force`
- Visually inspect carousel rotation, dot navigation, and button positioning

## File Change Summary

| Category | New Files | Modified Files | Moved Files |
|----------|-----------|----------------|-------------|
| Images | 0 | 0 | 3 (hero1-3.png) |
| Components | 0 | 1 (Hero.tsx) | 0 |
| CSS | 0 | 1 (globals.css) | 0 |
| **Total** | **0** | **2** | **3** |
