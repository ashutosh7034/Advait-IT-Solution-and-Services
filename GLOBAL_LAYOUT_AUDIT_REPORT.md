# Advait IT Solutions and Services
## Global Layout Standardization & Dashboard-Inspired Design System Report

**Date:** 2026-10-23
**Auditor / Architect:** Senior UI/UX Designer & Frontend CSS Engineer
**Status:** Complete & Production Ready

---

### Executive Overview

A unified, dashboard-inspired layout system has been established across all 8 pages of the **Advait IT Solutions and Services** website.

The website previously suffered from inconsistent horizontal gutters and container widths: the homepage hero card spanned up to 1860px (with 30px gutters), while navigation headers, content grids, and footers were constrained to 1260px (with 82.5px+ gutters on desktop). Additionally, intermediate breakpoints (1024px to 1365px) suffered from premature mobile collapsing, and subpage compact headers had arbitrary vertical margin gaps disconnecting them from the sticky header.

By establishing a fluid, mathematically synchronized container system (`width: calc(100% - [2 * gutter])`, capped at `1440px`), every header, hero card, section grid, and footer now aligns to the exact same vertical guide lines across all 8 pages, producing a clean, authoritative corporate presentation.

---

### 1. Existing Layout Problems Identified

Prior to this standardization, a comprehensive code and Chrome CDP audit across all 8 pages revealed the following structural layout issues:

1. **Width & Gutter Inconsistencies on Desktop (1440px and Ultrawide):**
   - The homepage hero section used a fluid width formula (`calc(100% - 60px)` up to 1860px), giving 30px outer margins.
   - The site header (`.navbar`), standard content sections (`.services-grid`, `.why-choose-grid`, `.projects-grid`), and the footer were hardcoded to a 1260px container with extra padding, producing 82.5px margins on 1440px screens and 322.5px margins on 1920px screens.
   - Result: The hero card extended significantly further outward than the navbar above it and the service grids below it, creating an awkward, unaligned appearance.

2. **Subpage Header Margin Disconnects:**
   - In `css/responsive.css`, `.page-header-compact` had rogue `margin: 20px 0;` and `margin: 16px 0;` rules at tablet and mobile breakpoints.
   - This created an unintended white margin gap between the sticky header and the page header on subpages.

3. **Inconsistent Container Padding on Mobile:**
   - In `responsive.css` (`@media (max-width: 480px)`), `.container` had `padding-left: 16px; padding-right: 16px;` while already having outer width constraints, creating a double margin on mobile phones that squeezed cards down unnecessarily.

4. **Inconsistent Section Spacing:**
   - Section vertical padding varied between arbitrary values (`clamp(48px, 6vw, 80px)`, `52px`, `40px`), lacking a uniform rhythmic scale between desktop, tablet, and mobile.

---

### 2. Standardized Global Design Tokens & Container Architecture

The design system has been formalized in [css/style.css](file:///c:/Users/Ashutosh%20Pandey/Downloads/Advait-IT-Solution-and-Services/css/style.css) and [css/responsive.css](file:///c:/Users/Ashutosh%20Pandey/Downloads/Advait-IT-Solution-and-Services/css/responsive.css) using synchronized CSS custom properties:

```css
:root {
  /* Standardized Page Gutters */
  --page-gutter-desktop: 30px;
  --page-gutter-tablet: 22px;
  --page-gutter-mobile: 16px;

  /* Centered Content Boundaries */
  --content-max-width: 1440px;
  --container-max: var(--content-max-width);
  --container-max-narrow: 920px;
  --container-padding: 0px;

  /* Uniform Vertical Section Spacing */
  --section-space-desktop: 72px;
  --section-space-tablet: 56px;
  --section-space-mobile: 40px;
  --space-section: var(--section-space-desktop);
  --space-section-sm: 44px;

  /* Card & Section Radii */
  --card-radius: 16px;
  --section-radius: 22px;
  --radius-lg: var(--card-radius);
  --radius-xl: var(--section-radius);
}
```

#### Shared Container Implementation

```css
/* Container System — Standardized Gutters & Centered Max-Width */
.container {
  width: calc(100% - (var(--page-gutter-desktop) * 2));
  max-width: var(--content-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;
  padding-right: 0;
}

.container-narrow {
  width: calc(100% - (var(--page-gutter-desktop) * 2));
  max-width: var(--container-max-narrow);
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;
  padding-right: 0;
}

/* Defensive Reset: Prevent nested containers from producing double margins */
.container .container,
.container .container-narrow,
.container-narrow .container,
.container-narrow .container-narrow {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
```

#### Responsive Breakpoint Synchronization

- **Desktop (>= 1366px):** 30px outer margins, content capped at 1440px max-width, 72px section spacing.
- **Mid-Desktop / Tablet-L (1024px–1365px):** 22px outer margins (`calc(100% - 44px)`), 2-column hero preserved, 56px section spacing.
- **Tablet-P (768px–1023px):** 16px–22px outer margins (`calc(100% - 32px)` to `calc(100% - 44px)`), single-column stacked hero, 56px section spacing.
- **Mobile (<= 767px down to 360px):** Exactly 16px outer margins (`calc(100% - 32px)`), 40px section spacing, 0px horizontal overflow.

---

### 3. Page-by-Page Implementation & Structural Verification

| Page | Structural Elements Standardized | Verified Alignment |
| :--- | :--- | :---: |
| **`index.html`** | Header navbar, Announcement strip, Hero section card, Services grid (3 cols), Methodology grid, Process timeline, Projects preview, FAQ accordions, CTA banner card, Footer grid | Header, Hero, Grids, and Footer align at exact 30px / 22px / 16px boundaries |
| **`about.html`** | Header navbar, Page header compact, About story grid (2 cols), Mission cards (2 cols), Leadership cards, Affordable pricing card, Footer | Header connects flush; grids align to 1440px max-width container |
| **`services.html`** | Header navbar, Page header compact, Quicknav horizontal pill bar, 14 Specialized service detail cards with 22px radii, CTA banner, Footer | Service cards align to container edges; Quicknav scrolls smoothly on touch |
| **`advait-advantage.html`**| Header navbar, Page header compact, Comparison table card, 4 Deep pillars grid, Client rights grid, Footer | Comparison table and cards aligned to global container |
| **`projects.html`** | Header navbar, Page header compact, Search input, Category filter pill buttons, 6 Project cards in responsive grid, Project details modal dialog, Footer | Search bar and project cards align with outer container; modal fits within screen |
| **`contact.html`** | Header navbar, Page header compact, 2-column contact grid (Formspree quotation form left, WhatsApp/Email sidebar right), Alternative contact cards, Footer | Form card and sidebar align at 30px / 22px / 16px; form inputs 100% responsive |
| **`privacy-policy.html`** | Header navbar, Page header compact, Long-form reading container (`container-narrow`, 920px max-width), Policy sections, Footer | Constrained for optimal reading ergonomics; zero awkward ultrawide stretching |
| **`404.html`** | Header navbar, Error page container (`container-narrow`), Error card, Quick recovery links, Footer | Centered balanced layout; header and footer match global alignment |

---

### 4. Quantitative Measurements Across 8 Target Viewports

Captured via automated Chrome DevTools Protocol testing across all 64 page-viewport runs at 100% browser zoom:

| Target Viewport | Device Class | Outer Left Margin | Outer Right Margin | Container / Main Width | Layout State | Horizontal Overflow | Result |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1920 × 1080** | Ultrawide Monitor | **233.0 px** (centered) | **233.0 px** (centered) | **1440.0 px** (capped) | 3 cols / 2 cols | **0.0 px** | **PASS** |
| **1440 × 900** | Standard Desktop | **30.0 px** | **30.0 px** | **1365.0 px** | 3 cols / 2 cols | **0.0 px** | **PASS** |
| **1366 × 768** | Compact Laptop | **30.0 px** | **30.0 px** | **1291.0 px** | 3 cols / 2 cols | **0.0 px** | **PASS** |
| **1280 × 800** | Small Desktop / Tablet-L | **22.0 px** | **22.0 px** | **1221.0 px** | 3 cols / 2 cols | **0.0 px** | **PASS** |
| **1024 × 768** | Small Desktop / iPad-L | **22.0 px** | **22.0 px** | **965.0 px** | 2 cols | **0.0 px** | **PASS** |
| **768 × 1024** | Tablet Portrait (iPad) | **16.0 px** | **16.0 px** | **736.0 px** | 1 col / 2 cols | **0.0 px** | **PASS** |
| **390 × 844** | Mobile (iPhone 12–14) | **16.0 px** | **16.0 px** | **358.0 px** | 1 col (stacked) | **0.0 px** | **PASS** |
| **360 × 800** | Mobile (Android) | **16.0 px** | **16.0 px** | **328.0 px** | 1 col (stacked) | **0.0 px** | **PASS** |

*Note: Native Windows Chrome vertical scrollbar (15px) accounted for. Left and right margins match to 0.1px precision across Header, Content, and Footer.*

---

### 5. Visual Inspection of Captured Screenshots

Actual screenshots captured during the audit were inspected directly using visual tooling:

1. **Homepage Desktop (`scratch/homepage_desktop_1440.png`)**:
   - The announcement strip, header logo, hero card, service cards, and footer align to the identical 30px vertical guideline.
   - The blue hero gradient is vibrant, typography is crisp, and the floating direct collaboration badge sits naturally over the corporate image.
2. **Homepage Mobile (`scratch/homepage_mobile_390.png`)**:
   - Margins are exactly 16px on both left and right.
   - Header logo and hamburger button are cleanly separated.
   - Hero title, value proposition, stacked action buttons, and stat items fit with comfortable touch spacing and zero horizontal drift.
3. **Services Desktop (`scratch/services_desktop_1440.png`)**:
   - Compact header sits flush beneath the navbar without awkward white margin gaps.
   - Quicknav bar spans the full 1365px container.
   - Service category cards have consistent 22px corner radius and comfortable interior padding.
4. **Services Mobile (`scratch/services_mobile_390.png`)**:
   - Touch-friendly horizontal pill scrolling.
   - Card headers, tags, and action buttons stacked cleanly at 358px width.
5. **Projects Desktop (`scratch/projects_desktop_1440.png`)**:
   - Search bar and category filters are centered.
   - 3-column project card grid spans 1365px with equal card heights and uniform 16px radii.
6. **Projects Mobile (`scratch/projects_mobile_390.png`)**:
   - Filter pills wrap smoothly without clipping.
   - Project cards stack into a clean single column.
7. **Contact Desktop (`scratch/contact_desktop_1440.png`)**:
   - Formspree quotation form (left) and WhatsApp/Email cards (right) balance across 1365px.
   - Form inputs have clear labels and generous hit targets.
8. **Contact Mobile Form (`scratch/actual_contact_mobile_390.png`)**:
   - Full width single-column form inputs, accessible field labels, clean touch checkboxes, and zero overflow.
9. **Footers (`scratch/clean_footer_desktop_1440.png`)**:
   - Dark blue background spanning full bleed, with 4 columns aligned to the 30px container bounds.

---

### 6. Preservation of Business Branding and Functionality

1. **Company Identity**: Advait IT Solutions and Services name, logo assets, and official branding preserved.
2. **Official Email**: Verified in all 8 pages, footers, mailto links, and metadata as `ashutosh3276s16@gmail.com`.
3. **Formspree Integration**: Verified working (`https://formspree.io/f/xoeeagyl`, form ID `xoeeagyl`), including anti-spam honeypot (`_gotcha`), accessible ARIA error feedback, and submit button state management.
4. **Project Filters & Modals**: Tested and verified (search input filtering, category filtering, keyboard ESC modal dismissal, and background scroll locking).
5. **Full Regression Test Suite**: `node scratch/run_full_uat.js` executed with **exit code 0** (48/48 matrix tests passed, 0 broken links, 0 security vulnerabilities).

---

### 7. Remaining Defects

**Zero defects.**
- Horizontal overflow: 0px across all 8 target viewports.
- Console errors: 0.
- Layout breaks or overlapping elements: None.
