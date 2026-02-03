# Enculture Design System Rules

You are an expert developer working with the Enculture DS (Atomic Design). 
Always prioritize local Atom definitions over generic implementations.

## Core Directives

### 1. Check Atoms First
Before generating any UI code, scan the following Figma design system files:
- **Main Design System**: [https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system?node-id=121-2467&t=nAJOLdLLgpIT9UOH-1](https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system?node-id=121-2467&t=nAJOLdLLgpIT9UOH-1)
- **Component Library (Molecules)**: [https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4072-1833&m=dev](https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4072-1833&m=dev) ⭐ **SOURCE OF TRUTH**

**Rule**: Always check existing Atoms, Molecules, and Organisms before creating new components. Use only the main design system tokens - component tokens library is not synced. **For Dialog components, refer to `DIALOG_RULES.md` which extracts variables directly from the Figma Component Library (Molecules).**

### 2. MCP Integration
When fetching external documentation or libraries via MCP, you MUST wrap or adapt the output to fit Enculture DS Atom structures.

**Rule**: 
- Extract design tokens from Figma using MCP tools
- Map external component APIs to Enculture DS component structure
- Ensure all imported components follow Enculture naming conventions
- Use Enculture design tokens instead of hardcoded values

### 3. Naming Convention
Always use the `Enc` prefix (or your specific naming convention) for components to ensure consistency.

**Examples**:
- ✅ `EncButton`, `EncInput`, `EncCard`
- ✅ `EncTextQuestion`, `EncMultipleChoiceQuestion`
- ❌ `Button`, `Input`, `Card` (generic names)

**Rule**: All components must follow the `Enc` prefix pattern for discoverability and consistency.

### 4. Style Isolation
Do not use global CSS or inline styles if an Atom exists that handles that specific layout or decorative property.

**Rule**:
- Use design system tokens (`var(--*)`) instead of hardcoded values
- Reference Atoms/Molecules for styling patterns
- Avoid duplicate style definitions
- Use only semantic tokens from `theme.ts` (CSS variables)

## Coding Standards

### TypeScript Requirements
- Use TypeScript strictly; no `any` types for Atom props
- Define proper interfaces for all component props
- Use design system types from `theme.ts` where applicable

**Example**:
```typescript
// ✅ Good
interface EncButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// ❌ Bad
interface EncButtonProps {
  variant: any; // No any types
  size: string; // Too generic
}
```

### Component Registration
Ensure all new components are registered in the local index for discoverability.

**Rule**: 
- Export components from `components/index.ts` (create if needed)
- Document components in `COMPONENT_TOKENS.md` or `DESIGN_SYSTEM.md`
- Add component examples to the showcase

### Design Token Usage

**Always use design system tokens**:
```typescript
// ✅ Good - Using design tokens
<div style={{
  backgroundColor: 'var(--surface-card)',
  color: 'var(--text-primary)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-md)',
}}>

// ❌ Bad - Hardcoded values
<div style={{
  backgroundColor: '#ffffff',
  color: '#1d1a22',
  borderRadius: '16px',
  padding: '16px',
}}>
```

### Atomic Design Structure

Follow Atomic Design principles:

1. **Atoms** - Basic building blocks (buttons, inputs, labels)
   - Location: `components/ui/` or `components/atoms/`
   - Examples: `EncButton`, `EncInput`, `EncLabel`

2. **Molecules** - Simple combinations of atoms
   - Location: `components/molecules/`
   - Examples: `EncFormField`, `EncSearchBar`

3. **Organisms** - Complex UI components
   - Location: `components/organisms/` or `components/`
   - Examples: `EncQuestionCard`, `EncMultipleChoiceQuestion`

4. **Templates** - Page-level layouts
   - Location: `templates/` or `layouts/`
   - Examples: `EncQuestionTemplate`, `EncSurveyTemplate`

5. **Pages** - Complete page implementations
   - Location: `pages/` or root level
   - Examples: `AllQuestionsView`, `ShowcaseView`

## File Structure

```
Questions Library/
├── components/
│   ├── ui/              # Atoms (base components)
│   │   ├── EncButton.tsx
│   │   ├── EncInput.tsx
│   │   └── index.ts
│   ├── molecules/       # Molecules
│   │   └── EncFormField.tsx
│   └── organisms/       # Organisms (or root components/)
│       ├── EncQuestionCard.tsx
│       └── EncMultipleChoiceQuestion.tsx
├── lib/
│   └── utils.ts
├── theme.ts             # Design system tokens
└── CORE_RULES.md       # This file
```

## Design System Integration

### Token Hierarchy

1. **Primitives** (`theme.ts` → `Primitives`)
   - Raw color values
   - Base scales

2. **Semantic Tokens** (`theme.ts` → `getSemanticTokens()`)
   - CSS variables (`--surface-*`, `--text-*`, etc.)
   - Theme-aware values
   - Use these directly in components via CSS variables

### Using Tokens

```typescript
import { getSemanticTokens } from './theme';

// Use semantic tokens
const tokens = getSemanticTokens('light', 'large');

// Use CSS variables directly in components
<div style={{
  backgroundColor: 'var(--surface-card)',
  color: 'var(--text-primary)',
  padding: 'var(--space-md)',
}}>
```

## Figma Integration Workflow

1. **Extract Design Tokens**
   ```bash
   # Use MCP tools to extract from Figma
   - get_variable_defs(nodeId)
   - get_design_context(nodeId)
   ```

2. **Map to Design System**
   - Map Figma variables to `theme.ts` primitives
   - Create semantic tokens in `getSemanticTokens()`
   - Use CSS variables directly in components

3. **Sync Components**
   - Update components to use new tokens
   - Ensure all hardcoded values are replaced
   - Test component variants

## Checklist for New Components

- [ ] Check Figma design system for existing Atoms
- [ ] Use `Enc` prefix for component name
- [ ] Define TypeScript interfaces (no `any` types)
- [ ] Use design system tokens (no hardcoded values)
- [ ] Use CSS variables from `theme.ts` semantic tokens
- [ ] Export from component index
- [ ] Add to showcase/examples
- [ ] Document in design system docs

## Examples

### Creating a New Atom

```typescript
// components/ui/EncButton.tsx
import React from 'react';

interface EncButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const EncButton: React.FC<EncButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  // Use CSS variables directly from design system
  const sizeStyles = {
    sm: { height: '32px', padding: 'var(--space-sm) var(--space-md)', fontSize: 'var(--en-font-size-body-sm)' },
    md: { height: '36px', padding: 'var(--space-sm) var(--space-lg)', fontSize: 'var(--en-font-size-body)' },
    lg: { height: '40px', padding: 'var(--space-sm) var(--space-xl)', fontSize: 'var(--en-font-size-body)' },
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        ...sizeStyles[size],
        backgroundColor: variant === 'primary' 
          ? 'var(--action-bg-primary)' 
          : 'transparent',
        color: variant === 'primary'
          ? 'var(--action-text-on-primary)'
          : 'var(--text-primary)',
        borderRadius: 'var(--radius-full)',
      }}
    >
      {children}
    </button>
  );
};
```

### Creating a Molecule

```typescript
// components/molecules/EncFormField.tsx
import React from 'react';
import { EncInput } from '@/components/ui/EncInput';
import { EncLabel } from '@/components/ui/EncLabel';

interface EncFormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const EncFormField: React.FC<EncFormFieldProps> = ({
  label,
  id,
  required,
  error,
  children,
}) => {
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      <EncLabel htmlFor={id} required={required}>
        {label}
      </EncLabel>
      {children}
      {error && (
        <div style={{ color: 'var(--state-error)', fontSize: 'var(--en-font-size-caption)' }}>
          {error}
        </div>
      )}
    </div>
  );
};
```

## MCP Integration

### shadcn MCP Server
- **Status**: ✅ Configured
- **Purpose**: Browse, search, and install shadcn base components
- **Usage**: Ask AI to "add shadcn button component" or "install input from shadcn"
- **Config**: `.cursor/mcp.json`

### Figma MCP Server
- **Status**: ⚠️ Requires manual setup (see `MCP_SETUP.md`)
- **Purpose**: Extract design tokens, component variables, and design context from Figma
- **Usage**: 
  - "Extract design tokens from Figma node 121:2467"
  - "Sync component variables from Figma"
  - "Get design context for component"
- **Setup**: Enable in Figma Desktop App → Dev Mode → MCP Server

### MCP Workflow
1. **Extract from Figma**: Use Figma MCP to get design tokens from main design system
2. **Map to Design System**: Update `theme.ts` semantic tokens only
3. **Build Components**: Use shadcn MCP for base components
4. **Adapt to Enculture DS**: Wrap shadcn components with Enculture semantic tokens (CSS variables)

## References

- **Main Design System**: [Figma Design System](https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system?node-id=121-2467&t=nAJOLdLLgpIT9UOH-1)
- **Component Library (Molecules)**: [Figma Component Library](https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=4072-1833&m=dev) ⭐ **SOURCE OF TRUTH**
- **Dialog Component Rules**: `DIALOG_RULES.md` (extracted from Figma Component Library)
- **Design System Docs**: `DESIGN_SYSTEM.md`
- **MCP Setup Guide**: `MCP_SETUP.md`

**Note**: Component tokens library is not synced. Use only semantic tokens from the main design system. **For Dialog components, `DIALOG_RULES.md` is the authoritative source, extracted directly from the Figma Component Library (Molecules) file.**

---

**Remember**: Always prioritize Enculture DS Atoms over generic implementations. Check Figma first, use design tokens, and maintain consistency with the `Enc` prefix.

