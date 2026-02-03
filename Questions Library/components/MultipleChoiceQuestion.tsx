import React, { useState } from 'react';

export interface Option {
  id: string;
  label: string;
  value?: string;
}

export interface MultipleChoiceQuestionProps {
  id: string;
  label: string;
  options: Option[];
  multiple?: boolean;
  required?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  id,
  label,
  options,
  multiple = false,
  required = false,
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    multiple ? [] : ''
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (optionId: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionId)
        ? currentValues.filter((v) => v !== optionId)
        : [...currentValues, optionId];
      
      if (controlledValue === undefined) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    } else {
      const newValue = value === optionId ? '' : optionId;
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };

  const isSelected = (optionId: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionId);
    }
    return value === optionId;
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
            className="flex items-center p-3 border rounded-lg cursor-pointer transition-colors"
            style={{
              borderColor: isSelected(option.id) ? 'var(--border-focus)' : 'var(--border-subtle)',
              backgroundColor: isSelected(option.id) ? 'var(--action-bg-subtle)' : 'transparent',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={multiple ? undefined : id}
              checked={isSelected(option.id)}
              onChange={() => handleChange(option.id)}
              className="mr-3"
              style={{ 
                width: '16px',
                height: '16px',
                accentColor: 'var(--brand-electric)',
              }}
              required={required && (multiple ? false : value === '')}
            />
            <span style={{ fontSize: 'var(--en-font-size-body)', color: 'var(--text-primary)' }}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

