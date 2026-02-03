import React, { useState } from 'react';

export type NumericType = 'whole' | 'decimal' | 'currency' | 'percentage';

export interface NumericQuestionProps {
  id: string;
  label: string;
  type?: NumericType;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  currency?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
}

export const NumericQuestion: React.FC<NumericQuestionProps> = ({
  id,
  label,
  type = 'whole',
  required = false,
  placeholder,
  min,
  max,
  step,
  precision = 2,
  currency = 'USD',
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<number | string>('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (type === 'whole' || type === 'currency') {
      newValue = newValue.replace(/[^\d]/g, '');
    } else if (type === 'percentage') {
      newValue = newValue.replace(/[^\d.]/g, '');
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue) && numValue > 100) {
        newValue = '100';
      }
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const formatDisplayValue = (val: number | string): string => {
    if (!val) return '';
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) return '';

    if (type === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(num).replace(currency === 'USD' ? '$' : currency, '');
    }
    if (type === 'percentage') {
      return `${num}%`;
    }
    return num.toString();
  };

  const getPrefix = () => {
    if (type === 'currency') return '$';
    return '';
  };

  const getSuffix = () => {
    if (type === 'percentage') return '%';
    return '';
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
      </label>
      <div className="relative">
        {getPrefix() && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)', fontSize: 'var(--en-font-size-body)' }}>
            {getPrefix()}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder || (type === 'currency' ? '0.00' : type === 'percentage' ? '0%' : '0')}
          required={required}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
          style={{
            height: 'var(--input-height-regular)',
            fontSize: 'var(--en-font-size-body)',
            backgroundColor: 'var(--surface-card)',
            borderColor: 'var(--border-subtle)',
            borderRadius: 'var(--input-radius-default)',
            color: 'var(--text-primary)',
            paddingLeft: getPrefix() ? '32px' : '16px',
            paddingRight: getSuffix() ? '40px' : '16px',
          }}
        />
        {getSuffix() && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)', fontSize: 'var(--en-font-size-body)' }}>
            {getSuffix()}
          </span>
        )}
      </div>
    </div>
  );
};

