import React from 'react';

interface TabsProps {
  tabs: Array<{ id: string; label: string }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div
      className="border-b"
      style={{
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="px-1 py-4 relative font-medium transition-colors"
            style={{
              fontSize: 'var(--en-font-size-body)',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? 'var(--en-font-weight-semibold)' : 'var(--en-font-weight-regular)',
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  backgroundColor: 'var(--brand-electric)',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

