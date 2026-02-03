# En-AI Multilingual Survey Prompt (Respondent-Only, Governed)

**Last updated:** January 28, 2026  
**Status:** Preview implementation active  
**Governed by:** Enculture Design System — Survey respondent scope

---

## PURPOSE

Enable respondents to select a preferred language before starting the survey, while keeping English as the canonical reference language for clarity, consistency, and unbiased analysis.

---

## SCREEN 0: LANGUAGE SELECTION (PRE-SURVEY)

**Title:**  
Choose your preferred language

**Helper Text:**  
You can view questions in your selected language. English will always be shown as a reference.

**Language Options:**
- English (Default)
- Hindi (हिंदी)
- Telugu (తెలుగు)
- Spanish (Español)
- French (Français)
- German (Deutsch)  
*(List is driven by survey configuration.)*

**Primary CTA:**  
Continue

**Rules:**
- Language selection happens **BEFORE** the welcome page (Screen 0)
- Language selection is mandatory before survey starts
- Selection is stored for the session
- No auto-detection
- No mid-survey language switching
- Default language: English (if no selection made)

**Implementation Status (Preview):**
- ✅ Language selection screen implemented
- ✅ Appears before welcome page
- ✅ Session storage for language preference
- ✅ Reset on survey restart (logo click)

---

## CORE LANGUAGE RENDERING RULE

**English is the CANONICAL SOURCE OF TRUTH.**  
The selected language is a **COMPREHENSION AID.**

English content must **NEVER** be hidden or replaced.

---

## SURVEY QUESTION DISPLAY (DUAL-LANGUAGE)

**Layout Order (MANDATORY):**
1. **English (Primary)** — Default text color, standard weight
2. **Selected Language (Secondary)** — Lighter neutral color (opacity 0.75), appears below English

**Example:**

- **English (Primary – default text color):**  
  I feel safe sharing my opinions at work.

- **Selected Language (Secondary – lighter tone):**  
  मुझे अपने विचार साझा करते समय सुरक्षित महसूस होता है।

**Visual Rules:**
- Same font family
- Same font size
- No italics
- No brackets
- No toggles
- Secondary language uses lighter neutral color (opacity 0.75)
- Must still meet WCAG contrast requirements
- Vertical stack layout (English above, selected language below)

**Implementation Status (Preview):**
- ✅ Dual-language question text rendering
- ✅ English always visible (primary)
- ✅ Selected language below (secondary, lighter)
- ✅ `lang` attributes applied for accessibility
- ⚠️ Preview: Translations available for Q1-Q5 only (Q6+ show English only)

---

## ANSWER OPTIONS

**Single Choice / Multiple Choice:**

Example:
- **English:** Strongly Agree  
  **Selected Language:** पूरी तरह सहमत

**Rules:**
- English first (primary)
- Selected language below (secondary, smaller font, lighter color)
- Same structure for all options
- Vertical stack within each option label

**Likert Scales:**
- Scale anchors shown in English only
- Option labels show dual-language (English + selected language)
- Optional helper text may explain translated meaning
- No translated anchors to avoid scale interpretation drift

**Implementation Status (Preview):**
- ✅ Radio button options: Dual-language
- ✅ Checkbox options: Dual-language
- ✅ Likert scale options: Dual-language
- ✅ Common options translated (Strongly Disagree, Agree, Yes, No, etc.)

---

## OPEN TEXT QUESTIONS

**Prompt:** Dual-language (English + selected language)

**Placeholder:** English only

**Helper Text:**  
You may respond in the language you are most comfortable with.

**Rules:**
- Responses are stored as-is
- No forced language validation
- No real-time translation
- No sentiment analysis at input time

**Implementation Status (Preview):**
- ✅ Placeholder: English only
- ✅ Helper text: English only
- ✅ User can respond in any language

---

## ACCESSIBILITY RULES (WCAG 2.2 AA)

- Screen readers read English first, then selected language
- Correct `lang` attribute must be applied per text block (`lang="en"` for English, `lang="hi"` for Hindi, etc.)
- Keyboard navigation unaffected by language rendering
- Secondary language text must meet minimum contrast ratios (opacity 0.75 meets WCAG AA)

**Implementation Status (Preview):**
- ✅ `lang` attributes applied to all dual-language text
- ✅ Keyboard navigation preserved
- ✅ Contrast ratios maintained

---

## DATA & ANALYTICS GOVERNANCE

- English is the analysis anchor
- Translations are display-only
- Language selection is stored as metadata (sessionStorage for preview)
- No auto-translation of responses
- No analytics or sentiment inference during response entry

**Implementation Status (Preview):**
- ✅ Language selection stored in sessionStorage
- ✅ Translations are display-only (no data modification)
- ✅ English remains canonical for all responses

---

## FAILURE HANDLING

If a translation is missing:
- Show English only
- Do **NOT** block the respondent
- Do **NOT** display error or warning
- Continue survey flow normally

**Implementation Status (Preview):**
- ✅ Missing translations fallback to English
- ✅ No blocking or error messages
- ✅ Survey continues normally

---

## PREVIEW IMPLEMENTATION NOTES

**Current Scope:**
- ✅ Language selection screen (Screen 0)
- ✅ Dual-language rendering for questions Q1-Q5
- ✅ Dual-language rendering for common answer options
- ⚠️ Questions Q6+ show English only (translations not yet added)
- ⚠️ Hardcoded translations in `translations.ts` (preview only)

**Translation Coverage:**
- Questions: Q1-Q5 translated (Hindi, Telugu, Spanish, French, German)
- Options: Common Likert options, Yes/No, translated
- Missing: Q6+ questions, specialized options (to be added)

**Next Steps for Full Implementation:**
1. Add translations for remaining questions (Q6+)
2. Add translations for all option types
3. Integrate with translation management system/API
4. Add language detection/preferences
5. Add proper error handling for missing translations

---

## AI & DEV ENFORCEMENT RULES

**AI and Devs MUST NOT:**
- Replace English entirely
- Allow per-question language switching
- Modify question meaning during translation
- Introduce styling beyond defined semantics
- Hide or collapse English text

**If unsure or translation data is missing:**  
STOP and escalate to DS owner.

---

## SUMMARY

- **English** is the source of truth.
- **Selected language** improves comprehension without affecting data integrity.
- **Layout:** English (primary, default color) → Selected Language (secondary, lighter color, below)
- **Accessibility:** `lang` attributes applied, WCAG AA compliant
- **Preview:** Functional for Q1-Q5, English-only for Q6+

---

*End of En-AI Multilingual Survey Prompt*
