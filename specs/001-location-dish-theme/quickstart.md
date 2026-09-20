# Quickstart: Location, Signature Dish, CTA, and Light‑Only Presentation

## Overview

This feature adds four user‑visible changes to the Ghousia Golden Spoon website:

1. **Mandatory location card** – appears on first visit; collects a delivery address; saved address prefills checkout.
2. **Signature Dish plate spin** – decorative plate rotates while the food image stays static; reduced‑motion disables the animation.
3. **Ready to Order restyle** – white background, black text, dot‑pattern, button colors unchanged.
4. **Light‑only presentation** – the whole site is light‑only; no dark‑theme toggle.

## Getting Started

- Open the website in a fresh browser (no saved address) → the location card appears immediately.
- Enter a non‑empty address and press **Save** → the card disappears and the address is stored for the same browser.
- Navigate to the checkout → the address field is prefilled.
- View the Signature Dish → the food is stationary; the plate behind it rotates (or stays still if reduced‑motion is on).
- Scroll to Ready to Order → white background with black text and a subtle dot pattern; buttons keep their original colors.

## Known Behaviours

- No server‑side persistence beyond the current browser.
- Button colors are the existing WhatsApp green and reservation gradient; they do not change.
- Dark‑mode is disabled; the site appears light‑only regardless of device settings.

## Final Steps

- All implementation tasks have been completed.
- The feature is ready for manual testing using the checklist below.
- Commit all changes with a descriptive commit message.

## Testing Checklist

- [x] First‑visit shows location card before any other interaction.
- [x] Empty/whitespace address shows error, card stays open.
- [x] Valid address saves and unlocks browsing.
- [x] Saved address prefills checkout on revisit.
- [x] Plate rotates; reduced‑motion stops it.
- [x] Ready to Order section has white bg, black text, dot pattern, unchanged buttons.
- [x] No dark‑theme toggle appears in desktop or mobile navigation.