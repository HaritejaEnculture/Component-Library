# Figma Component Library - Molecules (Extracted)

**Figma Design**: https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--?node-id=842-44442&t=Ex7fjvTsuEQSAk9f-1

**Extraction Date**: 2026-01-07

## Available Components in Figma Molecules Library

Based on the Figma pages sidebar, the following components are available:

### 1. ✅ Button Component
**Page**: Button  
**Node ID**: 842-44442  
**Status**: Available in Figma, needs implementation in Questions Library

#### Variants Observed:
- **Primary Buttons**: Purple/violet brand color (#7C3AED)
  - Solid fill
  - With icons (plus, checkmark, arrow)
  - Various border radii (sharp to fully rounded/pill)
  
- **Secondary Buttons**: White/neutral
  - Outlined style
  - Transparent background
  - Subtle borders
  
- **Destructive Buttons**: Red
  - Error/destructive actions
  - Red color scheme

#### Sizes:
- Small
- Medium (default)
- Large

#### States:
- Default
- Hover
- Pressed/Active
- Disabled
- Loading

#### Effect Styles Available:
- `shadow-2xs` - Extra extra small shadow
- `shadow-xs` - Extra small shadow
- `shadow-sm` - Small shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-2xl` - Extra extra large shadow
- `focus ring` - Default focus ring
- `focus ring sidebar` - Sidebar-specific focus ring
- `focus ring error` - Error state focus ring

#### Implementation Notes:
- Use `radius-full` (9999px) for pill-shaped buttons
- Use design system tokens for colors
- Support icon placement (left, right, or icon-only)
- Implement loading state with spinner

---

### 2. 🔄 Badge Component
**Page**: Badge*  
**Status**: Needs extraction and implementation

**Expected Features**:
- Status indicators
- Labels/tags
- Color variants (success, warning, error, info, default)
- Size variants (small, medium, large)
- With/without icons

---

### 3. 🔄 Breadcrumb Component
**Page**: Breadcrumb  
**Status**: Needs extraction and implementation

**Expected Features**:
- Navigation breadcrumb trail
- Separator icons
- Clickable links
- Current page indicator
- Responsive truncation

---

### 4. 🔄 Button Group Component
**Page**: Button Group  
**Status**: Needs extraction and implementation

**Expected Features**:
- Multiple buttons grouped together
- Connected/attached buttons
- Shared borders
- Consistent spacing
- Selection state (single/multiple)

---

## Component Implementation Checklist

### Button Component
- [ ] Extract all button variants from Figma
- [ ] Map colors to design system tokens
- [ ] Implement size variants (sm, md, lg)
- [ ] Implement state variants (default, hover, pressed, disabled, loading)
- [ ] Add icon support (left, right, icon-only)
- [ ] Implement border radius variants
- [ ] Add shadow/focus ring styles
- [ ] Create TypeScript interfaces
- [ ] Add to `components/ui/EncButton.tsx`
- [ ] Export from `components/ui/index.ts`
- [ ] Add showcase examples

### Badge Component
- [ ] Extract Badge component from Figma
- [ ] Map variants to design system
- [ ] Implement size variants
- [ ] Add icon support
- [ ] Create `components/ui/EncBadge.tsx`
- [ ] Export and showcase

### Breadcrumb Component
- [ ] Extract Breadcrumb component from Figma
- [ ] Implement navigation structure
- [ ] Add separator styling
- [ ] Create `components/ui/EncBreadcrumb.tsx`
- [ ] Export and showcase

### Button Group Component
- [ ] Extract Button Group component from Figma
- [ ] Implement grouping logic
- [ ] Add selection states
- [ ] Create `components/ui/EncButtonGroup.tsx`
- [ ] Export and showcase

---

## Design System Integration

All components must:
- ✅ Use `Enc` prefix naming convention
- ✅ Use design tokens from `theme.ts` (CSS variables)
- ✅ Follow Atomic Design principles (Molecules level)
- ✅ Support dark/light mode via semantic tokens
- ✅ Include TypeScript interfaces
- ✅ Be accessible (ARIA labels, keyboard navigation)
- ✅ Support responsive design

---

## Next Steps

1. **Priority 1**: Implement Button component (most commonly used)
2. **Priority 2**: Extract and implement Badge component
3. **Priority 3**: Extract and implement Breadcrumb component
4. **Priority 4**: Extract and implement Button Group component

---

## Notes

- Button component is available in CEO dashboard and can be ported
- Other components need direct extraction from Figma
- All components should follow Enculture DS patterns
- Use Remix Icons for icon support (as per Dialog rules)



