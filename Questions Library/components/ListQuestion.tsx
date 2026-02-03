import React, { useState } from 'react';

export interface ListQuestionProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  minItems?: number;
  maxItems?: number;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const ListQuestion: React.FC<ListQuestionProps> = ({
  id,
  label,
  required = false,
  placeholder = 'Enter an item...',
  minItems = 0,
  maxItems,
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleAdd = () => {
    if (maxItems && value.length >= maxItems) return;
    const newValue = [...value, ''];
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleRemove = (index: number) => {
    if (minItems && value.length <= minItems) return;
    const newValue = value.filter((_, i) => i !== index);
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleItemChange = (index: number, itemValue: string) => {
    const newValue = [...value];
    newValue[index] = itemValue;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
          {label}
          {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
        </label>
        <button
          type="button"
          onClick={handleAdd}
          disabled={maxItems !== undefined && value.length >= maxItems}
          className="px-3 py-1 text-sm border rounded-lg transition-colors disabled:opacity-50"
          style={{
            fontSize: 'var(--en-font-size-body-sm)',
            backgroundColor: 'var(--surface-card)',
            borderColor: 'var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
          }}
        >
          + Add Item
        </button>
      </div>
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
              style={{
                height: 'var(--input-height-regular)',
                fontSize: 'var(--en-font-size-body)',
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-subtle)',
                borderRadius: 'var(--input-radius-default)',
                color: 'var(--text-primary)',
              }}
            />
            {(!minItems || value.length > minItems) && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="px-3 py-2 border rounded-lg transition-colors"
                style={{
                  fontSize: 'var(--en-font-size-body-sm)',
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-error)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--state-error)',
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {value.length === 0 && (
          <p style={{ fontSize: 'var(--en-font-size-body-sm)', color: 'var(--text-muted)' }}>
            No items added yet. Click "Add Item" to start.
          </p>
        )}
      </div>
    </div>
  );
};

