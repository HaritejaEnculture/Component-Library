\# Enculture Design System v1.1 — Evidence-Based Expansion Plan



This document defines the planned scope for Enculture Design System v1.1.



v1.1 is derived exclusively from:

\- ds-gap-log.md

\- Multi-page validation (User Management, RBAC)

\- Confirmed developer and product friction



This is a PLANNING document only.

No implementation is included here.



---



\## v1.0 Status (Baseline)



Enculture DS v1.0 is considered GOVERNANCE-COMPLETE.



v1.0 includes:

\- enculture.css as the DS runtime bundle

\- Tokenized color, typography, spacing, and density systems

\- Core components (button, input, badge)

\- AI consumption contract (DS-GPT)

\- Output and governance rules

\- Gap logging as the only discovery mechanism



No further changes are permitted to v1.0.



---



\## Qualification Criteria for v1.1



A component or primitive qualifies for v1.1 ONLY if:



\- It appears in ds-gap-log.md

\- It is observed on more than one page

\- It causes repeated developer effort or inconsistency

\- It cannot be safely solved at the page level

\- It does not introduce layout ownership or business logic



All items below meet these criteria.



---



\## v1.1 Component Candidates (From Gap Log)



\### RBAC-001 — Icon Button



\*\*Classification:\*\* Component Variant  

\*\*DS Name:\*\* enc-btn-icon  

\*\*Parent:\*\* enc-btn  



\*\*Why:\*\*  

Action-only controls (edit, delete, view) appear repeatedly in admin and RBAC screens.



\*\*Scope:\*\*  

\- Icon-only button variant

\- Token-based sizing

\- Density-aware

\- Focus-visible + disabled states



\*\*Explicitly Out of Scope:\*\*  

\- Tooltips

\- Confirmation logic

\- Permissions

\- Routing



\*\*Priority:\*\* High (low risk, high reuse)



---



\### RBAC-002 — Checkbox



\*\*Classification:\*\* New Core Form Component  

\*\*DS Name:\*\* enc-checkbox  



\*\*Why:\*\*  

RBAC permission matrices and bulk selection rely heavily on checkboxes.

Native checkboxes cause visual inconsistency and accessibility risk.



\*\*Scope:\*\*  

\- Checked / unchecked / indeterminate

\- Keyboard + focus-visible

\- Label association

\- Density-aware sizing



\*\*Explicitly Out of Scope:\*\*  

\- Permission logic

\- Group selection behavior

\- Table structure



\*\*Priority:\*\* High (accessibility critical)



---



\### RBAC-003 — Tabs



\*\*Classification:\*\* Navigation Primitive  

\*\*DS Name:\*\* enc-tabs  



\*\*Why:\*\*  

RBAC and settings screens require internal segmentation that is not routing-based.



\*\*Scope:\*\*  

\- Tab list and active state

\- Keyboard navigation

\- Token-based spacing and typography

\- Density-aware padding



\*\*Explicitly Out of Scope:\*\*  

\- Routing

\- Content rendering

\- Data loading

\- Layout control



\*\*Priority:\*\* Medium (structural, requires care)



---



\## Explicitly Deferred (Not in v1.1)



The following are intentionally excluded from v1.1:



\- Sidebar component

\- Table component

\- Chart components

\- Modal system

\- Tooltip system

\- Dropdown / Select



These require further validation cycles.



---



\## Implementation Order (Strict)



v1.1 must be implemented in this order:



1\. enc-btn-icon  

2\. enc-checkbox  

3\. enc-tabs  



Each component must be:

\- Added to DS documentation

\- Implemented in enculture.css

\- Validated on at least one page

\- Removed from ds-gap-log.md only after validation



---



\## Success Criteria for v1.1



v1.1 is considered successful if:



\- RBAC pages require no page-specific CSS for these patterns

\- Repeated gaps disappear from ds-gap-log.md

\- Developer effort decreases measurably

\- Product teams can reason about UI changes using DS terms



---



\## Governing Principle



Design System evolution is evidence-driven.



No component is added without:

\- Logged gaps

\- Cross-page repetition

\- Clear responsibility boundaries



