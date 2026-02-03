import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from './dialog';
import { CheckCircle, Warning, WarningCircle, Info } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

export type EncAlertDialogVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

export interface EncAlertDialogProps {
  /**
   * Control dialog open state
   */
  open?: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Alert variant - determines color scheme
   */
  variant?: EncAlertDialogVariant;
  /**
   * Dialog title
   */
  title: string;
  /**
   * Dialog description/content
   */
  description?: string;
  /**
   * Primary action button text
   */
  actionLabel?: string;
  /**
   * Secondary action button text
   */
  cancelLabel?: string;
  /**
   * Callback when primary action is clicked
   */
  onAction?: () => void;
  /**
   * Callback when cancel/secondary action is clicked
   */
  onCancel?: () => void;
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
  /**
   * Trigger element (button that opens the dialog)
   */
  trigger?: React.ReactNode;
}

/**
 * EncAlertDialog Component
 * 
 * A modal alert dialog component using default shadcn/ui Dialog atoms.
 * Built on shadcn/ui Dialog components with variant-based icon and button styling.
 * 
 * @example
 * ```tsx
 * <EncAlertDialog
 *   variant="success"
 *   title="Success!"
 *   description="Your changes have been saved."
 *   actionLabel="OK"
 *   trigger={<Button>Show Alert</Button>}
 * />
 * ```
 */
export const EncAlertDialog: React.FC<EncAlertDialogProps> = ({
  open,
  onOpenChange,
  variant = 'default',
  title,
  description,
  actionLabel = 'OK',
  cancelLabel = 'Cancel',
  onAction,
  onCancel,
  showIcon = true,
  icon,
  className,
  trigger,
}) => {
  // Get variant-specific styles for icons and buttons only
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          iconColor: 'var(--state-success)',
          actionBg: 'var(--state-success)',
          actionText: 'var(--action-text-on-primary)',
        };
      case 'warning':
        return {
          iconColor: 'var(--state-warning)',
          actionBg: 'var(--state-warning)',
          actionText: 'var(--text-primary)',
        };
      case 'error':
        return {
          iconColor: 'var(--state-error)',
          actionBg: 'var(--state-error)',
          actionText: 'var(--action-text-on-primary)',
        };
      case 'info':
        return {
          iconColor: 'var(--state-info)',
          actionBg: 'var(--state-info)',
          actionText: 'var(--action-text-on-primary)',
        };
      default:
        return {
          iconColor: 'var(--text-secondary)',
          actionBg: 'var(--action-bg-primary)',
          actionText: 'var(--action-text-on-primary)',
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Get default icon for variant
  const getDefaultIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return <CheckCircle weight="fill" size={48} />;
      case 'warning':
        return <Warning weight="fill" size={48} />;
      case 'error':
        return <WarningCircle weight="fill" size={48} />;
      case 'info':
        return <Info weight="fill" size={48} />;
      default:
        return <Info weight="regular" size={48} />;
    }
  };

  const handleAction = () => {
    onAction?.();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  const dialogContent = (
    <DialogContent 
      className={cn('max-w-md', className)}
      style={{
        backgroundColor: 'var(--surface-card)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        padding: 'var(--space-xl)',
        gap: 'var(--space-lg)',
      }}
    >
      {/* Icon - Centered at top */}
      {showIcon && (
        <div
          className="flex justify-center"
          style={{
            color: variantStyles.iconColor,
            marginBottom: 'var(--space-md)',
          }}
        >
          {getDefaultIcon()}
        </div>
      )}

      {/* Header with Title and Description - Centered */}
      <DialogHeader 
        className="text-center"
        style={{
          gap: 'var(--space-sm)',
        }}
      >
        <DialogTitle 
          className="text-center"
          style={{
            fontSize: 'var(--en-font-size-h3)',
            fontWeight: 'var(--en-font-weight-semibold)',
            lineHeight: 'var(--en-line-height-tight)',
            letterSpacing: 'var(--en-letter-spacing-tight)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--en-font-family-base)',
            marginBottom: description ? 'var(--space-sm)' : 0,
          }}
        >
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription 
            className="text-center"
            style={{
              fontSize: 'var(--en-font-size-body)',
              lineHeight: 'var(--en-line-height-normal)',
              letterSpacing: 'var(--en-letter-spacing-normal)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--en-font-family-base)',
            }}
          >
            {description}
          </DialogDescription>
        )}
      </DialogHeader>

      {/* Footer with Actions - Centered */}
      <DialogFooter 
        className="flex justify-center sm:flex-row"
        style={{
          gap: 'var(--space-md)',
          marginTop: 'var(--space-md)',
        }}
      >
        {cancelLabel && (
          <DialogClose asChild>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-full transition-colors hover:opacity-90"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: 'var(--border-width-sm) solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--en-font-size-body)',
                fontWeight: 'var(--en-font-weight-medium)',
                lineHeight: 'var(--en-line-height-normal)',
                letterSpacing: 'var(--en-letter-spacing-normal)',
                fontFamily: 'var(--en-font-family-base)',
                padding: 'var(--space-sm) var(--space-lg)',
                minWidth: '100px',
              }}
            >
              {cancelLabel}
            </button>
          </DialogClose>
        )}
        <button
          type="button"
          onClick={handleAction}
          className="rounded-full transition-colors hover:opacity-90"
          style={{
            backgroundColor: variantStyles.actionBg,
            color: variantStyles.actionText,
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--en-font-size-body)',
            fontWeight: 'var(--en-font-weight-medium)',
            lineHeight: 'var(--en-line-height-normal)',
            letterSpacing: 'var(--en-letter-spacing-normal)',
            fontFamily: 'var(--en-font-family-base)',
            boxShadow: 'var(--shadow-sm)',
            padding: 'var(--space-sm) var(--space-lg)',
            minWidth: '100px',
          }}
        >
          {actionLabel}
        </button>
      </DialogFooter>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogContent}
    </Dialog>
  );
};
