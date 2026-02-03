import React from 'react';

interface QuestionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div
      className="p-6 border"
      style={{
        backgroundColor: 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      <div className="mb-4">
        <h2
          className="mb-1"
          style={{
            fontSize: 'var(--en-font-size-h4)',
            fontWeight: 'var(--en-font-weight-semibold)',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: 'var(--en-font-size-body-sm)',
              color: 'var(--text-secondary)',
            }}
          >
            {description}
          </p>
        )}
      </div>
      <div
        className="pt-4 border-t"
        style={{
          borderColor: 'var(--border-subtle)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

