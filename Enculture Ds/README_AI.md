================================================================================
ENCULTURE DESIGN SYSTEM — AI USAGE CONTRACT (MANDATORY)
================================================================================

This document defines how AI tools (Cursor, Copilot, Agents) MUST interact
with the Enculture Design System.

This is NOT documentation.
This is a CONTRACT.

Failure to follow this contract results in INVALID OUTPUT.

--------------------------------------------------------------------------------
1. SOURCE OF TRUTH ORDER (READ IN THIS EXACT SEQUENCE)
--------------------------------------------------------------------------------

AI tools MUST read and respect the following files IN ORDER:

1. enculture.css
   - This is the RUNTIME source of truth.
   - It exposes ONLY semantic classes.
   - No primitives are available.

2. En-AI_Design_System.md
   - Defines governance, intent, and non-negotiable rules.

3. EN-AI_Components_Molecules.md
   - Defines which components exist.
   - If a component is not listed here, it DOES NOT EXIST.

4. En-AI_Respondent_Protocol.md (if applicable)
   - Defines what is allowed for respondent-facing experiences.

If a rule conflicts, the EARLIER file in the list wins.

--------------------------------------------------------------------------------
2. SEMANTIC-FIRST RULE (CRITICAL)
--------------------------------------------------------------------------------

Enculture is a SEMANTIC-FIRST Design System.

This means:
- AI MUST use semantic classes only.
- AI MUST NOT create visual styles.
- AI MUST NOT modify spacing, padding, margin, radius, colors, or fonts.
- AI MUST NOT introduce raw HTML styling.

Example (VALID):
- class="enc-action-primary"
- class="enc-input-field"

Example (INVALID):
- style={{ padding: "16px" }}
- class="enc-btn"
- class="flex gap-4"
- inline CSS
- custom utility classes

--------------------------------------------------------------------------------
3. NO PRIMITIVES RULE
--------------------------------------------------------------------------------

The following are FORBIDDEN in product code:

- Raw <button>, <input>, <select> styling
- Spacing utilities
- Color utilities
- Radius utilities
- Layout primitives

If a required semantic class or component does not exist:
→ STOP
→ REPORT A DESIGN SYSTEM GAP
→ DO NOT IMPROVISE

--------------------------------------------------------------------------------
4. DENSITY HANDLING (AUTOMATIC)
--------------------------------------------------------------------------------

Density (Comfortable / Compact) is controlled ONLY by:

<body data-density="compact">

AI MUST NOT:
- Adjust spacing for compact mode
- Change component sizes
- Add conditional styling

All density behavior is resolved internally by enculture.css.

--------------------------------------------------------------------------------
5. ACCESSIBILITY RULE
--------------------------------------------------------------------------------

Accessibility is baked into the Design System.

AI MUST NOT:
- Add custom focus styles
- Remove focus-visible
- Override control sizes
- Reduce contrast

If something looks “off”, STOP and ASK.
Do NOT “fix visually”.

--------------------------------------------------------------------------------
6. WHAT AI IS ALLOWED TO DO
--------------------------------------------------------------------------------

AI MAY:
- Apply existing semantic classes
- Wire data and props
- Repeat patterns already present
- Refactor logic WITHOUT touching layout or styles

AI MAY NOT:
- Invent components
- Invent classes
- Change semantics
- Bypass the Design System

--------------------------------------------------------------------------------
7. FAILURE MODE (IMPORTANT)
--------------------------------------------------------------------------------

If AI is unsure, missing context, or cannot find a required component:

The ONLY valid response is:

"Blocked: Required Enculture Design System semantic is missing.
Action required from DS owner."

--------------------------------------------------------------------------------
END OF CONTRACT
================================================================================
