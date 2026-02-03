# MCP Server Status

## ✅ Configured Servers

### 1. shadcn MCP Server
- **Status**: ✅ Active
- **Type**: Command-based (npx)
- **Purpose**: Browse, search, and install shadcn base components
- **Configuration**: `.cursor/mcp.json`
- **Usage**: 
  - "Add a button component from shadcn"
  - "Install the input component"
  - "Show me available shadcn components"

### 2. Figma Desktop MCP Server
- **Status**: ⚠️ Requires Figma Desktop App
- **Type**: HTTP Server (local)
- **URL**: `http://127.0.0.1:3845/mcp`
- **Purpose**: Extract design tokens, component variables, and design context
- **Setup Required**:
  1. Open Figma Desktop App
  2. Open design file: https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system
  3. Press `Shift + D` to enable Dev Mode
  4. Click "Enable desktop MCP server" in sidebar
  5. Restart Cursor

### 3. Figma Remote MCP Server
- **Status**: ✅ Available (Alternative)
- **Type**: HTTP Server (remote)
- **URL**: `https://mcp.figma.com/mcp`
- **Purpose**: Alternative to desktop server (no desktop app required)
- **Usage**: Works without Figma Desktop App

## 📋 Configuration File

Location: `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp",
      "description": "Figma Desktop MCP Server - Enable in Figma Dev Mode"
    },
    "figma-remote": {
      "url": "https://mcp.figma.com/mcp",
      "description": "Figma Remote MCP Server - Alternative to desktop server"
    }
  }
}
```

## 🎯 Usage Examples

### Using shadcn MCP
```
AI: "Add a button component from shadcn"
AI: "Install the input component with Enc prefix"
AI: "Show me available shadcn form components"
```

### Using Figma MCP
```
AI: "Extract design tokens from Figma node 121:2467"
AI: "Get component variables from Figma component library"
AI: "Sync design system colors from Figma"
AI: "Get design context for the button component"
```

## 🔄 Workflow

1. **Extract from Figma**: Use Figma MCP to get design tokens
2. **Map to Design System**: Update `theme.ts` and `component-tokens.ts`
3. **Build Components**: Use shadcn MCP for base components
4. **Adapt to Enculture DS**: Wrap shadcn components with Enculture tokens and `Enc` prefix

## ✅ Verification

To verify MCP servers are working:

1. **shadcn MCP**: Ask AI "List available shadcn components"
2. **Figma MCP**: Ask AI "Extract tokens from Figma design system"

## 📚 Documentation

- **Setup Guide**: [`MCP_SETUP.md`](./MCP_SETUP.md)
- **Design System Rules**: [`CORE_RULES.md`](./CORE_RULES.md)
- **shadcn MCP Docs**: https://ui.shadcn.com/docs/mcp
- **Figma MCP Docs**: https://developers.figma.com/docs/figma-mcp-server/

