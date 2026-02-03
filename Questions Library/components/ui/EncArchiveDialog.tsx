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
import { Archive, X } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

export interface EncArchiveDialogProps {
  /**
   * Control dialog open state
   */
  open?: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Main message/description
   */
  message: string;
  /**
   * List of information items (bullet points)
   */
  informationItems?: string[];
  /**
   * Confirmation question text
   */
  confirmationQuestion?: string;
  /**
   * Primary action button text
   */
  proceedLabel?: string;
  /**
   * Secondary action button text
   */
  cancelLabel?: string;
  /**
   * Callback when proceed action is clicked
   */
  onProceed?: () => void;
  /**
   * Callback when cancel action is clicked
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
 * EncArchiveDialog Component
 * 
 * A modal dialog component for archive confirmation actions.
 * Built on shadcn/ui Dialog components with Enculture DS tokens.
 * Follows Dialog (Modal) Implementation Rules:
 * - Organism level component
 * - radius-xl (32px) for container
 * - shadow-xl (Violet glow) for elevation
 * - Atmospheric violet tint backdrop
 * - text.h4 (20px) for title in grey.800
 * - primary.teal.500 (#308282) for primary button with radius.full (9999px)
 * - Close button with 44px touch target
 * - Width: 510px
 * 
 * @example
 * ```tsx
 * <EncArchiveDialog
 *   message="You're about to archive 2,089 schedules from schedule library."
 *   informationItems={[
 *     "Archived schedules will no longer appear in the active list but will remain stored safely for future use.",
 *     "Once archived, the schedules can't be used until it's restored.",
 *     "If you're unsure, consider closing or resolving this action instead."
 *   ]}
 *   confirmationQuestion="Would you like to proceed ?"
 *   proceedLabel="Proceed"
 *   cancelLabel="Cancel"
 *   onProceed={() => console.log('Proceed clicked')}
 *   trigger={<Button>Archive</Button>}
 * />
 * ```
 */
export const EncArchiveDialog: React.FC<EncArchiveDialogProps> = ({
  open,
  onOpenChange,
  title = 'Archive Schedule',
  message,
  informationItems = [],
  confirmationQuestion = 'Would you like to proceed ?',
  proceedLabel = 'Proceed',
  cancelLabel = 'Cancel',
  onProceed,
  onCancel,
  showIcon = true,
  icon,
  className,
  trigger,
}) => {
  const handleProceed = () => {
    onProceed?.();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  // Get default icon
  const getDefaultIcon = () => {
    if (icon) return icon;
    return <Archive weight="regular" size={24} />;
  };

  const dialogContent = (
    <DialogContent 
      className={cn(className)}
      style={{
        backgroundColor: 'var(--surface-card)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-primary)',
        padding: 'var(--space-xl)',
        gap: 'var(--space-lg)',
        borderRadius: '32px', // radius-xl (32px) as per Dialog rules
        boxShadow: '0px 12px 32px rgba(124, 58, 237, 0.08)', // shadow-xl (Violet glow)
        width: '510px', // Fixed width as per requirements
        maxWidth: '510px', // Ensure max-width matches
      }}
    >
      {/* Header with Icon, Title, and Close Button */}
      <div
        className="flex items-start justify-between"
        style={{
          marginBottom: 'var(--space-md)',
        }}
      >
        <div className="flex items-center gap-3">
          {showIcon && (
            <div
              style={{
                color: 'var(--icon-default)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {getDefaultIcon()}
            </div>
          )}
          <DialogTitle
            style={{
              fontSize: '20px', // text.h4 (20px) as per Dialog rules
              fontWeight: 'var(--en-font-weight-semibold)',
              lineHeight: 'var(--en-line-height-tight)',
              letterSpacing: 'var(--en-letter-spacing-tight)',
              color: '#1D1A22', // grey.800 as per Dialog rules
              fontFamily: 'var(--en-font-family-base)',
              margin: 0,
            }}
          >
            {title}
          </DialogTitle>
        </div>
        <DialogClose asChild>
          <button
            type="button"
            className="rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-full)',
              padding: 'var(--space-sm)',
              width: '44px', // 44px touch target as per Dialog rules
              height: '44px', // 44px touch target as per Dialog rules
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            <X size={20} weight="bold" />
          </button>
        </DialogClose>
      </div>

      {/* Main Message */}
      <div
        style={{
          fontSize: 'var(--en-font-size-body)',
          fontWeight: 'var(--en-font-weight-semibold)',
          lineHeight: 'var(--en-line-height-normal)',
          letterSpacing: 'var(--en-letter-spacing-normal)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--en-font-family-base)',
          marginBottom: informationItems.length > 0 ? 'var(--space-md)' : 'var(--space-lg)',
        }}
      >
        {message}
      </div>

      {/* Information List */}
      {informationItems.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            marginBottom: 'var(--space-lg)',
          }}
        >
          {informationItems.map((item, index) => (
            <li
              key={index}
              className="flex items-start"
              style={{
                fontSize: 'var(--en-font-size-body)',
                lineHeight: 'var(--en-line-height-normal)',
                letterSpacing: 'var(--en-letter-spacing-normal)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--en-font-family-base)',
                marginBottom: index < informationItems.length - 1 ? 'var(--space-sm)' : 0,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-secondary)',
                  marginRight: 'var(--space-sm)',
                  marginTop: '6px',
                  flexShrink: 0,
                }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Question */}
      {confirmationQuestion && (
        <div
          style={{
            fontSize: 'var(--en-font-size-body)',
            lineHeight: 'var(--en-line-height-normal)',
            letterSpacing: 'var(--en-letter-spacing-normal)',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--en-font-family-base)',
            marginBottom: 'var(--space-md)',
          }}
        >
          {confirmationQuestion.split(' ').map((word, index, array) => {
            const isBold = word.toLowerCase() === 'proceed' || word.toLowerCase() === 'proceed?';
            return (
              <span
                key={index}
                style={{
                  fontWeight: isBold ? 'var(--en-font-weight-semibold)' : 'var(--en-font-weight-regular)',
                }}
              >
                {word}
                {index < array.length - 1 && ' '}
              </span>
            );
          })}
        </div>
      )}

      {/* Footer with Actions */}
      <DialogFooter 
        className="flex justify-end"
        style={{
          gap: 'var(--space-md)',
          marginTop: 'var(--space-md)',
        }}
      >
        <DialogClose asChild>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-full transition-colors hover:opacity-90"
            style={{
              backgroundColor: 'var(--surface-card)',
              color: 'var(--action-bg-primary)',
              border: 'var(--border-width-sm) solid var(--action-bg-primary)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--en-font-size-body)',
              fontWeight: 'var(--en-font-weight-medium)',
              lineHeight: 'var(--en-line-height-normal)',
              letterSpacing: 'var(--en-letter-spacing-normal)',
              fontFamily: 'var(--en-font-family-base)',
              padding: 'var(--space-sm) var(--space-lg)',
              minWidth: '100px',
              cursor: 'pointer',
            }}
          >
            {cancelLabel}
          </button>
        </DialogClose>
        <button
          type="button"
          onClick={handleProceed}
          className="rounded-full transition-colors hover:opacity-90"
          style={{
            backgroundColor: '#308282', // primary.teal.500 (#308282) as per Dialog rules
            color: 'var(--action-text-on-primary)',
            borderRadius: '9999px', // radius.full (9999px) as per Dialog rules
            fontSize: 'var(--en-font-size-body)',
            fontWeight: 'var(--en-font-weight-medium)',
            lineHeight: 'var(--en-line-height-normal)',
            letterSpacing: 'var(--en-letter-spacing-normal)',
            fontFamily: 'var(--en-font-family-base)',
            padding: 'var(--space-sm) var(--space-lg)',
            minWidth: '100px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {proceedLabel}
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
