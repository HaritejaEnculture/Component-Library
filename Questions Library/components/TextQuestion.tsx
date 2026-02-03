import React, { useState } from 'react';

export interface TextQuestionProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  id,
  label,
  placeholder = 'Enter your answer...',
  required = false,
  multiline = false,
  maxLength,
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
      </label>
      <InputComponent
        id={id}
        type={multiline ? undefined : 'text'}
        rows={multiline ? 4 : undefined}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
        style={{
          fontSize: 'var(--en-font-size-body)',
          backgroundColor: 'var(--surface-card)',
          borderColor: 'var(--border-subtle)',
          borderRadius: 'var(--input-radius-default)',
          color: 'var(--text-primary)',
          height: multiline ? 'auto' : 'var(--input-height-regular)',
          minHeight: multiline ? '100px' : undefined,
          resize: multiline ? 'vertical' : 'none',
          padding: 'var(--space-sm) var(--space-md)',
        }}
      />
      {maxLength && (
        <p className="text-right" style={{ fontSize: 'var(--en-font-size-caption)', color: 'var(--text-muted)' }}>
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );
};
