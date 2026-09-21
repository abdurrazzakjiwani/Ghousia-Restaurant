# Quickstart: Restaurant Website Redesign

**Date**: 2026-09-18
**Feature**: 001-restaurant-redesign

## What This Feature Does

Comprehensive visual and content redesign of the Ghousia Golden Spoon restaurant website:
- Replaces purple color scheme with warm orange
- Upgrades typography with Poppins headings + Inter body
- Replaces generic WhatsApp icon with official logo
- Redesigns SPOONI voice agent button with robot icon
- Adds 100 auto-cycling testimonials with sketch avatars
- Creates dedicated Branches page with 3 restaurants + 2 family halls
- Expands homepage with WhyChooseUs, PopularCategories, CTABanner
- Optimizes hero images to WebP format

## Prerequisites

- Branch photos exist at project root (Ghousia Golden Spoon.png, Ghousia Silver Spoon.jpg, Ghousia Fast Food and Chineese.jpg, Family Hall 1.jpg, Family Hall 2.jpg)
- Hero images exist at `public/images/hero/` (hero1.png, hero2.png, hero3.png)
- Existing Framer Motion installation (already in project)
- Existing Lucide React installation (Bot icon already available)
- Existing `next/font/google` setup (just needs Poppins added)

## Quick Start

### 1. Move Branch Photos

Move from project root to `public/images/branches/`:
- `Ghousia Golden Spoon.png` → `public/images/branches/golden-spoon.png`
- `Ghousia Silver Spoon.jpg` → `public/images/branches/silver-spoon.jpg`
- `Ghousia Fast Food and Chineese.jpg` → `public/images/branches/fast-food-chinese.jpg`
- `Family Hall 1.jpg` → `public/images/branches/family-hall-1.jpg`
- `Family Hall 2.jpg` → `public/images/branches/family-hall-2.jpg`

### 2. Update Color Scheme

Edit `tailwind.config.ts`:
```ts
gradient: {
  start: "#f59e0b",  // amber-500
  end: "#ea580c",    // orange-600
},
```

Update `globals.css` — replace all purple references (`#667eea`, `#764ba2`) with orange equivalents.

### 3. Add Poppins Font

Edit `layout.tsx`:
```tsx
import { Inter, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-poppins" });
```

Apply to body: `className={`${inter.className} ${poppins.variable}`}`

### 4. Update WhatsApp Icon

Edit `WhatsAppButton.tsx`:
- Replace `MessageCircle` import with inline WhatsApp SVG
- Use the official WhatsApp logo path

### 5. Create SPOONI FAB

Create `src/components/ui/SpooniFAB.tsx`:
- `Bot` icon from lucide-react
- "Give order in voice" tooltip
- Orange gradient background
- On click: opens ElevenLabs widget
- Position: `fixed bottom-24 right-6 z-50`

### 6. Create Branches Page

Create `src/app/branches/page.tsx`:
- 3 branch cards with images, names, addresses, map links
- Family halls section at bottom
- Add "Branches" to navbar

### 7. Rewrite Testimonials

Rewrite `Testimonials.tsx`:
- Import 100 testimonials from `testimonials-data.ts`
- Auto-cycle every 4 seconds with crossfade
- Sketch-style avatars (inline SVG + CSS filters)
- Dot indicators for manual navigation

### 8. Add Home Page Sections

Create `WhyChooseUs.tsx`, `PopularCategories.tsx`, `CTABanner.tsx` and add to `page.tsx`.

### 9. Optimize Hero Images

Convert hero images to WebP (max 1920px width) and replace in `public/images/hero/`.

## File Change Summary

| Category | New Files | Modified Files | Moved Files | Replaced Files |
|----------|-----------|----------------|-------------|----------------|
| Pages | 1 (branches) | 3 (page.tsx, location, globals.css) | 0 | 0 |
| Components | 4 (WhyChooseUs, PopularCategories, CTABanner, SpooniFAB) | 10 (Hero, FeaturedMenu, AboutPreview, Navbar, WhatsAppButton, SpooniWidget, Button, ScrollProgress, Testimonials, layout.tsx) | 0 | 0 |
| Data | 2 (testimonials-data, branches-data) | 0 | 0 | 0 |
| Config | 0 | 1 (tailwind.config.ts) | 0 | 0 |
| Images | 0 | 0 | 5 (branch photos) | 3 (hero WebP) |
| **Total** | **7** | **14** | **5** | **3** |
