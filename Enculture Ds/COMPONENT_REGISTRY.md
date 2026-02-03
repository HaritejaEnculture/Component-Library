# Enculture Design System — Component Registry

**Authority:** Single source of truth for all UI components used across the Enculture platform.  
**Sources (read in order; earlier wins on conflict):**  
1. enculture.css  
2. En-AI_Design_System.md  
3. EN-AI_Components_Molecules.md  
4. Existing production code (HTML/React/CSS)

**Rules:** Only components and variants that exist in the governed sources above are listed. No new variants, renames, or merged components. No deprecated or commented-out components.

---

## Atoms

| # | Component Name | Component Type | Purpose | Live Variants | States | Size Variants | Theme / Mode | Accessibility | Where Used | Source Reference |
|---|----------------|----------------|---------|---------------|--------|---------------|--------------|---------------|------------|------------------|
| 1 | **EncDivider** | Atom | Visual separation between sections or groups without creating hierarchy. | Default | — | — | light | No ARIA required; decorative separator | Global: sections, lists, cards | enculture.css `.enc-divider`; EN-AI_Components_Molecules EncDivider |
| 2 | **EncInputField** | Atom | Single approved text/input primitive; applies to `input`, `textarea`, `select` where applicable. | Default (text), Textarea, Select (where applicable) | default, placeholder, disabled | — | light | Placeholder: System.EnThemeGray.500; Disabled: System.EnThemeGray.400; Helper: Content.Text.Muted. Use semantic labels. | Survey Creator, Admin, Forms | enculture.css `.enc-input-field`, `::placeholder`, `:disabled`; EN-AI_Components_Molecules EncInput, EncInputField ADD-ON |
| 3 | **EncTag** | Atom | Compact metadata label for status or categorization. | Default | — | — | light | Use for status/category only; ensure contrast. | Global: lists, filters, badges | enculture.css `.enc-tag`; EN-AI_Components_Molecules EncTag |
| 4 | **EncAvatar** | Atom | Represents a user or entity visually. | Default | — | — | light | Provide alt or aria-label for identity. | User profile, lists, headers | enculture.css `.enc-avatar`; EN-AI_Components_Molecules EncAvatar |
| 5 | **EncToggle** | Atom | Binary on/off form control. | Default | default, checked (unchecked) | — | light | Focusable; keyboard toggle; reflect state to assistive tech. | Settings, filters, preferences | enculture.css `.enc-toggle`; EN-AI_Components_Molecules EncToggle |

---

## Molecules

| # | Component Name | Component Type | Purpose | Live Variants | States | Size Variants | Theme / Mode | Accessibility | Where Used | Source Reference |
|---|----------------|----------------|---------|---------------|--------|---------------|--------------|---------------|------------|------------------|
| 6 | **EncButton** | Molecule | Primary/secondary action button. Semantic hooks: primary = `.enc-action-primary`, secondary = `.enc-action-secondary`. | Primary, Secondary | default, hover, active, focus, disabled | Lg (48px), Sm (40px), Mini (32px) | light | Focus visible; disabled state not focusable; label required. | Survey Creator, Respondent, Dashboards, Admin | enculture.css `.enc-action-primary`, `.enc-action-secondary`; EN-AI_Components_Molecules EncButton |
| 7 | **EncIconButton** | Molecule | Icon-only action button (Lucide). | Default | default, hover, focus, disabled | Icon.Sm, Icon.Md, Icon.Lg (size from DS) | light | **Accessible label required** (aria-label or sr-only). Icon set: Lucide only. | Dashboards (expand, toggle), Sidebar (toggle), Lists | enculture.css `.enc-icon-button`; EN-AI_Components_Molecules EncIconButton, ADD-ON Icon Size Binding |
| 8 | **EncCard** | Molecule | Primary content surface for grouping related information; owns padding, radius, elevation. | Default, Glass Variant (Dashboards, Insights, Highlight Panels) | — | — | light | Card is structural; ensure heading hierarchy if card has title. | Dashboards, Insights, Survey Creator, Admin | enculture.css `.enc-card`; EN-AI_Components_Molecules EncCard, EncCard – Glass Variant |
| 9 | **EncListRow** | Molecule | Selectable or navigable row in lists (pages, sections, questions). | Default | default, hover, selected, disabled | — | light | State visuals DS-owned; support selection intent; keyboard navigable where selectable. | Survey Creator (pages, sections, questions), Admin lists | enculture.css `.enc-list-row`; EN-AI_Components_Molecules EncListRow, ADD-ON State Ownership |
| 10 | **EncToast** | Molecule | Feedback/notification (Shadcn Toast). | Success, Warning, Error, Info | — | — | light | Z-Index 1600; auto-dismiss 4–6s; token-only colors. | Global feedback | EN-AI_Components_Molecules EncToast (no .enc-* in enculture.css) |
| 11 | **EncStepper** | Molecule | Linear progress across multi-step flows (survey creation, onboarding, configuration). | V1 | default, active, completed | — | light | Step indicators; optional step labels; validation at flow level. | Survey Creator, onboarding | EN-AI_Components_Molecules EncStepper (no .enc-* in enculture.css) |
| 12 | **EncDateRangePicker** | Molecule | Start and end date selection. | V1 | default, disabled, error (form-level) | — | light | Use native or Shadcn-backed inputs; validation at form/flow level. | Scheduling, filters | EN-AI_Components_Molecules EncDateRangePicker |
| 13 | **EncTimeInput** | Molecule | Time value capture for scheduling. | V1 | default, disabled, error (form-level) | — | light | Consistent time format; disabled/error per form governance. | Scheduling | EN-AI_Components_Molecules EncTimeInput |
| 14 | **EncEmptyState** | Molecule | Communicates absence of data or configuration; icon + message + optional action. | V1 | — | — | light | Icons per Icon System; do not imply error unless defined. | Lists, dashboards, config | EN-AI_Components_Molecules EncEmptyState |

---

## Organisms

| # | Component Name | Component Type | Purpose | Live Variants | States | Size Variants | Theme / Mode | Accessibility | Where Used | Source Reference |
|---|----------------|----------------|---------|---------------|--------|---------------|--------------|---------------|------------|------------------|
| 15 | **EncHeader** | Organism | Top-level structural container; hosts context, navigation, high-level actions. | Default | — | — | light | Z-layer above main, below modals; no workflow logic. | Survey Builder, Respondent, Admin, Dashboards | enculture.css `.enc-header`; EN-AI_Components_Molecules EncHeader; En-AI_Design_System Header (Structural Primitive) |
| 16 | **EncSidebar** | Organism | Secondary navigation or auxiliary panel container. | Left, Right | collapsed (where implemented in product) | Width scope-driven (e.g. Respondent min 180px) | light | Independent scroll; width from tokens/parent. | Dashboards, Survey Creator, Respondent (.enc-respondent .enc-sidebar) | enculture.css `.enc-sidebar`, `.enc-respondent .enc-sidebar`; EN-AI_Components_Molecules EncSidebar; En-AI_Design_System Sidebar |
| 17 | **EncMainContainer** | Organism | Primary page layout wrapper; arranges header, sidebars, main canvas. | Default | — | — | light | Sole owner of page-level layout; grid/flex inside component only. | All app shells | enculture.css `.enc-main-container`; EN-AI_Components_Molecules EncMainContainer, ADD-ON Layout Ownership |
| 18 | **EncContainer** | Organism | Layout container with max-width and padding/gap. | Sm (720px), Md (960px), Lg (1200px), Xl (1440px) | — | — | light | Padding {Global20}; Gap {Global20}. | Page/section layout | EN-AI_Components_Molecules EncContainer (no .enc-* in enculture.css) |
| 19 | **EncPageHeader** | Organism | Page-level header: title, optional description, actions. | V1 | — | — | light | Title required; actions use EncButton/EncIconButton. | Survey Creator, Admin, Respondent | EN-AI_Components_Molecules EncPageHeader |
| 20 | **EncSection** | Organism | Groups related content; controls vertical rhythm. | V1 | — | — | light | Spacing only; no visual beyond background/spacing tokens. | All flows | EN-AI_Components_Molecules EncSection |
| 21 | **EncSectionHeader** | Organism | Section title, optional helper, optional action slot. | V1 | — | — | light | Must not compete with EncPageHeader hierarchy. | Survey Creator, Admin | EN-AI_Components_Molecules EncSectionHeader |

---

## System

| # | Component Name | Component Type | Purpose | Live Variants | States | Size Variants | Theme / Mode | Accessibility | Where Used | Source Reference |
|---|----------------|----------------|---------|---------------|--------|---------------|--------------|---------------|------------|------------------|
| 22 | **Density (Compact)** | System | Overrides control height, spacing, radius for compact UI. | Comfortable (default), Compact | — | — | light | Set on container (e.g. body, #root); no product-level compact styling. | Optional app-wide or per view | enculture.css `[data-density="compact"]` |
| 23 | **Enc Respondent scope** | System | Respondent-specific constraint; sets sidebar min-width. | — | — | — | light | Apply .enc-respondent to respondent shell. | Survey Respondent | enculture.css `.enc-respondent`, `.enc-respondent .enc-sidebar` |

---

## Typography Scale (Reference — not a component)

| Token | Size | Usage |
|-------|------|--------|
| H1 | 48px (responsive) | — |
| H2 | 48px | — |
| H3 | 32px | — |
| H4 | 20px | — |
| Body Regular | 16px | — |
| Body Medium | 14px | — |
| Body Small / Caption | 12px | — |

**Source:** enculture.css `--en-font-size-*`; EN-AI_Components_Molecules Typography Scale.

---

## Not in Governed Sources

The following are **not** defined in enculture.css or EN-AI_Components_Molecules and are **not** part of this registry:

- `enc-survey-question`, `enc-survey-question-label`, `enc-survey-question-helper`, `enc-survey-cta` — Referenced in Cursor rules for respondent/survey UI but **not found in enculture.css**. Action: DS owner to add if required.
- `enc-text-muted`, `enc-text-error`, `enc-text-success` — Referenced in Cursor rules; **not found in enculture.css**.
- `enc-page`, `enc-section` (structure) — Cursor rules reference `enc-page`, `enc-section` for layout; EncSection exists as organism above; `enc-page` **not** as class in enculture.css.
- `enc-btn`, `enc-btn-primary` — **Forbidden.** Use `enc-action-primary` / `enc-action-secondary` only (README_AI.md, Cursor rules).

---

## Icon System (Governance)

- **Approved source:** Lucide Icons (default and preferred).
- **Sizes:** Icon.Sm (16px), Icon.Md (20px), Icon.Lg (24px), Icon.Xl (32px) — enculture.css `--en-icon-size-*`.
- **Color:** Inherit `currentColor`; disabled {System.EnThemeGray.400}; destructive {Semantic.Error}.
- **EncIconButton:** Must provide accessible label; icon size from DS.

---

*End of Component Registry. Last derived from enculture.css, En-AI_Design_System.md, EN-AI_Components_Molecules.md, and production usage in Dashboards.*
