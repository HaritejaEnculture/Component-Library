# Enculture Respondent Survey UX Specification
**Version:** 1.0  
**Protocol:** En-AI_Respondent_Survey_Schema (Strict Governance)  
**Target Audience:** Respondents (Employees) only.  
**Device Support:** Responsive (Mobile, Tablet, Desktop)

---

## 1. Design & Interaction Principles
*   **Tone:** Calm, Neutral, Safe, Non-judgmental.
*   **Visuals:** Enculture Design System (Governed). No gamification, no unnecessary motion.
*   **Accessibility:** WCAG 2.2 AA Compliance (High contrast, Keyboard navigable, Screen-reader friendly).
*   **Privacy:** Anonymity-first messaging at every high-anxiety touchpoint.

---

## Screen 1: Survey Invitation (Entry)
**Goal:** Establish trust and set context.

*   **Components:**
    *   **Header:** Enculture Logo (top left, small, neutral).
    *   **Main Card (Centered):**
        *   **Title:** Organization Diagnosis Survey
        *   **Subtitle:** for {Organization Name}
        *   **Metadata:** ⏱️ 8 min estimate | 🔒 Anonymous
        *   **Description:** "This survey helps us understand your employee experience to improve workplace culture."
        *   **Primary Action:** `[Start Survey]` (Button, Primary, Brand Purple)
*   **Microcopy:**
    *   *Footer:* "Powered by Enculture. Your privacy is protected."

## Screen 2: Access Validation (System State)
**Goal:** Handle link states without blaming the user.

*   **Scenario A: Valid Link**
    *   *Action:* Auto-redirect to Screen 3.
*   **Scenario B: Link Expired / Closed**
    *   **UI:** Centered Message Card.
    *   **Icon:** `Icon.Info` (Grey-500).
    *   **Message:** "This survey is no longer accepting responses."
    *   **Subtext:** "The deadline has passed. Please contact your administrator if you believe this is an error."
*   **Scenario C: Already Completed**
    *   **UI:** Centered Message Card.
    *   **Icon:** `Icon.Check` (Teal-500).
    *   **Message:** "You have already completed this survey."
    *   **Subtext:** "Thank you for your contribution."

## Screen 3: Welcome & Instructions
**Goal:** Reduce anxiety and clarify the "Psychological Contract".

*   **Components:**
    *   **Title:** Welcome
    *   **Info Block (Stack):**
        *   **Anonymity:** "Your individual responses are anonymous and cannot be traced back to you."
        *   **Efficiency:** "There are ~{Count} questions. It takes about {Time} minutes."
        *   **Flexibility:** "You can pause and come back at any time. Your progress is saved automatically."
    *   **Primary Action:** `[Begin Survey]` (Button, Primary)
*   **Accessibility Note:** Focus should land on the main heading.

## Screen 4: Survey In-Progress (The Core Flow)
**Goal:** Low friction data entry. Maximize psychological safety.

*   **Layout:**
    *   **Sticky Header:** Logo (Left), Progress Indicator (Right).
    *   **Progress Indicator:** Text-based "Page {X} of {Y}" (per Schema) + Visual Bar (Neutral color).
*   **Content Area:**
    *   **Pagination:** 10 Questions per page (vertical list).
    *   **Question Card:**
        *   **Text:** Clear, high-contrast `{Text.Primary}`.
        *   **Input:**
            *   *Single/Multi Choice:* Large touch targets (min 44px height).
            *   *Likert:* Horizontal scale for Desktop, Stacked for Mobile.
            *   *Open Text:* Clear helper text "Avoid identifying details".
        *   **Validation:** Inline, non-aggressive. "Please select an option" (no red borders unless submit clicked).
*   **Navigation Footer (Sticky on Mobile):**
    *   `[Back]` (Button, Ghost/Secondary) - Hidden on Page 1.
    *   `[Next]` (Button, Primary) - Changes to `[Review]` on last page.
    *   *Autosave Indicator:* "Saved" (Tiny text, fades in/out).

## Screen 5: Review (Pre-Submission)
**Goal:** Confidence before commitment.

*   **Components:**
    *   **Header:** "Review your responses"
    *   **Summary List:** Compact view of all answered questions.
        *   *Format:* Question Text (Truncated) - Selected Answer.
        *   *Action:* `[Edit]` button jumps back to specific page.
    *   **Unanswered Warning:** If any optional questions were skipped (if applicable), neutral note: "3 Optional questions skipped."
    *   **Primary Action:** `[Proceed to Submit]` (Button, Primary)

## Screen 6: Final Submission Gate
**Goal:** Prevent accidental submission.

*   **UI:** Modal or Dedicated Card.
*   **Title:** Ready to submit?
*   **Copy:** "Once submitted, responses cannot be changed. Are you sure you are finished?"
*   **Actions:**
    *   `[Go Back]` (Secondary)
    *   `[Submit Survey]` (Primary)

## Screen 7: Submission Confirmation
**Goal:** Clear closure.

*   **Components:**
    *   **Icon:** Large Check Circle (Success/Teal-500).
    *   **Title:** Thank you.
    *   **Message:** "Your responses have been securely recorded."
    *   **Anonymity Reminder:** "Your privacy remains protected."
    *   **Exit Instruction:** "You may effectively close this tab now."
*   **Prohibited:** DO NOT show scores, results, or "Share this" buttons.

---

## Technical & Accessibility Requirements

### Interaction Rules
1.  **Autosave:** Trigger on every input `change` event. Silent save (no blocking UI).
2.  **Scroll Position:** On "Next" page load, scroll to top.
3.  **Focus Management:** On page load, focus on the first question or the H1.

### Accessibility (WCAG 2.2 AA)
*   **Keyboard:** Full Tab navigation support. Visual focus rings on all inputs.
*   **Screen Readers:**
    *   Questions marked as `<legend>` in `<fieldset>`.
    *   Progress bar uses `aria-valuenow` and `aria-valuetext`.
    *   Error messages linked via `aria-describedby`.
*   **Color:** Text contrast ratio > 4.5:1.

### Microcopy Guidelines
*   **Yes:** "Select one", "Type here", "Next Page"
*   **No:** "You must", "Submit Data", "Hurry up"
