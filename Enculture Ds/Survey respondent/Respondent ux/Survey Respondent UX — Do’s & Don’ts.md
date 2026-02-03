# Survey Respondent UX — Do’s & Don’ts

NOTE FOR AI & IMPLEMENTERS

This document defines respondent UX principles and behavioral guidance.
It is NOT a protocol, NOT a schema, and NOT a design system contract.

Use this file to:
- Guide UX decisions
- Resolve ambiguity
- Avoid respondent anti-patterns

Do NOT:
- Treat this as validation logic
- Treat this as enforcement rules
- Override schemas or design system tokens based on this file

---

## Goal

Help respondents complete surveys honestly, comfortably, and without anxiety.

Respondents should feel:
- Calm
- Safe
- Unobserved
- In control

---

## ✅ DOs

### 1. Keep the experience calm and non-evaluative
- Use neutral, human language
- Avoid urgency or performance cues
- Let respondents proceed at their own pace

Good examples:
- “Question 3 of 10”
- “Optional & anonymous”
- “You can skip optional questions”

---

### 2. Orient respondents without judging them
- Show where they are in the survey
- Use simple, contextual progress cues

Recommended:
- “Question 4 of 12”

Avoid:
- Percentages
- Scores
- Completion pressure

---

### 3. Make saving invisible and trustworthy
- Auto-save responses silently
- Only surface reassurance when needed

Acceptable feedback:
- “Saved”
- “All changes saved”

---

### 4. Encourage comments using safety, not pressure
- Frame comments as adding context, not explanation
- Reassure anonymity before vulnerability

Recommended pattern:
- Label: “Add context (optional & anonymous)”
- Reveal privacy reassurance on first intent (focus or typing):
  “Your response is anonymous and reviewed only in aggregate.”

---

### 5. Use gentle motion and clear visual hierarchy
- Subtle fades or transitions only
- One primary focus at a time
- Muted styling for inactive elements

---

### 6. Respect attention and emotional energy
- One primary action per screen
- Minimal visual noise
- Avoid competing indicators

---

## ❌ DON’Ts

### 1. Don’t make respondents feel evaluated
Avoid language such as:
- “Analyzing”
- “Scoring”
- “Measuring”
- “Performance”
- “Assessment”

---

### 2. Don’t show system mechanics during answering
- No loading bars
- No computation indicators
- No progress percentages

Respondents do not need to see the system working.

---

### 3. Don’t use traffic-signal metaphors
Avoid:
- Red for required
- Green for optional or completion

These introduce anxiety and behavioral bias.

---

### 4. Don’t pressure comments
Avoid:
- “Explain your answer”
- “Why?”
- Long empty text areas without guidance

Never require comments unless absolutely necessary.

---

### 5. Don’t gamify surveys
Avoid:
- Badges
- Points
- Celebration animations
- Rewards

Surveys depend on trust, not motivation mechanics.

---

### 6. Don’t overload respondents with instructions
- Fewer words are better than more
- Support through design, not explanation
- Let the interface do the work

---

## One rule to remember

Respondents should feel guided, not watched —  
supported, not tested.

If a design causes hesitation, pressure, or self-censorship,
it is a signal to simplify and soften the experience.
