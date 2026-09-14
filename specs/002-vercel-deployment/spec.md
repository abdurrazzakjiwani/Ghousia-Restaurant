# Specification: Vercel Deployment

**Feature**: 002-vercel-deployment  
**Date**: 2026-09-14  
**Status**: Draft

## Summary

Deploy the Ghousia Golden Spoon restaurant website to Vercel for public access, with proper environment variable configuration, GitHub integration for continuous deployment, and a production-ready URL.

## User Scenarios & Testing

### Primary User Scenario

**As a** restaurant owner,  
**I want to** have my website live on the internet with a public URL,  
**So that** customers can access the menu, place orders, make reservations, and contact us from anywhere.

### Acceptance Scenarios

1. **Given** the website is deployed to Vercel, **When** a customer visits the production URL, **Then** the home page loads with all content visible
2. **Given** the website is deployed, **When** a customer navigates to the menu page, **Then** all 13 categories and 57+ items display correctly
3. **Given** the website is deployed, **When** a customer clicks the WhatsApp order button, **Then** WhatsApp opens with the correct pre-filled message
4. **Given** the website is deployed, **When** a customer submits a reservation form, **Then** the data is saved to Supabase and a confirmation is shown
5. **Given** the website is deployed, **When** a customer uses the AI chatbot, **Then** the Groq API responds with menu recommendations
6. **Given** the website is deployed, **When** a customer toggles dark mode, **Then** the preference persists across page reloads
7. **Given** code is pushed to the GitHub main branch, **When** Vercel detects the change, **Then** the site auto-deploys within 2 minutes

### Edge Cases

- What happens if Supabase is temporarily unavailable? → Static menu content still displays, forms show error messages
- What happens if the Groq API is rate-limited? → Chatbot shows fallback message suggesting to call directly
- What happens if environment variables are missing? → Build fails with clear error, site does not deploy with broken functionality

## Requirements

### Functional Requirements

- **FR-01**: Website must be accessible via a public Vercel URL (e.g., `ghousia-golden-spoon.vercel.app`)
- **FR-02**: All environment variables must be configured in Vercel dashboard (Supabase URL, Supabase Anon Key, Groq API Key, WhatsApp number, restaurant info)
- **FR-03**: GitHub repository must be connected to Vercel for automatic deployments
- **FR-04**: Every push to the master branch triggers an automatic production deployment
- **FR-05**: Every pull request triggers a preview deployment for testing
- **FR-06**: The website must pass Vercel's build process without errors
- **FR-07**: Custom domain can be configured later (not required for initial deployment)

### Non-Functional Requirements

- **NFR-01**: Website must load within 3 seconds on 4G connection
- **NFR-02**: All pages must be accessible and functional on mobile, tablet, and desktop
- **NFR-03**: SSL certificate must be automatically provisioned by Vercel (HTTPS)
- **NFR-04**: Deployment must not expose any secret keys in client-side code

### Security Requirements

- **SR-01**: Supabase Anon Key is safe to expose (designed for client-side use with RLS)
- **SR-02**: Groq API Key must only be used in server-side API routes (never in client components)
- **SR-03**: `.env.local` must not be committed to GitHub (already in .gitignore)

## Success Criteria

- **SC-01**: Website is accessible at a public Vercel URL with valid SSL certificate
- **SC-02**: All 8 pages load correctly (Home, Menu, Order, About, Location, Contact, Reservation, Tracking)
- **SC-03**: All 6 API routes respond correctly (Orders, Reservations, Reviews, Contacts, Chat, Delivery Check)
- **SC-04**: WhatsApp ordering flow works end-to-end from deployed site
- **SC-05**: AI chatbot responds to menu queries from deployed site
- **SC-06**: Dark mode toggle persists across sessions on deployed site
- **SC-07**: Auto-deployment triggers within 2 minutes of GitHub push

## Assumptions

- GitHub account `abdurrazzakjiwani` has a repository named `Ghousia-Restaurant`
- Vercel account `abdulrazzakjiwani556-5030s-projects` is active and has available project slots
- Supabase project `obcrnyhpgjpntwtttlin` is active and accessible
- Groq API key is valid and has available quota
- The website uses Next.js 14 which Vercel natively supports

## Out of Scope

- Custom domain configuration (can be done later)
- Vercel Analytics integration
- Vercel Edge Functions (using standard API routes instead)
- Multi-region deployment (single region is sufficient)
- CI/CD pipeline beyond Vercel's built-in GitHub integration

## Dependencies

- GitHub repository must be created and pushed before Vercel deployment
- Supabase database must be set up with schema and seed data
- All environment variables must be known before deployment
