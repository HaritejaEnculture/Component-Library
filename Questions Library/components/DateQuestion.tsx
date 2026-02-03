import React, { useState } from 'react';

export interface DateQuestionProps {
  id: string;
  label: string;
  type?: 'date' | 'date-range';
  required?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  value?: string | { start: string; end: string };
  onChange?: (value: string | { start: string; end: string }) => void;
}

export const DateQuestion: React.FC<DateQuestionProps> = ({
  id,
  label,
  type = 'date',
  required = false,
  placeholder,
  minDate,
  maxDate,
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string | { start: string; end: string }>(
    type === 'date-range' ? { start: '', end: '' } : ''
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (field: 'start' | 'end' | 'single', dateValue: string) => {
    if (type === 'date-range') {
      const current = typeof value === 'object' ? value : { start: '', end: '' };
      const newValue = { ...current, [field]: dateValue };
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    } else {
      if (controlledValue === undefined) {
        setInternalValue(dateValue);
      }
      onChange?.(dateValue);
    }
  };

  if (type === 'date-range') {
    const rangeValue = typeof value === 'object' ? value : { start: '', end: '' };
    return (
      <div className="space-y-2">
        <label className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
          {label}
          {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${id}-start`} className="block mb-2" style={{ fontSize: 'var(--en-font-size-body-sm)', color: 'var(--text-secondary)' }}>
              Start Date
            </label>
            <input
              id={`${id}-start`}
              type="date"
              value={rangeValue.start}
              onChange={(e) => handleChange('start', e.target.value)}
              required={required}
              min={minDate}
              max={maxDate || rangeValue.end}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                height: 'var(--input-height-regular)',
                fontSize: 'var(--en-font-size-body)',
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-subtle)',
                borderRadius: 'var(--input-radius-default)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label htmlFor={`${id}-end`} className="block mb-2" style={{ fontSize: 'var(--en-font-size-body-sm)', color: 'var(--text-secondary)' }}>
              End Date
            </label>
            <input
              id={`${id}-end`}
              type="date"
              value={rangeValue.end}
              onChange={(e) => handleChange('end', e.target.value)}
              required={required}
              min={minDate || rangeValue.start}
              max={maxDate}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                height: 'var(--input-height-regular)',
                fontSize: 'var(--en-font-size-body)',
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-subtle)',
                borderRadius: 'var(--input-radius-default)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
      </label>
      <input
        id={id}
        type="date"
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => handleChange('single', e.target.value)}
        placeholder={placeholder}
        required={required}
        min={minDate}
        max={maxDate}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
        style={{
          height: 'var(--input-height-regular)',
          fontSize: 'var(--en-font-size-body)',
          backgroundColor: 'var(--surface-card)',
          borderColor: 'var(--border-subtle)',
          borderRadius: 'var(--input-radius-default)',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  );
};

