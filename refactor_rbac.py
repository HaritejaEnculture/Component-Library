
import os

file_path = "c:/Users/Hariteja_NHRT/Downloads/Enculture AI 13012026/ds-adopted-version/Enculture - Rbac.html"
target_css_link = '<link rel="stylesheet" href="../Enculture Ds/enculture.css">'

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update HTML tag
content = content.replace('<html lang="en" style="--sidebar-width: 280px;">', '<html lang="en" data-density="compact" style="--sidebar-width: 280px;">')

# 2. Add CSS Link
if "enculture.css" not in content:
    # Insert before the first stylesheet link or end of head
    match_str = '<link href="./Enculture - Rbac_files/css2" rel="stylesheet">'
    if match_str in content:
        content = content.replace(match_str, target_css_link + '\n    ' + match_str)
    else:
        # Fallback
        head_end = content.find("</head>")
        if head_end != -1:
            content = content[:head_end] + target_css_link + content[head_end:]

# 3. Replace Sidebar
start_marker = '<aside class="sidebar ">'
# The end marker in the messy file is </style></aside>
end_marker = '</style></aside>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

clean_sidebar_code = r'''<aside class="sidebar ">
        <style>
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 280px;
            height: 100vh;
            background: var(--en-grey-0);
            border-right: 1px solid var(--en-grey-200);
            display: flex;
            flex-direction: column;
            padding: var(--en-density-space-lg);
            z-index: 100;
            transition: width 0.3s ease;
          }

          .sidebar.collapsed {
            width: 80px;
            padding: var(--en-density-space-md);
            overflow: visible;
          }

          .sidebar-header {
            margin-bottom: var(--en-density-space-xl);
            position: relative;
          }

          .sidebar.collapsed .sidebar-header {
            margin-bottom: var(--en-density-space-lg);
          }

          .sidebar-toggle {
            position: absolute;
            top: 0;
            right: -12px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: var(--en-grey-0);
            border: 1px solid var(--en-grey-200);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--en-grey-400);
            transition: all 0.2s;
            z-index: 10;
            padding: 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .sidebar-toggle:hover {
            color: var(--en-primary-brand-500);
            background: var(--en-primary-brand-50);
            transform: scale(1.1);
          }

          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--en-density-space-md);
            min-height: 40px;
          }

          .logo-image {
            height: 120px;
            width: auto;
            max-width: 100%;
            object-fit: contain;
            transition: opacity 0.3s ease;
          }

          .sidebar.collapsed .logo-image {
            opacity: 0;
            height: 0;
            width: 0;
            overflow: hidden;
          }

          .logo-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 80px;
          }

          .sidebar.collapsed .logo-fallback {
            opacity: 0;
            height: 0;
            overflow: hidden;
          }

          .logo-text {
            font-size: 24px;
            font-weight: 700;
            color: var(--en-grey-800);
            text-transform: lowercase;
            letter-spacing: -0.5px;
          }

          .sidebar-nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--en-space-xs);
            overflow-y: auto;
            overflow-x: hidden;
            min-height: 0;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .sidebar.collapsed .sidebar-nav {
            align-items: center;
            overflow: visible;
          }

          .sidebar-nav::-webkit-scrollbar {
            display: none;
          }

          .settings-nav-item {
            margin-top: auto;
            padding-top: var(--en-density-space-md);
            border-top: 1px solid var(--en-grey-200);
          }

          .sidebar.collapsed .settings-nav-item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: var(--en-density-space-md);
            padding: var(--en-density-space-sm);
            border-radius: var(--en-density-radius);
            text-decoration: none;
            color: var(--en-grey-500);
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
          }

          .sidebar.collapsed .nav-item {
            justify-content: center;
            padding: var(--en-density-space-md);
            gap: 0;
            overflow: visible;
          }

          .nav-tooltip {
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 12px;
            padding: 8px 12px;
            background: var(--en-grey-800);
            color: #fff;
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
            border-radius: 6px;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s ease, visibility 0.2s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            pointer-events: none;
          }

          .nav-tooltip::before {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-right-color: var(--en-grey-800);
          }

          .nav-item:hover .nav-tooltip {
            opacity: 1;
            visibility: visible;
          }

          .nav-item:hover {
            color: var(--en-grey-800);
            background: var(--en-grey-100);
          }

          .sidebar:not(.collapsed) .nav-item:hover {
            transform: translateX(4px);
          }

          .sidebar.collapsed .nav-item:hover {
            transform: scale(1.1);
          }

          .nav-item.active {
            color: var(--en-primary-brand-500);
            background: var(--en-primary-brand-50);
          }

          .nav-item-icon {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nav-item-content {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          .sidebar.collapsed .nav-item-content {
            opacity: 0;
            width: 0;
            height: 0;
            overflow: hidden;
          }

          .nav-item-label {
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 2px;
          }

          .sidebar-footer {
            margin-top: var(--en-density-space-md);
            position: relative;
          }

          /* Removed duplicate user-profile styling - now handled by user-active-section */

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--en-primary-brand-100);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 16px;
            color: var(--en-primary-brand-700);
            flex-shrink: 0;
            margin-top: 2px;
          }

          .user-info {
            display: flex;
            flex-direction: column;
            flex: 1;
            opacity: 1;
            transition: opacity 0.3s ease;
          }

          .sidebar.collapsed .user-info {
            opacity: 0;
            width: 0;
            height: 0;
            overflow: hidden;
          }

          .user-profile {
            position: relative;
            border-radius: 12px;
            transition: all 0.3s ease;
            overflow: visible;
            max-height: 400px;
          }

          .user-active-section {
            padding: var(--en-density-space-sm);
            display: flex;
            align-items: flex-start;
            gap: var(--en-density-space-sm);
          }

          .sidebar.collapsed .user-active-section {
            justify-content: center;
            padding: var(--en-density-space-sm);
          }

          .user-dropdown-name {
            font-weight: 500;
            font-size: 14px;
            color: var(--en-grey-800);
          }

          .user-dropdown-role {
            font-size: 12px;
            color: var(--en-grey-500);
            margin-top: 1px;
          }

          .logout-section {
            margin-top: var(--en-density-space-md);
            padding: 0 var(--en-density-space-md) var(--en-density-space-md);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .logout-button {
            /* Using enc-btn-secondary via class now, styling here purely for layout */
            width: 100%;
          }

          .sidebar.collapsed .logout-button {
            padding: var(--en-density-space-sm);
            min-width: auto;
          }

          .sidebar.collapsed .logout-button span {
            opacity: 0;
            width: 0;
            overflow: hidden;
          }

          .logout-button:hover {
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.3);
            color: #ef4444;
          }

          /* Clean and simple dropdown */

          @media (max-width: 1024px) {
            .sidebar {
              transform: translateX(-100%);
              transition: transform var(--transition-base);
            }

            .sidebar.open {
              transform: translateX(0);
            }
          }
        </style>
        <div class="sidebar-header">
          <div class="logo"><img src="../Enculture Logo.png" alt="Enculture" class="logo-image">
            <div class="logo-fallback" style="display: none;"><span class="logo-text">enculture</span></div>
          </div><button class="sidebar-toggle" aria-label="Collapse sidebar"><svg xmlns="http://www.w3.org/2000/svg"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left">
              <path d="m15 18-6-6 6-6"></path>
            </svg></button>
        </div>
        <nav class="sidebar-nav"><a class="nav-item " href="https://master.elix9.com/chat-naman">
            <div class="nav-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-message-circle">
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg></div>
            <div class="nav-item-content"><span class="nav-item-label">Chat</span></div>
          </a><a class="nav-item " href="https://master.elix9.com/surveys">
            <div class="nav-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-file-text">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" x2="8" y1="13" y2="13"></line>
                <line x1="16" x2="8" y1="17" y2="17"></line>
                <line x1="10" x2="8" y1="9" y2="9"></line>
              </svg></div>
            <div class="nav-item-content"><span class="nav-item-label">Surveys</span></div>
          </a><a class="nav-item " href="https://master.elix9.com/safespace">
            <div class="nav-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-palette">
                <circle cx="13.5" cy="6.5" r=".5"></circle>
                <circle cx="17.5" cy="10.5" r=".5"></circle>
                <circle cx="8.5" cy="7.5" r=".5"></circle>
                <circle cx="6.5" cy="12.5" r=".5"></circle>
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z">
                </path>
              </svg></div>
            <div class="nav-item-content"><span class="nav-item-label">Safe Space</span></div>
          </a><a class="nav-item " href="https://master.elix9.com/insights">
            <div class="nav-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-bar-chart3">
                <path d="M3 3v18h18"></path>
                <path d="M18 17V9"></path>
                <path d="M13 17V5"></path>
                <path d="M8 17v-3"></path>
              </svg></div>
            <div class="nav-item-content"><span class="nav-item-label">Insights</span></div>
          </a><a class="nav-item " href="https://master.elix9.com/actions">
            <div class="nav-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" class="lucide lucide-check-square">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg></div>
            <div class="nav-item-content"><span class="nav-item-label">Actions</span></div>
          </a>
          <div class="nav-item-wrapper settings-nav-item">
            <div><a class="nav-item active" href="https://master.elix9.com/library">
                <div class="nav-item-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="lucide lucide-settings">
                    <path
                      d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z">
                    </path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg></div>
                <div class="nav-item-content"><span class="nav-item-label">Settings</span></div>
              </a></div>
          </div>
        </nav>
        <div class="sidebar-footer">
          <div class="user-profile glass-card">
            <div class="user-active-section">
              <div class="user-avatar"><span>👤</span></div>
              <div class="user-info"><button class="user-dropdown-trigger"
                  style="background: transparent; border: none; width: 100%; text-align: left; cursor: pointer; padding: 4px 0px;">
                  <div class="user-dropdown-content"><span class="user-dropdown-name">bhargav@enculture.ai</span><span
                      class="user-dropdown-role">Organization Admin</span></div>
                </button></div>
            </div>
            <div class="logout-section"><button class="enc-btn enc-btn-secondary logout-button" aria-label="Logout"
                title="Logout"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-log-out">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" x2="9" y1="12" y2="12"></line>
                </svg><span>Logout</span></button></div>
          </div>
        </div>
      </aside>'''

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + clean_sidebar_code + content[end_idx + len(end_marker):]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Refactoring complete.")
else:
    print(f"Could not find markers. Start: {start_idx}, End: {end_idx}")
