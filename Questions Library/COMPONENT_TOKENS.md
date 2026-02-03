# Component Tokens Documentation

This document describes the component token system based on Figma component variables, designed to work with Radix UI and shadcn/ui components.

**Figma Design**: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=842-49172

## Overview

Component tokens bridge the gap between Figma component variables and our design system tokens. They provide:
- Component-specific sizing, spacing, and styling
- Consistent mapping from Figma variables to CSS variables
- Type-safe token access
- Integration with Radix UI and shadcn/ui

## File Structure

- `lib/component-tokens.ts` - Component token definitions
- `components.json` - shadcn/ui configuration
- `lib/utils.ts` - Utility functions (cn helper for class merging)

## Token Categories

### Input Component Tokens

Input components use these tokens for consistent sizing and styling:

```typescript
InputTokens.sizes.mini    // height: 24px
InputTokens.sizes.small   // height: 32px
InputTokens.sizes.regular // height: 36px (default)
InputTokens.sizes.large   // height: 40px

InputTokens.colors.background    // Input background
InputTokens.colors.foreground    // Input text color
InputTokens.colors.border        // Input border
InputTokens.colors.placeholder   // Placeholder text
InputTokens.colors.disabled      // Disabled state
InputTokens.colors.error         // Error state

InputTokens.radius.default  // 16px (Soft Atmospheric theme)
InputTokens.radius.round    // 9999px (rounded variant)

InputTokens.focus.ring      // Focus ring color
InputTokens.focus.ringWidth // Focus ring width
```

### Button Component Tokens

Button sizing and styling:

```typescript
ButtonTokens.sizes.sm  // height: 32px
ButtonTokens.sizes.md  // height: 36px
ButtonTokens.sizes.lg  // height: 40px

ButtonTokens.radius.default  // 9999px (Full pill - Soft Atmospheric)
ButtonTokens.radius.sm       // 8px
ButtonTokens.radius.lg       // 16px
```

### Typography Tokens

Font families, sizes, weights, and line heights:

```typescript
TypographyTokens.fontFamily.body    // Poppins
TypographyTokens.fontFamily.heading // Poppins
TypographyTokens.fontFamily.mono    // Roboto Mono

TypographyTokens.sizes.h1       // Heading 1 styles
TypographyTokens.sizes.h2       // Heading 2 styles
TypographyTokens.sizes.body     // Body text styles
TypographyTokens.sizes.bodySm   // Small body text
TypographyTokens.sizes.caption  // Caption text
```

### Spacing Tokens

Consistent spacing scale:

```typescript
SpacingTokens.xs    // 8px
SpacingTokens.sm    // 12px
SpacingTokens.md    // 16px
SpacingTokens.lg    // 24px
SpacingTokens.xl    // 32px
SpacingTokens['2xl'] // 48px
```

### Radius Tokens

Border radius values:

```typescript
RadiusTokens.sm   // 4px
RadiusTokens.md   // 8px
RadiusTokens.lg   // 16px (Inputs)
RadiusTokens.xl   // 32px (Cards)
RadiusTokens.full // 9999px (Buttons/Pills)
```

### Shadow Tokens

Elevation and shadow effects:

```typescript
ShadowTokens.xs         // Subtle shadow
ShadowTokens.focus      // Focus ring shadow
ShadowTokens.focusError // Error focus shadow
```

### Color Tokens

Component color mappings:

```typescript
ComponentColorTokens.foreground          // Primary text
ComponentColorTokens['muted-foreground'] // Muted text
ComponentColorTokens.border              // Border color
ComponentColorTokens.input               // Input background
ComponentColorTokens.ghost               // Transparent variant
ComponentColorTokens.destructive         // Error/destructive color
```

### Component Variants

Common component variant styles:

```typescript
ComponentVariants.default      // Primary/default variant
ComponentVariants.destructive  // Error/danger variant
ComponentVariants.outline      // Outlined variant
ComponentVariants.secondary    // Secondary variant
ComponentVariants.ghost        // Transparent/ghost variant
ComponentVariants.link         // Link variant
```

## Usage in Components

### Using Tokens in TypeScript

```typescript
import { InputTokens, getComponentToken } from '@/lib/component-tokens';

// Direct access
const inputHeight = InputTokens.sizes.regular.height; // "36px"

// Dynamic access
const token = getComponentToken('input', 'sizes.regular.height');
```

### Using Tokens in CSS/Tailwind

Component tokens are available as CSS variables in `theme.ts`:

```css
.my-input {
  height: var(--input-height-regular);
  padding: 0 var(--input-padding-x);
  border-radius: var(--input-radius-default);
  background-color: var(--surface-card);
  border: 1px solid var(--border-subtle);
}

.my-input:focus {
  outline: none;
  box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
}
```

### Using with shadcn/ui Components

When creating shadcn/ui components, use the token system:

```typescript
import { cn } from '@/lib/utils';
import { InputTokens } from '@/lib/component-tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'mini' | 'small' | 'regular' | 'large';
}

export const Input = ({ size = 'regular', className, ...props }: InputProps) => {
  const sizeConfig = InputTokens.sizes[size];
  
  return (
    <input
      className={cn(
        'border border-[var(--border-subtle)]',
        'bg-[var(--surface-card)]',
        'text-[var(--text-primary)]',
        'rounded-[var(--input-radius-default)]',
        'focus:outline-none focus:ring-2',
        'focus:ring-[var(--focus-ring-color)]',
        className
      )}
      style={{
        height: sizeConfig.height,
        paddingLeft: sizeConfig.paddingX,
        paddingRight: sizeConfig.paddingX,
        fontSize: sizeConfig.fontSize,
        lineHeight: sizeConfig.lineHeight,
      }}
      {...props}
    />
  );
};
```

## Mapping from Figma Variables

### Figma Variable → Design System Token

| Figma Variable | Design System Token | Value |
|---------------|---------------------|-------|
| `general/foreground` | `--text-primary` | #16141a |
| `general/border` | `--border-subtle` | #e5e5e5 |
| `general/input` | `--surface-card` | #ffffff |
| `general/muted foreground` | `--text-muted` | #737373 |
| `general/secondary` | `--surface-raised` | #e7e1f2 |
| `semantic/md` | `--space-md` | 16px |
| `semantic/2xl` | `--space-xl` | 32px |
| `semantic/rounded-sm` | `--radius-sm` | 4px |
| `semantic/rounded-lg` | `--radius-md` | 8px |
| `semantic/rounded-full` | `--radius-full` | 9999px |
| `focus/ring` | `--focus-ring-color` | #cbd5e1 |
| `focus/ring error` | `--focus-ring-error` | #fca5a5 |

## Design System Integration

All component tokens reference design system tokens (defined in `theme.ts`), ensuring:
- Consistency across components
- Easy theme switching (light/dark mode)
- Responsive scaling
- Single source of truth for design values

## Next Steps

1. Install Radix UI dependencies for specific components (Input, Button, etc.)
2. Create shadcn/ui component implementations using these tokens
3. Build question components on top of these base components
4. Maintain token synchronization with Figma updates

