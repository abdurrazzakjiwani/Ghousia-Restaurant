# Data Model: ElevenLabs Voice Agent Integration

**Date**: 2026-09-17  
**Feature**: 007-spooni-voice-agent

## Summary

This feature introduces **no new data entities**. The voice agent is managed entirely by ElevenLabs' external service. The website only embeds the widget — no data is stored locally about voice conversations.

## Existing Entities (unchanged)

The following entities from the existing Supabase schema are referenced but NOT modified:

- **MenuItem**: Menu items (SPOONI may reference these in conversation, but the data is read-only)
- **Review**: Customer reviews
- **Reservation**: Table reservation bookings
- **Order**: WhatsApp order records
- **Contact**: Contact form submissions
- **Category**: Menu categories

## New UI State (not persisted)

The following new state is introduced in the SpooniWidget component (not persisted to database):

### SpooniWidget State

| State Variable | Type | Purpose |
|---------------|------|---------|
| `scriptLoaded` | `boolean` | Tracks whether the ElevenLabs widget script has loaded |
| `scriptError` | `boolean` | Tracks whether the script failed to load (for fallback UI) |

These are local component state only — no database changes, no API changes, no new tables.
