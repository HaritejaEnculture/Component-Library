import React, { useState } from 'react';

export interface Option {
  id: string;
  label: string;
  value?: string;
}

export interface RadioQuestionProps {
  id: string;
  label: string;
  options: Option[];
  required?: boolean;
  allowComment?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onCommentChange?: (comment: string) => void;
}

export const RadioQuestion: React.FC<RadioQuestionProps> = ({
  id,
  label,
  options,
  required = false,
  allowComment = false,
  value: controlledValue,
  onChange,
  onCommentChange,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [comment, setComment] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (optionId: string) => {
    const newValue = value === optionId ? '' : optionId;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleCommentChange = (commentValue: string) => {
    setComment(commentValue);
    onCommentChange?.(commentValue);
  };

  return (
    <div className="space-y-3">
      <label className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-start p-3 border rounded-lg cursor-pointer transition-colors"
            style={{
              borderColor: value === option.id ? 'var(--border-focus)' : 'var(--border-subtle)',
              backgroundColor: value === option.id ? 'var(--action-bg-subtle)' : 'transparent',
            }}
          >
            <input
              type="radio"
              name={id}
              checked={value === option.id}
              onChange={() => handleChange(option.id)}
              className="mt-1 mr-3"
              style={{ accentColor: 'var(--brand-electric)' }}
              required={required && value === ''}
            />
            <span style={{ fontSize: 'var(--en-font-size-body)', color: 'var(--text-primary)' }}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {allowComment && value && (
        <div className="mt-3">
          <textarea
            value={comment}
            onChange={(e) => handleCommentChange(e.target.value)}
            placeholder="Add a comment (optional)..."
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-y"
            style={{
              fontSize: 'var(--en-font-size-body)',
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-subtle)',
              borderRadius: 'var(--input-radius-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      )}
    </div>
  );
};

