/**
 * Component Tokens - Mapping Figma Component Variables to Design System
 * 
 * Based on Figma Design: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=842-49172
 * 
 * These tokens are used for shadcn/ui components built on Radix UI primitives
 */

import { Primitives } from '../theme';

/**
 * Input Component Tokens
 * Extracted from Figma Input component variables
 */
export const InputTokens = {
  // Sizes
  sizes: {
    mini: {
      height: '24px',
      paddingX: '12px',
      fontSize: '14px',
      lineHeight: '21px',
    },
    small: {
      height: '32px',
      paddingX: '12px',
      fontSize: '14px',
      lineHeight: '21px',
    },
    regular: {
      height: '36px',
      paddingX: '12px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    large: {
      height: '40px',
      paddingX: '16px',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },

  // Colors (mapped to design system primitives - Updated from Figma)
  colors: {
    background: 'var(--surface-card)', // #ffffff (Figma: Background/Neutral/Primary)
    foreground: 'var(--text-primary)', // #1D1A22 (Figma: Text/Neutral/Primary)
    border: 'var(--border-subtle)', // #D8D4DF (Figma: Border/Neutral/Primary)
    placeholder: 'var(--text-muted)', // Muted text color
    disabled: {
      background: 'var(--surface-inset)', // Disabled state background
      foreground: 'var(--text-muted)', // Disabled text
      border: 'var(--border-subtle)',
    },
    error: {
      border: 'var(--border-error)', // Error border color
      foreground: 'var(--state-error)', // Error text color
    },
  },

  // Border Radius (Updated from Figma: rounded-sm=4, rounded-md=12, rounded-lg=16, rounded-full=9999)
  // Input fields use 16px per Soft Atmospheric theme (radius-lg)
  radius: {
    default: 'var(--radius-lg)', // 16px for inputs
    round: 'var(--radius-full)', // 9999px for rounded variant
    sm: 'var(--radius-sm)', // 8px
    md: 'var(--radius-md)', // 12px (updated from Figma)
  },

  // Focus States (Updated from Figma)
  focus: {
    ring: 'var(--focus-ring-color)', // #cbd5e1 (Figma: focus/ring)
    ringWidth: 'var(--focus-ring-width)', // 2px
    ringOffset: 'var(--focus-ring-offset)', // 2px
    ringOffsetColor: 'var(--surface-card)',
    errorRing: 'var(--focus-ring-error)', // #fca5a5 (Figma: focus/ring error)
  },

  // Shadows (from Figma shadow-xs)
  shadow: {
    xs: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    focus: '0 0 0 3px var(--action-border-focus)',
    errorFocus: '0 0 0 3px var(--state-error)',
  },
};

/**
 * Button Component Tokens
 */
export const ButtonTokens = {
  sizes: {
    sm: {
      height: '32px',
      paddingX: '12px',
      fontSize: '14px',
      lineHeight: '21px',
    },
    md: {
      height: '36px',
      paddingX: '16px',
      fontSize: '16px',
      lineHeight: '24px',
    },
    lg: {
      height: '40px',
      paddingX: '20px',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  radius: {
    default: 'var(--radius-full)', // 9999px - Full pill (Soft Atmospheric theme)
    sm: 'var(--radius-sm)', // 8px
    md: 'var(--radius-md)', // 12px (updated from Figma)
    lg: 'var(--radius-lg)', // 16px
  },
};

/**
 * Typography Component Tokens
 * From Figma: font-family-body (Inter/Poppins), font-family-headings (Inter/Poppins)
 * Note: We use Poppins as our primary font family
 */
export const TypographyTokens = {
  fontFamily: {
    body: 'var(--en-font-family-base)', // Poppins
    heading: 'var(--en-font-family-base)', // Poppins (same as body)
    mono: 'var(--en-font-family-mono)', // Roboto Mono
  },
  sizes: {
    h1: {
      fontSize: 'var(--en-font-size-h1)', // 64px
      lineHeight: 'var(--en-line-height-tight)', // 1.2 (updated from Figma)
      fontWeight: 'var(--en-font-weight-bold)',
      letterSpacing: '0px', // Updated from Figma
    },
    h2: {
      fontSize: 'var(--en-font-size-h2)', // 48px
      lineHeight: 'var(--en-line-height-tight)', // 1.2 (updated from Figma)
      fontWeight: 'var(--en-font-weight-regular)',
      letterSpacing: '0px',
    },
    h3: {
      fontSize: 'var(--en-font-size-h3)', // 40px (updated from Figma)
      lineHeight: 'var(--en-line-height-tight)', // 1.2 (updated from Figma)
      fontWeight: 'var(--en-font-weight-semibold)',
      letterSpacing: '0px',
    },
    h4: {
      fontSize: 'var(--en-font-size-h4)', // 32px (updated from Figma)
      lineHeight: 'var(--en-line-height-tight)', // 1.2 (updated from Figma)
      fontWeight: 'var(--en-font-weight-regular)',
      letterSpacing: 'var(--en-letter-spacing-tight)', // -0.03em (updated from Figma)
    },
    h5: {
      fontSize: 'var(--en-font-size-h5)', // 24px (added from Figma)
      lineHeight: 'var(--en-line-height-tight)', // 1.2
      fontWeight: 'var(--en-font-weight-regular)',
      letterSpacing: '0px',
    },
    h6: {
      fontSize: 'var(--en-font-size-h6)', // 20px (added from Figma)
      lineHeight: 'var(--en-line-height-tight)', // 1.2
      fontWeight: 'var(--en-font-weight-semibold)',
      letterSpacing: '0px',
    },
    body: {
      fontSize: 'var(--en-font-size-body)',
      lineHeight: 'var(--en-line-height-normal)',
      fontWeight: 'var(--en-font-weight-regular)',
      letterSpacing: '0px',
    },
    bodySm: {
      fontSize: 'var(--en-font-size-body-sm)', // 12px (updated from Figma)
      lineHeight: 'var(--en-line-height-normal)', // 1.4 (updated from Figma)
      fontWeight: 'var(--en-font-weight-regular)',
      letterSpacing: '0px',
    },
    caption: {
      fontSize: 'var(--en-font-size-caption)', // 12px
      lineHeight: 'var(--en-line-height-normal)', // 1.4 (updated from Figma)
      fontWeight: 'var(--en-font-weight-semibold)', // Updated from Figma
      letterSpacing: 'var(--en-letter-spacing-summary)', // 0.04em (updated from Figma)
    },
    footnote: {
      fontSize: 'var(--en-font-size-footnote)', // 12px
      lineHeight: 'var(--en-line-height-normal)', // 1.4
      fontWeight: 'var(--en-font-weight-semibold)', // Updated from Figma
      letterSpacing: 'var(--en-letter-spacing-summary)', // 0.04em (updated from Figma)
    },
  },
};

/**
 * Spacing Tokens (from Figma semantic tokens)
 */
export const SpacingTokens = {
  xs: 'var(--space-xs)', // 6px (large viewport)
  sm: 'var(--space-sm)', // 12px (large viewport) - Updated from Figma var(--sds-size-space-200) = 8px
  md: 'var(--space-md)', // 16px (large viewport) - Updated from Figma var(--sds-size-space-300) = 12px, var(--sds-size-space-400) = 16px
  lg: 'var(--space-lg)', // 24px (large viewport) - Updated from Figma var(--sds-size-padding-xl) = 24px
  xl: 'var(--space-xl)', // 32px (large viewport)
  '2xl': 'var(--space-2xl)', // 48px (large viewport)
  '3xl': 'var(--space-3xl)', // 64px (large viewport) - Updated from Figma var(--sds-size-space-1600) = 64px
};

/**
 * Border Radius Tokens (from Figma)
 */
export const RadiusTokens = {
  xs: 'var(--radius-xs)', // 4px (very small elements)
  sm: 'var(--radius-sm)', // 8px (updated from Figma var(--sds-size-radius-200))
  md: 'var(--radius-md)', // 12px (updated from Figma Radius/M)
  lg: 'var(--radius-lg)', // 16px
  xl: 'var(--radius-xl)', // 24px (updated from Figma Radius/XL)
  full: 'var(--radius-full)', // 9999px (semantic/rounded-full)
};

/**
 * Shadow Tokens (from Figma shadow variables)
 */
export const ShadowTokens = {
  xs: '0px 1px 2px rgba(0, 0, 0, 0.05)', // shadow-xs from Figma
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
  focus: '0 0 0 3px var(--action-border-focus)',
  focusError: '0 0 0 3px var(--state-error)',
};

/**
 * Color Tokens for Components
 * Mapped from Figma variables to design system primitives
 */
export const ComponentColorTokens = {
  // General colors (Updated from Figma)
  foreground: 'var(--text-primary)', // #1D1A22 (Figma: Text/Neutral/Primary)
  'foreground-alt': '#334155', // unofficial/foreground alt
  'muted-foreground': 'var(--text-muted)', // Muted text color
  secondary: 'var(--surface-raised)', // #F7F6F8 (Figma: Background/Neutral/Secondary)
  'secondary-foreground': 'var(--text-primary)', // #1D1A22
  border: 'var(--border-subtle)', // #D8D4DF (Figma: Border/Neutral/Primary)
  input: 'var(--surface-card)', // #ffffff (Figma: Background/Neutral/Primary)
  background: 'var(--surface-page)', // Page background
  'body-background': 'var(--surface-card)', // #ffffff (Figma: Background/Neutral/Primary)
  
  // Ghost variant (transparent)
  ghost: 'rgba(255, 255, 255, 0)', // #ffffff00
  'ghost-foreground': '#334155',
  
  // Focus states
  'focus-ring': '#cbd5e1', // focus/ring
  'focus-ring-error': '#fca5a5', // focus/ring error
  
  // Destructive/danger
  destructive: 'var(--state-error)',
  'destructive-foreground': 'var(--action-text-on-primary)',
  'destructive-border': '#ef4444',
  
  // Border variants
  'border-4': '#94a3b8', // unofficial/border 4
  
  // Neutral grays
  'neutral-600': Primitives.EnNaturalGray[600], // #525252
};

/**
 * Component Variant Tokens
 * Common patterns for component variants (default, destructive, outline, ghost, etc.)
 */
export const ComponentVariants = {
  default: {
    background: 'var(--action-bg-primary)',
    foreground: 'var(--action-text-on-primary)',
    border: 'transparent',
  },
  destructive: {
    background: 'var(--state-error)',
    foreground: 'var(--action-text-on-primary)',
    border: 'transparent',
  },
  outline: {
    background: 'transparent',
    foreground: 'var(--text-primary)',
    border: 'var(--border-default)',
  },
  secondary: {
    background: 'var(--action-bg-subtle)',
    foreground: 'var(--action-text-subtle)',
    border: 'transparent',
  },
  ghost: {
    background: 'transparent',
    foreground: ComponentColorTokens['ghost-foreground'],
    border: 'transparent',
  },
  link: {
    background: 'transparent',
    foreground: 'var(--text-brand)',
    border: 'transparent',
  },
};

/**
 * Get component token value
 */
export const getComponentToken = (category: string, key: string): string => {
  const tokens: Record<string, any> = {
    input: InputTokens,
    button: ButtonTokens,
    typography: TypographyTokens,
    spacing: SpacingTokens,
    radius: RadiusTokens,
    shadow: ShadowTokens,
    color: ComponentColorTokens,
    variant: ComponentVariants,
  };

  const categoryTokens = tokens[category];
  if (!categoryTokens) return '';

  // Handle nested keys (e.g., "sizes.regular.height")
  const keys = key.split('.');
  let value: any = categoryTokens;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return '';
  }

  return typeof value === 'string' ? value : '';
};

