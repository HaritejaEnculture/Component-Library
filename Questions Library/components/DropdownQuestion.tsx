import React, { useState } from 'react';

export interface Option {
  id: string;
  label: string;
  value?: string;
}

export interface DropdownQuestionProps {
  id: string;
  label: string;
  options: Option[];
  multiple?: boolean;
  required?: boolean;
  placeholder?: string;
  searchable?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}

export const DropdownQuestion: React.FC<DropdownQuestionProps> = ({
  id,
  label,
  options,
  multiple = false,
  required = false,
  placeholder = 'Select an option...',
  searchable = false,
  value: controlledValue,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(multiple ? [] : '');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const handleSelect = (optionId: string) => {
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
      setIsOpen(false);
    }
  };

  const isSelected = (optionId: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionId);
    }
    return value === optionId;
  };

  const selectedLabels = multiple && Array.isArray(value)
    ? options.filter(opt => value.includes(opt.id)).map(opt => opt.label)
    : options.find(opt => opt.id === value)?.label || '';

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
          style={{
            height: 'var(--input-height-regular)',
            fontSize: 'var(--en-font-size-body)',
            backgroundColor: 'var(--surface-card)',
            borderColor: isOpen ? 'var(--border-focus)' : 'var(--border-subtle)',
            borderRadius: 'var(--input-radius-default)',
            color: value ? 'var(--text-primary)' : 'var(--text-muted)',
            focusRingColor: 'var(--focus-ring-color)',
          }}
        >
          {multiple && Array.isArray(value) && value.length > 0
            ? `${value.length} selected`
            : selectedLabels || placeholder}
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            ▼
          </span>
        </button>

        {isOpen && (
          <>
            <div
              className="absolute z-50 w-full mt-1 border rounded-lg shadow-lg"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                maxHeight: '240px',
                overflowY: 'auto',
              }}
            >
              {searchable && (
                <div className="p-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
                    style={{
                      fontSize: 'var(--en-font-size-body-sm)',
                      backgroundColor: 'var(--surface-inset)',
                      borderColor: 'var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              <div className="py-1">
                {filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className="w-full text-left px-4 py-2 hover:bg-opacity-50 transition-colors"
                    style={{
                      fontSize: 'var(--en-font-size-body)',
                      backgroundColor: isSelected(option.id) ? 'var(--action-bg-subtle)' : 'transparent',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {multiple && (
                      <span className="mr-2">
                        {isSelected(option.id) ? '☑' : '☐'}
                      </span>
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

