# CHASKI Relaunch 2026 · Design System

This document and `design-system.css` define the shared implementation baseline for public marketing and service pages in this folder. New pages can add domain-specific components, but should reuse these primitives and visual rules. Customer account screens may use a denser product layout while retaining the same brand tokens and controls.

## Audit and direction

The reference pass covered Startseite, Services, So funktionierts, SEO-Landingpage, SEO-Landingpage-Alt, FAQ, Blog, Click & Collect and Kunden-Seiten, including their source styles and available page previews. For public marketing pages, the strongest recurring pattern is the Services / SEO / So funktionierts presentation: Plus Jakarta Sans; pale green canvas; moss-green type and actions; pill-shaped primary actions; inline Material-style SVG icons; soft section backgrounds; framed photography; concise uppercase section badges; rounded white panels; and a centered 1200px layout. The account area is a separate product register and is not the visual template for SEO pages.

`DESIGN.md` remains the brand and visual-intent reference. Where its earlier component notes conflict with the implemented marketing pages, this shared system is the concrete implementation standard for components. Do not introduce square primary buttons, a new icon family, unframed custom arrows, unrelated label styles or a second neutral palette on a new marketing page.

## Tokens

| Role | Token | Value |
|---|---|---|
| Page canvas | `--chaski-bg` | `#F6F8F3` |
| White surface | `--chaski-surface` | `#FFFFFF` |
| Alternate section | `--chaski-section` | `#EDF1E7` |
| Sage tint | `--chaski-tint` | `#E3EAD8` |
| Primary moss | `--chaski-primary` | `#2D351B` |
| Deep button moss | `--chaski-strong` | `#252D15` |
| Accent moss | `--chaski-accent` | `#586937` |
| Main text | `--chaski-ink` | `#191C19` |
| Supporting text | `--chaski-muted` | `#4E5549` |
| Dividers | `--chaski-line` | `#DDE4D4` |
| Content width | `--chaski-container` | `1200px` |

Spacing uses an 8px rhythm. Common section padding is 80px desktop and 52px mobile. Panels use 8/12/16px radii; pill radius is reserved for buttons and badges. Type is Plus Jakarta Sans, with 44–48px desktop H1, 32px H2, 22px H3, and readable 14–15px body copy.

## Components

The reusable primitives are implemented in `design-system.css`:

- **Container:** `.chaski-container`, 1200px maximum with 24px desktop / 16px mobile gutters.
- **Primary action:** `.chaski-btn`, gradient moss fill, pill radius, right-arrow icon, soft shadow and hover lift.
- **Secondary action:** `.chaski-btn.chaski-btn-secondary`, white fill, thin sage border, same pill geometry, no shadow.
- **Section badge:** `.chaski-section-badge`, sage pill with a legible 19px icon; use sparingly to identify meaningful groups rather than repeating a generic label on every section.
- **Eyebrow:** `.chaski-eyebrow`, short uppercase tracked label, used sparingly.
- **Icon:** `.chaski-icon`, inline SVG using the same Material Symbols path geometry as existing pages. Keep icons local and decorative icons hidden from assistive technology.
- **Text link:** `.chaski-text-link`, moss text and the same arrow icon used by buttons.
- **Panel:** `.chaski-card`, white face, sage border, 16px radius.
- **Benefits strip:** `.chaski-benefit-strip`, a white ruled band with four icon and text modules. Use the SEO reference’s 24×24 filled SVG family; keep the heading and supporting line close. The four items form a 2×2 grid on mobile.
- **Footer/contact:** `.chaski-footer`, four columns for brand/location, page navigation, information and the reference contact column, followed by a ruled bottom row. Keep the final contact column consistent with the SEO page reference.
- **Registration banner:** `.chaski-registration-banner`, a dark moss split panel with conversion copy and a CHASKI photo. Use one page-specific heading and supporting line; avoid repeating the hero or process copy.

- **Skip link / focus:** `.chaski-skip` and the shared visible moss focus ring.

### Icon convention

Use inline SVG with `viewBox="0 -960 960 960"`, `fill="currentColor"`, `aria-hidden="true"`, and `focusable="false"`. The standard forward arrow path is `M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z`. This replaces text arrows and emoji so icon shape and alignment remain consistent.

## Page patterns

- **Header:** sticky, translucent pale canvas with a thin divider; CHASKI logo left, compact text navigation, login, pill registration action and an inline-SVG mobile menu.
- **Hero:** soft sage radial wash, balanced two-column layout, breadcrumb where useful, one H1, short supporting copy, primary and secondary actions, framed real CHASKI photography.
- **Benefits / details:** white or soft-sage bands divided by thin sage rules; icons align to text, not floated in decorative circles.
- **Content sections:** alternate canvas and `--chaski-section`; split text and evidence/visuals with generous 64–80px rhythm.
- **FAQ:** white rounded rows or bordered details panels, plus/minus or expand icon from the shared set, visible focus and native disclosure behavior.
- **Footer/contact:** use the SEO reference footer, with the contact address, phone and directions link in its final column.

## Responsive and accessibility rules

At 1050px collapse the desktop navigation; at 767px convert multi-column content to one column, use 16px side gutters and retain 44px minimum interactive targets. Preserve focus rings, semantic headings, native links/details, descriptive image text, and reduced-motion behavior. Never convey status through color alone.

## Extending the system

Add new UI elements when the content needs them. Start with existing tokens, radius, spacing, icon geometry, button treatment and surface hierarchy. Put a genuinely new reusable pattern in `design-system.css`, document it here, then use the same component on the page. Page-specific layout belongs in that page's own stylesheet.
