# Feature Specification: Restaurant Website Redesign

**Feature Branch**: `001-restaurant-redesign`
**Created**: 2026-09-18
**Status**: Draft
**Input**: User description: "Comprehensive restaurant website redesign with orange color scheme replacing purple, improved typography with Poppins font, official WhatsApp icon, robot icon for voice agent with 'Give order in voice' label, 100 auto-cycling testimonials with sketch-style avatars, separate branches page with 3 restaurants and 2 family halls, additional home page sections (Why Choose Us, Popular Categories, CTA Banner), and hero image optimization to WebP format"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Visual Identity Overhaul (Priority: P1)

A restaurant customer visits the Ghousia Golden Spoon website and immediately sees a warm, appetizing orange color scheme instead of the previous purple gradient. The typography is polished with clear heading hierarchy using Poppins font, making the brand feel professional and inviting. The WhatsApp floating button uses the official WhatsApp logo so customers instantly recognize it as a WhatsApp ordering channel.

**Why this priority**: Visual identity is the first impression customers receive. The purple scheme was unappetizing for a restaurant and the generic chat icon confused users about the WhatsApp ordering channel. These are foundational changes that affect every page.

**Independent Test**: Visit the homepage and any other page — verify orange gradient replaces purple, headings use Poppins with proper hierarchy, WhatsApp button shows the official WhatsApp logo (not a generic chat bubble), and all text remains readable with proper contrast.

**Acceptance Scenarios**:

1. **Given** a customer visits any page, **When** the page loads, **Then** the color scheme shows warm orange gradients (`#f59e0b` to `#ea580c`) instead of purple (`#667eea` to `#764ba2`)
2. **Given** a customer views any heading (h1, h2, h3), **When** they examine the typography, **Then** headings use the Poppins font with proper size hierarchy (h1: 4xl/5xl/6xl, h2: 3xl/4xl, h3: xl) and tracking-tight
3. **Given** a customer looks at the WhatsApp floating button, **When** they see it, **Then** the official WhatsApp logo (green bubble with white phone icon) is displayed instead of a generic chat bubble icon
4. **Given** a customer views body text across the site, **When** they examine readability, **Then** body text uses Inter font with `leading-relaxed` for comfortable reading

---

### User Story 2 - Voice Agent Button Redesign (Priority: P1)

A restaurant customer browsing the website sees the SPOONI voice agent floating button in the bottom-right corner. Instead of an unclear default ElevenLabs orb, the customer sees a clear robot icon with the label "Give order in voice" so they instantly understand this button connects them to a voice-based ordering assistant.

**Why this priority**: Customers need to clearly understand what the voice agent button does. The default ElevenLabs FAB was unrecognizable, and the "Start Call" label was unclear. Customers should immediately know they can place voice orders.

**Independent Test**: Visit any page — verify a floating robot icon button appears above the WhatsApp button, confirm the label "Give order in voice" is visible on hover or as a tooltip, and confirm clicking it opens the ElevenLabs voice agent widget.

**Acceptance Scenarios**:

1. **Given** a customer is on any page, **When** they look at the bottom-right corner, **Then** they see a robot icon button labeled "Give order in voice" positioned above the WhatsApp button
2. **Given** a customer hovers over the robot button, **When** they see the tooltip or label, **Then** it clearly says "Give order in voice"
3. **Given** a customer clicks the robot button, **When** they interact with it, **Then** the ElevenLabs voice agent widget opens and they can speak to the AI assistant
4. **Given** a customer has the ElevenLabs script not loaded yet, **When** they view the page, **Then** the robot button position is reserved with no layout shift

---

### User Story 3 - Branches Discovery Page (Priority: P2)

A restaurant customer wants to visit Ghousia Golden Spoon at one of its multiple locations. They navigate to a dedicated Branches page and see cards for all three restaurant branches (Ghousia Golden Spoon, Ghousia Silver Spoon, Ghousia Fast Food & Chinese) with location details and images. At the bottom, they see information about two large family halls available for events, with photos.

**Why this priority**: The restaurant operates from multiple locations and has family halls. Customers need a dedicated page to find the right location. A separate page (not just a navbar link) gives proper prominence and space for all location details and images.

**Independent Test**: Navigate to `/branches` — verify all 3 restaurant cards display with their images and addresses, confirm the family halls section appears at the bottom with "That's not all — we also have two large family halls for you" text, and verify each card has a clickable map link.

**Acceptance Scenarios**:

1. **Given** a customer navigates to `/branches`, **When** the page loads, **Then** they see 3 branch cards: Ghousia Golden Spoon, Ghousia Silver Spoon, and Ghousia Fast Food & Chinese, each with its image and full address
2. **Given** a customer views a branch card, **When** they click the location, **Then** it opens Google Maps to the correct location
3. **Given** a customer scrolls past the 3 branch cards, **When** they reach the bottom, **Then** they see the text "That's not all — we also have two large family halls for you" with images of Family Hall 1 and Family Hall 2
4. **Given** a customer is on a mobile device, **When** they view the branches page, **Then** all cards stack vertically and remain readable without horizontal overflow

---

### User Story 4 - Enhanced Testimonials (Priority: P2)

A restaurant customer browsing the homepage sees a testimonials section where customer feedback auto-cycles like a hero slider within a single card. Each testimonial shows a sketch-style avatar image of the customer next to their name, rating, and comment. The feedback rotates automatically every 4 seconds with smooth transitions.

**Why this priority**: The existing testimonials had only 3 static items. Customers seeing 100 rotating reviews builds significantly more trust and engagement. The sketch-style avatars add a personal, handcrafted feel appropriate for a family restaurant.

**Independent Test**: Open the homepage testimonials section — verify feedback auto-cycles every 4 seconds, confirm each card shows a sketch-style avatar with the customer's name, and verify dot indicators allow manual navigation.

**Acceptance Scenarios**:

1. **Given** a customer is on the homepage, **When** the testimonials section loads, **Then** they see the first testimonial with a sketch-style avatar, customer name, star rating, and comment
2. **Given** the testimonials section is visible, **When** 4 seconds pass, **Then** the testimonial smoothly transitions to the next one with crossfade animation
3. **Given** a customer hovers over the testimonials card, **When** they interact, **Then** the auto-rotation pauses
4. **Given** a customer wants to see a specific review, **When** they click a dot indicator, **Then** the carousel jumps to that testimonial
5. **Given** a customer views any avatar, **When** they examine it, **Then** it appears as a sketch-style grayscale image with the customer's initials, styled to look hand-drawn

---

### User Story 5 - Richer Home Page Content (Priority: P3)

A restaurant customer visiting the homepage sees additional content sections beyond the existing hero, menu, and reviews — including "Why Choose Us" feature cards, "Popular Categories" overview, and a prominent call-to-action banner — giving them more reasons to engage and order.

**Why this priority**: The home page currently has limited content (4 sections). Adding Why Choose Us, Popular Categories, and a CTA Banner gives customers more touchpoints and increases the likelihood of ordering. This is incremental enhancement on top of existing content.

**Independent Test**: Visit the homepage — verify the new sections (Why Choose Us, Popular Categories, CTA Banner) appear in the correct order and all content renders correctly with proper styling.

**Acceptance Scenarios**:

1. **Given** a customer is on the homepage, **When** they scroll past the hero section, **Then** they see "Why Choose Us" with 4 feature cards: Fresh Ingredients, Fast Delivery, Family Recipes, and Easy Ordering
2. **Given** a customer views the Popular Categories section, **When** they look at the content, **Then** they see top 8 categories from the menu with icons and names, each linking to the full menu page
3. **Given** a customer reaches the CTA Banner, **When** they see it, **Then** it displays "Ready to Order?" with the phone number and two buttons: "Order on WhatsApp" and "Reserve a Table"

---

### User Story 6 - Hero Image Optimization (Priority: P3)

A restaurant customer visiting the homepage sees hero images that load quickly without a long delay or purple gradient placeholder showing before the images appear. The images are optimized WebP format that loads fast on all connection speeds.

**Why this priority**: Currently, hero images are large PNG files (1.5-2.3MB each) causing slow loading with a visible purple gradient background before images appear. Optimized WebP images (200-400KB each) dramatically improve the first impression loading speed.

**Independent Test**: Open the homepage and observe the hero section — verify images load within 2 seconds, confirm no purple gradient shows as a placeholder, and verify the section background is a neutral dark color while images load.

**Acceptance Scenarios**:

1. **Given** a customer opens the homepage, **When** the hero section loads, **Then** all 3 hero images display within 2 seconds without a visible delay or placeholder gradient
2. **Given** a customer is on a slow connection, **When** the page loads, **Then** the hero section background shows a neutral dark color (not purple) while images load
3. **Given** a customer's browser supports WebP, **When** images load, **Then** the images are served in WebP format with significantly smaller file sizes
4. **Given** a customer has `prefers-reduced-motion` enabled, **When** the page loads, **Then** the carousel shows a static image without auto-rotation

---

### Edge Cases

- What happens when a branch location image fails to load? The branch card should show a gradient fallback background matching the site theme
- What happens when all 100 testimonials data is being cycled? The carousel should loop seamlessly from the last back to the first
- What happens on very narrow screens (below 320px)? Branch cards should stack vertically, testimonials should scroll horizontally, and all content remains accessible without horizontal overflow
- What happens when the ElevenLabs script hasn't loaded yet? The robot button position should be reserved (no layout shift)
- What happens when a customer has `prefers-reduced-motion` enabled? The testimonials carousel should not auto-rotate
- What happens when a customer views the branches page on mobile? All branch cards and family halls should stack vertically and remain readable

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace all purple color values (`#667eea`, `#764ba2`) with warm orange (`#f59e0b`, `#ea580c`) across the entire website including gradients, scrollbars, focus rings, and icons
- **FR-002**: System MUST use Poppins font for all headings (h1-h6) and Inter font for body text, with proper size hierarchy and `leading-relaxed` on body paragraphs
- **FR-003**: System MUST display the official WhatsApp logo SVG icon instead of the generic `MessageCircle` chat bubble icon on the WhatsApp floating button
- **FR-004**: System MUST display a robot icon (`Bot` from lucide-react) with a "Give order in voice" label for the SPOONI voice agent floating button, positioned above the WhatsApp button
- **FR-005**: System MUST render 100 auto-cycling testimonials in a single card carousel, rotating every 4 seconds with crossfade transitions, each showing a sketch-style grayscale avatar, customer name, star rating, and comment
- **FR-006**: System MUST create a dedicated `/branches` page displaying 3 restaurant branch cards with images, names, and full addresses, plus a bottom section with 2 family hall images and the text "That's not all — we also have two large family halls for you"
- **FR-007**: System MUST add 3 new sections to the homepage: "Why Choose Us" (4 feature cards), "Popular Categories" (8 category cards linking to menu), and a CTA Banner with "Ready to Order?" headline
- **FR-008**: System MUST optimize all 3 hero images to WebP format (max 1920px width), reducing file sizes from ~5.4MB total to ~1MB or less
- **FR-009**: System MUST change the hero section background from purple gradient to a neutral dark color (`bg-gray-900`) as a fallback while images load
- **FR-010**: System MUST preserve all existing website functionality (menu, reservations, ordering, reviews, dark mode, chatbot) without regression
- **FR-011**: System MUST add a "Branches" link to the navbar between "About" and "Location" that navigates to the `/branches` page
- **FR-012**: System MUST add a reference link on the location page pointing to `/branches` for customers seeking all locations

### Key Entities

- **Branch**: A restaurant location with name, full address, image, and map link. Three branches: Ghousia Golden Spoon, Ghousia Silver Spoon, Ghousia Fast Food & Chinese.
- **Family Hall**: An event space available for booking. Two halls with images displayed on the branches page.
- **Testimonial**: Customer feedback with name, star rating (1-5), comment text, and sketch-style avatar seed. 100 unique testimonials.
- **Feature Card**: A "Why Choose Us" card with title, description, and orange-gradient icon circle.
- **Category**: A menu category displayed on the home page with emoji icon, name, and item count linking to `/menu`.
- **CTABanner**: A full-width orange gradient banner with headline, phone number, and two action buttons.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Customers see orange color scheme on every page within 1 second of page load (no purple visible)
- **SC-002**: Headings render with Poppins font and proper hierarchy (h1 ≥ 4xl, h2 ≥ 3xl, h3 ≥ xl) with `tracking-tight`
- **SC-003**: WhatsApp button displays the official WhatsApp logo icon (not generic chat bubble) and is recognizable as WhatsApp
- **SC-004**: Robot voice agent button is clearly labeled "Give order in voice" and opens the ElevenLabs widget on click
- **SC-005**: Testimonials auto-cycle every 4 seconds with smooth crossfade transitions, and customers can manually navigate using dot indicators
- **SC-006**: Branches page loads with all 3 branch cards visible with images, addresses, and map links within 2 seconds
- **SC-007**: Homepage contains all 6 sections (Hero, FeaturedMenu, WhyChooseUs, AboutPreview, PopularCategories, Testimonials, CTABanner, ReviewsSection) rendering without errors
- **SC-008**: Hero images load within 2 seconds on standard broadband connections with no purple gradient placeholder visible
- **SC-009**: `npm run build` completes with zero errors and `npm run lint` completes with zero errors
- **SC-010**: All existing features (menu, reservations, ordering, reviews, dark mode, chatbot) continue to work without regression

### Qualitative Measures

- Customers should perceive the website as warm, appetizing, and professional (orange = restaurant-appropriate)
- The voice agent button should be instantly recognizable as a voice ordering channel
- Testimonials section should feel trustworthy and engaging with 100 rotating reviews
- Branches page should make it easy for customers to find the right location
- The home page should feel rich and complete with sufficient content to encourage ordering
- Typography should feel polished and readable throughout the site

## Assumptions

- The Poppins font is available via Google Fonts (loaded through `next/font/google`)
- The official WhatsApp logo SVG path is available and can be used inline
- The `Bot` icon from `lucide-react` is available for the voice agent button
- Branch photos (`Ghousia Golden Spoon.png`, `Ghousia Silver Spoon.jpg`, `Ghousia Fast Food and Chineese.jpg`) exist in the project root and will be moved to `public/images/branches/`
- Family hall photos (`Family Hall 1.jpg`, `Family Hall 2.jpg`) exist in the project root and will be moved to `public/images/branches/`
- The ElevenLabs convai widget can be triggered programmatically by dispatching a click event on the `elevenlabs-convai` element
- Sketch-style avatars will be generated as inline SVG circles with initials and CSS grayscale/contrast filters (no external image service needed)
- 100 testimonial data entries will be generated with realistic Pakistani names, varied food-related comments, and 4-5 star ratings
- The existing `001-hero-carousel` feature branch should be merged into `001-restaurant-redesign` before implementation
