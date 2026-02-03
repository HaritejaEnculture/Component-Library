# Enculture Survey Respondent — Aesthetics Rulebook (Governed)

**Status:** Canonical
**Scope:** Respondent-facing visuals only
**Purpose:** Preserve the intended emotional, visual, and perceptual quality of the survey experience
**Non-goals:** UI flows, interaction logic, component APIs

---

## Design System Token Binding (Mandatory)

## Header Definition (Mandatory)

The **Header** is a persistent, respondent-facing container that anchors survey context and progress.

**Purpose**

* Provide constant survey context
* Host survey-level progress indicators
* Offer exit or close actions without disrupting flow

**Rules**

* Header MUST remain visible (sticky) throughout the survey
* Header MUST NOT use blur, glass, or backdrop-filter effects
* Header MUST use solid Enculture DS surface tokens
* Header MUST NOT visually compete with the active question card
* Header content MUST be minimal and non-distracting

---

## Question Index Definition (Mandatory)

The **Question Index** is the respondent-facing indicator that communicates position within the survey.

**Purpose**

* Orient the respondent within the overall survey
* Reduce uncertainty about progress and remaining effort

**Rules**

* Question Index MUST reflect **survey-level position**, not page-level
* It MUST display:

  * Current question position (e.g., `Question 12`)
  * Total number of questions in the survey (e.g., `of 50`)
* Question Index MUST be human-readable and contextual
* Question Index MUST NOT be interactive
* Question Index MUST be visually subordinate to the question content
* Question Index MUST use Enculture DS text tokens only

---

## Density Mode Governance (Mandatory)

The respondent experience MUST support **Enculture DS density modes**.

**Default Mode**

* The Survey Respondent experience MUST render in **Compact Mode** by default
* Compact Mode is optimized for:

  * Long-form surveys
  * Reduced scrolling fatigue
  * Sustained focus

**Relaxed Mode**

* Relaxed Mode MAY be enabled explicitly (e.g., accessibility preference)
* Relaxed Mode MUST:

  * Increase vertical spacing only
  * Preserve typography scale hierarchy
  * Preserve card radius, elevation, and visual hierarchy

**Governance Rules**

* Cursor MUST NOT choose density mode implicitly
* If not specified, **Compact Mode is mandatory**
* Density mode MUST be applied consistently across all question cards

---

All aesthetic rules defined in this document MUST be implemented using **Enculture Design System (Enculture DS) tokens only**.

All aesthetic rules defined in this document MUST be implemented using **Enculture Design System (Enculture DS) tokens only**.

**Hardcoded values** (hex colors, rgba values, raw spacing, shadows, or border radii) are **non-compliant**.

### Token Categories Referenced

* **Surface Tokens**: glass, muted, default, disabled
* **Text Tokens**: primary, secondary, muted, disabled
* **Border Tokens**: default, focus, active, disabled
* **Elevation Tokens**: card, active, focus
* **Accent Tokens**: primary, success, warning (soft variants only)

If a required visual outcome cannot be achieved using existing Enculture DS tokens, it MUST be raised as a **Design System gap** before implementation.

---

## 1. Visual Philosophy (Non-Negotiable)

## Progress Bar Presentation Rules (Mandatory)

* The progress bar MUST be **sticky to the header** at all times during the survey flow
* The progress bar MUST NOT use **blur, glass, or backdrop-filter effects**
* The progress bar MUST remain visually stable during scroll (no parallax, no fade)

**Visual Rules**

* Progress bar MUST use Enculture DS tokens only
* Background surface MUST use a solid surface token (no translucency)
* Progress fill MUST use a primary accent token with soft emphasis
* Height MUST be minimal and non-dominant

**Progress Information (Mandatory)**

* Progress MUST display **questions answered vs total questions in the survey** (e.g., `5 of 50 answered`)
* Progress MUST display **current position vs total Questions in the surveyl= ** (e.g., `Question 5 of 10`)
* Numeric progress MUST be contextual and human-readable
* Percentage MAY be shown as a secondary indicator but MUST NOT be the primary signal

**Behavioral-Aesthetic Constraints**

* Progress bar MUST NOT visually compete with the active question card
* Progress bar MUST NOT animate aggressively
* Progress bar MUST NOT detach from the header or float independently

**Forbidden**

* Blur or glass effects on the progress bar

* Floating or detached progress indicators

* Percentage-only visual emphasis without contextual meaning

* The experience MUST feel:

  * Calm
  * Focused
  * Premium
  * Non-clinical

* The UI MUST avoid:

  * Dense data-table aesthetics
  * Flat enterprise form layouts
  * Aggressive contrast or hard visual breaks

* Visual hierarchy MUST guide attention without relying on instructional text

---

## 2. Background & Environment Rules

### 2.1 Ambient / Mesh Background

* The survey experience MUST use a **soft ambient background**
* Background characteristics:

  * Subtle radial gradients
  * Low visual noise
  * No sharp color transitions
* Background is **decorative only**, not semantic

**Rules**

* Background contrast MUST be lower than content contrast
* Background MUST NOT encode state, progress, or validation
* Dark mode preserves the same ambient logic with reduced opacity

---

## 3. Card Hierarchy Rules (Critical)

**Corner Radius Rules (Mandatory)**

* All question cards MUST use **Enculture DS radius tokens only**
* Corner radius MUST communicate hierarchy and state

**Radius Specification**

* Active Question Card → `--en-radius-lg` (primary focus, highest prominence)
* Inactive Question Card → `--en-radius-lg` (secondary, subdued)
* Disabled / Locked Card → `--en-radius-lg` (consistent shape, reduced emphasis)

**Rules**

* Mixed radius usage within the same card is forbidden
* Radius MUST NOT change dynamically during interaction
* Radius MUST remain consistent across light and dark modes

---

### 3.1 Card Types

Exactly three visual card states MUST exist:

1. **Active (Current Question)**
2. **Inactive (Answered / Skipped)**
3. **Disabled (Future / Locked)**

---

### 3.2 Active Question Card

* MUST visually float above other cards
* MUST use:

  * Glassmorphism surface
  * Soft glow / aura
  * Higher elevation
  * Larger padding
* MUST clearly communicate: *This is the current focus*

**Forbidden**

* Flat white surfaces
* Same elevation as inactive cards
* Hard borders without depth or glow

---

### 3.3 Inactive Question Cards

* MUST appear visually muted
* MUST:

  * Reduce saturation
  * Reduce contrast
  * Disable pointer interaction
* MUST remain visible for scroll-back and context

**Rules**

* Inactive ≠ hidden
* Inactive ≠ collapsed
* Inactive ≠ removed

---

## 4. Typography Hierarchy Rules

### 4.1 Question Emphasis

* Active question text MUST:

  * Use the largest text size in the view
  * Use stronger font weight
  * Have tighter letter spacing
* Inactive question text MUST:

  * Be smaller
  * Use muted color
  * Reduce font weight

---

### 4.2 Meta Information

* Metadata (e.g., `Question X of Y`) MUST:

  * Be uppercase
  * Use low contrast
  * Never compete with the main question text
* Helper text MUST be supportive, not instructional-heavy

---

## 5. Focus & Attention Control

### 5.1 Single Attention Principle

* At any moment:

  * Only ONE question card may dominate visually
* All other UI elements MUST step back visually

This principle supports:

* Reduced cognitive load
* Accessibility
* Completion confidence

---

## 6. Input Styling Rules

### 6.1 Selection Inputs

* Inputs MUST feel:

  * Tactile
  * Confident
  * Easy to select
* Selected states MUST:

  * Increase contrast
  * Increase border weight or fill
  * Never rely on color alone

---

### 6.2 Open Text Inputs

* Text inputs MUST:

  * Feel safe and private
  * Use softer surfaces
  * Avoid aggressive outlines
* Privacy messaging MUST feel reassuring, not legalistic

---

## 7. Progress Representation (Aesthetic Contract)

* Progress MUST feel:

  * Reassuring
  * Lightweight
  * Non-pressuring
* Side navigation (if present):

  * Uses muted typography
  * Locks future steps visually
  * Clearly highlights the current step

**Forbidden**

* Loud progress meters
* Gamified progress treatments
* Aggressive completion pressure

---

## 8. Status Signaling (Visual-First)

* Status MUST be communicated primarily through:

  * Color tone
  * Opacity
  * Elevation
  * Glow
* Icons are secondary and supportive

Examples:

* Current → glow + subtle pulse
* Completed → check icon + muted tone
* Locked → lock icon + disabled styling

---

## 9. Motion & Transitions

* Motion MUST be:

  * Subtle
  * Short
  * Purposeful
* Motion is used to:

  * Shift focus
  * Confirm actions
  * Reduce abrupt context changes

**Forbidden**

* Bouncy animations
* Gamified motion
* Attention-grabbing loops

---

## 10. Dark Mode Parity Rules

* Dark mode MUST:

  * Preserve visual hierarchy
  * Preserve glow logic
  * Reduce brightness without reducing clarity
* Dark mode MUST NOT:

  * Invert meaning
  * Introduce new emphasis patterns

---

## 11. Accessibility Aesthetic Rules

* Visual clarity MUST support:

  * Low vision users
  * Cognitive load reduction
  * Screen magnification
* Hierarchy MUST remain intact at zoomed scales

Accessibility is achieved through **clarity**, not decoration.

---

## 12. Cursor / AI Aesthetic Enforcement

AI-generated output MUST be rejected if it:

* Flattens all cards into a single visual style
* Removes elevation or glow from the active question
* Hides inactive questions instead of muting them
* Converts the experience into a single long form
* Over-emphasizes progress or completion pressure
* Removes ambient background without an equivalent replacement

---

### Final Principle

> The respondent should feel guided, not rushed —
> focused, not tested —
> supported, not evaluated.

Any implementation that violates this principle is **non-compliant**, even if functionally correct.
