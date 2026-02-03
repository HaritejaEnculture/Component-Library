# EncAlertDialog Component Source & Atomic Dependencies

## Component Source

**Figma Design Source:**
- **URL**: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4055-5893&m=dev
- **Component Type**: Alert Dialog (Molecule)
- **Design System**: Enculture AI Design System
- **Implementation Date**: Created based on Figma specifications

## Atomic Dependencies

### 1. Radix UI Primitives (Base Atoms)
**Package**: `@radix-ui/react-dialog` (v1.1.15)

**Primitives Used:**
- `DialogPrimitive.Root` - Dialog container (manages open/close state)
- `DialogPrimitive.Trigger` - Trigger element wrapper
- `DialogPrimitive.Portal` - Portal for rendering dialog outside DOM hierarchy
- `DialogPrimitive.Overlay` - Backdrop overlay
- `DialogPrimitive.Content` - Dialog content container
- `DialogPrimitive.Title` - Dialog title (semantic heading)
- `DialogPrimitive.Description` - Dialog description (semantic description)
- `DialogPrimitive.Close` - Close button wrapper

**Why Radix UI:**
- ✅ Accessible by default (ARIA attributes, keyboard navigation)
- ✅ Unstyled primitives (we apply Enculture DS styling)
- ✅ Headless UI pattern (separates logic from presentation)
- ✅ Follows shadcn/ui pattern (as per core rules)

### 2. Phosphor Icons (Icon Atoms)
**Package**: `@phosphor-icons/react` (v2.1.10)

**Icons Used:**
- `CheckCircle` - Success variant icon
- `Warning` - Warning variant icon
- `WarningCircle` - Error variant icon
- `Info` - Info variant icon
- `X` - Close button icon

**Why Phosphor Icons:**
- ✅ Consistent icon library
- ✅ React component format
- ✅ Weight variants (regular, fill, bold)
- ✅ Size customization

### 3. Utility Functions (Helper Atoms)
**File**: `lib/utils.ts`

**Functions Used:**
- `cn()` - Class name merger (combines clsx + tailwind-merge)
  - Uses `clsx` for conditional classes
  - Uses `tailwind-merge` for Tailwind class conflict resolution

**Dependencies:**
- `clsx` (v2.1.1) - Conditional class names
- `tailwind-merge` (v2.5.4) - Tailwind class merging

### 4. Design System Tokens (Semantic Atoms)
**File**: `theme.ts` and `lib/component-tokens.ts`

**Token Categories Used:**

#### Colors (State Variants)
- `var(--state-success)` - Success variant color
- `var(--state-success-bg)` - Success background
- `var(--state-warning)` - Warning variant color
- `var(--state-warning-bg)` - Warning background
- `var(--state-error)` - Error variant color
- `var(--state-error-bg)` - Error background
- `var(--state-info)` - Info variant color
- `var(--state-info-bg)` - Info background

#### Surface Tokens
- `var(--surface-card)` - Dialog background
- `var(--surface-page)` - Page background (for overlay)

#### Text Tokens
- `var(--text-primary)` - Primary text color
- `var(--text-secondary)` - Secondary text color
- `var(--text-muted)` - Muted text color
- `var(--action-text-on-primary)` - Text on primary actions

#### Border Tokens
- `var(--border-subtle)` - Subtle border color
- `var(--border-width-sm)` - Small border width

#### Radius Tokens
- `var(--radius-xl)` - Extra large radius (24px) for dialog container
- `var(--radius-full)` - Full radius (9999px) for buttons

#### Spacing Tokens
- `var(--space-md)` - Medium spacing
- `var(--space-lg)` - Large spacing

#### Typography Tokens
- `var(--en-font-size-h4)` - Heading 4 size (32px)
- `var(--en-font-size-body)` - Body text size (16px)
- `var(--en-font-weight-semibold)` - Semibold weight (600)
- `var(--en-font-weight-medium)` - Medium weight (500)
- `var(--en-line-height-tight)` - Tight line height (1.2)
- `var(--en-line-height-normal)` - Normal line height (1.4)

#### Shadow Tokens
- `var(--shadow-xl)` - Extra large shadow for dialog elevation

#### Z-Index Tokens
- `z-[1300]` - Modal layer (matches `var(--z-modal)` from design system)

## Component Structure (Atomic Design)

### Molecule Level: EncAlertDialog
**Location**: `components/ui/EncAlertDialog.tsx`

**Composition:**
```
EncAlertDialog (Molecule)
├── DialogPrimitive.Root (Atom - Radix UI)
│   ├── DialogPrimitive.Trigger (Atom - Radix UI)
│   └── DialogPrimitive.Portal (Atom - Radix UI)
│       ├── DialogPrimitive.Overlay (Atom - Radix UI)
│       └── DialogPrimitive.Content (Atom - Radix UI)
│           ├── Icon Component (Atom - Phosphor Icons)
│           ├── DialogPrimitive.Title (Atom - Radix UI)
│           ├── DialogPrimitive.Description (Atom - Radix UI)
│           ├── DialogPrimitive.Close (Atom - Radix UI)
│           └── Action Buttons (Atoms - Native HTML buttons)
```

## Design System Compliance

### ✅ Core Rules Adherence

1. **Naming Convention**: ✅
   - Uses `Enc` prefix: `EncAlertDialog`
   - Exported types: `EncAlertDialogProps`, `EncAlertDialogVariant`

2. **Design Tokens**: ✅
   - All styling uses `var(--*)` tokens
   - No hardcoded colors, spacing, or typography values
   - References `theme.ts` and `component-tokens.ts`

3. **Atomic Design**: ✅
   - Built on Radix UI primitives (atoms)
   - Composed into molecule-level component
   - Follows shadcn/ui pattern

4. **TypeScript**: ✅
   - Strict typing (no `any` types)
   - Proper interfaces for all props
   - Exported types for consumers

5. **Accessibility**: ✅
   - Radix UI provides ARIA attributes
   - Semantic HTML (dialog, heading, description)
   - Keyboard navigation support
   - Focus management

6. **Component Registration**: ✅
   - Exported from `components/ui/index.ts`
   - Available for import: `import { EncAlertDialog } from './components/ui'`

## Variants

The component supports 5 variants:
1. **success** - Green color scheme, CheckCircle icon
2. **warning** - Yellow/Amber color scheme, Warning icon
3. **error** - Red color scheme, WarningCircle icon
4. **info** - Blue color scheme, Info icon
5. **default** - Neutral color scheme, Info icon

## Usage Example

```tsx
import { EncAlertDialog } from './components/ui';

// With trigger
<EncAlertDialog
  variant="success"
  title="Success!"
  description="Your changes have been saved."
  actionLabel="OK"
  cancelLabel="Cancel"
  trigger={<button>Open Dialog</button>}
/>

// Controlled
<EncAlertDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  variant="error"
  title="Error"
  description="Something went wrong."
  actionLabel="Retry"
  onAction={() => handleRetry()}
/>
```

## File Dependencies Map

```
EncAlertDialog.tsx
├── @radix-ui/react-dialog (npm package)
├── @phosphor-icons/react (npm package)
├── lib/utils.ts (cn function)
├── theme.ts (design tokens)
└── lib/component-tokens.ts (component-specific tokens)
```

## Verification Checklist

- [x] Figma source documented
- [x] All atomic dependencies listed
- [x] Design tokens mapped
- [x] Component structure documented
- [x] Core rules compliance verified
- [x] TypeScript types defined
- [x] Accessibility features confirmed
- [x] Export path documented

