import React from 'react';
import { X, CheckCircle, Warning, WarningCircle, Info } from '@phosphor-icons/react';

export type EncAlertVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface EncAlertProps {
  /**
   * Alert variant - determines color scheme
   */
  variant?: EncAlertVariant;
  /**
   * Alert title/heading
   */
  title?: string;
  /**
   * Alert message content
   */
  children: React.ReactNode;
  /**
   * Show close button
   */
  dismissible?: boolean;
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Show icon
   */
  showIcon?: boolean;
  /**
   * Custom icon component
   */
  icon?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * EncAlert Component
 * 
 * A flexible alert component following Enculture Design System.
 * Supports multiple variants: success, warning, error, info, default
 * 
 * @example
 * ```tsx
 * <EncAlert variant="success" title="Success!" dismissible>
 *   Your changes have been saved.
 * </EncAlert>
 * ```
 */
export const EncAlert: React.FC<EncAlertProps> = ({
  variant = 'default',
  title,
  children,
  dismissible = false,
  onDismiss,
  showIcon = true,
  icon,
  className = '',
}) => {
  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'var(--state-success-bg)',
          borderColor: 'var(--state-success)',
          textColor: 'var(--state-success)',
          iconColor: 'var(--state-success)',
        };
      case 'warning':
        return {
          backgroundColor: 'var(--state-warning-bg)',
          borderColor: 'var(--state-warning)',
          textColor: 'var(--state-warning)',
          iconColor: 'var(--state-warning)',
        };
      case 'error':
        return {
          backgroundColor: 'var(--state-error-bg)',
          borderColor: 'var(--state-error)',
          textColor: 'var(--state-error)',
          iconColor: 'var(--state-error)',
        };
      case 'info':
        return {
          backgroundColor: 'var(--state-info-bg)',
          borderColor: 'var(--state-info)',
          textColor: 'var(--state-info)',
          iconColor: 'var(--state-info)',
        };
      default:
        return {
          backgroundColor: 'var(--surface-card)',
          borderColor: 'var(--border-subtle)',
          textColor: 'var(--text-primary)',
          iconColor: 'var(--text-secondary)',
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Get default icon for variant
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return <CheckCircle weight="fill" size={20} />;
      case 'warning':
        return <Warning weight="fill" size={20} />;
      case 'error':
        return <WarningCircle weight="fill" size={20} />;
      case 'info':
        return <Info weight="fill" size={20} />;
      default:
        return <Info weight="regular" size={20} />;
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg ${className}`}
      style={{
        backgroundColor: variantStyles.backgroundColor,
        borderColor: variantStyles.borderColor,
        borderRadius: 'var(--radius-lg)',
        borderWidth: 'var(--border-width-sm)',
      }}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      {showIcon && (
        <div
          className="flex-shrink-0 mt-0.5"
          style={{
            color: variantStyles.iconColor,
          }}
        >
          {getDefaultIcon()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4
            className="mb-1 font-semibold"
            style={{
              fontSize: 'var(--en-font-size-body)',
              fontWeight: 'var(--en-font-weight-semibold)',
              color: variantStyles.textColor,
              lineHeight: 'var(--en-line-height-normal)',
            }}
          >
            {title}
          </h4>
        )}
        <div
          style={{
            fontSize: 'var(--en-font-size-body)',
            color: variant === 'default' ? 'var(--text-primary)' : variantStyles.textColor,
            lineHeight: 'var(--en-line-height-normal)',
          }}
        >
          {children}
        </div>
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded transition-colors"
          style={{
            color: variantStyles.textColor,
            opacity: 0.7,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          aria-label="Dismiss alert"
        >
          <X size={16} weight="bold" />
        </button>
      )}
    </div>
  );
};

