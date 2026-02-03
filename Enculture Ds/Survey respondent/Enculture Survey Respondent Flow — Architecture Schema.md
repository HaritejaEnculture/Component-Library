# Enculture DS — Survey Respondent Flow Architecture Schema

> **Purpose**
> This document defines the **Enculture Design System (Enculture DS)** product architecture schema for the **Survey Respondent Flow**, using object-oriented domain modeling inspired by **ORCA**.
> This is **not a prompt**, **not UI**, and **not implementation code**.
> It is the **canonical schema** consumed by Design, Engineering, Analytics, and AI systems within Enculture.

---

## Respondent Persona (Scope Definition)

This schema is optimized for the **Survey Respondent** persona, defined as:

* A non-administrative user
* Primary goal: complete a survey accurately with minimal friction
* Secondary goals:

  * Understand progress and remaining effort
  * Recover safely from interruptions
* Characteristics:

  * May be authenticated or anonymous
  * May have limited time or attention
  * May access the survey on variable network conditions

All respondent-facing states, behaviors, and UX gaps documented in this schema
are evaluated strictly from this persona’s perspective.

---

## 1. Scope & Assumptions

* Applies **only** to **Survey Respondent POV**
* Explicitly excludes:

  * Admin survey creation
  * Configuration
  * Analytics dashboards
* Covers:

  * Domain objects
  * Relationships
  * States
  * Permissions
  * Behavioral contracts
* Survey constraints:

  * Page count is **computed dynamically**
  * Each page contains **1–10 questions**
  * Mixed question types allowed per page

---

## 2. Core Domain Objects (Canonical)

### SurveyInstance

Represents a single respondent’s live or completed survey experience.

**Attributes**

* surveyInstanceId
* surveyId
* respondentId
* currentPageIndex
* startedAt
* submittedAt
* status (NotStarted | Live | InProgress | Completed | Closed)
* completionPercentage
* lastSavedAt

---

### Respondent

Represents a participant invited to a survey.

**Attributes**

* respondentId
* name (optional, **PII**)
* email (optional)
* respondentType (Employee | External | Anonymous)
* accessMode (Link | Authenticated)

---

### SurveyPage

Logical grouping of questions rendered together.

**Attributes**

* pageId
* pageIndex
* purpose
* questionCount (derived)

**Rules**

* Page count is derived, never manually defined
* Pages contain **1–10 questions**
* Page order is fixed and sequential
* Respondents cannot reorder or skip pages

---

### Question

Atomic unit of respondent input.

**Attributes**

* questionId
* questionText
* questionType
* isRequired
* displayOrder
* validationRules

**Accessibility & Assistive Support**

* Each question MUST provide an optional **Listen to Question** control (speaker icon)
* Activating the speaker reads the question text aloud using text-to-speech
* This capability is intended to support users with visual, cognitive, or reading disabilities
* Audio playback does NOT change question state or validation behavior
* The control must be available for all question types

**Supported Types**

* Single Choice
* Multiple Choice
* Likert Scale
* Rating
* Open Text

**Input Type Mapping (Governed)**

* SINGLE_CHOICE → RADIO, DROPDOWN
* MULTIPLE_CHOICE → CHECKBOX, DROPDOWN_MULTI
* LIKERT_SCALE → SCALE (1–5 Enculture standard)
* RATING → STAR or ICON (5 or 10)
* OPEN_TEXT → SHORT_TEXT, LONG_TEXT, NUMERIC_*, DATE, DATE_RANGE, OPEN_ENDED_LIST

Input rendering MUST align with the governed question structure schema and may not introduce new input patterns.

---

### QuestionOption

Selectable answer for applicable question types.

**Attributes**

* optionId
* label
* value

---

### Response

Captured answer for a question.

**Attributes**

* responseId
* questionId
* value
* comment (optional, Open Text only)
* answeredAt
* isAutoSaved

---

## 3. Object Relationships

| Parent Object  | Child Object   | Cardinality | Rule                              |
| -------------- | -------------- | ----------- | --------------------------------- |
| SurveyInstance | SurveyPage     | 1 → many    | Pages derived from question count |
| SurveyPage     | Question       | 1 → 10      | Max 10 per page                   |
| Question       | QuestionOption | 0 → many    | Depends on type                   |
| Respondent     | SurveyInstance | 1 → many    | One per survey                    |
| SurveyInstance | Response       | 0 → many    | Created during flow               |

---

## 4. Respondent State Model (Single Unified Model)

This is a **single hierarchical state model**. States must not be interpreted independently.

### Survey / Page / Question State Continuum

```
SurveyInstance:
NotStarted → Live → InProgress → Completed → Closed

SurveyPage:
NotVisited → Active → Completed

Question:
Disabled → Active → Completed → Skipped → Commented
```

**Binding Rules**

* SurveyInstance state governs Page and Question availability
* Page state governs which Questions may become Active
* Only one Page and one Question may be Active at a time
* First saved response transitions SurveyInstance → InProgress
* Completed requires explicit submission
* Closed forces all Pages and Questions into read-only state
* Commented applies only to Open Text questions
* Commented does NOT imply Completed
* All states must be explicitly stored (no implicit inference)

---

## 5. Actions & Permissions (Respondent POV)

| Object         | Action           | Allowed |
| -------------- | ---------------- | ------- |
| SurveyInstance | Start            | ✅       |
| SurveyInstance | Resume           | ✅       |
| SurveyInstance | Submit           | ✅       |
| SurveyPage     | NavigateNext     | ✅       |
| SurveyPage     | NavigatePrevious | ✅       |
| Question       | Answer           | ✅       |
| Question       | Skip             | ✅       |
| Question       | Listen           | ✅       |

---

## 6. Behavioral Rules (Non-UI)

**Navigation**

* Pages cannot be skipped
* Previous page allowed until final submission

**Validation**

* Required questions enforced at page level
* No survey-level validation blocking

**Question Interaction Rules**

* Only one question may be `Active` at any time
* When an **optional** question is skipped:

  * The question state MUST be set to `Skipped`
  * The system MUST automatically move focus to the **next sequential question**
  * The skipped question MUST remain editable until page submission
* Required questions MUST NOT be skipped
* Skipping a question MUST NOT block page progression if all required questions are satisfied, and the respondent MUST be able to scroll back and answer a skipped question at any time before page submission
* `Listen to Question` MUST NOT alter question state or navigation

**Progress Semantics**

* Progress MUST be expressed in contextual terms (e.g., `Page X of Y · A of 10 answered`)
* Percentage-only progress indicators are non-compliant

**Persistence**

* Auto-save on question interaction
* Page submission commits responses atomically
* Open Text responses MUST remain privacy-first at input time
* Open Text responses MUST NOT trigger sentiment analysis, entity extraction, or flags at input time
* All analysis on open text is permitted only post-aggregation

---

## 7. Empty & Edge States

* Survey closed before start → Read-only message
* Session timeout → Resume from last saved question
* Network failure → Local save with retry

---

## 8. Outputs

This schema is the **single source of truth** for:

* Frontend rendering logic
* Backend APIs
* Permission enforcement
* Analytics events
* AI-generated insights

---

## 9. Change Governance

* All changes must update this document first
* UI and code must conform to this schema
* AI systems must consume this verbatim

---

## 9.1 Cursor Enforcement Contract (Mandatory)

The following rules are **execution-blocking** for AI-assisted development tools, including **Cursor**.

If any of the conditions below are violated, the output MUST be considered **non-compliant** and rejected during review:

* More than one question rendered as `Active` at the same time
* Optional question skip does not auto-advance focus to the next question
* Skipped questions are not editable before page submission
* Required questions are allowed to be skipped
* Percentage-only progress indicators are used
* `Closed` survey state allows interaction instead of read-only behavior
* Question-level states (`Disabled`, `Active`, `Completed`, `Skipped`, `Commented`) are inferred instead of explicitly represented
* Open Text input triggers sentiment analysis, entity extraction, or flags at input time

Cursor MUST NOT infer or invent behavior beyond what is explicitly defined in this schema.

---

## 10. Schema Gap Resolution (Cursor Analysis Summary)

This section captures **system-level gaps** identified during implementation review.

**Critical**

* State model mismatch (WELCOME / QUESTIONS / COMPLETE)
* Missing mandatory domain attributes

**Major**

* Question state tracking
* Question type coverage
* Persistence metadata
* Dynamic page sizing
* Missing Respondent and SurveyPage objects

**Minor**

* Design system token violations (`--ref-*`)

All gaps must be resolved in order of severity.

---

## 11. Respondent-Facing Gap Analysis (UX Impact)

This section documents **only gaps visible to the survey respondent**.
Backend identifiers, infrastructure concerns, and admin/creator functionality are **explicitly excluded**.

### 11.1 Critical Gaps (Respondent POV)

**1. State Model Visibility**

* Respondent currently sees: `WELCOME`, `QUESTIONS`, `COMPLETE`
* Respondent should see: `NotStarted`, `Live`, `InProgress`, `Completed`, `Closed`
* Missing: `Closed` state UI with read-only messaging

**Impact**: Respondent cannot accurately understand survey status.

---

**2. Multiple Active Questions**

* Current: Multiple questions are visible and interactive simultaneously
* Schema: Only **one question** may be `Active` at a time

**Impact**: Loss of focus, cognitive overload, and ambiguous completion state.

---

**3. Question State Visibility**

* Current: Question states are inferred, not visible
* Required states: `Disabled`, `Active`, `Completed`, `Skipped`, `Commented`

**Impact**: Respondent cannot understand progress or interaction state per question.

---

**4. Page State Visibility**

* Current: No page-level state indicators
* Required: `NotVisited`, `Active`, `Completed`

**Impact**: Respondent lacks awareness of page progression and position in the flow.

---

### 11.2 Major Gaps (Respondent POV)

**5. Missing Question Types**

* Current: Likert Scale only
* Missing: `Single Choice`, `Multiple Choice`, `Rating`, `Open Text`

**Impact**: Respondent cannot provide valid responses for all survey intents.

---

**6. Missing Edge-State Feedback**

* No closed-survey message
* No session timeout recovery messaging
* No network failure feedback

**Impact**: Broken or confusing experience during interruptions or failures.

---

**7. Incorrect Progress Representation**

* Current: Percentage-only progress indicator
* Required: Contextual progress (e.g., `Page X of Y · A of 10 answered`)

**Impact**: Progress feels abstract and disconnected from actual effort.

---

### 11.3 Explicitly Excluded (Not Respondent-Facing)

The following are intentionally excluded from this section:

* Backend identifiers (`surveyInstanceId`, `surveyId`, `responseId`)
* Persistence metadata (`isAutoSaved`, `lastSavedAt`, `answeredAt`)
* System timestamps (`startedAt`, `submittedAt`)
* Admin or creator workflows (survey creation, configuration, analytics)

---

### 11.4 Priority Fix Order (Respondent Experience)

1. State model visibility (including `Closed`)
2. Enforce single active question
3. Question and page state indicators
4. Missing question types
5. Edge-state handling and feedback
6. Correct progress representation

---

**Document Type**: Enculture Design System — Product Architecture Schema
**Owner**: Product Architecture / Lead Designer
**Status**: Canonical
