/**
 * Enculture AI Design System Tokens
 * Based on Figma Design System: https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system
 * 
 * This file contains all design system primitives and semantic tokens
 * used throughout the Questions Library component system.
 */

export const Primitives = {
  EnNaturalGray: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    white: "#ffffff",
    black: "#000000",
  },
  EnThemeGray: {
    50: "#faf5ff",
    100: "#e7e1f2",
    200: "#e7e2f3",
    300: "#d4cfe3",
    400: "#b1acc4",
    500: "#8c869e",
    600: "#6a647a",
    700: "#484354",
    800: "#292630",
    900: "#16141a",
  },
  EnBrand: {
    50: "#F5F3FF",
    100: "#EDE9FE",
    200: "#DDD6FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED", // Electric Violet - Primary Brand
    700: "#6D28D9",
    800: "#5B21B6",
    900: "#2E1065",
  },
  EnSuccess: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
  },
  EnWarning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#451A03",
  },
  EnError: {
    50: "#FFF1F2",
    100: "#FFE4E6",
    200: "#FECDD3",
    300: "#FDA4AF",
    400: "#FB7185",
    500: "#F43F5E",
    600: "#E11D48",
    700: "#BE123C",
    800: "#9F1239",
    900: "#4C0519",
  },
  EnInfo: {
    50: "#F0F9FF",
    100: "#E0F2FE",
    200: "#BAE6FD",
    300: "#7DD3FC",
    400: "#38BDF8",
    500: "#0EA5E9",
    600: "#0284C7",
    700: "#0369A1",
    800: "#075985",
    900: "#0C4A6E",
  },
  EnTeal: {
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6",
    600: "#0D9488",
    700: "#0F766E",
    800: "#115E59",
    900: "#134E4A",
  },
  EnPurple: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7",
    600: "#9333EA",
    700: "#7E22CE",
    800: "#6B21A8",
    900: "#581C87",
  },
  ImagePastels: {
    EnGreen: { 400: "#34d399" },
    EnTeal: { 400: "#2dd4bf" },
    EnBlue: { 400: "#60a5fa" },
    EnPeriwinkle: { 400: "#818cf8" },
    EnPurple: { 400: "#c084fc" },
    EnMagenta: { 400: "#e879f9" },
    EnPink: { 400: "#f472b6" },
    EnCoral: { 400: "#fb7185" },
    EnOrange: { 400: "#fb923c" },
    EnYellow: { 400: "#facc15" }
  }
};

export type ThemeMode = 'light' | 'dark';
export type ViewportMode = 'small' | 'medium' | 'large';

const FontSizes = {
  large: {
    h1: '64px',
    h2: '48px',
    h3: '40px', // Updated from Figma
    h4: '32px', // Updated from Figma
    h5: '24px', // Added from Figma
    h6: '20px', // Added from Figma
    headline: '18px',
    body: '16px',
    bodySm: '12px', // Updated from Figma (was 14px)
    caption: '12px',
    footnote: '12px'
  },
  medium: {
    h1: '48px',
    h2: '32px',
    h3: '32px', // Scaled down from 40px
    h4: '24px', // Scaled down from 32px
    h5: '20px', // Scaled down from 24px
    h6: '18px', // Scaled down from 20px
    headline: '16px',
    body: '14px',
    bodySm: '12px',
    caption: '12px',
    footnote: '12px'
  },
  small: {
    h1: '32px',
    h2: '24px',
    h3: '20px', // Scaled down from 40px
    h4: '18px', // Scaled down from 32px
    h5: '16px', // Scaled down from 24px
    h6: '16px', // Scaled down from 20px
    headline: '14px',
    body: '14px',
    bodySm: '12px',
    caption: '10px',
    footnote: '10px'
  }
};

/**
 * Get semantic design tokens as CSS variables
 * These tokens are used throughout the component library
 */
export const getSemanticTokens = (mode: ThemeMode = 'light', viewport: ViewportMode = 'large') => {
  const isDark = mode === 'dark';
  const sizes = FontSizes[viewport];

  return {
    // --- Surface Group (Updated from Figma) ---
    "--surface-page": isDark ? Primitives.EnNaturalGray[900] : "#F3F0F9", // Deep Violet Tint
    "--surface-card": isDark ? Primitives.EnThemeGray[800] : "#FFFFFF", // Figma: Background/Neutral/Primary
    "--surface-raised": isDark ? Primitives.EnThemeGray[700] : "#F7F6F8", // Figma: Background/Neutral/Secondary
    "--surface-inset": isDark ? Primitives.EnThemeGray[900] : Primitives.EnThemeGray[100],
    "--surface-overlay-tooltip": isDark ? Primitives.EnThemeGray[800] : Primitives.EnNaturalGray[50],

    // --- Text Group (Updated from Figma) ---
    "--text-primary": isDark ? Primitives.EnNaturalGray[50] : "#1D1A22", // Figma: Text/Neutral/Primary
    "--text-secondary": isDark ? Primitives.EnThemeGray[300] : Primitives.EnThemeGray[700],
    "--text-muted": isDark ? Primitives.EnThemeGray[400] : Primitives.EnThemeGray[600],
    "--text-brand": isDark ? Primitives.EnBrand[300] : Primitives.EnBrand[700],
    "--text-on-primary": Primitives.EnNaturalGray[50],

    // --- Icon Group ---
    "--icon-default": isDark ? Primitives.EnThemeGray[300] : Primitives.EnThemeGray[700],
    "--icon-strong": isDark ? Primitives.EnNaturalGray[50] : Primitives.EnThemeGray[900],
    "--icon-disable": isDark ? Primitives.EnThemeGray[600] : Primitives.EnThemeGray[400],
    "--icon-brand": isDark ? Primitives.EnBrand[300] : Primitives.EnBrand[600],

    // --- Action Group ---
    "--action-bg-primary": isDark ? Primitives.EnBrand[500] : Primitives.EnBrand[600],
    "--action-text-on-primary": Primitives.EnNaturalGray[50],
    "--action-bg-subtle": isDark ? Primitives.EnBrand[900] : Primitives.EnBrand[50],
    "--action-text-subtle": isDark ? Primitives.EnBrand[200] : Primitives.EnBrand[700],
    "--action-border-focus": isDark ? Primitives.EnBrand[400] : Primitives.EnBrand[500],
    "--action-bg-hover": isDark ? Primitives.EnBrand[400] : Primitives.EnBrand[700],
    "--action-bg-active": isDark ? Primitives.EnBrand[600] : Primitives.EnBrand[800],

    // --- Border Group (Updated from Figma) ---
    "--border-subtle": isDark ? Primitives.EnThemeGray[700] : "#D8D4DF", // Figma: Border/Neutral/Primary
    "--border-strong": isDark ? "#3A3445" : Primitives.EnThemeGray[300], // Figma: Border/Neutral Inverse/Primary (dark mode)
    "--border-default": isDark ? Primitives.EnThemeGray[600] : "#D8D4DF",
    "--border-focus": isDark ? Primitives.EnBrand[400] : Primitives.EnBrand[500],
    "--border-error": isDark ? Primitives.EnError[400] : Primitives.EnError[500],

    // --- State Colors ---
    "--state-success": isDark ? Primitives.EnSuccess[300] : Primitives.EnSuccess[600],
    "--state-success-bg": isDark ? Primitives.EnSuccess[900] : Primitives.EnSuccess[50],
    "--state-error": isDark ? Primitives.EnError[300] : Primitives.EnError[600],
    "--state-error-bg": isDark ? Primitives.EnError[900] : Primitives.EnError[50],
    "--state-warning": isDark ? Primitives.EnWarning[300] : Primitives.EnWarning[600],
    "--state-warning-bg": isDark ? Primitives.EnWarning[900] : Primitives.EnWarning[50],
    "--state-info": isDark ? Primitives.EnInfo[300] : Primitives.EnInfo[600],
    "--state-info-bg": isDark ? Primitives.EnInfo[900] : Primitives.EnInfo[50],

    // --- Font Token System ---
    "--en-font-family-base": "Poppins, sans-serif",
    "--en-font-family-mono": "Roboto Mono, monospace",

    "--en-font-size-h1": sizes.h1,
    "--en-font-size-h2": sizes.h2,
    "--en-font-size-h3": sizes.h3,
    "--en-font-size-h4": sizes.h4,
    "--en-font-size-h5": sizes.h5,
    "--en-font-size-h6": sizes.h6,
    "--en-font-size-headline": sizes.headline,
    "--en-font-size-body": sizes.body,
    "--en-font-size-body-sm": sizes.bodySm,
    "--en-font-size-caption": sizes.caption,
    "--en-font-size-footnote": sizes.footnote,

    "--en-font-weight-regular": "400",
    "--en-font-weight-medium": "500",
    "--en-font-weight-semibold": "600",
    "--en-font-weight-bold": "700",

    "--en-line-height-tight": "1.2", // Updated from Figma (headings use 1.2)
    "--en-line-height-normal": "1.4", // Updated from Figma (body uses 1.4)
    "--en-line-height-relaxed": "1.6",

    "--en-letter-spacing-tight": "-0.03em", // Updated from Figma (H4 uses -3)
    "--en-letter-spacing-normal": "0em",
    "--en-letter-spacing-wide": "0.01em",
    "--en-letter-spacing-summary": "0.04em", // Updated from Figma (Caption/Footnote use 4)

    // --- Component Tokens (Tier 3) ---
    // Radius System (Updated from Figma)
    "--radius-xl": "24px", // Updated from Figma Radius/XL
    "--radius-lg": "16px", // Inner elements, inputs
    "--radius-md": "12px", // Updated from Figma Radius/M (was 8px)
    "--radius-sm": "8px", // Updated from Figma var(--sds-size-radius-200)
    "--radius-xs": "4px", // Very small elements
    "--radius-full": "9999px", // Pills, badges, buttons

    // Spacing System (Updated from Figma var(--sds-size-space-*))
    "--space-xs": viewport === 'small' ? '4px' : viewport === 'medium' ? '5px' : '6px',
    "--space-sm": viewport === 'small' ? '8px' : viewport === 'medium' ? '10px' : '12px', // Figma: var(--sds-size-space-200) = 8px
    "--space-md": viewport === 'small' ? '12px' : viewport === 'medium' ? '14px' : '16px', // Figma: var(--sds-size-space-300) = 12px, var(--sds-size-space-400) = 16px
    "--space-lg": viewport === 'small' ? '16px' : viewport === 'medium' ? '20px' : '24px', // Figma: var(--sds-size-padding-xl) = 24px
    "--space-xl": viewport === 'small' ? '24px' : viewport === 'medium' ? '28px' : '32px',
    "--space-2xl": viewport === 'small' ? '32px' : viewport === 'medium' ? '40px' : '48px',
    "--space-3xl": viewport === 'small' ? '48px' : viewport === 'medium' ? '56px' : '64px', // Figma: var(--sds-size-space-1600) = 64px

    // Transition Engine (Global timing function)
    "--transition-all": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "--transition-fast": "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    "--transition-slow": "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",

    // Border System
    "--border-width-sm": "1px",
    "--border-width-md": "2px",
    "--border-width-lg": "3px",

    // Elevation / Shadows
    "--shadow-sm": isDark 
      ? "0px 1px 2px rgba(0, 0, 0, 0.3)" 
      : "0px 1px 2px rgba(0, 0, 0, 0.05)",
    "--shadow-md": isDark
      ? "0px 4px 6px rgba(0, 0, 0, 0.3)"
      : "0px 4px 6px rgba(0, 0, 0, 0.07)",
    "--shadow-lg": isDark
      ? "0px 10px 15px rgba(0, 0, 0, 0.3)"
      : "0px 10px 15px rgba(0, 0, 0, 0.1)",
    "--shadow-xl": isDark
      ? "0px 20px 25px rgba(0, 0, 0, 0.3)"
      : "0px 12px 32px rgba(124, 58, 237, 0.08)", // Violet-tinted glow (Soft Atmospheric)
    "--shadow-2xl": isDark
      ? "0px 25px 50px rgba(0, 0, 0, 0.4)"
      : "0px 25px 50px rgba(0, 0, 0, 0.15)",

    // Primary Brand Electric Violet (from v2.1)
    "--brand-electric": isDark ? Primitives.EnBrand[300] : "#7C3AED",
    "--brand-primary": isDark ? Primitives.EnBrand[500] : Primitives.EnBrand[600],

    // Image Pastels
    "--pastel-green": Primitives.ImagePastels.EnGreen[400],
    "--pastel-teal": Primitives.ImagePastels.EnTeal[400],
    "--pastel-blue": Primitives.ImagePastels.EnBlue[400],
    "--pastel-periwinkle": Primitives.ImagePastels.EnPeriwinkle[400],
    "--pastel-purple": Primitives.ImagePastels.EnPurple[400],
    "--pastel-magenta": Primitives.ImagePastels.EnMagenta[400],
    "--pastel-pink": Primitives.ImagePastels.EnPink[400],
    "--pastel-coral": Primitives.ImagePastels.EnCoral[400],
    "--pastel-orange": Primitives.ImagePastels.EnOrange[400],
    "--pastel-yellow": Primitives.ImagePastels.EnYellow[400],

    // --- Component Tokens (from Figma Component Variables) ---
    // Input Component
    "--input-height-mini": "24px",
    "--input-height-small": "32px",
    "--input-height-regular": "36px",
    "--input-height-large": "40px",
    "--input-padding-x": "12px",
    "--input-padding-x-large": "16px",
    "--input-radius-default": "var(--radius-lg)", // 16px for inputs
    "--input-radius-round": "var(--radius-full)", // 9999px
    
    // Focus Rings (from Figma)
    "--focus-ring-color": "#cbd5e1",
    "--focus-ring-width": "2px",
    "--focus-ring-offset": "2px",
    "--focus-ring-error": "#fca5a5",
    
    // Component Color Mappings (from Figma)
    "--component-foreground-alt": "#334155",
    "--component-ghost": "rgba(255, 255, 255, 0)",
    "--component-ghost-foreground": "#334155",
    "--component-border-4": "#94a3b8",
    "--component-destructive-border": "#ef4444",
    
    // --- Alert Dialog Component Variables (from Figma Component Library) ---
    // Container
    "--alert-dialog-width": "540px",
    "--alert-dialog-padding": "32px",
    "--alert-dialog-radius": "32px",
    "--alert-dialog-border-width": "1px",
    
    // Typography - Title
    "--alert-dialog-title-size": "20px",
    "--alert-dialog-title-weight": "600",
    "--alert-dialog-title-line-height": "110%",
    "--alert-dialog-title-letter-spacing": "-0.01em",
    "--alert-dialog-title-color": "#1D1A22", // grey.800
    
    // Typography - Body
    "--alert-dialog-body-size": "16px",
    "--alert-dialog-body-weight": "400",
    "--alert-dialog-body-weight-semibold": "600",
    "--alert-dialog-body-weight-medium": "500",
    "--alert-dialog-body-line-height": "150%",
    "--alert-dialog-body-letter-spacing": "0em",
    "--alert-dialog-body-color": "#484354", // EnThemeGray.700
    "--alert-dialog-body-color-primary": "#1D1A22", // grey.800
    
    // Icons
    "--alert-dialog-icon-size": "24px",
    "--alert-dialog-icon-color": "#A3A3A3", // EnNaturalGray.400
    "--alert-dialog-close-icon-size": "20px",
    "--alert-dialog-close-button-size": "44px",
    
    // Buttons
    "--alert-dialog-button-padding": "12px 24px",
    "--alert-dialog-button-radius": "var(--radius-full)",
    "--alert-dialog-button-min-width": "100px",
    "--alert-dialog-button-font-size": "16px",
    "--alert-dialog-button-line-height": "150%",
    "--alert-dialog-button-letter-spacing": "0em",
    
    // Primary Button
    "--alert-dialog-primary-weight": "600",
    "--alert-dialog-primary-bg": "var(--action-bg-primary)",
    "--alert-dialog-primary-text": "var(--action-text-on-primary)",
    
    // Secondary Button
    "--alert-dialog-secondary-weight": "500",
    "--alert-dialog-secondary-bg": "var(--surface-card)",
    "--alert-dialog-secondary-text": "var(--text-primary)",
    "--alert-dialog-secondary-border": "var(--action-bg-primary)",
    
    // Spacing
    "--alert-dialog-header-gap": "12px",
    "--alert-dialog-content-gap": "var(--space-md)",
    "--alert-dialog-footer-gap": "var(--space-md)",
    
    // Overlay
    "--alert-dialog-overlay-brand": "rgba(124, 58, 237, 0.15)",
    "--alert-dialog-overlay-standard": "rgba(0, 0, 0, 0.5)",
  };
};

/**
 * Apply semantic tokens to the document root
 */
export const applyTheme = (mode: ThemeMode = 'light', viewport: ViewportMode = 'large') => {
  const tokens = getSemanticTokens(mode, viewport);
  const root = document.documentElement;

  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

/**
 * Get a specific token value
 */
export const getToken = (tokenName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
};

