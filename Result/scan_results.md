# Comprehensive Audit Report: HTML Files vs. WCAG & Design System

**Scope:** 18 HTML Files (Full Project)
**Date:** 2026-01-19
**Status:** ⚠️ **DEVIATION DETECTED** (Governance) / ✅ **PASS** (Accessibility)

## 1. Executive Summary
The comprehensive scan of all 18 project HTML files reveals a **systematic deviation** in the color palette used for Navigation and Layouts.
The implementation uses a custom "Dark Purple" (`#392A48`) that **does not exist** in the Design System.

*   **Design System Requirement:** `--en-brand-900: #2e1065` (Deep Violet)
*   **Actual Implementation:** `#392A48` (Slate Purple)
*   **Impact:** The implementation is consistent *internally*, but inconsistent with the *Design System*.

## 2. Token Compliance Audit (The 'Vibe' Check)

### 🔴 Critical Deviation: The 'Dark Purple' Phantom
Every single HTML file contains hardcoded styles referencing `#392A48`.

| Context | Implementation (Found in 18/18 files) | Design System Token (Required) | Status |
| :--- | :--- | :--- | :--- |
| **Sidebar Text** | `#392A48` | `--en-brand-900` (`#2e1065`) | 🔴 **Governance Fail** |
| **Active Nav Bg** | `rgba(177, 156, 217, 0.2)` | `--en-brand-100` (`#ede9fe`) | 🔴 **Governance Fail** |
| **Logo Text** | `#392A48` | `--en-text-brand` (`#6d28d9`) | 🔴 **Governance Fail** |

**Recommendation:**
Replace `#392A48` with `var(--en-brand-900)` to align with the system, OR update the Design System to include this specific purple if it is desired.

### ⚠️ Structural Deviations
| Feature | Implementation | Design System Token | Status |
| :--- | :--- | :--- | :--- |
| **User Profile Radius** | `border-radius: 12px` | `--en-radius-md` (`8px`) | ⚠️ **Minor Fail** |
| **Sidebar Width** | `280px` | Explicit `280px` allowed? | ℹ️ **Review** |

## 3. WCAG 2.1 AA Accessibility Scan

### ✅ Contrast Analysis
Ironically, the **deviating color** (`#392A48`) performs **better** than the official Brand colors for accessibility.

1.  **Deviating Dark Purple** (`#392A48`) on White:
    *   Contrast Ratio: **13.5:1**
    *   WCAG AA: ✅ **PASS** (Excellent)
    *   WCAG AAA: ✅ **PASS**

2.  **Deviating Dark Purple** (`#392A48`) on Lavender (`#f3eeff`):
    *   Contrast Ratio: **~11.5:1**
    *   WCAG AA: ✅ **PASS**

### ⚠️ Semantic Risks
*   **SVG Icons:** Many SVGs in the sidebar are decorative (good), but ensuring parent `<button>` or `<a>` tags have `aria-label` is critical.
    *   *Found:* `<button class="sidebar-toggle" aria-label="Collapse sidebar">` ✅ **Good Practice**.
    *   *Found:* `<a class="nav-item">...<span class="nav-item-label">Chat</span>...</a>` ✅ **Good Practice**.

## 4. File-by-File Breakdown
The following files were scanned and all exhibit the `#392A48` deviation:
*   `Enculture - Classifiers.html`
*   `Enculture - AI Culture Intelligence Platform.html`
*   `Enculture - Settings.html`
*   ...and [15] others.

## 5. Next Steps
1.  **Decision:** Should the Design System adopt `#392A48` as `--en-brand-900`? It is more desaturated than the current `#2e1065`.
2.  **Refactor:** If sticking to DS, run a global Find & Replace:
    *   Find: `#392A48` -> Replace: `var(--en-brand-900)`
    *   Find: `rgba(177, 156, 217, ...)` -> Replace: `var(--en-brand-100)`
