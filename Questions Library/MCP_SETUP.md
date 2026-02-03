# MCP Server Setup Guide

This guide explains how to configure MCP (Model Context Protocol) servers for shadcn components and Figma design system integration.

## ✅ shadcn MCP Server (Already Installed)

The shadcn MCP server has been initialized and configured for Cursor. This allows you to:
- Browse and search shadcn components
- Install components directly via AI commands
- Access component documentation

**Status**: ✅ Configured at `.cursor/mcp.json`

## 🔧 Figma MCP Server Setup

The Figma MCP server enables direct access to your design system tokens, components, and design context from Figma.

### Option 1: Figma Desktop MCP Server (Recommended)

**Prerequisites:**
- Figma Desktop App installed
- Design file open in Figma

**Steps:**

1. **Open Figma Desktop App**
   - Ensure you have the latest version installed

2. **Open Your Design File**
   - Open: `https://www.figma.com/design/1FKpdsbIp8L4XiE3zzK9qd/En-AI--Design-system`
   - Or: `https://www.figma.com/design/oGWSkOR4R3LVAfN7WyqMHi/EN-AI-components--Molecules--`

3. **Enable Dev Mode**
   - Press `Shift + D` or toggle Dev Mode in the toolbar

4. **Enable MCP Server**
   - In the right sidebar, find "MCP Server" section
   - Click "Enable desktop MCP server"
   - Copy the server URL (typically `http://127.0.0.1:3845/mcp`)

5. **Configure in Cursor**
   - The server URL will be added to `.cursor/mcp.json`
   - Restart Cursor to apply changes

### Option 2: Figma Remote MCP Server

If you prefer not to use the desktop app:

1. **Use Remote Server URL**: `https://mcp.figma.com/mcp`
2. **Configure in Cursor**: Add to `.cursor/mcp.json` configuration

## 📝 MCP Configuration File

The MCP servers are configured in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@latest", "mcp"],
      "env": {}
    },
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

## 🎯 Usage Examples

### Using shadcn MCP

```
AI: "Add a button component from shadcn"
AI: "Install the input component"
AI: "Show me available shadcn components"
```

### Using Figma MCP

```
AI: "Extract design tokens from Figma node 121:2467"
AI: "Get component variables from Figma"
AI: "Sync design system colors from Figma"
```

## 🔄 Syncing Design System

### Extract Design Tokens

Use Figma MCP to extract:
- Color tokens
- Typography tokens
- Spacing tokens
- Component variables

### Update Theme

After extracting tokens from Figma:
1. Run sync command: `sync all design system from figma`
2. Tokens will be updated in `theme.ts`
3. Component tokens updated in `lib/component-tokens.ts`

## 📚 References

- **shadcn MCP Docs**: https://ui.shadcn.com/docs/mcp
- **Figma MCP Docs**: https://developers.figma.com/docs/figma-mcp-server/
- **Figma Desktop Setup**: https://developers.figma.com/docs/figma-mcp-server/local-server-installation/
- **Figma Remote Setup**: https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/

## 🛠️ Troubleshooting

### shadcn MCP Not Working
- Ensure `.cursor/mcp.json` exists
- Restart Cursor
- Check that `npx` is available in PATH

### Figma MCP Not Connecting
- Ensure Figma Desktop app is running
- Verify Dev Mode is enabled (`Shift + D`)
- Check that MCP server is enabled in Figma sidebar
- Verify server URL matches in `.cursor/mcp.json`
- Restart Cursor after configuration changes

### Design Tokens Not Syncing
- Ensure Figma file is open
- Verify node IDs are correct
- Check that design system file has proper permissions
- Use MCP tools: `get_variable_defs` and `get_design_context`

## ✅ Verification

To verify MCP servers are working:

1. **Check shadcn MCP**:
   - Ask AI: "List available shadcn components"
   - Should return component list

2. **Check Figma MCP**:
   - Ask AI: "Extract tokens from Figma design system"
   - Should access Figma and return tokens

## 🔐 Security Notes

- Figma Desktop MCP runs locally (`127.0.0.1`)
- Remote Figma MCP uses HTTPS
- No sensitive data is exposed via MCP
- Design files must be accessible to your Figma account

