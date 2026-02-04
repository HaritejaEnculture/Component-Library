ENCULTURE DS — ENCTAG (BADGE / CHIP) CUSTOMIZATION RULES



SYSTEM CONTEXT

You are working inside the Enculture Design System.

EncTag is a governed metadata component, not a decorative element.

Customization is allowed ONLY through declared variants and tokens.

Component invention, visual improvisation, and raw styling are forbidden.



1\. COMPONENT BOUNDARY

\- Component name: EncTag

\- Purpose: status, sentiment, lifecycle, categorical metadata

\- DO NOT create new components (Badge, Chip, Pill, Label, StatusBadge)

\- DO NOT use raw CSS, Tailwind utilities, or inline styles



2\. ALLOWED CUSTOMIZATION AXES (ONLY)



A. Variant (Semantic)

Allowed values:

\- status

\- sentiment

\- lifecycle

\- neutral



If a value does not fit → log DS gap.



B. Tone (Token-Mapped)

Tone determines token resolution only.



Allowed tones:

\- success  → --en-success-\*

\- warning  → --en-sentiment-neutral

\- error    → --en-error-\*

\- neutral  → System.EnThemeGray.\*



Forbidden:

\- Brand purple

\- Dashboard pastel colors

\- Custom hex / rgb / hsl values



C. Icon Mode (Optional)

Allowed values:

\- none

\- left

\- right



Rules:

\- Icon is supportive only

\- Icon color = currentColor

\- Icon size = Enculture icon tokens

\- Icon-only EncTag is forbidden



D. Density (Inherited)

EncTag MUST inherit global density:

\- compact (default)

\- expanded



Rules:

\- Density affects padding and height only

\- Typography scale MUST NOT change



3\. LABEL RULES

\- Short, canonical, human-readable labels

\- Max 2 words recommended

\- Title Case or Sentence case only

\- No ALL CAPS

\- No emojis

\- No dynamic or opinionated labels



4\. STATE \& BEHAVIOR

\- EncTag is non-interactive by default

\- If clickable, interaction must be owned by parent component

\- EncTag must not own logic or routing

\- Disabled state uses DS disabled tokens only



5\. VALID USAGE EXAMPLES



<EncTag variant="status" tone="success" icon="check" iconPosition="right">

&nbsp; Completed

</EncTag>



<EncTag variant="sentiment" tone="error" icon="alert-triangle">

&nbsp; Critical

</EncTag>



<EncTag variant="neutral">

&nbsp; Draft

</EncTag>



6\. FORBIDDEN (AUTO-REJECT)

\- Custom colors or shadows

\- Size props (small, large, dense)

\- Gradients, glow, animation

\- Icon-only tags

\- Free-form or feature-specific variants

\- Dashboard pastel usage

\- Hardcoded values



7\. DS GAP LOGGING (MANDATORY)

If any new semantic, tone, icon behavior, or size rule is required:

\- Log in ds-gap-log.md

\- Do NOT implement locally



8\. AI / CURSOR ENFORCEMENT

\- Any violation = NON-COMPLIANT OUTPUT

\- No fallback UI generation

\- Recommend DS gap logging only



FINAL PRINCIPLE

EncTag is flexible in meaning, not in appearance.

Semantics may vary. Visual language must not.



