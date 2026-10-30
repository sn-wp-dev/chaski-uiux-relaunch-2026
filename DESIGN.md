---
name: Alpine Parcel Precision
colors:
  surface: '#f8faf4'
  surface-dim: '#d8dbd5'
  surface-bright: '#f8faf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4ee'
  surface-container: '#edefe9'
  surface-container-high: '#e7e9e3'
  surface-container-highest: '#e1e3dd'
  on-surface: '#191c19'
  on-surface-variant: '#47473e'
  inverse-surface: '#2e312d'
  inverse-on-surface: '#eff1eb'
  outline: '#77786d'
  outline-variant: '#c8c7ba'
  surface-tint: '#5b623f'
  primary: '#292f11'
  on-primary: '#ffffff'
  primary-container: '#3f4525'
  on-primary-container: '#acb28a'
  inverse-primary: '#c4caa0'
  secondary: '#586336'
  on-secondary: '#ffffff'
  secondary-container: '#dce9af'
  on-secondary-container: '#5e693b'
  tertiary: '#243009'
  on-tertiary: '#ffffff'
  tertiary-container: '#39471e'
  on-tertiary-container: '#a5b581'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e7bb'
  primary-fixed-dim: '#c4caa0'
  on-primary-fixed: '#191e03'
  on-primary-fixed-variant: '#444a29'
  secondary-fixed: '#dce9af'
  secondary-fixed-dim: '#c0cc95'
  on-secondary-fixed: '#171e00'
  on-secondary-fixed-variant: '#414b20'
  tertiary-fixed: '#d8e9b1'
  tertiary-fixed-dim: '#bccd97'
  on-tertiary-fixed: '#141f00'
  on-tertiary-fixed-variant: '#3e4c22'
  background: '#f8faf4'
  on-background: '#191c19'
  surface-variant: '#e1e3dd'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-address:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 1200px
---

## Brand & Style

> **Shared implementation baseline:** Public marketing pages use the audited shared tokens and reusable components in [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) and [`design-system.css`](design-system.css). That implementation standard resolves component-level differences in this older visual brief, including the pill-shaped gradient buttons, shared icon treatment, page surfaces and reusable badges. New designs should follow the shared implementation baseline and extend it deliberately.

This design system embodies the understated clarity, efficiency, and reliability expected by Swiss cross-border shoppers managing package deliveries in Germany. It merges Swiss editorial minimalism with modern cross-border logistics precision.

### Brand Character & Emotional Response
The interface feels calm, organized, and quietly reassuring. It removes the stress, confusion, and bureaucratic friction typically associated with foreign delivery addresses, customs regulations, and package pickups. Users should feel complete trust, logistical mastery, and a sense of seamless continuity between German depot operations and their Swiss home.

### Design Movement: Alpine Editorial Minimalism
- **Controlled Palette:** Deep alpine moss and botanical forest greens establish structure, supported by pale sage tones, misted ivory, and unbleached card surfaces.
- **Architectural Clarity:** Layouts lean on generous whitespace, sharp alignment, thin low-contrast dividing lines, and subtle structural frames rather than heavy elevation or aggressive ornament.
- **Utilitarian Elegance:** High-density data tables, parcel tracking tickers, and address-copying modules are treated with the precision of a high-end rail timetable or physical Swiss transit pass.

## Colors

The palette is rooted strictly in deep moss and forest greens, supported by cool sage tints and clean off-white mint surfaces. Warm browns and corporate blues are entirely excluded.

### Primary & Accent Roles
- **Primary Deep Moss (`#3F4525` / `#2B331A`):** The definitive brand anchor. Used for primary call-to-actions, prominent badges, core brand markers, and selected interactive states. `#2B331A` is reserved for pressed button states, deep headers, and high-emphasis focal areas.
- **Secondary Moss (`#5E693B` / `#4D542B`):** Supporting functional green used for active tabs, secondary icons, and operational highlights.
- **Sage Accent (`#8A9A68` / `#A3B484`):** Soft botanical highlights, status indicators (e.g., "Ready for Pickup"), and subtle border rings on focused inputs.

### Surface & Neutral System
- **App Canvas Base (`#FAFAF7`):** The primary view background. Crisp, serene, and warm off-white.
- **Muted Sage Surface (`#F4F6F0`):** Secondary container backgrounds, data grid headers, and subtle card backdrops.
- **Tinted Card Wash (`#EBF0E6`):** Highlighted card surfaces, input fills, and notification containers.
- **Primary Text / Deep Forest Slate (`#1B2214`):** Replaces standard harsh blacks and eliminates browns. Deep, dark botanical charcoal that ensures crisp legibility across all backgrounds.
- **Secondary Text / Subdued Moss (`#4A5440`):** Metadata, package dimensions, pickup timers, and supporting descriptive text.
- **Borders & Dividers (`#D9E2D2`):** Low-contrast structural lines that partition address modules without visual clutter.

## Typography

Plus Jakarta Sans is utilized across all tiers, balancing clean geometric legibility with modern humanist proportions.

- **Weight Discipline:** Headlines employ weights `600` and `700` with subtle negative tracking (`-0.01em` to `-0.03em`) to mimic high-end Swiss transport signage.
- **Body & Data Delivery:** Long-form instructions, address formats, and customs notes are set at regular `400` with ample line height for maximum scanning comfort.
- **Technical Readouts (`code-address`):** Dedicated style for Konstanz German locker/depot address lines, reference IDs, and customs codes. It uses medium weight with slight positive tracking to ensure zero ambiguity between characters like `0` and `O` or `1` and `I`.
- **Labels:** Set in uppercase or small semi-bold caps with widened tracking for tracking status indicators (`IN KONSTANZ`, `READY FOR PICKUP`, `IN STORAGE`).

## Layout & Spacing

The layout model is governed by a responsive, fixed-width centered container running a 12-column grid on desktop/tablet and a 4-column system on mobile devices.

### Grid & Metrics
- **Mobile (up to 767px):** 4 columns, `16px` margin, `12px` gutter. Full-width modular cards for address display and pickup pass barcoding.
- **Tablet (768px – 1023px):** 8 columns, `24px` margin, `16px` gutter. Split views for active parcel logs and depot operating schedules.
- **Desktop (1024px+):** 12 columns, max container width `1200px`, `24px` gutters. Two-column dominant structure: address tools and active parcel timeline on the left (8 cols), depot status, opening hours in Konstanz, and Swiss customs calculator on the right (4 cols).

### Vertical Rhythm
A base 8px increment dictates all structural offsets: `8px`, `16px`, `24px`, `32px`, `48px`, and `72px`. Form modules maintain compact 8px internal gaps, while editorial sections use spacious 48px to 72px padding to create a breathable, tranquil experience.

## Elevation & Depth

This design system avoids harsh drop shadows and artificial 3D lighting, favoring alpine tonal layering and soft ambient depth.

### Depth Hierarchy
1. **Level 0 (Base Canvas):** `#FAFAF7` — Clean matte foundation.
2. **Level 1 (Sub-Surfaces):** `#F4F6F0` — Flat secondary regions such as sidebars, summary drawers, and table alternate rows.
3. **Level 2 (Cards & Active Panels):** Pure White (`#FFFFFF`) or Crisp Off-White with a crisp border (`1px solid #D9E2D2`). An ultra-soft ambient shadow creates tactile lift: `0 4px 16px -2px rgba(43, 51, 26, 0.05)`.
4. **Level 3 (Interactive Modals & Pickup Passes):** `#FFFFFF` paired with an elevated moss glow: `0 12px 32px -4px rgba(43, 51, 26, 0.10)`. Border remains a delicate `#CCD6C4`.
5. **Level 4 (Toasts & Overlays):** `#2B331A` (Deep Forest) floating above the interface with crisp white and sage text, utilizing `0 8px 24px -2px rgba(27, 34, 20, 0.25)`.

## Shapes

The design system maintains a structured, architectural aesthetic through low-radius, soft corners (`roundedness: 1`). Corners are neither aggressive nor toy-like; they feel crafted, solid, and reliable like precision equipment.

- **Base Radius (Buttons, Inputs, Small Badges):** `4px` (`0.25rem`).
- **Mid Radius (Cards, Content Containers, Tables):** `8px` (`0.5rem`).
- **Large Radius (Modal Windows, Sheet Drawers):** `12px` (`0.75rem`).
- **Pills / Full Radius:** Reserved exclusively for tiny count badges (e.g., number of parcels waiting in depot) and circular icon button toggles.

## Components

### Buttons
- **Primary:** Solid `#3F4525` background, `#FAFAF7` text, `4px` border-radius. On hover: transitions to `#2B331A`. Active state: `#1E2412`. Focus ring: `2px solid #8A9A68` offset by `2px`.
- **Secondary / Outline:** Pure `#FFFFFF` or transparent base, `1px solid #3F4525` border, `#3F4525` label. On hover: `#F4F6F0` background wash.
- **Tertiary / Ghost:** No border, `#3F4525` text, subtle `#EBF0E6` background on hover.

### Inputs & Address Fields
- Background: `#FFFFFF` or `#F4F6F0`.
- Border: `1px solid #D9E2D2`.
- Text: `#1B2214`, placeholder text in `#78856F`.
- Focus: `1px solid #3F4525` with an outer ring of `rgba(63, 69, 37, 0.15)`.
- **Special Module (One-Click Address Copy):** Specialized read-only input groups with embedded `Copy` icon button, formatted specifically for German checkout address fields (e.g., *Name + Chaski ID*, *Straße & Hausnummer*, *PLZ 78462 Konstanz*).

### Status Chips & Badges
- **Ready for Pickup:** Background `#E5EDE0`, Text `#2B331A`, Border `1px solid #B7C7AE`.
- **In Transit to Konstanz:** Background `#EDF0EA`, Text `#4D542B`, Border `1px solid #D1DACB`.
- **Customs Action Required:** Background `#F2EFE9`, Text `#4A3F2C`, Border `1px solid #D8D0C2`. (Controlled muted ochre, avoiding aggressive saturated alert tones).

### Cards & Parcel Tiles
- Crisp `#FFFFFF` card face seated on `#FAFAF7` canvas.
- Perimeter border: `1px solid #D9E2D2`.
- Internal dividers: `1px solid #EBF0E6`.
- Header section accommodates tracking carrier, date arrived in Konstanz, and free-storage countdown timer.

### Checkboxes & Radios
- Square with `3px` corner rounding for checkboxes; round for radio items.
- Inactive: `1.5px solid #A6B49D` on `#FFFFFF` base.
- Checked: `#3F4525` solid fill with `#FAFAF7` checkmark.

### Domain-Specific Logistics Components
- **Depot Operating Gauge:** A real-time badge indicating current opening hours and queue status at the Konstanz location (e.g., `Open today until 19:30 · Low wait time`).
- **Pickup Barcode Drawer:** A high-contrast modal presenting the depot pickup scan code along with the shopper's verified Swiss ID matching details.
