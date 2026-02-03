# EN AI Component Logic (The Blueprints)

## 1. EncButton
[cite_start]*Source: Button Primitives [cite: 120, 121, 122]*
**Logic:**
* **Height Variants:**
    * `Lg`: `48px`.
    * `Sm`: `40px`.
    * `Mini`: `32px`.
* **Padding:**
    * `Lg`: `{SpaceLg}` (20px).
    * `Sm`: `{SpaceMd}` (16px).
    * `Mini`: `{SpaceSm}` (8px).
* **Radius:**
    * `Default`: `{RadiusMd}` (8px).
    * `Round`: `{RadiusFull}` (9999px).
* **Label:** Line Height must match `{EnText Rhythm.En_Text_LineHeight_Normal}` (1.4).

## 2. EncContainer (Layout)
[cite_start]*Source: EnContainer Layout.Medium [cite: 98, 99]*
**Logic:**
* **Max Widths:**
    * `Sm`: `720px`.
    * `Md`: `960px`.
    * `Lg`: `1200px`.
    * `Xl`: `1440px`.
* **Padding:** `{Global20}` (20px).
* **Gap:** `{Global20}` (20px).

## 3. EncInput (Text State)
[cite_start]*Source: EnTEXT STATE SEMANTICS [cite: 126]*
**Logic:**
* **Placeholder Text:** `{System.EnThemeGray.500}`.
* **Disabled Text:** `{System.EnThemeGray.400}`.
* **Helper Text:** `{Content.Text.Muted}`.

## 4. Typography Scale (Mappings)
[cite_start]*Source: EnFont Premitives.Medium [cite: 88, 89, 90]*
**Logic:**
* **H1:** `{Global64}`.
* **H2:** `{Global48}`.
* **H3:** `{Global40}`.
* **Body Regular:** `{Global16}`.
* **Body Medium:** `{Global14}`.
* **Body Small:** `{Global12}`.

## EncToast

Base: Shadcn Toast  
Category: Feedback / Notification

### Variants
- Success → --en-success-500
- Warning → --en-sentiment-neutral
- Error → --en-error-500
- Info → --en-info-100

### Rules
- Z-Index: 1600
- Auto-dismiss: 4–6 seconds
- Token-only colors
- No custom positioning outside DS rules


### EncCard – Glass Variant

Base: Shadcn Card

Rules:
- Background: rgba derived from --en-grey-0
- Border: --en-grey-200
- Shadow: --en-shadow-ceo
- Radius: --en-radius-lg
- Usage: Dashboards, Insights, Highlight Panels

No custom blur, shadow, or opacity allowed outside tokens.



## EncStepper

Category: Navigation / Progress  
Status: Active (V1 – Derived from Vibe Output)

EncStepper represents linear progress across multi-step flows such as survey creation, onboarding, or configuration journeys.

### Structure (V1)

- Step indicator (number or icon)
- Connector between steps
- Optional step label

### States

- Default
- Active
- Completed

### Visual Rules

- Active Step:
  - Surface: {Brand.Primary.500}
  - Text: {Text.OnPrimary}
- Completed Step:
  - Surface: {Brand.Primary.300}
  - Text: {Text.OnPrimary}
- Inactive Step:
  - Border: {System.EnThemeGray.300}
  - Text: {System.EnThemeGray.500}

### Interaction Rules (V1)

- Steps indicate progress only
- Clicking steps is optional and flow-dependent
- Validation gating is handled at flow level, not component level

### Token Enforcement

- All colors must resolve to Enculture design tokens
- No raw spacing, radius, or color values allowed

EncStepper follows all global Enculture Design System governance rules defined in System Rules and Governance Logic documents.


### Notes

This is a baseline implementation aligned to existing Vibe-coded usage.  
Advanced behaviors (error states, vertical layouts, accessibility extensions) will be added in future revisions.


## Adopted Layout & Scheduling Components

The following components are formalized based on approved Vibe-coded HTML output.
They are now part of the Enculture Design System and inherit all global governance rules
(tokens, icons, accessibility, AI compliance, and Shadcn abstraction).

---

## EncPageHeader

Category: Layout / Header  
Status: Active (V1 – Derived from Vibe Output)

Purpose:
Provides a consistent page-level header with title, optional description, and actions.

Structure:
- Title (required)
- Subtitle / helper text (optional)
- Action slot (optional)

Rules:
- Uses primary typography tokens
- Actions must use EncButton or EncIconButton
- No custom spacing outside layout tokens

---

## EncSection

Category: Layout / Container  
Status: Active (V1)

Purpose:
Groups related content within a page and controls vertical rhythm.

Structure:
- Section container
- Optional EncSectionHeader
- Content slot

Rules:
- Controls spacing only
- No visual styling beyond background and spacing tokens

---

## EncSectionHeader

Category: Layout / Header  
Status: Active (V1)

Purpose:
Introduces a section with title and optional supporting actions.

Structure:
- Section title
- Optional helper text
- Optional action slot

Rules:
- Must not compete with EncPageHeader hierarchy

---

## EncListRow

Category: Data Display  
Status: Active (V1 – Derived from Vibe Output)

Purpose:
Represents a single row of structured information with actions.

Structure:
- Primary label
- Secondary metadata
- Optional status or badge
- Action slot

Rules:
- Rows must align consistently across features
- Actions must use EncIconButton

---

## EncDivider

Category: Utility  
Status: Active (V1)

Purpose:
Visually separates content without creating hierarchy.

Rules:
- Uses border tokens only
- Must not be used as a layout container

---

## EncIconButton

Category: Action  
Status: Active (V1)

Purpose:
Provides an icon-only action button.

Structure:
- Icon only
- Accessible label (required)

Rules:
- Icons follow Icon System Governance
- Sizes must align with Icon.Md or Icon.Lg

---

## EncDateRangePicker

Category: Form / Input  
Status: Active (V1 – Derived from Vibe Output)

Purpose:
Allows users to select a start and end date.

Structure:
- Start date input
- End date input

Rules:
- Uses native or Shadcn-backed inputs
- Validation handled at form or flow level

---

## EncTimeInput

Category: Form / Input  
Status: Active (V1)

Purpose:
Captures time values for scheduling contexts.

Rules:
- Uses consistent time format
- Disabled and error states follow form governance

---

## EncEmptyState

Category: Feedback  
Status: Active (V1)

Purpose:
Communicates absence of data or configuration.

Structure:
- Icon
- Message
- Optional action

Rules:
- Icons follow Icon System Governance
- Must not imply error unless explicitly defined


# Enculture Design System — Structural & Action Components (Canonical)

## EncHeader
**Type:** Structural Container  
**Scope:** Global (Survey Builder, Respondent, Admin)  

**Purpose**
Top-level contextual container that anchors product or flow identity and global actions.

**Responsibilities**
- Owns header-level layout and alignment
- Hosts title, metadata, and header actions
- Does NOT manage navigation state or business logic

**Constraints**
- Layout is component-owned (not CSS utility driven)
- Visual styling uses Enculture DS tokens only

**Semantic Hook**
- `.enc-header`

---

## EncSidebar
**Type:** Structural Container  
**Scope:** Global  

**Purpose**
Secondary navigation or auxiliary panel container.

**Responsibilities**
- Owns vertical stacking and spacing
- Hosts navigation lists, controls, or summaries
- Width constraints may vary by scope (e.g., Respondent vs Builder)

**Constraints**
- Width rules are scope-driven (via tokens or parent context)
- No inline sizing in product code

**Semantic Hook**
- `.enc-sidebar`

---

## EncMainContainer
**Type:** Structural Layout Container  
**Scope:** Global  

**Purpose**
Primary page layout wrapper that arranges header, sidebars, and main canvas.

**Responsibilities**
- Owns multi-column layout logic (e.g., 3-column builder canvas)
- Manages spatial relationship between sidebar(s) and main content

**Constraints**
- Grid/flex logic is component-owned
- Product code MUST NOT define layout utilities

**Semantic Hook**
- `.enc-main-container`

---

## EncCard
**Type:** Surface / Container  
**Scope:** Global  

**Purpose**
Primary content surface for grouping related information.

**Responsibilities**
- Owns padding, radius, elevation
- Supports visual hierarchy (active, inactive, muted via tokens)

**Constraints**
- No layout responsibility beyond internal stacking

**Semantic Hook**
- `.enc-card`

---

## EncListRow
**Type:** Interactive Row  
**Scope:** Global  

**Purpose**
Selectable or navigable row used in lists (pages, sections, questions).

**Responsibilities**
- Displays row content
- Reflects selection, hover, and disabled states
- Emits selection intent (logic handled externally)

**State Model**
- Default
- Hover
- Selected
- Disabled

**Constraints**
- State visuals are DS-owned
- Product code MUST NOT fake states with utility classes

**Semantic Hook**
- `.enc-list-row`

---

## EncDivider
**Type:** Structural Separator  
**Scope:** Global  

**Purpose**
Visual separation between sections or groups.

**Responsibilities**
- Provides consistent visual separation using DS tokens

**Semantic Hook**
- `.enc-divider`

---

## EncIconButton
**Type:** Action Control  
**Scope:** Global  

**Purpose**
Icon-only action button (Lucide-based).

**Responsibilities**
- Wraps a single icon
- Handles hover, focus, disabled states
- Size and padding controlled by DS

**Constraints**
- Icon set: Lucide only
- No text labels

**Semantic Hook**
- `.enc-icon-button`

---

## EncToggle
**Type:** Form Control  
**Scope:** Global  

**Purpose**
Binary on/off input control.

**Responsibilities**
- Reflects checked/unchecked state
- Emits change events

**Semantic Hook**
- `.enc-toggle`

---

## EncTag
**Type:** Metadata Label  
**Scope:** Global  

**Purpose**
Compact label for status or categorization.

**Semantic Hook**
- `.enc-tag`

---

## EncAvatar
**Type:** Identity Element  
**Scope:** Global  

**Purpose**
Represents a user or entity visually.

**Semantic Hook**
- `.enc-avatar`

---
================================================================================
ADD-ON ONLY: Governance Completion Updates (v1.1.x)
File: EN-AI_Components_Molecules.md
Purpose: Close remaining Cursor + DS governance gaps
================================================================================

## EncMainContainer — Layout Ownership Clarification (ADD)

**Additional Constraints**
- EncMainContainer is the **sole owner** of page-level layout
- Grid / flex logic MUST be implemented inside the component
- Product code MUST NOT use:
  - `grid-template-columns`
  - `flex-*` layout utilities
  - column width utilities

**Governance Note**
This rule exists to prevent Tailwind-based layout leakage.

---

## EncListRow — State Ownership Clarification (ADD)

**State Model (Authoritative)**
- Default
- Hover
- Selected
- Disabled

**State Responsibilities**
- Product code may signal intent (e.g., selected, disabled)
- Visual rendering of states is **DS-owned**
- Utility-based state styling is forbidden

**Governance Note**
Cursor may refactor utilities only after this state model exists.

---

## EncIconButton — Icon Size Binding (ADD)

**Icon Governance**
- Icons MUST inherit size from EncIconButton
- Raw icon sizing (CSS or inline) is forbidden

**Approved Icon Size Tokens**
- Icon.Sm
- Icon.Md
- Icon.Lg
- Icon.Xl

**Mapping Responsibility**
- Size → token binding is component-owned
- No `.enc-icon` semantic is required

---

## EncInputField — Textarea Clarification (ADD)

**Clarification**
- EncInputField applies to:
  - `input`
  - `textarea`
  - `select` (where applicable)

**Governance Note**
A separate `EncTextarea` component is **not required** unless behavior diverges.

================================================================================
END ADD-ON
================================================================================


