# Enculture Design System — Component Display

This folder contains a **shareable component display** for the Enculture Design System. Use it to publish to git and share with teams or stakeholders.

## Contents

| File | Purpose |
|------|--------|
| `index.html` | Single-file showcase of DS components, actions, inputs, dashboard colors, and structural primitives |
| `component-gallery.html` | **Component Gallery** — single live reference for all Enculture UI components (Atoms, Molecules, Organisms, System) with dummy data; all variants and states where applicable |

## How to use

1. **Local view**  
   Open `index.html` in a browser. It references `../Enculture Ds/enculture.css`, so keep the repo structure when cloning:
   ```
   repo/
   ├── Enculture Ds/
   │   └── enculture.css
   └── component-display/
       ├── index.html
       ├── component-gallery.html
       └── README.md
   ```

2. **Publish to git**  
   Commit and push the `component-display` folder (and the `Enculture Ds` folder if not already in the repo). Anyone who clones the repo can open `component-display/index.html` locally.

3. **Share**  
   Share the repo link or the path to `component-display/index.html`. Recipients need the `Enculture Ds` folder in the same relative position for styles to load.

## What is shown

- **Actions** — `enc-action-primary`, `enc-action-secondary`
- **Input** — `enc-input-field`
- **Dashboard status colors** — Completed (Green 500), In Progress (Yellow 400), Pending (Coral 500), eye-safe ≥400
- **Chart / heatmap families** — Green scale (200→400→600) example (e.g. Peak Participation Hours)
- **Structural** — `enc-header`, `enc-main-container`, `enc-card`, `enc-divider`

All styling uses Enculture DS tokens and semantics. Display-only button/card styles in `index.html` use `var(--en-*)` only.

## Governance

- **Source of truth:** `Enculture Ds/enculture.css`, `Enculture Ds/En-AI_Design_System.md`, `Enculture Ds/En Dashboard Pastels.md`
- **Dashboard colors:** Eye-safety rule — charts ≥400; heatmaps may use 200→600 scale (single family).
