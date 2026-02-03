# Questions Library

A reusable React component library for building survey forms and question interfaces.

## ⚠️ Design System Rules

**IMPORTANT**: Before creating any components, read [`CORE_RULES.md`](./CORE_RULES.md) for Enculture Design System guidelines.

### Quick Rules:
- ✅ Always check Figma design system first
- ✅ Use `Enc` prefix for component names
- ✅ Use design system tokens (no hardcoded values)
- ✅ Follow Atomic Design principles
- ✅ No `any` types in TypeScript

## 🚀 MCP Servers

### shadcn MCP Server ✅
- **Status**: Configured
- **Purpose**: Browse and install shadcn base components
- **Usage**: Ask AI to "add shadcn button component"

### Figma MCP Server ⚠️
- **Status**: Requires setup (see [`MCP_SETUP.md`](./MCP_SETUP.md))
- **Purpose**: Extract design tokens and component variables from Figma
- **Setup**: 
  1. Open Figma Desktop App
  2. Enable Dev Mode (`Shift + D`)
  3. Enable MCP Server in sidebar
  4. Run `setup-figma-mcp.ps1` or manually add to `.cursor/mcp.json`

See [`MCP_SETUP.md`](./MCP_SETUP.md) for detailed setup instructions.

## Features

- 🎯 **Multiple Question Types** - Text, Multiple Choice, Rating, and more
- 🎨 **Modern UI** - Clean, accessible, and responsive design
- ⚡ **TypeScript** - Full type safety
- 🚀 **React 19** - Built with the latest React features
- 📦 **Vite** - Fast development and build tooling

## Question Components

### TextQuestion
Single-line or multi-line text input with validation support.

### MultipleChoiceQuestion
Single or multiple selection options with custom styling.

### RatingQuestion
Star-based rating system with hover effects.

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the project folder:**
   ```bash
   cd "Questions Library"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5174`
   - The component library will load automatically

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Basic Example

```tsx
import { TextQuestion } from './components/TextQuestion';
import { MultipleChoiceQuestion } from './components/MultipleChoiceQuestion';
import { RatingQuestion } from './components/RatingQuestion';

function MyForm() {
  return (
    <div>
      <TextQuestion
        id="feedback"
        label="What is your feedback?"
        placeholder="Enter your feedback..."
        required
      />
      
      <MultipleChoiceQuestion
        id="preference"
        label="What do you prefer?"
        options={[
          { id: '1', label: 'Option A' },
          { id: '2', label: 'Option B' },
        ]}
        multiple={false}
        required
      />
      
      <RatingQuestion
        id="satisfaction"
        label="Rate your satisfaction"
        maxRating={5}
        required
      />
    </div>
  );
}
```

## Component API

### TextQuestion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Unique identifier |
| label | string | required | Question label |
| placeholder | string | 'Enter your answer...' | Input placeholder |
| required | boolean | false | Whether field is required |
| multiline | boolean | false | Use textarea instead of input |
| maxLength | number | undefined | Maximum character count |
| value | string | undefined | Controlled value |
| onChange | (value: string) => void | undefined | Change handler |

### MultipleChoiceQuestion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Unique identifier |
| label | string | required | Question label |
| options | Option[] | required | Array of options |
| multiple | boolean | false | Allow multiple selections |
| required | boolean | false | Whether field is required |
| value | string \| string[] | undefined | Controlled value |
| onChange | (value: string \| string[]) => void | undefined | Change handler |

### RatingQuestion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Unique identifier |
| label | string | required | Question label |
| maxRating | number | 5 | Maximum rating value |
| required | boolean | false | Whether field is required |
| value | number | undefined | Controlled value |
| onChange | (value: number) => void | undefined | Change handler |
| showLabels | boolean | false | Show text labels for ratings |

## Project Structure

```
Questions Library/
├── components/          # Question components
│   ├── QuestionCard.tsx
│   ├── TextQuestion.tsx
│   ├── MultipleChoiceQuestion.tsx
│   └── RatingQuestion.tsx
├── lib/                 # Utilities and tokens
│   ├── component-tokens.ts
│   └── utils.ts
├── .cursor/             # Cursor/MCP configuration
│   └── mcp.json
├── App.tsx             # Main app component
├── index.tsx           # Entry point
├── theme.ts            # Design system tokens
├── CORE_RULES.md       # Design system rules
├── MCP_SETUP.md        # MCP server setup guide
└── README.md           # This file
```

## Development

### Adding New Question Types

1. Create a new component file in `components/`
2. Export the component and its props interface
3. Add it to `App.tsx` for demonstration
4. Document the component API in this README
5. Follow `CORE_RULES.md` guidelines

### Styling

Components use design system tokens from `theme.ts`. All styling should use CSS variables (`var(--*)`) instead of hardcoded values.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Internal use - Enculture AI

## Contact

For questions or issues, contact the development team.
