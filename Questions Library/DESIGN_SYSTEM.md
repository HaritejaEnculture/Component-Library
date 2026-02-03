# Design System Documentation

This project uses the **Enculture AI Design System** tokens based on the Figma Design System.

**Figma Design System**: https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system

## Token Structure

The design system is organized into three tiers:

### Tier 1: Primitives
Raw color values, defined in `theme.ts` as `Primitives` object:
- **EnNaturalGray** - Base neutral grays (50-900, white, black)
- **EnThemeGray** - Theme-specific grays (50-900)
- **EnBrand** - Primary brand color (Purple/Violet) (50-900)
- **EnSuccess** - Success states (Green) (50-900)
- **EnWarning** - Warning states (Yellow/Orange) (50-900)
- **EnError** - Error states (Red) (50-900)
- **EnInfo** - Informational states (Blue) (50-900)
- **EnTeal** - Teal color scale (50-900)
- **EnPurple** - Purple color scale (50-900)
- **ImagePastels** - Pastel color palette for visualizations

### Tier 2: Semantic Tokens
CSS variables that reference primitives, defined via `getSemanticTokens()`:

#### Surface (Backgrounds)
- `--surface-page` - Page background (#F3F0F9 in light mode)
- `--surface-card` - Card background (#FFFFFF in light mode)
- `--surface-raised` - Raised surface
- `--surface-inset` - Inset surface
- `--surface-overlay-tooltip` - Tooltip background

#### Text
- `--text-primary` - Primary text color
- `--text-secondary` - Secondary text color
- `--text-muted` - Muted text color
- `--text-brand` - Brand text color
- `--text-on-primary` - Text on primary background

#### Icons
- `--icon-default` - Default icon color
- `--icon-strong` - Strong icon color
- `--icon-disable` - Disabled icon color
- `--icon-brand` - Brand icon color

#### Actions (Buttons, Links)
- `--action-bg-primary` - Primary button background
- `--action-text-on-primary` - Text on primary button
- `--action-bg-subtle` - Subtle action background
- `--action-text-subtle` - Subtle action text
- `--action-border-focus` - Focus border color
- `--action-bg-hover` - Hover state background
- `--action-bg-active` - Active state background

#### Borders
- `--border-subtle` - Subtle border
- `--border-strong` - Strong border
- `--border-default` - Default border
- `--border-focus` - Focus border
- `--border-error` - Error border

#### State Colors
- `--state-success` / `--state-success-bg`
- `--state-error` / `--state-error-bg`
- `--state-warning` / `--state-warning-bg`
- `--state-info` / `--state-info-bg`

#### Typography
- `--en-font-family-base` - Primary font (Poppins)
- `--en-font-family-mono` - Monospace font (Roboto Mono)
- `--en-font-size-*` - Font sizes (h1, h2, h3, h4, headline, body, body-sm, caption, footnote)
- `--en-font-weight-*` - Font weights (regular: 400, medium: 500, semibold: 600, bold: 700)
- `--en-line-height-*` - Line heights (tight, normal, relaxed)
- `--en-letter-spacing-*` - Letter spacing (tight, normal, wide, summary)

#### Spacing
- `--space-xs` through `--space-2xl` - Responsive spacing scale
- Scales with viewport: small, medium, large

#### Border Radius
- `--radius-xl` - 32px (Primary cards - Soft Atmospheric theme)
- `--radius-lg` - 16px (Inputs, inner elements)
- `--radius-md` - 8px (Small elements)
- `--radius-sm` - 4px (Very small elements)
- `--radius-full` - 9999px (Pills, badges, buttons)

#### Shadows
- `--shadow-sm` through `--shadow-2xl` - Elevation shadows
- `--shadow-xl` uses violet-tinted glow: `0px 12px 32px rgba(124, 58, 237, 0.08)` (Soft Atmospheric theme)

#### Transitions
- `--transition-all` - Standard transition (0.3s)
- `--transition-fast` - Fast transition (0.15s)
- `--transition-slow` - Slow transition (0.5s)

#### Brand Colors
- `--brand-electric` - #7C3AED (Electric Violet - Primary Brand)
- `--brand-primary` - Primary brand color

#### Image Pastels
- `--pastel-green`, `--pastel-teal`, `--pastel-blue`, etc. - Pastel color palette

### Tier 3: Component Tokens
Component-specific tokens that use semantic tokens (defined as needed in components)

## Usage

### Applying the Theme

The theme is automatically applied in `index.tsx`:

```typescript
import { applyTheme } from './theme';

// Apply theme on app initialization
applyTheme('light', 'large'); // mode: 'light' | 'dark', viewport: 'small' | 'medium' | 'large'
```

### Using Tokens in CSS

```css
.my-component {
  background-color: var(--surface-card);
  color: var(--text-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  box-shadow: var(--shadow-xl);
  font-family: var(--en-font-family-base);
  font-size: var(--en-font-size-body);
}

.my-button {
  background-color: var(--action-bg-primary);
  color: var(--action-text-on-primary);
  border-radius: var(--radius-full);
  padding: var(--space-sm) var(--space-lg);
}
```

### Using Tokens in TypeScript/React

```typescript
import { getToken } from './theme';

const primaryColor = getToken('--action-bg-primary');
```

### Getting Token Values Programmatically

```typescript
import { getSemanticTokens, Primitives } from './theme';

// Get all tokens for a specific mode
const tokens = getSemanticTokens('light', 'large');

// Access primitives directly
const brand600 = Primitives.EnBrand[600]; // "#7C3AED"
```

## Theme Modes

- **Light Mode** (default) - Uses light color palette
- **Dark Mode** - Uses dark color palette

## Viewport Modes

Tokens scale with viewport:
- **Small** - Mobile devices
- **Medium** - Tablet devices
- **Large** (default) - Desktop devices

Font sizes and spacing automatically adjust based on viewport mode.

## Design System Principles

### Soft Atmospheric Theme (v2.1)
- **Page Background**: #F3F0F9 (Deep Violet Tint)
- **Card Surface**: #FFFFFF (Pure White)
- **Primary Brand**: #7C3AED (Electric Violet)
- **Card Radius**: 32px (Squircular - signature "Soft" look)
- **Button/Chip Radius**: 9999px (Full Pill)
- **Input Radius**: 16px
- **Card Shadow**: Violet-tinted glow `0px 12px 32px rgba(124, 58, 237, 0.08)`

### Typography
- **Primary Font**: Poppins
- **Monospace Font**: Roboto Mono
- Scales responsively with viewport

### Accessibility
- WCAG 2.1 AA compliant color contrasts
- Text primary: ~15.5:1 contrast ratio
- Text secondary: ~7.5:1 contrast ratio (WCAG AA pass)
- Text muted: ~4.6:1 contrast ratio (WCAG AA pass for normal text)

## Next Steps

When creating components, use the semantic tokens (CSS variables) rather than hardcoded values. This ensures consistency and allows for easy theme switching.

Example component structure:
```typescript
// Good ✅
<div style={{ 
  backgroundColor: 'var(--surface-card)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-md)'
}}>

// Bad ❌
<div style={{ 
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  padding: '20px'
}}>
```

