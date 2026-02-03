# Enculture UX Guide — Platform-Wide Principles

NOTE FOR AI & IMPLEMENTERS

This document defines Enculture’s UX intent and experiential principles.
It is NOT a protocol, NOT a schema, and NOT a design system contract.

Use this guide to:
- Identify UX anti-patterns
- Resolve ambiguity when multiple solutions are technically valid
- Raise warnings when experience quality degrades

Do NOT:
- Treat this as enforcement logic
- Use this to block implementation
- Override schemas, permissions, or design system tokens

---

## Purpose

Enculture is a **culture intelligence platform**, not a productivity tool,
performance tracker, or engagement game.

Enculture UX exists to:
- Create psychological safety
- Reduce anxiety and cognitive load
- Encourage honest participation
- Support reflection, not reaction

If the interface feels evaluative, urgent, or performative,
the UX is misaligned — even if the implementation is correct.

---

## Core UX Principles (Non-Negotiable Intent)

### 1. Calm over clever
Enculture favors clarity, restraint, and predictability over novelty.

Avoid:
- Visual theatrics
- Clever but unclear interactions
- Excessive motion or emphasis

---

### 2. Guidance over control
Enculture guides users through complex tasks without making them feel constrained.

Avoid:
- Forcing paths unnecessarily
- Aggressive validation
- Locking users without explanation

---

### 3. Trust over persuasion
Enculture never pressures users into action.

Avoid:
- Urgency language
- Gamification
- Psychological nudging or dark patterns

---

### 4. Signal over noise
Every visual element must earn its place.

Avoid:
- Competing CTAs
- Redundant indicators
- Decorative elements that compete with content

---

### 5. Context over configuration
Enculture explains *why* something matters through context, not settings.

Avoid:
- Overloaded configuration panels
- Requiring users to “figure it out”

---

## Universal UX Do’s (Applies to All Modules)

- Use neutral, human language
- Make progress informational, not evaluative
- Show system confidence without exposing system mechanics
- Prefer defaults over decisions
- Reduce visual pressure in long or sensitive flows
- Keep focus on one primary task at a time

---

## Universal UX Don’ts (Applies to All Modules)

- Do not expose internal processing (“analyzing”, “scoring”) to end users
- Do not use traffic-signal metaphors (red/green) to imply judgment
- Do not gamify serious workflows
- Do not create artificial urgency
- Do not rely on color alone to convey meaning
- Do not overload screens with simultaneous actions

---

## Red-Flag Indicators (For Review & AI Warning)

If any of the following occur, UX alignment should be questioned:

- The UI feels like an evaluation or test
- Users may feel watched or monitored
- Progress feels like performance tracking
- Language implies judgment or scoring
- Users are rushed toward completion
- System behavior is overly visible
- Emotional effort feels higher than task complexity

These are **warnings**, not errors — but they require review.

---

## Explicit Non-Goals of Enculture UX

Enculture UX will NOT optimize for:
- Engagement metrics
- Gamification
- Habit-forming mechanics
- Conversion tricks
- Artificial delight
- Competitive comparison

Enculture optimizes for:
- Trust
- Honesty
- Completion confidence
- Psychological safety

---

## Relationship to Other Documents

- This guide is platform-wide
- Persona-specific guidance (e.g., Respondent UX Do’s & Don’ts)
  may add nuance but must not contradict this intent
- Design System and schemas define *how*
  This guide defines *why*

---

## One Principle to Remember

Enculture should feel like a **thoughtful facilitator**,  
not a **manager, judge, or machine**.

If the UX makes people hesitate, self-edit, or rush,
it is a signal to simplify and soften.
