# Research: Restaurant Website Redesign

**Date**: 2026-09-18
**Feature**: 001-restaurant-redesign
**Input**: Technical unknowns from spec

## Decisions

### 1. Color Scheme: Purple → Orange

**Decision**: Replace `#667eea`/`#764ba2` with `#f59e0b`/`#ea580c` (amber-500 to orange-600).

**Rationale**:
- Purple is unappetizing for a restaurant — warm orange tones are universally associated with food, warmth, and appetite
- Orange gradient maintains good contrast for text and UI elements
- Tailwind CSS has built-in amber/orange color scales, reducing manual color management
- The orange palette works well in both light and dark modes

**Alternatives considered**:
- Red/Orange (`#ef4444`/`#f97316`): Too aggressive, may feel like an error/alert
- Gold/Brown (`#d97706`/`#92400e`): Premium feel but may look muddy in dark mode
- Teal/Green (`#14b8a6`/`#059669`): Fresh but not warm enough for food

### 2. Typography: Poppins + Inter

**Decision**: Use Poppins for headings (h1-h6) and Inter for body text, loaded via `next/font/google`.

**Rationale**:
- Poppins is a geometric sans-serif with excellent weight range (400-800), modern feel, and pairs well with Inter
- Inter is already loaded in the project — no new dependency needed
- Poppins has `letter-spacing: -0.02em` which looks excellent at large heading sizes
- Both fonts are available via Google Fonts, no self-hosting needed
- `next/font/google` provides automatic optimization and subsetting

**Alternatives considered**:
- Playfair Display (serif): More formal/elegant but may feel outdated for a casual restaurant
- Montserrat (geometric sans): Similar to Poppins but less distinctive
- Raleway (thin): Too thin for restaurant headings, poor readability at small sizes
- Keeping Inter only: No visual hierarchy distinction between headings and body

### 3. WhatsApp Icon: Official SVG

**Decision**: Use the official WhatsApp logo SVG path inline instead of `MessageCircle` from lucide-react.

**Rationale**:
- The official WhatsApp logo (green bubble with white phone) is universally recognizable
- SVG inline provides crisp rendering at all sizes
- No external dependencies needed — SVG is embedded directly
- Users immediately identify it as a WhatsApp contact point
- The existing green-500 button background provides the WhatsApp green

**Alternatives considered**:
- `MessageCircle` from lucide-react: Generic chat bubble, not recognizable as WhatsApp
- Using a third-party icon library: Adds dependency, may have licensing issues
- Using an `<img>` tag with WhatsApp logo: Adds HTTP request, slower loading

### 4. Voice Agent FAB: Custom Robot Button

**Decision**: Create a custom `SpooniFAB.tsx` component with `Bot` icon from lucide-react, hide the default ElevenLabs FAB via CSS, and open the widget on click.

**Rationale**:
- The default ElevenLabs FAB is unrecognizable — users don't understand it's a voice agent
- A robot icon with "Give order in voice" label immediately communicates the purpose
- Hiding the default FAB is possible via CSS (`elevenlabs-convai::part(widget)`)
- Opening the widget on click can be done by dispatching a click event on the `elevenlabs-convai` element
- Custom FAB positions consistently above the WhatsApp button

**Alternatives considered**:
- Modifying ElevenLabs widget props: Widget doesn't accept custom icon/label props
- Keeping default FAB and adding a label: The default FAB styling is not customizable
- Removing ElevenLabs entirely: Loses the voice ordering functionality

### 5. Sketch-Style Avatars: Inline SVG + CSS Filters

**Decision**: Generate inline SVG circles with initials, apply `filter: grayscale(1) contrast(1.2)` and dashed borders for a hand-drawn sketch effect.

**Rationale**:
- No external image service needed — avatars are generated client-side
- Grayscale + high contrast creates a pencil-sketch appearance
- Dashed borders add a hand-drawn feel
- Each avatar uses the customer's initials for personalization
- Light gray background with subtle noise texture enhances the sketch effect
- Performance: SVG is lightweight and renders instantly

**Alternatives considered**:
- Using `https://api.dicebear.com/7.x/avataaars/svg`: External dependency, not sketch-style
- Using placeholder.com: Generic colored circles, not sketch-style
- Generating actual sketch images: Too large, would need image generation service
- Using CSS `border-radius` with random shapes: Doesn't create sketch effect

### 6. Testimonials Carousel: Auto-Cycling with AnimatePresence

**Decision**: Use React `useState` for currentIndex, `useEffect` with `setInterval` for 4-second auto-rotation, Framer Motion `AnimatePresence` with `mode="wait"` for crossfade transitions.

**Rationale**:
- The project already uses Framer Motion extensively
- `AnimatePresence` provides smooth crossfade between testimonials
- Auto-rotation pauses on hover (`onMouseEnter`/`onMouseLeave`)
- Dot indicators allow manual navigation
- Seamless loop from last back to first testimonial
- Reduced motion support via `prefers-reduced-motion` detection

**Alternatives considered**:
- Swiper.js: Full carousel library but overkill for 100 testimonials
- CSS-only carousel: Limited control over timing and React state
- Intersection Observer: Unnecessary complexity for a simple auto-rotating section

### 7. Branches Page: Static Data, No API

**Decision**: Store branch data in `branches-data.ts` as a static array, render directly in the `/branches` page component.

**Rationale**:
- Branch locations rarely change — static data is sufficient
- No need for API endpoints or database storage
- Branch photos are moved to `public/images/branches/` and served statically
- Google Maps links are generated from pre-defined map queries
- Page is server-rendered (can be static with `generateStaticParams` if needed)

**Alternatives considered**:
- Supabase database: Overkill for 3 static locations
- CMS integration: Not needed for rarely-changing data
- JSON file in public/: Would not support TypeScript type checking

### 8. Hero Image Optimization: WebP via Sharp

**Decision**: Use Sharp (Next.js built-in image optimization) to serve WebP images. Replace original PNGs with optimized WebP versions at max 1920px width.

**Rationale**:
- Next.js `Image` component automatically serves WebP when browser supports it
- The existing images are large PNGs (1.5-2.3MB each) — WebP reduces to ~200-400KB
- `priority` prop on first image ensures immediate loading
- `fill` + `object-cover` handles responsive sizing
- Sharp is already a Next.js dependency — no new installation needed

**Alternatives considered**:
- Manual WebP conversion: Would still need image optimization
- Using `@next/image-optimization`: Default Next.js behavior handles this
- Serving original PNGs with browser fallback: Unnecessarily large

### 9. New Home Page Sections: Static Components

**Decision**: Create WhyChooseUs, PopularCategories, and CTABanner as static React components with hardcoded content.

**Rationale**:
- Content is static and rarely changes
- No API calls needed — content is defined in the components
- Categories are imported from existing `menu-data.ts`
- Phone number is already available from environment variables
- WhatsApp URL generation follows existing pattern

**Alternatives considered**:
- Fetching from API: Would add unnecessary latency for static content
- Using a CMS: Overkill for 3 small sections
- Using dynamic imports: Not needed since content is always visible
