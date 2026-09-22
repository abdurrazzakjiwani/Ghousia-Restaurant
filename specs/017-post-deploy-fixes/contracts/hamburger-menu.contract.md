# Contract: Hamburger Menu Specification

## Overview
Defines the expected behavior and styling for the mobile hamburger menu drawer.

## Contract ID
HM-001

## Version
1.0.0

## Status
Approved

## Requirements

### HM-001: Drawer Visibility in Dark Mode
- **All navigation links** must be clearly visible in light text against dark drawer background
- **Color contrast ratio**: Minimum 4.5:1 against `bg-gray-900` background in dark mode
- **Phone number**: Must be clearly visible and distinguishable from other links
- **Close button (X icon)**: Must be clearly visible with sufficient contrast

### HM-002: Accessibility Requirements
- **Close button**: Must have `aria-label="Close menu"` for screen reader support
- **Drawer role**: Should have `role="dialog"` for assistive technology
- **Focus trap**: Must trap focus within drawer when open
- **Keyboard navigation**: ESC key must close drawer; Tab/Shift+Tab navigates links

### HM-003: Light Mode Regression
- **All elements** must remain clearly visible in light mode (no color changes)
- **No visual differences** between light and dark mode presentations (except intentional color contrasts)

### HM-004: Mobile Drawer Behavior
- **Opening**: Tap hamburger icon → drawer slides open
- **Closing**: 
  - Tap X/close button
  - Press ESC key
  - Click outside drawer area
  - Press Tab to focus next element, Shift+Tab to previous

## Test Criteria
- Visual testing: hamburger menu opens and all links visible in both light and dark mode
- Screen reader testing: close button has descriptive aria-label
- Keyboard testing: ESC key closes menu, Tab navigates links
- Color contrast verification: all text meets 4.5:1 minimum against background