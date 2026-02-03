# Dialog (Modal) Component Rules — Authoritative

**Source of Truth**: [Figma Dialog Component](https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4072-1833&m=dev)

This document defines the authoritative specifications for the Dialog (Modal) component based on the Figma design system. All implementations MUST follow these rules exactly.

---

## Component Overview

**Component Name**: `EncDialog`  
**Type**: Organism-level component  
**Figma Source**: [EN-AI-components--Molecules--](https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4072-1833&m=dev)

---

## Container Specifications

### Dimensions
- **Width**: `540px` (fixed, per user specification)
- **Height**: `auto` (content-based, no fixed height)
- **Max Width**: `540px` (matches width)
- **Min Height**: `auto` (content-based)

### Spacing & Padding
- **Padding**: `32px` (all sides)
- **Gap**: `0px` (no default gap, spacing handled manually)

### Border & Radius
- **Border Width**: `1px`
- **Border Radius**: `32px` (Squircular - signature "Soft" look)
- **Border Color**: 
  - Brand-confirmation: `var(--action-bg-primary)` (#7C3AED - Electric Violet)
  - Destructive-warning: `var(--border-subtle)`

### Shadow & Elevation
- **Box Shadow**: `var(--shadow-xl)` 
  - Light mode: `0px 12px 32px rgba(124, 58, 237, 0.08)` (Violet-tinted glow)
  - Dark mode: `0px 20px 25px rgba(0, 0, 0, 0.3)`
- **Elevation**: Modal level (Z-Index: 1300)

### Background
- **Background Color**: `var(--surface-card)` (#FFFFFF - Pure White)

### Overlay
- **Background Color**: 
  - Brand-confirmation: `rgba(124, 58, 237, 0.15)` (Atmospheric violet tint)
  - Destructive-warning: `rgba(0, 0, 0, 0.5)` (Standard overlay)

---

## Typography Specifications

### Title (DialogTitle)
- **Font Size**: `20px`
- **Font Weight**: `600` (Semibold)
- **Line Height**: `110%` (Tight)
- **Letter Spacing**: `-0.01em` (Tight)
- **Color**: `#1D1A22` (grey.800 - EnNaturalGray.800)
- **Font Family**: `var(--en-font-family-base)` (Poppins)

### Main Message Text
- **Font Size**: `16px`
- **Font Weight**: `600` (Semibold)
- **Line Height**: `150%` (Normal)
- **Letter Spacing**: `0em` (Normal)
- **Color**: `#1D1A22` (grey.800 - EnNaturalGray.800)
- **Font Family**: `var(--en-font-family-base)` (Poppins)

### Body Text (Bullet Points & Description)
- **Font Size**: `16px`
- **Font Weight**: `400` (Regular)
- **Line Height**: `150%` (Normal)
- **Letter Spacing**: `0em` (Normal)
- **Color**: `#484354` (EnThemeGray.700)
- **Font Family**: `var(--en-font-family-base)` (Poppins)

### Confirmation Question
- **Font Size**: `16px`
- **Font Weight**: `400` (Regular), `600` (Semibold) for emphasized word
- **Line Height**: `150%` (Normal)
- **Letter Spacing**: `0em` (Normal)
- **Color**: `#484354` (EnThemeGray.700)
- **Font Family**: `var(--en-font-family-base)` (Poppins)

---

## Icon Specifications

### Header Icon
- **Size**: `24px` × `24px`
- **Color**: `#A3A3A3` (EnNaturalGray.400 - Light grey)
- **Display**: Flex, centered
- **Flex Shrink**: `0`

### Close Button Icon
- **Size**: `20px` × `20px`
- **Color**: `#FFFFFF` (White)
- **Background**: `var(--state-info)` (Teal)
- **Button Size**: `44px` × `44px` (minimum touch target)
- **Border Radius**: `var(--radius-full)` (9999px - Full circle)
- **Position**: Top-right corner
- **Z-Index**: `10`

---

## Button Specifications

### Primary Action Button
- **Font Size**: `16px`
- **Font Weight**: `600` (Semibold)
- **Line Height**: `150%` (Normal)
- **Letter Spacing**: `0em` (Normal)
- **Padding**: `12px 24px`
- **Border Radius**: `var(--radius-full)` (9999px - Full pill)
- **Background Color**: 
  - Brand-confirmation: `var(--action-bg-primary)` (#7C3AED - Electric Violet)
  - Destructive-warning: `var(--state-error)` (Red)
- **Text Color**: `var(--action-text-on-primary)` (#FFFFFF - White)
- **Border**: `none`
- **Box Shadow**: `var(--shadow-sm)` (for brand-confirmation only)
- **Min Width**: `100px`
- **Alignment**: Right-aligned in footer

### Secondary Action Button
- **Font Size**: `16px`
- **Font Weight**: `500` (Medium)
- **Line Height**: `150%` (Normal)
- **Letter Spacing**: `0em` (Normal)
- **Padding**: `12px 24px`
- **Border Radius**: `var(--radius-full)` (9999px - Full pill)
- **Background Color**: `var(--surface-card)` (#FFFFFF - White)
- **Text Color**: `var(--text-primary)` (#1D1A22 - Dark grey)
- **Border**: `1px solid var(--action-bg-primary)` (#7C3AED - Purple border)
- **Min Width**: `100px`
- **Alignment**: Left-aligned in footer

---

## Layout Structure

### Header Section
- **Layout**: Flexbox, `justify-content: space-between`, `align-items: start`
- **Gap**: `12px` (between icon and title)
- **Margin Bottom**: `var(--space-md)` (if description/children exist)

### Content Section
- **Layout**: Flexbox column
- **Gap**: `0px` (spacing handled manually)
- **Margin Bottom**: `var(--space-md)` (between items)

### Footer Section (Actions)
- **Layout**: Flexbox, `justify-content: flex-end`
- **Gap**: `var(--space-md)` (between buttons)
- **Margin Top**: `var(--space-md)`
- **Width**: `100%`

---

## Intent Variants

### Brand-Confirmation
- **Border Color**: Purple (`var(--action-bg-primary)`)
- **Shadow**: Violet-tinted glow (`var(--shadow-xl)`)
- **Overlay**: Atmospheric violet tint (`rgba(124, 58, 237, 0.15)`)
- **Primary Action**: Purple background (`var(--action-bg-primary)`)

### Destructive-Warning
- **Border Color**: Subtle border (`var(--border-subtle)`)
- **Shadow**: Standard shadow (`var(--shadow-xl)` without violet tint)
- **Overlay**: Standard overlay (`rgba(0, 0, 0, 0.5)`)
- **Primary Action**: Red background (`var(--state-error)`)

### Neutral
- **Border Color**: Subtle border (`var(--border-subtle)`)
- **Shadow**: Standard shadow (`var(--shadow-xl)`)
- **Overlay**: Standard overlay (`rgba(0, 0, 0, 0.5)`)
- **Primary Action**: Purple background (`var(--action-bg-primary)`)

---

## Semantic Token Mapping

All values MUST use semantic tokens from `theme.ts` where available:

```typescript
// Container
padding: '32px' // Fixed value per Figma
borderRadius: '32px' // Fixed value per Figma (not --radius-xl which is 24px)
width: '540px' // Fixed value per user specification
borderWidth: 'var(--border-width-sm)' // 1px

// Colors
backgroundColor: 'var(--surface-card)' // #FFFFFF
borderColor: 'var(--action-bg-primary)' // #7C3AED (brand-confirmation)
textColor: '#1D1A22' // Exact grey.800 (no semantic token available)
textSecondaryColor: '#484354' // Exact EnThemeGray.700 (no semantic token available)

// Typography
fontFamily: 'var(--en-font-family-base)' // Poppins
fontSize: '20px' // Title (h6 equivalent)
fontSize: '16px' // Body text (body equivalent)
fontWeight: '600' // Semibold
fontWeight: '500' // Medium
fontWeight: '400' // Regular

// Spacing
gap: 'var(--space-md)' // Between elements
marginBottom: 'var(--space-md)' // Content spacing
padding: '12px 24px' // Button padding (fixed per Figma)

// Shadows
boxShadow: 'var(--shadow-xl)' // Violet-tinted glow
boxShadow: 'var(--shadow-sm)' // Button shadow

// Radius
borderRadius: 'var(--radius-full)' // 9999px for buttons
```

---

## Implementation Checklist

- [ ] Width set to `540px` (fixed)
- [ ] Height set to `auto` (content-based)
- [ ] Padding set to `32px` (all sides)
- [ ] Border radius set to `32px` (not `--radius-xl`)
- [ ] Border width set to `1px` (`var(--border-width-sm)`)
- [ ] Title font size: `20px`
- [ ] Body font size: `16px`
- [ ] Title color: `#1D1A22` (grey.800)
- [ ] Body color: `#484354` (EnThemeGray.700)
- [ ] Icon color: `#A3A3A3` (EnNaturalGray.400)
- [ ] Close button: Teal background, white icon, `44px` × `44px`
- [ ] Primary button: Purple background, white text, `12px 24px` padding
- [ ] Secondary button: White background, purple border, `12px 24px` padding
- [ ] Overlay: Violet tint for brand-confirmation
- [ ] Shadow: Violet-tinted glow for brand-confirmation

---

## Design System Integration

### Required Tokens from `theme.ts`

```typescript
// Surface
--surface-card: #FFFFFF

// Action
--action-bg-primary: #7C3AED (Electric Violet)
--action-text-on-primary: #FFFFFF

// Border
--border-width-sm: 1px
--border-subtle: (subtle border color)

// Shadow
--shadow-xl: 0px 12px 32px rgba(124, 58, 237, 0.08)
--shadow-sm: (small shadow)

// Radius
--radius-full: 9999px

// State
--state-info: (Teal color for close button)
--state-error: (Red color for destructive)

// Typography
--en-font-family-base: Poppins, sans-serif
```

---

## Notes

1. **Fixed Values**: Some values (like `32px` padding, `32px` border radius, `540px` width) are fixed per Figma design and should NOT use semantic tokens that might differ.

2. **Color Values**: Some colors (`#1D1A22`, `#484354`, `#A3A3A3`) are exact Figma values. Use these directly until semantic tokens are added to `theme.ts`.

3. **Font Sizes**: Use exact pixel values (`20px`, `16px`) per Figma design, not responsive tokens.

4. **Source of Truth**: This Figma file is the authoritative source. Any discrepancies should be resolved by checking the Figma design first.

---

**Last Updated**: Based on Figma design at node-id=4072-1833  
**Figma URL**: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4072-1833&m=dev



