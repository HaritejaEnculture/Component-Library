# Restore Point — January 30, 2026

## Scope

This restore point captures the project state as of **January 30, 2026** across the main flows: **Respondent flow**, **Survey creation flow**, and **Survey editing flow**. Use it to understand what is implemented and to restore or continue from this state.

---

## 1. Respondent Flow (`respondent flow/enculture survey UI/`)

### Implemented
- **Survey UI**: Page instructions, section grouping, question cards with Active/Completed/Skipped/Disabled states.
- **Question types**: Single select, Multiple select, Open text, Rating, Likert; response types and layout (Vertical/Horizontal) drive display.
- **Comment section**: Optional comment per active question; "Add comment (optional & anonymous)" button; Submit Comment CTA.
- **Design system**: Semantic classes (`enc-action-primary/secondary`, `enc-input-field`, `enc-survey-*`, `enc-section-box`), DS tokens only, no primitives.
- **Layout**: `enc-survey-container-responsive` (DS EncContainer breakpoints); `enc-main-container`; section boxes with brand left border.
- **Existing restore**: See `respondent flow/enculture survey UI/RESTORE_POINT_2026-01-28.md` for earlier respondent-flow details.

### Not done (explicitly stopped)
- Small-screen responsive changes (full-width survey container, reduced padding, small-screen fonts, section width) were **not** applied per user request.

---

## 2. Survey Creation Flow (`survey creation flow/`)

### Implemented
- **Left panel**: Survey structure (pages → sections → questions); `enc-list-row`; clickable page/section items; question labels show type only (e.g. "Single select") with 2-line clamp and hover callout; lighter divider between questions; left sidebar 380px.
- **Center panel**: Bento grid for **Page**, **Section**, and **Question** edit forms; three distinct forms (page, section, question); selection model (selectedPageId, selectedSectionId, selectedQuestionId).
- **Right panel**: Question-scoped **Properties** panel (inline, fixed right column, reduced width, no close icon); multi-select checkboxes in Section edit form for which questions show in Properties; sticky panel.
- **Question form**: Bento tiers (2-col / full-width cards): Title, Response type (radio list), Layout, Pre-defined responses (with score/value and 180px max-width), Rating scale (with score/value), Favorability/Attributes/Labels & Tags placeholders, Edit Logic, Actions.
- **Page form**: Bento layout (title; page ID + instructions; sections in page).
- **Section form**: Bento layout (name/description + instructions; questions in section with 16×16px checkboxes).
- **Page Settings**: Card with "Page Settings" title; "Questions per page : N" with edit icon (18×18px, 32×32px button) in header; popover for "Number of questions per page" (1–50); `surveyData.pagesPerPage` persisted.
- **Dropdowns**: `appearance: none` + custom SVG arrow; `padding-right: 2.5em` (no calc) to fix overlap.
- **Preview**: `preview.html` opens in 900×700 popup; reads `surveyData` from sessionStorage; reflects question type, response type, layout per Architecture Schema.
- **Density**: `data-density="compact"` on body; compact tokens in `enculture.css`.
- **Structure callout**: Fixed-position hover callout for question rows; JS positions from row rect; `.enc-structure-callout-visible`; z-index 1100; sidebar z-index 1050 on hover.

---

## 3. Survey Editing Flow (`survey editing flow/`)

### Implemented
- Same feature set as Survey creation flow: structure panel, bento edit forms (page, section, question), Properties panel (inline, sticky), selection model, Page Settings popover, preview, compact density, structure callout, dropdown and checkbox styling.

---

## 4. Design System (Enculture Ds)

- **Source of truth**: `Enculture Ds/enculture.css`; governed by En-AI_Design_System.md, EN-AI_Components_Molecules.md.
- **Rules**: `.cursor/rules/enculture-semantics.mdc` — use only semantic classes and tokens; no primitives; button semantics `enc-action-primary` / `enc-action-secondary`; input `enc-input-field`; survey `enc-survey-*`.
- **Compact mode**: `[data-density="compact"]` in enculture.css (and local copies) overrides `--control-height`, `--en-space-*`, `--en-radius-md`.

---

## 5. Key Files (reference)

| Area              | Path |
|-------------------|------|
| Respondent UI     | `respondent flow/enculture survey UI/App.tsx`, `index.css` |
| Respondent restore| `respondent flow/enculture survey UI/RESTORE_POINT_2026-01-28.md` |
| Creation flow      | `survey creation flow/index.html`, `index.css`, `app.js` |
| Editing flow       | `survey editing flow/index.html`, `index.css`, `app.js` |
| DS runtime         | `Enculture Ds/enculture.css` |
| Semantics rule     | `.cursor/rules/enculture-semantics.mdc` |

---

## 6. Next Steps (if restoring)

1. **Respondent flow**: Run from `respondent flow/enculture survey UI/`; confirm question types, comments, and navigation.
2. **Creation/Editing flows**: Open `index.html` in each flow; confirm structure panel, bento forms, Properties panel, Page Settings popover, and preview.
3. **Small-screen respondent**: Any future responsive work (full width, padding, fonts, section width) to be done only when requested.

---

## Notes

- Respondent-flow responsive/small-screen changes were **not** applied; user indicated that direction was not relevant and asked to stop.
- Creation and editing flows are kept in sync for structure, bento layout, Properties panel, and Page Settings.
