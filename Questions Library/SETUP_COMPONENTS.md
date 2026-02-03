# Component System Setup

This document outlines the component token system setup based on Figma component variables, using Radix UI and shadcn/ui as the base.

## Overview

The component system is built on:
- **Design System Tokens** (`theme.ts`) - Base design tokens from the main Figma design system
- **Component Tokens** (`lib/component-tokens.ts`) - Component-specific tokens extracted from Figma component variables
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Copy-paste component library built on Radix UI

## Figma Sources

1. **Main Design System**: https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system
   - Base design tokens (colors, typography, spacing, etc.)
   - Defined in `theme.ts`

2. **Component Variables**: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=842-49172
   - Input component variables
   - Component-specific sizing, spacing, and styling
   - Defined in `lib/component-tokens.ts`

## File Structure

```
Questions Library/
├── theme.ts                    # Main design system tokens
├── lib/
│   ├── component-tokens.ts     # Component-specific tokens from Figma
│   └── utils.ts                # Utility functions (cn helper)
├── components.json             # shadcn/ui configuration
├── tailwind.config.js          # Tailwind config with design tokens
└── components/                 # Component implementations (to be created)
    └── ui/                     # shadcn/ui base components (to be created)
```

## Installed Dependencies

The following dependencies have been installed for shadcn/ui and Radix UI:

```json
{
  "@radix-ui/react-slot": "^1.1.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
```

## Token System Architecture

### Tier 1: Primitives
Raw color values (e.g., `Primitives.EnBrand[600]`)

### Tier 2: Semantic Tokens
CSS variables that reference primitives (e.g., `--action-bg-primary`)
- Defined in `theme.ts` → `getSemanticTokens()`
- Applied to document root via `applyTheme()`

### Tier 3: Component Tokens
Component-specific tokens that reference semantic tokens
- Defined in `lib/component-tokens.ts`
- Maps Figma component variables to design system tokens
- Provides component sizing, spacing, and variant definitions

## Component Token Categories

### Input Tokens
- Sizes: mini (24px), small (32px), regular (36px), large (40px)
- Colors: background, foreground, border, placeholder, disabled, error
- Radius: default (16px), round (9999px)
- Focus: ring color, width, offset

### Button Tokens
- Sizes: sm (32px), md (36px), lg (40px)
- Radius: default (9999px - full pill), sm (8px), lg (16px)

### Typography Tokens
- Font families: body (Poppins), heading (Poppins), mono (Roboto Mono)
- Sizes: h1, h2, h3, h4, body, bodySm, caption
- Weights: regular (400), medium (500), semibold (600), bold (700)

### Spacing Tokens
xs (8px), sm (12px), md (16px), lg (24px), xl (32px), 2xl (48px)

### Radius Tokens
sm (4px), md (8px), lg (16px), xl (32px), full (9999px)

### Shadow Tokens
xs, sm, md, lg, xl, 2xl, focus, focus-error

### Component Variants
default, destructive, outline, secondary, ghost, link

## Usage Example

### Creating a Component with Tokens

```typescript
import { cn } from '@/lib/utils';
import { InputTokens } from '@/lib/component-tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: 'mini' | 'small' | 'regular' | 'large';
  variant?: 'default' | 'error';
}

export const Input = ({ 
  size = 'regular', 
  variant = 'default',
  className, 
  ...props 
}: InputProps) => {
  const sizeConfig = InputTokens.sizes[size];
  const isError = variant === 'error';
  
  return (
    <input
      className={cn(
        // Base styles using design system tokens
        'bg-[var(--surface-card)]',
        'text-[var(--text-primary)]',
        'border rounded-[var(--input-radius-default)]',
        'focus:outline-none focus:ring-2',
        
        // Variant styles
        isError 
          ? 'border-[var(--border-error)] focus:ring-[var(--focus-ring-error)]'
          : 'border-[var(--border-subtle)] focus:ring-[var(--focus-ring-color)]',
        
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

## Next Steps

1. **Install Tailwind CSS** (if using Tailwind build process):
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Install Radix UI primitives** for specific components:
   ```bash
   npm install @radix-ui/react-label
   npm install @radix-ui/react-checkbox
   npm install @radix-ui/react-radio-group
   # ... etc for other components
   ```

3. **Set up shadcn/ui** (if using shadcn CLI):
   ```bash
   npx shadcn-ui@latest init
   ```

4. **Create base components** using the token system:
   - Input component
   - Button component
   - Label component
   - Checkbox component
   - Radio group component
   - etc.

5. **Build question components** on top of base components:
   - TextQuestion (uses Input)
   - MultipleChoiceQuestion (uses Checkbox/Radio)
   - RatingQuestion (custom component)
   - etc.

## Design System Rules

All components should follow these rules from the Soft Atmospheric theme:

- **Input Radius**: 16px (`--radius-lg`)
- **Button Radius**: 9999px (full pill - `--radius-full`)
- **Card Radius**: 32px (`--radius-xl`)
- **Focus Ring**: 2px width with design system focus color
- **Colors**: Use semantic tokens, not hardcoded values
- **Spacing**: Use spacing tokens, not hardcoded values
- **Typography**: Use typography tokens for font sizes, weights, line heights

## Token Reference

See `COMPONENT_TOKENS.md` for detailed token documentation and `DESIGN_SYSTEM.md` for design system token reference.

