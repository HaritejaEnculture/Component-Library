```markdown
# En AI Governance & Compliance Mandates

### 1. Focus & Accessibility
*Source: EnFocus / Accessibility [cite: 101]*
* **Focus Ring Color:** `{Brand.Primary.300}`.
* **Focus Ring Width:** `2px`.
* **Focus Ring Offset:** `2px`.
* **Constraint:** All interactive elements must render this ring on `:focus-visible`.

### 2. State Contract (Interactive Elements)
*Source: State semantics (critical) [cite: 123, 124]*
* **Disabled State:**
    * **Surface:** `{System.EnThemeGray.200}`.
    * **Text:** `{System.EnThemeGray.400}`.
    * **Border:** `{System.EnThemeGray.300}`.
* **Hover State:**
    * **Primary Surface:** `{Brand.Primary.800}`.
    * **Text:** `{Text.OnPrimary}` (White).
* **Text Semantics:**
    * **Placeholder:** `{System.EnThemeGray.500}`[cite: 126].
    * **Helper:** `{Content.Text.Muted}`[cite: 126].

### 3. Z-Index Layering
*Source: EnZ-Index / Layers [cite: 115]*
* **Base:** `0`
* **Dropdown:** `1000`
* **Sticky:** `1020`
* **Modal:** `1300`
* **Tooltip:** `1500`
* **Toast:** `1600`


## AI & Automation Governance

### Rule: Design System as Single Source of Truth

All AI-assisted tools (including but not limited to Antigravity, Cursor, GitHub Copilot, Gemini, and code generators) MUST follow the Enculture Design System as the single source of truth.

### Mandatory Constraints

1. AI tools are FORBIDDEN from using Shadcn components directly in product code.
2. AI tools MUST reference Enculture Design System components (e.g., EncButton, EncCard, EncToast).
3. Shadcn is an implementation library only and may be used internally within Enculture components.
4. If a required component, variant, or state is missing in the Design System:
   - The AI MUST flag it as **"Missing from Design System"**
   - The AI MUST NOT invent UI structure, styles, or variants.
5. All visual properties (color, spacing, radius, shadow, typography) MUST use Enculture design tokens.
6. Primary actions MUST always use Enculture Primary Brand (Purple) tokens.
7. Any AI-generated output that violates Design System rules is considered **non-compliant** and must be refactored before merge.

### Enforcement

- Design System compliance is mandatory for all AI-generated UI and code.
- Non-compliant outputs must be rejected during design review or pull request review.


## Output Rules (Design System & AI Governance)

These rules define where outputs are allowed to be written, which files are governed assets, and when changes must be manual.

These rules apply to:
- Developers
- AI tools (Antigravity, Cursor, etc.)
- Vibe coding workflows

---

### Governed Assets

The following files are GOVERNED and must not be modified casually:

- enculture.css (Design System runtime bundle)
- En-AI_Design_System.md
- EN-AI_Components_Molecules.md
- Governance logic rules.md

Any change to these files must follow the rules below.

---

### enculture.css Update Rules

enculture.css may be updated ONLY if ALL conditions are met:

- The change is reusable across multiple pages
- The change is not page-specific
- The change does not alter layout structure
- The change does not introduce !important
- The change aligns with existing Design System rules

If any condition is not met:
→ enculture.css MUST NOT be updated.

---

### Manual / Product-Level Changes

Changes MUST be handled manually at the product or page level if they involve:

- Page-specific layout
- Feature-specific styling
- Sidebar structure or navigation logic
- Tables, charts, dashboards
- One-off visual tweaks
- Legacy layout constraints

Such changes MUST NOT be pushed into enculture.css.

---

### Output Folder Rule

For Design System adoption experiments:

- All modified outputs must be written inside:
  `/ds-adopted-version/`
- Original source files must remain untouched
- The folder exists only for comparison and validation

---

### DS Gap Logging Rule

Design System gaps must be documented before any DS update.

- Gaps must be logged in:
  `ds-gap-log.md`
- Logging is observation-only
- No fixes or solutions are allowed during logging
- Repeated gaps may be evaluated for DS inclusion

No Design System update is allowed unless the gap is logged.

---

### Decision Protocol (Mandatory)

Before making any change, the following decision must be stated explicitly:

- OPTION A: Update enculture.css (Governed DS change)
- OPTION B: Manual / Product-level change (No DS update)

If there is any doubt, OPTION B must be chosen.

---

## Dashboard Pastel Color Governance

PURPOSE
Dashboard pastel colors are introduced to support data visualization,
analytics, and reporting use cases where volume, density, and comparison
need to be communicated without semantic judgment.

SOURCE OF TRUTH
Dashboard pastel colors originate from a Figma-exported palette that was
historically used in dashboards and is now formally adopted into the
Enculture Design System.

SCOPE
Dashboard pastel colors are allowed ONLY in:
- Dashboards
- Analytics views
- Reports
- Data visualization components (charts, graphs, heatmaps)

NON-SEMANTIC RULE
Dashboard pastel colors MUST NOT be interpreted as:
- Success
- Error
- Warning
- Info

Semantic meaning MUST always use Enculture System colors.

STRICT PROHIBITIONS
Dashboard pastel colors MUST NOT be used for:
- Buttons
- Forms
- Alerts
- Navigation
- Text content
- Status indicators
- Validation or error messaging

ARCHITECTURAL RULE
Dashboard pastel colors are a FIRST-CLASS but SEPARATE layer
within the Enculture Design System.

They MUST NOT be:
- Merged into core System colors
- Renamed as semantic colors
- Auto-mapped to success or error states

CHANGE CONTROL
Any modification to dashboard pastel colors requires:
- Design System review
- Explicit documentation update
- No silent replacement of hex values

ENFORCEMENT
If a dashboard requires semantic meaning, it MUST layer:
- Pastel colors for data volume
- System semantic colors for meaning


### Final Principle

enculture.css is a STABILITY LAYER, not a feature layer.

If a change is not boring, reusable, and safe,
it does not belong in the Design System.





