================================================================================

ENCULTURE — SURVEY CREATOR (EDITOR) RULEBOOK (GOVERNED)

================================================================================



Persona:

Survey Creator / Survey Designer / HR Admin



Scope:

\- Survey creation

\- Survey structure editing

\- Question configuration

\- Page \& section management

\- Pre-publish validation



This rulebook applies ONLY to DESIGN-TIME (EDITOR) flows.

It does NOT apply to Respondent execution.



Violations must be BLOCKED, not patched.



--------------------------------------------------------------------------------

0\. SOURCE OF TRUTH ORDER (MANDATORY)

--------------------------------------------------------------------------------



Rules must be read and applied in this exact order.

If a conflict exists, EARLIER FILE WINS.



1\. enculture.css

&nbsp;  - Runtime semantics only

&nbsp;  - No primitives exposed



2\. En-AI\_Design\_System.md

&nbsp;  - Governance, intent, non-negotiable principles



3\. EN-AI\_Components\_Molecules.md

&nbsp;  - Components that exist

&nbsp;  - If not listed, it DOES NOT EXIST



4\. Survey Creator UX Specifications (this file)

&nbsp;  - Editor-specific behavior rules



--------------------------------------------------------------------------------

1\. SEMANTIC-FIRST DESIGN SYSTEM RULES

--------------------------------------------------------------------------------



Survey Creator UI MUST use Enculture semantic classes only.



ALLOWED (examples):

\- enc-action-primary / enc-action-secondary

\- enc-input-field

\- enc-page, enc-section

\- enc-text-muted / error / success

\- enc-card, enc-dialog (if defined in DS)



FORBIDDEN:

\- enc-btn / enc-input

\- Inline styles

\- Custom utility classes

\- Raw HTML styling

\- Direct Shadcn component usage in product code



--------------------------------------------------------------------------------

2\. NO-PRIMITIVES RULE

--------------------------------------------------------------------------------



The following are FORBIDDEN in Survey Creator product code:



\- Raw spacing values (px, rem)

\- Raw colors (hex, rgba)

\- Raw radius values

\- Raw layout CSS

\- Custom animation definitions

\- One-off visual tweaks



All visual values MUST map to Enculture design tokens.



--------------------------------------------------------------------------------

3\. DESIGN TOKENS (ONLY SOURCE OF VISUAL VALUES)

--------------------------------------------------------------------------------



Only the following token families may be used:



\- --en-\* (brand, neutrals, semantic states)

\- --control-height / radius / padding-x / padding-y

\- --stack-gap-xs / sm / md / lg

\- --page-padding

\- --font-primary

\- --text-\* (typography scale)



Arbitrary values are not allowed.



--------------------------------------------------------------------------------

4\. DENSITY HANDLING

--------------------------------------------------------------------------------



Density is controlled ONLY by:



<body data-density="compact">



Rules:

\- Do NOT manually adjust spacing

\- Do NOT resize components per screen

\- Do NOT add conditional density logic



enculture.css resolves all density behavior.



--------------------------------------------------------------------------------

5\. AI USAGE CONTRACT (SURVEY CREATOR)

--------------------------------------------------------------------------------



AI IS ALLOWED TO:

\- Apply existing Enculture semantic classes

\- Wire data, state, and props

\- Reuse existing editor patterns

\- Refactor logic without touching layout or styles



AI IS FORBIDDEN TO:

\- Invent new components or classes

\- Modify spacing, color, radius, typography

\- Bypass Enculture Design System

\- Use Shadcn components directly in product code

\- Introduce inline or raw CSS



FAILURE MODE:

If a required component or semantic is missing, AI MUST respond:



"Blocked: Required Enculture Design System semantic is missing.

Action required from DS owner."



--------------------------------------------------------------------------------

6\. SURVEY STRUCTURE \& EDITING RULES (CORE)

--------------------------------------------------------------------------------



Survey Creator supports STRUCTURE editing only.

It does NOT simulate respondent behavior.



Allowed operations:

\- Create / edit survey metadata

\- Add, remove, reorder sections

\- Add, remove, reorder questions

\- Configure question properties

\- Configure page-level settings



Disallowed:

\- Respondent preview logic

\- Execution flow logic

\- Auto-unlock behavior

\- Progress simulation



--------------------------------------------------------------------------------

7\. QUESTION NUMBERING RULES

--------------------------------------------------------------------------------



All questions must be numbered sequentially across a page.



Rules:

\- Question numbers follow Q1, Q2, Q3...

\- Numbering continues across sections within a page

\- Numbering must be recalculated when:

&nbsp; - A question is added

&nbsp; - A question is deleted

&nbsp; - A section is deleted

&nbsp; - Questions are reordered



Required functions:

\- renumberQuestionsInPage(pageId)

\- renumberAllQuestions()



Numbering logic MUST NOT appear in respondent runtime UI.



--------------------------------------------------------------------------------

8\. QUESTION METADATA DISPLAY (EDITOR ONLY)

--------------------------------------------------------------------------------



When showing question details in the editor, display:



\- Question Type

\- Response Type

\- Classifiers (comma-separated, non-empty only)

\- Rating Scale (if applicable)



Format:

Question Type – Response Type · Classifier1, Classifier2 · Rating Scale



This metadata is EDITOR-ONLY and never visible to respondents.



--------------------------------------------------------------------------------

9\. VISUAL \& AESTHETIC RULES (EDITOR)

--------------------------------------------------------------------------------



Visual intent:

\- Calm

\- Structured

\- Precise

\- Tool-like (not emotional)



Rules:

\- No gamification

\- No celebratory visuals

\- No aggressive contrast

\- No respondent-style emphasis



Editor UI prioritizes:

\- Clarity

\- Scanability

\- Error prevention



--------------------------------------------------------------------------------

10\. ACCESSIBILITY \& COMPLIANCE

--------------------------------------------------------------------------------



WCAG 2.2 AA compliance is mandatory.



Rules:

\- Keyboard navigation supported

\- Focus-visible must not be removed

\- No reliance on color alone

\- Screen-reader friendly labels



If something looks visually off:

STOP and escalate — do NOT “fix visually”.



--------------------------------------------------------------------------------

11\. Z-INDEX LAYERING (LOCKED)

--------------------------------------------------------------------------------



Base: 0

Dropdown: 1000

Sticky: 1020

Modal: 1300

Tooltip: 1500

Toast: 1600



--------------------------------------------------------------------------------

12\. DESIGN SYSTEM GOVERNANCE

--------------------------------------------------------------------------------



enculture.css is a STABILITY layer.



It may be updated ONLY if:

\- Change is reusable across multiple pages

\- Not editor-specific

\- Does not alter layout structure

\- Introduces no !important

\- Aligns with DS principles



Otherwise:

→ Handle at product level.



--------------------------------------------------------------------------------

13\. DS GAP LOGGING (MANDATORY)

--------------------------------------------------------------------------------



All Design System gaps must be logged in:

ds-gap-log.md



Rules:

\- Log observation only

\- Do not propose fixes during logging

\- No DS update without a logged gap



--------------------------------------------------------------------------------

14. EDIT SURVEY FLOW — LAYOUT & BEHAVIOUR

--------------------------------------------------------------------------------



14.1 Page Edit Form



\- **Page Number**: Display-only (not an input). Show current page index (1, 2, 3…). Use semantic class \`enc-page-number-display\`.

\- **Page instructions**: Editable textarea. Use \`enc-input-field\`.

\- **Translate Page instructions**: Text link only. Use \`enc-translate-link\` with \`enc-translate-icon\` (e.g. A文). No primary/secondary button.

\- **Card layout**: Page identity + instructions live in one card. That card MUST use \`enc-edit-section-full\` so it spans full width of the edit content grid.



14.2 Properties Panel (Right Sidebar)



\- **Visibility**: Properties panel is for QUESTION configuration only.

\- **When to show**: Only when a QUESTION is selected (\`selectedQuestionIdsForProperties.length > 0\`).

\- **When to hide**: When PAGE or SECTION is selected. Drawer must close and panel hidden (\`aria-hidden="true"\`, \`display: none\` when closed).

\- **No properties panel for Page or Section**: Do not show or open the properties drawer for Page/Section selection.



14.3 All Sections (Page Form) — Structure List



\- **Header**: Title "All sections". Actions on same row: page/section/question counts (e.g. "Page 1/2 · 2 sections · N questions"), Delete button only (no "Add group" in header).

\- **Delete button**: Destructive. Use \`enc-action-danger enc-action-icon\`. Enabled only when at least one section or question is selected in the list. When nothing selected: disabled and \`enc-action-disabled\`.

\- **Add section**: Single "+ Section" button below the list. Use \`enc-structure-add-button\`. No duplicate "Add group" in header.

\- **Sections list**: Accordion per section. Each section has: drag handle, checkbox, expand/collapse chevron, section title. Section body contains: question rows (drag handle, checkbox, question text, metadata), then "Add Question" button (no count suffix).

\- **Question count**: Shown in header only ("· N questions"). Not shown next to each "Add Question" button.

\- **Add Question**: Max 10 questions per section. Button disabled when section already has 10 questions. Label: "Add Question" only.



14.4 Selection & Bulk Actions (Page Form)



\- **Selection**: Sections and questions in "All sections" are selectable via checkboxes. Selection state: \`selectedPageItemIds = { sections: [], questions: [] }\`.

\- **Delete selected**: Calls \`deleteSelectedPageItems()\`. Confirmation required. After delete, run \`renumberQuestionsInPage(pageId)\`.



14.5 Destructive Actions (Editor-Wide)



\- **Semantic classes**: Use \`enc-action-danger\` for text destructive buttons (e.g. "Delete", "Delete selected"). Use \`enc-icon-button-danger\` for icon-only delete buttons (e.g. trash in header).

\- **Tokens**: Destructive buttons use \`--en-error-500\` (critical state). Hover: background \`--en-error-500\`, text \`--en-neutral-0\`. Focus ring: 2px solid \`--en-error-500\`.



14.6 Section Edit Form



\- **Cards**: Section identity and Section instructions merged into one card, vertical layout.

\- **Translate section instructions**: Text link (\`enc-translate-link\`), not a secondary button.

\- **Questions in section**: List with drag handle, section-scoped checkbox, question text/metadata. Bulk bar when selection exists: "N selected", Clear, "Delete selected" (\`enc-action-danger\`).

\- **Save**: "Add section" for new sections; "Update" for existing. Local to section; global "Save changes" remains for whole survey.



14.7 Structure Tree (Left Sidebar)



\- **Drag handles**: Present on section headings and question rows. Use \`enc-drag-handle\`.

\- **Section selection**: Selected section card uses full outline (\`enc-structure-section-block-selected\`), not left-border only.

\- **Section title**: Avoid redundant prefix (e.g. "Section 1 : Work Environment" not "Section 1 : Section 1: Work Environment").



14.8 Focus & Z-Index



\- **Focus ring**: 2px solid \`--en-brand-primary-500\` (or \`--en-error-500\` for destructive), offset 2px. All interactive elements.

\- **Z-index**: Use design-system scale (e.g. \`--z-main\`, \`--z-drawer\`, \`--z-popover-fixed\`). Popovers/drawers above main content; no ad-hoc values.



--------------------------------------------------------------------------------

FINAL PRINCIPLE

--------------------------------------------------------------------------------



Survey Creator UI must be

STRUCTURED, PREDICTABLE, and GOVERNED.



If a change is editor-specific, contextual, or clever,

it does NOT belong in the Design System.



================================================================================

END OF RULEBOOK

================================================================================



