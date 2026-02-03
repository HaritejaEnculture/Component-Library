# Figma Component Library - Molecules

**Figma Design**: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=842-44442&t=Ex7fjvTsuEQSAk9f-1

This document tracks components extracted from the Figma Molecules component library.

## Available Components (from Figma Pages)

Based on the Figma structure, the following components are available:

### 1. Button Component ✅
**Page**: Button
**Node ID**: 842-44442

**Variants Observed**:
- Primary buttons (purple/violet brand color)
- Secondary buttons (white/outlined)
- Destructive buttons (red)
- Different sizes: Small, Medium, Large
- States: Default, Hover, Pressed, Disabled, Loading
- Border radius variants: Sharp corners to fully rounded (pill)
- With icons
- With text labels

**Effect Styles Available**:
- `shadow-2xs`
- `shadow-xs`
- `shadow-sm`
- `shadow-md`
- `shadow-lg`
- `shadow-xl`
- `shadow-2xl`
- `focus ring`
- `focus ring sidebar`
- `focus ring error`

**Status**: ✅ Available in CEO dashboard, needs to be added to Questions Library

### 2. Badge Component
**Page**: Badge*

**Status**: 🔄 Needs extraction and implementation

### 3. Breadcrumb Component
**Page**: Breadcrumb

**Status**: 🔄 Needs extraction and implementation

### 4. Button Group Component
**Page**: Button Group

**Status**: 🔄 Needs extraction and implementation

## Component Extraction Status

### ✅ Already Implemented in Questions Library
- **EncAlert** - Alert component with variants (success, warning, error, info, default)
- **EncAlertDialog** - Alert dialog component
- **EncDialog** - Dialog component with Dialog rules (brand-confirmation, destructive-warning, neutral)
- **EncArchiveDialog** - Archive-specific dialog

### 🔄 Needs to be Added to Questions Library
- **EncButton** - Button component with all variants (available in CEO dashboard, needs porting)
- **EncBadge** - Badge component (needs extraction from Figma)
- **EncBreadcrumb** - Breadcrumb navigation component (needs extraction from Figma)
- **EncButtonGroup** - Button group component (needs extraction from Figma)

## Next Steps

1. Extract Button component specifications from Figma
2. Extract Badge component specifications
3. Extract Breadcrumb component specifications
4. Extract Button Group component specifications
5. Implement components following Enculture DS patterns
6. Add components to Questions Library
7. Update component showcase

## Component Implementation Checklist

For each component extracted:
- [ ] Extract design tokens (colors, spacing, typography)
- [ ] Extract variants and states
- [ ] Extract effect styles (shadows, focus rings)
- [ ] Map to Enculture DS tokens
- [ ] Create TypeScript interfaces
- [ ] Implement component with Enc prefix
- [ ] Add to components/ui/index.ts
- [ ] Add showcase examples
- [ ] Document usage

