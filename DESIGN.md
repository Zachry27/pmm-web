---
version: alpha
name: PMM Web Design System
description: Modern, professional pilgrimage & ground handling design system for Muthawif Muda Arab Saudi (PMM).
colors:
  primary: "#1e40af"
  primary-hover: "#1d4ed8"
  secondary: "#0f172a"
  tertiary: "#047857"
  neutral-light: "#f8fafc"
  neutral-dark: "#020617"
  surface: "#ffffff"
  border: "#e2e8f0"
  text-main: "#1e293b"
  text-muted: "#64748b"
typography:
  h1:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  h2:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  badge-success:
    backgroundColor: "{colors.tertiary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: 4px
  card-base:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.lg}"
    padding: 24px
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.md}"
    padding: 10px
  border-box:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.border}"
---

## Overview

PMM Web is a single-page interactive portal and calculator for Indonesian Umrah/Hajj pilgrim services (B2B and B2C), offering transport booking, Haromain High Speed Railway (HHR) ticketing, Muthawif guidance, and complete LA (Land Arrangement) quotation generation.

Design ethos:
- **Trustworthy & Authoritative:** High-contrast royal blues and crisp neutrals convey formal reliability for financial quotations and institutional partnerships.
- **Vibrant Action:** Emerald greens signal live availability, verified status, and direct WhatsApp / hotline engagement.
- **Dense Utility:** Data tables, pricing matrices, and calculation breakdowns require compact typography, crisp borders, and clean hierarchy.

## Colors

- **Primary (#1e40af - Tailwind Blue 800):** Primary brand actions, active navigation states, call-to-action buttons, and header highlights.
- **Secondary (#0f172a - Slate 900):** Deep contrast typography, structural container bars, and authoritative section headers.
- **Tertiary (#047857 - Emerald 700):** Online hotline status, success confirmations, price validation markers, and floating WhatsApp links with WCAG AA accessibility compliance.
- **Neutral Light (#f8fafc - Slate 50):** App workspace background and alternating table rows.
- **Neutral Dark (#020617 - Slate 950):** Top announcement bar and dark footer elements.
- **Surface (#ffffff):** Card cards, pricing calculator panels, modal surfaces.
- **Border (#e2e8f0 - Slate 200):** Delimiters for data grids, vehicle cards, and form inputs.
- **Text Main (#1e293b - Slate 800):** Primary readability body text.
- **Text Muted (#64748b - Slate 500):** Secondary labels, metadata timestamps, and subtitles.

## Typography

- **Headings (Inter / Sans-serif):** Bold to extra-bold weighting (`800` for `h1`, `700` for `h2`) with slight negative letter-spacing for tight tabular alignment.
- **Body & Numerical Tables:** Regular to medium weight with legible tabular numerals for SAR and IDR currencies.
- **Arabic Inscriptions:** Amiri serif font for Bismillah, Quranic dalil, and Islamic citations.

## Layout

- Fluid grid container with responsive constraints (`max-w-7xl`).
- High-density spacing for pricing engines and quotations (`sm: 8px`, `md: 16px`).
- Floating sticky action dock for customer care and quotation summary.

## Elevation & Depth

- Cards utilize subtle flat borders (`border border-slate-200`) supplemented with shallow shadows (`shadow-xs` or `shadow-sm`) to preserve dense data readability without visual clutter.
- Modals and fixed floating widgets utilize high elevation (`shadow-xl` / `shadow-2xl`).

## Shapes

- Rounded elements standard at `12px` (`rounded-xl` / `rounded.md`) for inputs and buttons.
- Pill badges (`rounded-full`) for live tags, status chips, and currency conversions.

## Components

- `button-primary`: Main submission and quotation calculation triggers.
- `button-primary-hover`: Darkened blue state indicating active pointer press.
- `badge-success`: Live badge for hotline and instant quote availability.
- `card-base`: Container for vehicle fleets, route selectors, and simulator modules.
- `page-container`: Global view wrapper with slate background.
- `header-bar`: Dark announcement header.
- `table-cell-muted`: Data table subtitles and metadata cells.
- `input-field`: Standardized form control.

## Do's and Don'ts

### Do's
- Use `{colors.primary}` for all core financial and booking actions.
- Keep currency values aligned with monospaced or tabular numbers.
- Maintain WCAG AA contrast on buttons and text labels against slate backgrounds.

### Don'ts
- Do not mix divergent accent colors (e.g. orange or purple) outside established status badges.
- Do not use loose spacing inside calculator rows; information density is essential for quotation reviews.
