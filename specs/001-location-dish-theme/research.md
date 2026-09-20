# Research.md: Location, Signature Dish, CTA, and Light-Only Presentation

## Decisions & Rationale

| Unknown | Decision | Rationale |
|---------|----------|-----------|
| **Language / Runtime** | Node.js 18+, Next.js 14, React 18.3 | Confirmed by `package.json` dependencies and existing codebase. |
| **Primary Dependencies** | `@supabase/supabase-js ^2.49.4`, `groq-sdk ^0.8.0`, `lucide-react ^0.474.0`, `framer-motion ^13.3.0`, `clsx ^2.1.1` | Listed in `package.json`; all are client‑side / SSR‑compatible. |
| **CSS Framework** | Tailwind CSS 3.x (`tailwind.config.ts`) | Used for utility‑first styling, dot‑pattern, and theming. |
| **Storage** | Browser `localStorage` for saved delivery address; no server‑side persistence in this feature. | Feature requires address to persist per‑browser; existing `CartContext` already uses `localStorage`. |
| **Testing Framework** | No automated test script defined in `package.json` (`npm test` not configured). | Currently only `npm run lint` and `npm run build` are available. |
| **Target Platform** | Desktop and mobile browsers (Chrome, Firefox, Safari, Edge). | Site is responsive; no native or hybrid app. |
| **Project Type** | Web application (single‑page entry via `src/app/page.tsx`). | Confirmed by Next.js App Router setup. |
| **Performance Goals** | Not specified; no quantitative metrics required for this feature. | Feature focuses on UI/UX and light‑only presentation; no explicit performance targets. |
| **Constraints** | None beyond existing site constraints (responsive design, accessibility). | No new runtime or data‑storage constraints introduced. |
| **Scale / Scope** | Single‑feature addition; does not affect menu, orders, reservations, or authentication. | Explicitly bounded in `Scope Boundaries` of the spec. |

## Alternatives Considered

| Option | Why Rejected |
|--------|--------------|
| Use server‑side address validation via `/api/delivery-check` | The existing endpoint only checks “Karachi”; adding full validation would extend scope beyond this feature. |
| Implement geolocation auto‑fill | User chose mandatory manual address entry; geolocation would conflict with “no geolocation” assumption. |
| Add a React component library for animation | The site already uses `framer-motion` globally; adding a new library would increase bundle size unnecessarily. |
| Keep dark‑theme toggle but hide it visually | User selected to remove dark‑mode entirely; keeping a hidden toggle would violate the requirement. |

## Open Items (if any)

- None – all `NEEDS CLARIFICATION` from the Technical Context have been resolved.

---

*Generated on 2026‑09‑20 as part of the /sp.plan workflow for feature `001-location-dish-theme`.*