# PowerShell script to add Figma MCP server configuration
# Run this script after enabling Figma Desktop MCP server

$mcpPath = ".cursor\mcp.json"

if (Test-Path $mcpPath) {
    Write-Host "Reading existing MCP configuration..." -ForegroundColor Cyan
    
    # Read existing config
    $config = Get-Content $mcpPath | ConvertFrom-Json
    
    # Add Figma Desktop MCP server if not exists
    if (-not $config.mcpServers."figma-desktop") {
        Write-Host "Adding Figma Desktop MCP server..." -ForegroundColor Yellow
        
        $config.mcpServers | Add-Member -MemberType NoteProperty -Name "figma-desktop" -Value @{
            url = "http://127.0.0.1:3845/mcp"
            description = "Figma Desktop MCP Server - Enable in Figma Dev Mode"
        }
        
        # Save updated config
        $config | ConvertTo-Json -Depth 10 | Set-Content $mcpPath
        
        Write-Host "✅ Figma Desktop MCP server added!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Open Figma Desktop App" -ForegroundColor White
        Write-Host "2. Open your design file" -ForegroundColor White
        Write-Host "3. Press Shift+D to enable Dev Mode" -ForegroundColor White
        Write-Host "4. Click 'Enable desktop MCP server' in the sidebar" -ForegroundColor White
        Write-Host "5. Restart Cursor to apply changes" -ForegroundColor White
    } else {
        Write-Host "✅ Figma Desktop MCP server already configured!" -ForegroundColor Green
    }
    
    # Add Figma Remote MCP server as alternative
    if (-not $config.mcpServers."figma-remote") {
        Write-Host "Adding Figma Remote MCP server (alternative)..." -ForegroundColor Yellow
        
        $config.mcpServers | Add-Member -MemberType NoteProperty -Name "figma-remote" -Value @{
            url = "https://mcp.figma.com/mcp"
            description = "Figma Remote MCP Server - Alternative to desktop server"
        }
        
        # Save updated config
        $config | ConvertTo-Json -Depth 10 | Set-Content $mcpPath
        
        Write-Host "✅ Figma Remote MCP server added!" -ForegroundColor Green
    } else {
        Write-Host "✅ Figma Remote MCP server already configured!" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Current MCP servers:" -ForegroundColor Cyan
    $config.mcpServers | Get-Member -MemberType NoteProperty | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor White
    }
    
} else {
    Write-Host "❌ MCP configuration file not found at $mcpPath" -ForegroundColor Red
    Write-Host "Run 'pnpm dlx shadcn@latest mcp init --client cursor' first" -ForegroundColor Yellow
}

