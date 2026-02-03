# Question Components & Variants from Figma

**Figma Design**: https://www.figma.com/design/EbVrrsebvsPrHkAyZ7UIsZ/Survey-Participation?node-id=197-35723

Based on the Figma design file analysis, here is a comprehensive list of all question components and their variants that need to be implemented.

## Question Component Types

### 1. Single Select (Radio Button)
**Base Component**: Single Select Radio Button Survey respondent

**Variants:**
- ✅ **Default** - Basic radio button selection
- ✅ **With Comment Box** - Radio button with optional comment textarea
- ✅ **Optional/Skipped** - Radio button with skip option
- ✅ **Required** - Radio button with required indicator
- ✅ **Hover State** - Hover interaction state
- ✅ **Selected State** - Selected/active state

**Use Cases:**
- Single choice questions
- Yes/No questions
- Multiple choice with single selection
- Questions requiring additional feedback (comment box variant)

---

### 2. Multiple Select (Checkbox)
**Base Component**: Multi select check box Survey respondent

**Variants:**
- ✅ **Default** - Basic checkbox selection
- ✅ **Required** - Checkbox with required indicator
- ✅ **Multiple Selection** - Allow multiple selections
- ✅ **With Comment** - Checkbox with optional comment field per option
- ✅ **Hover State** - Hover interaction state
- ✅ **Selected State** - Selected/active state

**Use Cases:**
- "Select all that apply" questions
- Multi-option selection
- Questions with conditional comments

---

### 3. Dropdown (Single Select)
**Base Component**: single select dropdown Survey respondent

**Variants:**
- ✅ **Default** - Basic dropdown selection
- ✅ **With Search** - Dropdown with search/filter capability
- ✅ **Required** - Dropdown with required indicator
- ✅ **Optional** - Optional dropdown

**Use Cases:**
- Long lists of options
- Space-constrained layouts
- Categorized options

---

### 4. Dropdown (Multiple Select)
**Base Component**: Multi select dropdown Survey respondent

**Variants:**
- ✅ **Default** - Multi-select dropdown
- ✅ **With Tags** - Selected items displayed as tags/chips
- ✅ **Required** - Multi-select with required indicator
- ✅ **Search Enabled** - Multi-select with search

**Use Cases:**
- Selecting multiple items from long lists
- Tag/category selection
- Filter selections

---

### 5. Text Input (Short)
**Base Component**: short text Survey respondent

**Variants:**
- ✅ **Default** - Single-line text input
- ✅ **Required** - Text input with required indicator
- ✅ **With Placeholder** - Text input with placeholder text
- ✅ **With Max Length** - Text input with character counter
- ✅ **Error State** - Text input with validation error
- ✅ **Disabled State** - Disabled text input

**Use Cases:**
- Name fields
- Email addresses
- Short answers
- Single-line responses

---

### 6. Text Input (Long)
**Base Component**: Long text Survey respondent

**Variants:**
- ✅ **Default** - Multi-line textarea
- ✅ **Required** - Textarea with required indicator
- ✅ **With Placeholder** - Textarea with placeholder text
- ✅ **With Max Length** - Textarea with character counter
- ✅ **Resizable** - Textarea with resize capability
- ✅ **Error State** - Textarea with validation error
- ✅ **Disabled State** - Disabled textarea

**Use Cases:**
- Open-ended questions
- Feedback/comments
- Detailed explanations
- Multi-paragraph responses

---

### 7. Rating (Icon-based)
**Base Component**: single select Rating icon Survey respondent

**Variants:**
- ✅ **Star Rating** - Star icon rating (1-5 or 1-10)
- ✅ **Icon Rating** - Custom icon rating (faces, thumbs, etc.)
- ✅ **With Labels** - Rating with text labels (Very Satisfied, Satisfied, etc.)
- ✅ **Without Labels** - Icon-only rating
- ✅ **Required** - Rating with required indicator
- ✅ **Hover State** - Hover interaction showing rating preview
- ✅ **Selected State** - Selected rating state

**Rating Labels:**
- Very Dissatisfied / Dissatisfied / Neutral / Satisfied / Very Satisfied
- Poor / Fair / Good / Very Good / Excellent
- Custom labels

**Use Cases:**
- Satisfaction surveys
- Likert scale questions
- NPS-style ratings
- Experience ratings

---

### 8. Numeric Input (Whole Number)
**Base Component**: Numeric-Whole number Survey respondent

**Variants:**
- ✅ **Default** - Whole number input (integers only)
- ✅ **Required** - Numeric input with required indicator
- ✅ **With Min/Max** - Numeric input with range validation
- ✅ **With Placeholder** - Numeric input with placeholder
- ✅ **Error State** - Numeric input with validation error
- ✅ **Disabled State** - Disabled numeric input

**Use Cases:**
- Age questions
- Count/quantity questions
- Integer-only responses

---

### 9. Numeric Input (Decimal)
**Base Component**: Numeric-Decimal number Survey respondent

**Variants:**
- ✅ **Default** - Decimal number input
- ✅ **Required** - Decimal input with required indicator
- ✅ **With Precision** - Decimal input with decimal places control
- ✅ **With Min/Max** - Decimal input with range validation
- ✅ **Error State** - Decimal input with validation error
- ✅ **Disabled State** - Disabled decimal input

**Use Cases:**
- Percentage values
- Measurements
- Decimal calculations
- Precise numeric responses

---

### 10. Numeric Input (Currency)
**Base Component**: Numeric-Currency Survey respondent

**Variants:**
- ✅ **Default** - Currency input with currency symbol
- ✅ **Required** - Currency input with required indicator
- ✅ **Currency Selector** - Currency input with currency type selector
- ✅ **With Placeholder** - Currency input with placeholder
- ✅ **Formatted Display** - Currency input with formatted display (commas, decimals)
- ✅ **Error State** - Currency input with validation error
- ✅ **Disabled State** - Disabled currency input

**Use Cases:**
- Salary questions
- Budget questions
- Financial information
- Price/cost questions

---

### 11. Numeric Input (Percentage)
**Base Component**: Numeric-Percentage number Survey respondent

**Variants:**
- ✅ **Default** - Percentage input with % symbol
- ✅ **Required** - Percentage input with required indicator
- ✅ **With Range** - Percentage input with 0-100% validation
- ✅ **With Placeholder** - Percentage input with placeholder
- ✅ **Error State** - Percentage input with validation error
- ✅ **Disabled State** - Disabled percentage input

**Use Cases:**
- Percentage questions
- Allocation questions
- Share/distribution questions

---

### 12. Date Picker
**Base Component**: Date Survey respondent

**Variants:**
- ✅ **Default** - Date picker input
- ✅ **Required** - Date picker with required indicator
- ✅ **With Min/Max Date** - Date picker with date range restrictions
- ✅ **Date Format** - Custom date format (MM/DD/YYYY, DD/MM/YYYY, etc.)
- ✅ **Calendar View** - Calendar popup for date selection
- ✅ **Error State** - Date picker with validation error
- ✅ **Disabled State** - Disabled date picker

**Use Cases:**
- Birth date questions
- Start/end dates
- Event dates
- Date-related information

---

### 13. Date Range Picker
**Base Component**: Open ended Date range - Survey respondent

**Variants:**
- ✅ **Default** - Date range picker (start and end dates)
- ✅ **Required** - Date range with required indicator
- ✅ **With Min/Max Range** - Date range with range validation
- ✅ **Calendar View** - Calendar popup for range selection
- ✅ **Error State** - Date range with validation error
- ✅ **Disabled State** - Disabled date range picker

**Use Cases:**
- Employment period questions
- Project duration
- Date range selections
- Period-based questions

---

### 14. Open Ended List
**Base Component**: Open ended List - Survey respondent

**Variants:**
- ✅ **Default** - Dynamic list of text inputs
- ✅ **Add/Remove Items** - List with add/remove buttons
- ✅ **Required** - List with required indicator (at least one item)
- ✅ **With Max Items** - List with maximum item limit
- ✅ **With Placeholder** - List items with placeholder text
- ✅ **Drag to Reorder** - List with drag-and-drop reordering
- ✅ **Error State** - List with validation error

**Use Cases:**
- List of skills
- Multiple items/questions
- Dynamic item collection
- Reorderable lists

---

## Component States

All question components support these common states:

1. **Default/Empty** - Initial state, no user input
2. **Filled/Value** - Component with user input
3. **Focus** - Component with keyboard focus
4. **Error** - Component with validation error
5. **Error Focus** - Component with error and focus
6. **Disabled** - Component disabled (read-only)
7. **Hover** - Component hover state (interactive elements)
8. **Selected** - Component selected/active state (for choice components)

---

## Component Properties

### Common Properties (All Components)
- `id` - Unique identifier
- `label` - Question label/text
- `required` - Required/optional indicator
- `description` - Helper text/description
- `error` - Error message
- `disabled` - Disabled state
- `onChange` - Change handler
- `value` - Controlled value

### Component-Specific Properties

#### Single/Multiple Select
- `options` - Array of option objects `{id, label, value?}`
- `multiple` - Allow multiple selections (for checkbox)
- `allowComment` - Show comment box (for radio/checkbox)

#### Text Input
- `placeholder` - Placeholder text
- `maxLength` - Maximum character count
- `multiline` - Use textarea (for long text)
- `minLength` - Minimum character count

#### Numeric Input
- `min` - Minimum value
- `max` - Maximum value
- `step` - Step increment
- `precision` - Decimal places (for decimal/currency/percentage)
- `currency` - Currency code/symbol (for currency)
- `format` - Display format

#### Date/Date Range
- `minDate` - Minimum selectable date
- `maxDate` - Maximum selectable date
- `format` - Date format string
- `locale` - Locale for date formatting

#### Rating
- `maxRating` - Maximum rating value (typically 5 or 10)
- `icon` - Icon type (star, face, thumb, etc.)
- `labels` - Array of label texts
- `showLabels` - Show/hide labels

#### Dropdown
- `searchable` - Enable search/filter
- `multiple` - Allow multiple selections
- `placeholder` - Placeholder text
- `options` - Array of option objects

#### List
- `minItems` - Minimum number of items
- `maxItems` - Maximum number of items
- `itemPlaceholder` - Placeholder for list items
- `reorderable` - Allow drag-and-drop reordering

---

## Implementation Priority

### Phase 1: Core Components (High Priority)
1. ✅ Text Input (Short) - Already implemented
2. ✅ Text Input (Long) - Already implemented (multiline)
3. ✅ Multiple Choice (Single) - Already implemented
4. ✅ Multiple Choice (Multiple) - Already implemented
5. ✅ Rating (Icon-based) - Already implemented

### Phase 2: Enhanced Components (Medium Priority)
6. Single Select (Radio) with Comment Box
7. Multiple Select with Comment per Option
8. Dropdown (Single Select)
9. Dropdown (Multiple Select)

### Phase 3: Numeric Components (Medium Priority)
10. Numeric Input (Whole Number)
11. Numeric Input (Decimal)
12. Numeric Input (Currency)
13. Numeric Input (Percentage)

### Phase 4: Date Components (Lower Priority)
14. Date Picker
15. Date Range Picker

### Phase 5: Advanced Components (Lower Priority)
16. Open Ended List

---

## Design System Integration

All components should use:
- Design system tokens from `theme.ts`
- Component tokens from `lib/component-tokens.ts`
- Radix UI primitives where applicable
- shadcn/ui patterns for consistency
- Soft Atmospheric theme (32px card radius, violet glow shadows)

---

## Next Steps

1. Review and prioritize component implementation
2. Create component specifications for each type
3. Implement components using design system tokens
4. Add to component showcase in App.tsx
5. Document component APIs and usage examples

