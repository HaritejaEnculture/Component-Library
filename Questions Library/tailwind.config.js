/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors - Using CSS Variables
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
          DEFAULT: "var(--border-subtle)",
        },
        background: {
          DEFAULT: "var(--surface-page)",
          card: "var(--surface-card)",
          raised: "var(--surface-raised)",
          inset: "var(--surface-inset)",
        },
        foreground: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          brand: "var(--text-brand)",
        },
        primary: {
          DEFAULT: "var(--action-bg-primary)",
          foreground: "var(--action-text-on-primary)",
          subtle: "var(--action-bg-subtle)",
          "text-subtle": "var(--action-text-subtle)",
        },
        secondary: {
          DEFAULT: "var(--surface-raised)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--surface-inset)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--action-bg-subtle)",
          foreground: "var(--action-text-subtle)",
        },
        destructive: {
          DEFAULT: "var(--state-error)",
          foreground: "var(--action-text-on-primary)",
        },
        success: {
          DEFAULT: "var(--state-success)",
          foreground: "var(--text-primary)",
        },
        warning: {
          DEFAULT: "var(--state-warning)",
          foreground: "var(--text-primary)",
        },
        info: {
          DEFAULT: "var(--state-info)",
          foreground: "var(--text-primary)",
        },
      },
             borderRadius: {
               xs: "var(--radius-xs)",
               sm: "var(--radius-sm)",
               md: "var(--radius-md)",
               lg: "var(--radius-lg)",
               xl: "var(--radius-xl)",
               full: "var(--radius-full)",
             },
      fontFamily: {
        sans: ["var(--en-font-family-base)", "sans-serif"],
        mono: ["var(--en-font-family-mono)", "monospace"],
      },
             fontSize: {
               h1: "var(--en-font-size-h1)",
               h2: "var(--en-font-size-h2)",
               h3: "var(--en-font-size-h3)",
               h4: "var(--en-font-size-h4)",
               h5: "var(--en-font-size-h5)",
               h6: "var(--en-font-size-h6)",
               headline: "var(--en-font-size-headline)",
               body: "var(--en-font-size-body)",
               "body-sm": "var(--en-font-size-body-sm)",
               caption: "var(--en-font-size-caption)",
               footnote: "var(--en-font-size-footnote)",
             },
      fontWeight: {
        regular: "var(--en-font-weight-regular)",
        medium: "var(--en-font-weight-medium)",
        semibold: "var(--en-font-weight-semibold)",
        bold: "var(--en-font-weight-bold)",
      },
      lineHeight: {
        tight: "var(--en-line-height-tight)",
        normal: "var(--en-line-height-normal)",
        relaxed: "var(--en-line-height-relaxed)",
      },
             spacing: {
               xs: "var(--space-xs)",
               sm: "var(--space-sm)",
               md: "var(--space-md)",
               lg: "var(--space-lg)",
               xl: "var(--space-xl)",
               "2xl": "var(--space-2xl)",
               "3xl": "var(--space-3xl)",
             },
      boxShadow: {
        xs: "var(--shadow-sm)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        focus: "0 0 0 2px var(--focus-ring-color)",
        "focus-error": "0 0 0 2px var(--focus-ring-error)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};

