ENCULTURE DS — INPUT SIZE ENFORCEMENT (CANONICAL)



SYSTEM CONTEXT

Enculture Design System already defines density tokens.

Shadcn sizing is NOT authoritative.

Enculture density tokens ALWAYS override Shadcn defaults.



1\. APPLICABLE COMPONENTS

\- EncInput

\- EncSearchInput

\- EncSelect

\- EncDateInput

\- EncTimeInput



2\. MANDATORY SIZE BINDING

Inputs MUST bind to density tokens ONLY.



\- Compact Mode:

&nbsp; --en-density-compact-control-height (40px)



\- Comfortable Mode:

&nbsp; --en-density-control-height (48px)



NO other heights are permitted.



3\. ROOT CAUSE RULE

If an input appears smaller than 40px:

→ Shadcn default sizing has leaked

→ This is NON-COMPLIANT



4\. SEARCH INPUT RULE

\- Search inputs are NOT special

\- They MUST use the same height as EncInput

\- Icons do NOT justify smaller controls



5\. FORBIDDEN

\- Shadcn size props

\- Tailwind h-\*, py-\* utilities

\- Inline padding overrides

\- Per-input custom sizing



6\. IMPLEMENTATION RULE

EncInput MAY wrap Shadcn internally, but:

\- Height, padding, and radius MUST resolve from Enculture density tokens

\- Product code MUST NOT control size



7\. AI / CURSOR ENFORCEMENT

If Shadcn sizing is detected:

\- Refactor to Enculture density tokens

\- Do NOT introduce new props

\- Do NOT invent new sizes



FINAL PRINCIPLE

Density is a SYSTEM concern.

Shadcn is an implementation detail.

Enculture tokens always win.



