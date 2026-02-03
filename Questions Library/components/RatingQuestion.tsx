import React, { useState } from 'react';
import { Star } from '@phosphor-icons/react';

export interface RatingQuestionProps {
  id: string;
  label: string;
  maxRating?: number;
  required?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  showLabels?: boolean;
}

export const RatingQuestion: React.FC<RatingQuestionProps> = ({
  id,
  label,
  maxRating = 5,
  required = false,
  value: controlledValue,
  onChange,
  showLabels = false,
}) => {
  const [internalValue, setInternalValue] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleClick = (rating: number) => {
    const newValue = value === rating ? 0 : rating;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="space-y-3">
      <label className="block" style={{ fontSize: 'var(--en-font-size-body)', fontWeight: 'var(--en-font-weight-medium)', color: 'var(--text-primary)' }}>
        {label}
        {required && <span style={{ color: 'var(--state-error)', marginLeft: '4px' }}>*</span>}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleClick(rating)}
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none rounded"
              style={{ focusRingColor: 'var(--focus-ring-color)' }}
            >
              <Star
                weight={rating <= (hoveredRating || value) ? 'fill' : 'regular'}
                className="w-8 h-8 transition-colors"
                style={{
                  color: rating <= (hoveredRating || value)
                    ? '#facc15' // yellow-400
                    : '#d4d4d4', // gray-300 fallback
                }}
              />
            </button>
          ))}
        </div>
        {value > 0 && (
          <span style={{ fontSize: 'var(--en-font-size-body-sm)', color: 'var(--text-secondary)', marginLeft: '8px' }}>
            {value} {value === 1 ? 'star' : 'stars'}
          </span>
        )}
      </div>
      {showLabels && value > 0 && value <= labels.length && (
        <p style={{ fontSize: 'var(--en-font-size-body-sm)', color: 'var(--text-secondary)' }}>{labels[value - 1]}</p>
      )}
    </div>
  );
};

