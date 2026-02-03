# En AI Design System & Governance

**Status:** Active Source of Truth
**Directives for AI:**
1.  **Strict Token Usage:** You are FORBIDDEN from using arbitrary values. You MUST round to the nearest token defined below.
2.  **Brand Enforcer:** The Primary Brand Color is **PURPLE** (`#a246f0`). Do NOT use Teal for primary actions.
3.  **Compliance Check:** Verify code against "Compliance Mandates" before outputting.

---

## 1. CSS Variables (The Atoms)

```css
:root {
  /* ---------------- BRAND COLORS (PURPLE) ---------------- */
  /* Primary Action / Brand */
  /* derived from EnSecondry/Purple/500(p) and Page Background */
  --en-primary-brand-50: #faf5ff;  /* Page Background */
  --en-primary-brand-100: #f3e8ff; /* Lightest Tint */
  --en-primary-brand-500: #a246f0; /* MAIN BRAND COLOR */
  --en-primary-brand-700: #7e22ce; /* Hover State */

  /* ---------------- SECONDARY COLORS (TEAL) ---------------- */
  /* Used for Accents or Specific Data States */
  --en-teal-50: #e9f3f3;
  --en-teal-100: #cce4e4;
  --en-teal-200: #a0cece;
  --en-teal-500: #308282; 
  --en-teal-700: #1a5050;

  /* ---------------- NEUTRALS (GREY SCALE) ---------------- */
  --en-grey-0: #ffffff;    /* Surface / Card Bg */
  --en-grey-10: #fcfcfd;
  --en-grey-20: #f8fafb;   /* Alt Background */
  --en-grey-100: #f0f4f5;
  --en-grey-200: #d5dbde;  /* Borders */
  --en-grey-300: #a1a6a8;  /* Disabled Text */
  --en-grey-400: #73787a;
  --en-grey-500: #505355;
  --en-grey-600: #383b3c;
  --en-grey-700: #2b2d2e;
  --en-grey-800: #18191a;  /* Primary Text */
  --en-grey-1000: #000000;

  /* ---------------- SEMANTIC STATES ---------------- */
  --en-success-500: #0fa251;
  --en-success-100: #e5fff1;
  --en-error-500: #c0334d;  /* Critical State */
  --en-error-100: #ffdbe2;
  --en-info-100: #e5f2ff;
  
  /* Sentiment/eNPS Specific */
  --en-sentiment-positive: #38b784; /* Promoters */
  --en-sentiment-neutral: #ffc624;  /* Passives */
  --en-sentiment-negative: #ec407a; /* Detractors */

  /* Pastels (Charts) */
  --en-pastel-green-500: #5fcb9b;
  --en-pastel-yellow-200: #fff4bc;
  --en-pastel-pink-500: #f06292;

  /* ---------------- SPACING ---------------- */
  --en-space-2xs: 2px;
  --en-space-xs: 4px;
  --en-space-sm: 8px;   
  --en-space-md: 16px;  
  --en-space-lg: 24px;  
  --en-space-xl: 32px;
  --en-space-2xl: 48px; 

  /* ---------------- RADIUS ---------------- */
  --en-radius-sm: 4px;   
  --en-radius-md: 8px;   
  --en-radius-lg: 16px;  
  --en-radius-full: 9999px;

  /* ---------------- SHADOWS ---------------- */
  --en-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --en-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --en-shadow-ceo: 0 12px 32px 0 rgba(124, 58, 237, 0.08); /* Purple tinted shadow */


## Shadow Tokens — Neutral & Brand (Canonical)

The Enculture Design System MUST define a complete and ordered shadow scale
to represent elevation, focus, and emphasis consistently across all products.

Shadows are divided into **Neutral Shadows** (structure) and **Brand Shadows**
(emphasis). These roles MUST NOT be mixed.

---

### 1. Neutral Shadow Scale (Structural Elevation)

Neutral shadows define **depth, hierarchy, and surface separation**.

They are used for:
- Cards
- Panels
- Containers
- Structural layering

Required neutral shadow levels (ordered, min → max):

- Shadow / Neutral / xs
- Shadow / Neutral / sm
- Shadow / Neutral / md
- Shadow / Neutral / lg
- Shadow / Neutral / xl

Rules:
- Neutral shadows MUST be visually progressive
- Only ONE neutral shadow level may be applied per surface
- Neutral shadows MUST NOT imply focus or interactivity
- Neutral shadows are the default for all elevated surfaces

---

### 2. Brand Shadow Scale (Emphasis & Focus)

Brand shadows are used to communicate **active focus, priority, or emphasis**.

They are NOT structural.

Allowed usage:
- Active or focused surfaces
- Primary callouts
- Key interaction emphasis

Required brand shadow levels:

- Shadow / Brand / sm
- Shadow / Brand / md
- Shadow / Brand / lg

Rules:
- Brand shadows MUST ONLY be applied in addition to a neutral shadow
- Brand shadows MUST NOT be used alone
- Only ONE brand-shadowed surface may exist per view
- Brand shadows MUST use Enculture brand color tokens only
- Brand shadows MUST feel soft and controlled (no harsh glow)

---

### 3. Prohibited Usage

The following are non-compliant:
- Raw `box-shadow` values
- Inline shadow definitions
- Context-specific shadow variants
- Using brand shadows for layout hierarchy
- Multiple emphasized (brand-shadowed) surfaces in the same view

---

### 4. Tooling & AI Enforcement

AI-assisted tools (including Cursor) MUST:
- Replace raw shadow values with DS shadow tokens
- Prefer neutral shadows by default
- Apply brand shadows only where explicitly allowed
- Treat undefined shadow usage as a Design System violation

---

## END OF SHADOW TOKEN RULESET


  /* ---------------- TYPOGRAPHY ---------------- */
  --font-primary: 'Poppins', sans-serif;
  --font-secondary: 'Mulish', sans-serif;
  
  --text-h2: 48px;
  --text-h3: 32px;
  --text-h4: 20px;
  --text-headline: 18px;
  --text-body: 16px;
  --text-sm: 14px;
  --text-caption: 12px;
}

## Grayscale Theme (System Neutral Colors)

Enculture uses a governed grayscale theme for non-sentiment, non-brand UI elements.
Grayscale tokens are used for structure, hierarchy, and states — never for sentiment.

---

### Grayscale Token Scale

| Token | Usage |
|------|------|
| System.EnThemeGray.50  | Background surfaces |
| System.EnThemeGray.100 | Subtle backgrounds |
| System.EnThemeGray.200 | Disabled surfaces |
| System.EnThemeGray.300 | Borders / dividers |
| System.EnThemeGray.400 | Disabled text |
| System.EnThemeGray.500 | Placeholder text |
| System.EnThemeGray.600 | Secondary text |
| System.EnThemeGray.700 | Primary text |
| System.EnThemeGray.800 | Headings |
| System.EnThemeGray.900 | High-emphasis text |

---

### Rules

- Grayscale must NEVER convey sentiment.
- Grayscale must NEVER replace brand or sentiment colors.
- Grayscale is the default for:
  - Borders
  - Dividers
  - Disabled states
  - Non-sentiment charts
  - Structural UI elements


## Design System Gap Register

The following components were identified from Vibe-coded UI and formalized into the Design System to prevent future drift.

| Component | Status | Action |
|---------|------|--------|
| EncStepper | Missing | To be added as DS component |
| EncCard (Glass Variant) | Missing | To be added as DS variant |
| EncToast | Missing | To be added with severity states |

No component may be implemented in product code unless it exists in the Design System.

Detailed specifications for newly added or pending components are maintained in EN-AI_Components_Molecules.md.


## Icon System Governance

Enculture uses a governed icon system.

The Design System defines icon usage rules, semantics, sizing, and color behavior.
The Design System does NOT store raw SVG assets.

Raw SVGs are owned by engineering and/or approved icon libraries.


---


### Approved Icon Sources



- Lucide Icons (default and preferred)
- Custom Enculture Icons (only when a required icon is not available in Lucide)

All custom Enculture icons must:
- Match Lucide’s stroke-based visual style
- Follow Enculture icon size tokens
- Inherit color using `currentColor`
- Comply with Enculture accessibility and usage rules


---

### Icon Sizes

Icons must use only the following tokenized sizes:

| Token | Size | Usage |
|------|------|------|
| Icon.Sm | 16px | Inline text, compact UI |
| Icon.Md | 20px | Default actions, lists |
| Icon.Lg | 24px | Primary actions, headers |
| Icon.Xl | 32px | Illustrative or empty states |

Icons must not be arbitrarily resized.

---

### Icon Color Rules

- Icons must inherit `currentColor` by default.
- Icons follow the color of their parent component.
- Disabled icons use `{System.EnThemeGray.400}`.
- Destructive icons use `{Semantic.Error}`.
- Icons must never introduce new colors.
- Icons must not override Design System color tokens.

---

### Icon Usage Semantics

- Icons may be used as:
  - Action affordances (buttons, menus)
  - Visual indicators (status, alerts)
- Icons must not be the sole method of conveying meaning.
- Icon-only actions must always include accessible labels.
- Icons do not define state or sentiment by themselves.

---

### AI & Automation Rules (Icons)

- AI tools must not inline or generate raw SVG markup.
- AI tools must reference approved icon sources only.
- AI tools must respect Enculture icon size and color rules.
- Any icon usage violating these rules is non-compliant.


## Data Visualization & Chart Color Governance

Enculture dashboards use multiple color models depending on the type of insight being communicated.
Chart colors are NOT decorative and must follow governed logic.

---

### Chart Color Model Selection (MANDATORY)

Every chart MUST explicitly declare one of the following color models:

1. Sentiment Heatmap (3-Step)
2. Sentiment Heatmap (6-Tier)
3. Sequential / Categorical Swatches

Mixing models within a single chart is NOT allowed.

---

## 1. Sentiment Heatmap – 3-Step (NPS / High-Level Health)

### Usage
Use this model ONLY when representing:
- NPS / eNPS
- Overall sentiment
- Health or risk classification
- Executive summary metrics

### Color Mapping
- Positive / Promoter → `{Sentiment.Positive}`
- Neutral / Passive → `{Sentiment.Neutral}`
- Negative / Detractor → `{Sentiment.Negative}`

### Rules
- Exactly 3 colors only
- Color meaning must be explained via legend or labels
- Must not be used for granular comparisons

---

## 2. Sentiment Heatmap – 6-Tier (Semantic Definition)

The 6-tier sentiment heatmap represents graduated sentiment intensity.
Each tier has an explicit semantic meaning and must be used consistently.

| Tier | Meaning | Token |
|-----|--------|------|
| T1 | Very Positive | --en-pastel-green-500 |
| T2 | Positive | --en-pastel-green-300 |
| T3 | Slightly Positive / Neutral | --en-pastel-yellow-300 |
| T4 | Slightly Negative | --en-pastel-yellow-500 |
| T5 | Negative | --en-pastel-pink-300 |
| T6 | Very Negative | --en-pastel-pink-500 |

---

### Rules

- All 6 tiers are available for use.
- Charts may render a subset of tiers depending on data.
- Missing tiers must be rendered as “N/A” using neutral surfaces.
- Tier meaning must not be redefined per chart.


---

## 3. Sequential / Categorical Swatches (Non-Sentiment Data)

### Usage
Use this model when:
- Data has NO sentiment meaning
- Showing categories, time series, or comparisons
- Color order is positional, not emotional

Examples:
- Monthly trends
- Survey participation by group
- Feature usage over time

### Rules
- Colors must be selected from approved neutral or brand-adjacent swatches
- Colors must not imply sentiment
- Order must remain consistent across dashboards
- Maximum distinct colors: 6

---

## ❌ Forbidden Chart Practices

- Mixing sentiment heatmaps with categorical swatches in the same chart
- Using Red/Green for non-sentiment data
- Using chart colors as the sole indicator of meaning
- Introducing arbitrary or non-token colors
- Using heatmaps without a legend

---

## AI & Automation Rules (Charts)

- AI tools MUST select the chart color model explicitly before applying colors
- AI tools MUST use Enculture chart tokens only
- AI tools MUST NOT invent new heatmap scales
- Charts violating these rules are non-compliant


### Heatmap Text Contrast Rules (MANDATORY)

All heatmap cells MUST apply text color based on background luminance to maintain readability and accessibility.

Text color selection is NOT discretionary and must follow the rules below.

---

#### Contrast Logic

| Heatmap Background Type | Text Color Token |
|------------------------|------------------|
| Dark / Saturated (Green 500, Pink 500, Error 500) | `{Text.OnPrimary}` |
| Medium (Green 300, Yellow 500) | `{Text.Primary}` |
| Light (Yellow 300, Yellow 200, Neutral Surfaces) | `{Text.Secondary}` |

---

#### Rules

- Heatmap text must NEVER use raw colors.
- Text color must be determined AFTER heatmap tier selection.
- Text contrast must meet WCAG AA minimum contrast requirements.
- Icons or labels inside heatmap cells must follow the same contrast logic.
- “Missing” or “No Data” states must always use `{Text.Muted}` on `{Surface.Subtle}`.

---

#### Forbidden Practices

- Using a single text color across all heatmap tiers
- Manually overriding text color per chart
- Using white text on light pastel tiers
- Using dark text on high-saturation tiers

---

#### AI & Automation Rules (Heatmap Text)

- AI tools MUST compute text contrast based on the selected heatmap tier.
- AI tools MUST flag a Design System violation if contrast rules cannot be satisfied.


## Adopted Components (Derived from Vibe Output)

The following components are formalized based on approved Vibe-coded HTML output.
These components are now governed by the Enculture Design System and must be reused consistently.

All adopted components:
- Follow global token usage rules
- Follow icon, color, and chart governance
- Must not introduce feature-specific styling


/* Pastel Heatmap Scale – Extended */

--en-pastel-green-300: #A7F3D0;
--en-pastel-green-500: #34D399;

--en-pastel-yellow-300: #FDE68A;
--en-pastel-yellow-500: #F59E0B;

--en-pastel-pink-300: #F9A8D4;
--en-pastel-pink-500: #EC4899;

## Density Modes

Enculture supports multiple UI density modes to balance readability and information density.
Density modes allow the same components to adapt to different usage contexts without creating duplicate components.

The Design System defines density through tokens, not component variants.

---

### Supported Density Modes

- Comfortable (Default)
- Compact (Shadcn-aligned)

---

### What Density Controls

Density mode affects:
- Control heights
- Spacing (padding, gaps)
- Border radius
- Typography scale (where applicable)

Components MUST reference density tokens and MUST NOT hardcode size values.

---

### Density Token Mapping

#### Comfortable (Default)

- --en-density-control-height: 48px
- --en-density-space-sm: 12px
- --en-density-space-md: 16px
- --en-density-space-lg: 24px
- --en-density-radius: 8px

#### Compact (Shadcn-aligned)

- --en-density-compact-control-height: 40px
- --en-density-compact-space-sm: 8px
- --en-density-compact-space-md: 12px
- --en-density-compact-space-lg: 16px
- --en-density-compact-radius: 6px

---

### Component Usage Rule

All Enculture components must use density tokens for:
- Height
- Padding
- Spacing
- Border radius

Components must not introduce size-specific variants such as “CompactButton” or “DenseInput”.

Density switching is achieved by overriding density tokens at the layout or container level.



# Design System Gap Resolution — Structural Primitives (Canonical)

Purpose  
This section formalizes missing or implicitly used **structural primitives**
within the Enculture Design System.

These primitives already exist conceptually across products but were not
explicitly defined or enforced, leading to ad-hoc layout construction
(using utility classes) during implementation.

This section does NOT introduce context-specific components.
It strengthens the core Design System so it can be reused safely
across all products and workflows.

---

## 1. Header (Structural Primitive)

Component: Header

Purpose:
- Represents the primary top-level structural container
- Hosts context, navigation, and high-level actions

Rules:
- Header is a structural container, not a screen-specific component
- Uses Enculture DS surface tokens only
- Must not encode workflow or business logic
- Must not be assembled using raw utility classes once defined in DS
- Z-layer: above main content, below modals

Usage Notes:
- Any product requiring a persistent top container MUST use Header
- Context-specific naming (e.g., Admin Header, Survey Header) is forbidden

---

## 2. Sidebar (Structural Primitive)

Component: Sidebar

Purpose:
- Represents secondary structural containers adjacent to main content

Variants:
- Left
- Right

Rules:
- Sidebar may host navigation, structure, or inspector content
- Sidebar scrolls independently from main content
- Sidebar uses Enculture DS surface and border tokens only
- Sidebar MUST NOT be implemented using Card

Usage Notes:
- Multiple sidebars may exist in a single layout
- Sidebar meaning is defined by content, not component name

---

## 3. Main Container (Structural Primitive)

Component: MainContainer

Purpose:
- Represents the primary working area of an interface

Rules:
- Hosts the main editable or interactive content
- Excludes global navigation and headers
- Scrollable by default
- Must not be assembled using raw utility classes

Usage Notes:
- Any product with a focused working surface MUST use MainContainer
- Prevents layout ambiguity between content and navigation regions

---

## 4. Card (Surface Primitive)

Component: Card

Purpose:
- Represents a bounded surface used to group related content

Rules:
- Card is the only permitted base surface container
- Uses Enculture DS surface, border, elevation, and radius tokens
- Must not encode workflow or state semantics implicitly
- Must not be substituted with generic div containers

Usage Notes:
- Cards may be used inside MainContainer or Sidebar
- Visual treatment may vary, semantic role does not

---

## 5. Selectable Row (Pattern)

Pattern: Selectable Row

Purpose:
- Represents an ordered, selectable entity within a list

Rules:
- Supports hover, active, and selected states
- Is not a table row
- Is not a button
- Must follow DS interaction and density rules

Usage Notes:
- Used for lists of pages, sections, items, or entities
- Pattern may be implemented using existing DS atoms

---

## 6. Action Primitives (Enforcement)

### Icon Button

Component: IconButton

Rules:
- Used for icon-only actions
- Must provide a defined hit area
- Supports disabled and destructive states
- Raw icon-only buttons using utility classes are non-compliant

---

### Toggle

Component: Toggle

Rules:
- Represents binary on/off control
- Single standardized toggle across the platform
- Accessible by default
- No context-specific variants allowed

---

## 7. Supporting Primitives (Enforcement)

The following existing primitives MUST be used where applicable:

- Divider — for content separation
- Tag / Chip — for metadata and labeling
- Avatar — for identity representation

Ad-hoc substitutes are non-compliant.

---

## 8. Token Enforcement

Rules:
- All layouts MUST use Enculture DS tokens exclusively
- Border widths MUST use DS border-width tokens
- Raw pixel values (e.g., 1px, 2px) outside DS tokens are non-compliant

---

## 9. AI / Tooling Enforcement

AI-assisted tools (including Cursor) MUST:

- Prefer Enculture DS structural primitives over utility layouts
- Replace utility-assembled structures with DS primitives when available
- Avoid inventing semantic component names
- Treat deviations from this section as non-compliant output

---

## END OF SECTION




## Design System AI Consumption Contract (DS-GPT)

DS-GPT is an assistant for consuming and implementing the Enculture Design System.

Its role is to help teams USE the existing Design System correctly and consistently
based strictly on the authoritative Design System files.

---

### Mode of Operation

This contract applies ONLY when the assistant is explicitly acting as **DS-GPT**.
It governs AI-assisted consumption of the Design System.

This contract does NOT restrict:
- Design System owners
- System architects
- Governance discussions
- Planned evolution or versioning activities

---

### Authoritative Sources

When acting as DS-GPT, the assistant must rely ONLY on the following files as sources of truth:

- enculture.css
- En-AI_Design_System.md
- EN-AI_Components_Molecules.md
- Governance logic rules.md

No other sources, assumptions, or interpretations are permitted.

---

### Permitted Capabilities

DS-GPT MAY:

- Explain component usage exactly as defined
- Guide token application based on existing definitions
- Explain states, variants, and accessibility requirements
- Provide developer implementation guidance that strictly follows the Design System

All responses must be derived directly from the Design System.
No extrapolation, invention, or reinterpretation is allowed.

---

### Explicitly Forbidden Actions

DS-GPT must NOT:

- Explain how the Design System was created
- Describe design rationale, derivation logic, or historical decisions
- Generate or propose new tokens, foundations, or components
- Propose redesigns or alternative system structures
- Rename, restructure, or reinterpret tokens or components
- Teach how to build a Design System
- Provide governance creation or evolution methodology

---

### Governance Boundary Enforcement

If asked about Design System creation, evolution, or changes, DS-GPT must respond ONLY with:

> "This Design System is governed. Creation and evolution require formal ownership and review."

If a request impacts Design System structure, tokens, components, or governance,
DS-GPT must respond ONLY with:

> "This request impacts Design System governance and must be reviewed by the Design System owner."

No exceptions.

---

### Authority Assumption

The Enculture Design System is assumed to be:

- Production-ready
- Final
- Authoritative

Consistency, accessibility, compliance, and governance
take priority over creativity, optimization, or stylistic preference.

---

### Primary Objective

DS-GPT exists to enable correct, safe, and consistent implementation
of the Enculture Design System without exposing, recreating, reinterpreting,
or evolving the system itself.

### Token Ownership Rule (Enforced)

- Product-level CSS MUST NOT define tokens with raw values (hex, rgba, px).
- All tokens MUST be defined in Enculture Design System.
- Product code may only consume tokens via var(--en-*).
- If a token is missing:
  → Log a DS gap
  → Add token to DS
  → Do NOT improvise in product CSS


## Dashboard & Data Visualization Colors

Enculture includes a dedicated pastel color system
specifically for dashboards, analytics, and reporting.

These colors are NON-SEMANTIC and are used to represent:
- Data volume
- Distribution
- Density
- Comparison

They MUST NOT be used to represent success, error, warning, or info.

### Source
The complete dashboard pastel palette (with hex values) is defined in:

Enculture_Dashboard_Pastels.md

### Usage Rules
- Allowed ONLY in dashboards, analytics, reports, and charts
- Forbidden for UI controls, navigation, forms, alerts, and text
- Semantic meaning MUST use Enculture System colors

### Architectural Note
Dashboard Pastels are a protected, first-class extension
of the Enculture Design System and MUST remain separate
from core System and Semantic color definitions.


Dashboard color rules are defined in Dashboard_Color_Governance.md and are mandatory.





