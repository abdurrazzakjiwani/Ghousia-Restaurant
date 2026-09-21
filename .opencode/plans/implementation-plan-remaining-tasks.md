# Implementation Plan: Remaining Tasks

**Branch**: `002-ordering-system`
**Date**: 2026-09-18
**Status**: Pending Execution

---

## Task Inventory

| # | Task | Priority | Blocker? |
|---|------|----------|----------|
| 1 | Create `customer_orders` table in Supabase | Critical | Yes — blocks order persistence |
| 2 | Integrate voice agent into chatbot icon | High | — |
| 3 | Fix menu page scroll-only loading | High | — |
| 4 | Upload favicon | Medium | — |
| 5 | Add real-time clock to Navbar | Medium | — |
| 6 | Verify, build, lint, deploy | High | — |

---

## Task 1: Supabase `customer_orders` Table

**Status**: Must be executed manually in Supabase Dashboard (SQL Editor)

### SQL to Execute
```sql
CREATE TABLE customer_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  order_mode TEXT NOT NULL CHECK (order_mode IN ('delivery','pickup','dine-in')),
  branch TEXT,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customer_orders_phone ON customer_orders(phone);
```

### Files Confirmed Working
- `src/lib/supabase.ts` — Supabase client already configured
- `src/app/api/orders/route.ts` — GET/POST endpoints reference `customer_orders` table
- `src/app/menu/[id]/page.tsx` — `handleConfirm` calls `supabase.from("customer_orders").insert(...)`

### Verification
- After SQL execution, test order flow on local dev to confirm `INSERT` succeeds
- Check Supabase dashboard for data appearing after test order

---

## Task 2: Integrate Voice Agent Into Chatbot Icon

**Current State**:
- `src/components/chat/SpooniWidget.tsx` — Renders `<elevenlabs-convai>` element
- `src/components/ui/SpooniFAB.tsx` — Bot icon at `bottom-24 right-6`, has `handleClick` that calls `.click()` on `<elevenlabs-convai>`
- `src/app/globals.css` lines 136-170 — Hides ElevenLabs widget parts via `::part(widget)`, `::part(footer)`, etc. with `display: none !important`
- `src/app/layout.tsx` — Renders `<SpooniFAB />`, `<SpooniWidget />`, `<WhatsAppButton />`
- WhatsAppButton at `bottom-6 right-6`, SpooniFAB at `bottom-24 right-6` (above WhatsApp)

**Root Cause**: CSS hides `elevenlabs-convai::part(widget)` and other parts, so the ElevenLabs compact widget never renders visibly. The `SpooniFAB` click calls `.click()` on the hidden element, which has no visible UI to interact with.

**Fix Approach**: Remove the CSS rules that hide the ElevenLabs widget parts, allowing the `variant="compact"` ElevenLabs widget to render its own toggle button. Remove `SpooniFAB` since ElevenLabs `variant="compact"` renders its own icon, avoiding duplicate chat icons.

**Implementation Steps**:
1. In `src/app/globals.css`: Remove or comment out the `elevenlabs-convai::part(widget)`, `::part(footer)`, `::part(branding)`, `::part(header)` hiding rules (lines 144-158). Keep `disable-banner` and the repositioning CSS (`position: fixed; bottom: 6rem; right: 1.5rem; z-index: 50`).
2. In `src/components/ui/SpooniFAB.tsx`: Remove this component entirely (ElevenLabs compact variant provides its own icon).
3. In `src/app/layout.tsx`: Remove `<SpooniFAB />` import and usage.
4. In `src/components/chat/SpooniWidget.tsx`: Keep the `variant="compact"` prop — this renders the ElevenLabs default chat icon that opens the voice agent window when clicked. Adjust CSS positioning if needed to avoid overlap with WhatsApp button.
5. Verify the ElevenLabs compact widget icon appears near WhatsApp button. Adjust `position`/`bottom`/`right` values in CSS if needed.

**Alternative Approach** (if layout issues arise):
- Keep `SpooniFAB` but change its `handleClick` to toggle a CSS class on `elevenlabs-convai` that shows the widget
- Use `useRef` in `SpooniWidget` to expose `toggleOpen()` via `useImperativeHandle`
- `SpooniFAB` calls `ref.current?.toggleOpen()` on click

**Files to Modify**:
- `src/app/globals.css` — Remove widget-hiding CSS rules
- `src/components/ui/SpooniFAB.tsx` — Remove
- `src/app/layout.tsx` — Remove SpooniFAB import/usage
- `src/components/chat/SpooniWidget.tsx` — Adjust positioning

---

## Task 3: Fix Menu Page Scroll-Only Loading

**Root Cause**: `MenuGrid.tsx` uses `whileInView="visible"` + `viewport={{ once: true, amount: 0.2 }}` on the `motion.div` container. This means all items start with `opacity: 0` and only animate to `opacity: 1` when scrolled into the viewport. Users interpret this as "content only loading on scroll."

**Same issue affects**: `FeaturedMenu.tsx`, `PopularCategories.tsx`, `AboutPreview.tsx`, `Footer.tsx` — all use `whileInView` + `viewport` with `once: true`.

**Fix Approach**: Remove `whileInView` and `viewport` props from grid containers so items render immediately with full opacity. Keep animation variants but make them default-visible.

**Implementation Steps**:
1. In `src/components/menu/MenuGrid.tsx`:
   - Remove `whileInView` and `viewport` props from `<motion.div>`
   - Change `initial="hidden"` to `initial="visible"` or remove `initial` entirely
   - This makes all menu cards render immediately with animation stagger
2. Similarly in `src/components/home/FeaturedMenu.tsx`, `PopularCategories.tsx`, `AboutPreview.tsx`, `Footer.tsx`:
   - Change `initial="hidden"` to `initial="visible"` or remove it
   - Remove `whileInView` and `viewport` props
   - Items appear immediately on page load

**Files to Modify**:
- `src/components/menu/MenuGrid.tsx`
- `src/components/home/FeaturedMenu.tsx`
- `src/components/home/PopularCategories.tsx`
- `src/components/home/AboutPreview.tsx`
- `src/components/layout/Footer.tsx`

---

## Task 4: Upload Favicon

**Current State**: `Logo.png` exists at:
- `D:\Abdur Razzak Jiwani Docs\ghousia_golden_web\Logo.png` (project root)
- `D:\Abdur Razzak Jiwani Docs\ghousia_golden_web\public\images\logo\Logo.png`

**Next.js 14 App Router**: Favicon is configured via `metadata` in `layout.tsx`.

**Implementation Steps**:
1. Copy `Logo.png` to `public/favicon.ico` (or keep at `public/images/logo/Logo.png`)
2. In `src/app/layout.tsx`, add `icons` to `metadata`:
   ```ts
   export const metadata: Metadata = {
     title: "...",
     description: "...",
     icons: {
       icon: "/images/logo/Logo.png",
     },
   };
   ```
3. Alternatively, add `<link rel="icon" href="..." />` in the `<head>`

**Verification**: Check browser tab shows the Ghousia Golden Spoon logo as favicon

---

## Task 5: Add Real-Time Clock to Navbar

**Current State**: `src/components/layout/Navbar.tsx` has `DarkModeToggle` in the navbar right side (desktop: `flex items-center gap-1`, mobile: inside dropdown).

**Implementation Steps**:
1. Create `src/components/ui/Clock.tsx`:
   - `"use client"` component
   - Uses `useState` + `useEffect` with `setInterval` (1000ms) to update time
   - Displays time in `HH:MM:SS AM/PM` format (local time)
   - Professional styling: small text, monospace font, neutral color
2. In `src/components/layout/Navbar.tsx`:
   - Import `Clock` component
   - Place `<Clock />` next to `<DarkModeToggle />` in both desktop and mobile views
   - Add separator (e.g., `|` or a small dot) between clock and toggle

**Files to Create**:
- `src/components/ui/Clock.tsx`

**Files to Modify**:
- `src/components/layout/Navbar.tsx`

---

## Task 6: Verify, Build, Lint, Deploy

**Steps**:
1. Run `npm run build` — verify 0 errors
2. Run `npm run lint` — verify no new warnings (1 pre-existing ESLint warning about `<img>` in `OrderSummary.tsx` is acceptable)
3. Deploy to Vercel: `npx vercel --prod` or push to `002-ordering-system` branch and let Vercel auto-deploy
4. Verify live site at `https://ghousia-goldenweb.vercel.app`

**Pre-Deploy Checklist**:
- [ ] Supabase `customer_orders` table created (Task 1)
- [ ] Voice agent icon working (Task 2)
- [ ] Menu items visible without scroll (Task 3)
- [ ] Favicon showing (Task 4)
- [ ] Clock showing in Navbar (Task 5)

---

## Task Order & Dependencies

```
Task 1 (Supabase SQL) ← Must be done first, but is manual/dashboard task
    ↓
Task 2 (Voice Agent) ← Depends on understanding SpooniWidget CSS
    ↓
Task 3 (Menu Loading) ← Independent, can run in parallel with 2
    ↓
Task 4 (Favicon) ← Independent, quick
    ↓
Task 5 (Clock) ← Independent, quick
    ↓
Task 6 (Verify/Deploy) ← Depends on all above
```

**Recommended Execution Order**: 2 → 3 → 4 → 5 → 1 → 6
- Tasks 2-5 are code changes (parallelizable)
- Task 1 is manual SQL (can be done while code changes are in progress)
- Task 6 is final verification

---

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Removing CSS hiding ElevenLabs widget causes layout issues | Test on local dev; adjust `position`/`bottom`/`right` values |
| Removing `whileInView` changes visual animation | Items will still have `fadeInUp` or `staggerContainer` animation on mount |
| Favicon path doesn't resolve | Test in browser; check Network tab for 404 on favicon request |
| Clock component causes hydration mismatch | Use `useEffect` with `setState` pattern; `suppressHydrationWarning` already on `<html>` |
| `customer_orders` SQL has column type issues | Test with actual order submission; adjust SQL if needed |

---

## File Change Summary

| File | Action |
|------|--------|
| `src/app/globals.css` | Remove ElevenLabs widget-hiding CSS rules |
| `src/components/ui/SpooniFAB.tsx` | Remove |
| `src/app/layout.tsx` | Remove SpooniFAB import/usage; add `icons` to metadata |
| `src/components/chat/SpooniWidget.tsx` | Adjust positioning if needed |
| `src/components/menu/MenuGrid.tsx` | Remove `whileInView`/`viewport`, set `initial="visible"` |
| `src/components/home/FeaturedMenu.tsx` | Remove `whileInView`/`viewport` |
| `src/components/home/PopularCategories.tsx` | Remove `whileInView`/`viewport` |
| `src/components/home/AboutPreview.tsx` | Remove `whileInView`/`viewport` |
| `src/components/layout/Footer.tsx` | Remove `whileInView`/`viewport` |
| `src/components/ui/Clock.tsx` | **NEW** — Real-time clock component |
| `src/components/layout/Navbar.tsx` | Add `<Clock />` next to `<DarkModeToggle />` |
| `public/favicon.ico` | **NEW** — Favicon copy |
