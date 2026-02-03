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
import { RiCloseLine } from 'react-icons/ri';
import { cn } from '../../lib/utils';

export type DialogIntent = 'brand-confirmation' | 'destructive-warning' | 'neutral';

export interface EncDialogProps {
  /**
   * Control dialog open state
   */
  open?: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Dialog intent - determines styling and behavior
   * - brand-confirmation: Default, uses brand colors (Electric Violet) and violet glow
   * - destructive-warning: For destructive actions, removes violet overlay
   * - neutral: Neutral styling
   */
  intent?: DialogIntent;
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
   * Uses brand color (Electric Violet #7C3AED) for brand-confirmation intent
   */
  primaryAction?: string;
  /**
   * Secondary action button text
   * White background with purple border for brand-confirmation intent
   */
  secondaryAction?: string;
  /**
   * Callback when primary action is clicked
   */
  onPrimaryAction?: () => void;
  /**
   * Callback when secondary action is clicked
   */
  onSecondaryAction?: () => void;
  /**
   * Icon to display in header (e.g., Archive icon)
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
  /**
   * Custom content to render inside the dialog
   */
  children?: React.ReactNode;
}

/**
 * EncDialog Component
 * 
 * A modal dialog component following Enculture Design System:
 * - Uses design system tokens from theme.ts (CSS variables)
 * - radius-xl for container
 * - shadow-xl for elevation
 * - Design system colors and spacing
 * - Responsive and accessible
 * - Supports intent variants: brand-confirmation, destructive-warning, neutral
 * 
 * @example
 * ```tsx
 * <EncDialog
 *   intent="brand-confirmation"
 *   title="Dialog Title"
 *   description="Dialog description text"
 *   primaryAction="Confirm"
 *   secondaryAction="Cancel"
 *   onPrimaryAction={() => console.log('Primary action clicked')}
 *   trigger={<Button>Open Dialog</Button>}
 * />
 * ```
 */
export const EncDialog: React.FC<EncDialogProps> = ({
  open,
  onOpenChange,
  intent = 'brand-confirmation',
  title,
  description,
  primaryAction,
  secondaryAction,
  onPrimaryAction,
  onSecondaryAction,
  icon,
  className,
  trigger,
  children,
}) => {
  const handlePrimaryAction = () => {
    onPrimaryAction?.();
    onOpenChange?.(false);
  };

  const handleSecondaryAction = () => {
    onSecondaryAction?.();
    onOpenChange?.(false);
  };

  // Determine styling based on intent
  const isDestructiveWarning = intent === 'destructive-warning';
  const isBrandConfirmation = intent === 'brand-confirmation';

  // Container shadow - violet-tinted glow for brand-confirmation per Figma design
  const containerShadow = isDestructiveWarning
    ? 'var(--shadow-xl)' // Use default shadow without violet tint
    : 'var(--shadow-xl)'; // Design system shadow-xl includes violet-tinted glow

  // Border color - purple border for brand-confirmation per Figma design
  const borderColor = isBrandConfirmation
    ? 'var(--action-bg-primary)' // Brand purple border per Figma design
    : 'var(--border-subtle)'; // Default border

  // Primary action styling - use design system brand color (purple)
  const primaryActionStyle = isDestructiveWarning
    ? {
        backgroundColor: 'var(--state-error)', // Use design system error state
        color: 'var(--action-text-on-primary)',
      }
    : {
        backgroundColor: 'var(--action-bg-primary)', // Brand purple (#7C3AED) from design system
        color: 'var(--action-text-on-primary)',
      };

  // Secondary action styling - white background with purple border per Figma design
  const secondaryActionStyle = {
    backgroundColor: 'var(--surface-card)', // White background
    color: 'var(--text-primary)', // Dark grey text
    border: 'var(--border-width-sm) solid var(--action-bg-primary)', // Purple border matching Figma design
  };

  // Overlay color - use Alert Dialog variables
  const overlayColor = isDestructiveWarning
    ? 'var(--alert-dialog-overlay-standard)' // Standard overlay for destructive
    : 'var(--alert-dialog-overlay-brand)'; // Atmospheric violet tint per Figma design

  const dialogContent = (
    <DialogContent 
      hideDefaultClose={true}
      overlayColor={overlayColor}
      className={cn(className)}
      style={{
        backgroundColor: 'var(--surface-card)',
        borderColor: borderColor, // Purple border for brand-confirmation
        borderWidth: 'var(--alert-dialog-border-width)', // Alert Dialog variable
        color: 'var(--text-primary)',
        padding: 'var(--alert-dialog-padding)', // Alert Dialog variable
        borderRadius: 'var(--alert-dialog-radius)', // Alert Dialog variable
        boxShadow: containerShadow,
        width: 'var(--alert-dialog-width)', // Alert Dialog variable
        maxWidth: 'var(--alert-dialog-width)', // Alert Dialog variable
        minHeight: 'auto', // Auto height based on content
        height: 'auto', // Auto height based on content
        display: 'flex', // Use flex layout
        flexDirection: 'column',
        gap: 0, // Remove default gap, we'll handle spacing manually
      }}
    >
      {/* Header with Icon, Title and Close Button */}
      <div
        className="flex items-start justify-between"
        style={{
          marginBottom: description || children ? 'var(--space-md)' : 0,
          width: '100%',
        }}
      >
        <div className="flex items-center" style={{ flex: 1, gap: 'var(--alert-dialog-header-gap)' }}>
          {icon && (
            <div
              style={{
                color: 'var(--alert-dialog-icon-color)', // Alert Dialog variable
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                width: 'var(--alert-dialog-icon-size)', // Alert Dialog variable
                height: 'var(--alert-dialog-icon-size)', // Alert Dialog variable
              }}
            >
              {icon}
            </div>
          )}
          <DialogTitle
            style={{
              fontSize: 'var(--alert-dialog-title-size)', // Alert Dialog variable
              fontWeight: 'var(--alert-dialog-title-weight)', // Alert Dialog variable
              lineHeight: 'var(--alert-dialog-title-line-height)', // Alert Dialog variable
              letterSpacing: 'var(--alert-dialog-title-letter-spacing)', // Alert Dialog variable
              color: 'var(--alert-dialog-title-color)', // Alert Dialog variable
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
            onClick={() => onOpenChange?.(false)}
            className="rounded-full transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
            style={{
              backgroundColor: 'var(--state-info)', // Teal background as per finalized design
              color: 'var(--action-text-on-primary)', // White X icon
              borderRadius: 'var(--radius-full)',
              padding: 'var(--space-sm)',
              width: 'var(--alert-dialog-close-button-size)', // Alert Dialog variable
              height: 'var(--alert-dialog-close-button-size)', // Alert Dialog variable
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              position: 'relative',
              zIndex: 10,
            }}
            aria-label="Close"
          >
            <RiCloseLine size={parseInt('var(--alert-dialog-close-icon-size)'.replace('px', '')) || 20} style={{ color: '#FFFFFF' }} />
          </button>
        </DialogClose>
      </div>

      {/* Description */}
      {description && (
        <DialogDescription
          style={{
            fontSize: 'var(--en-font-size-body)',
            lineHeight: 'var(--en-line-height-normal)',
            letterSpacing: 'var(--en-letter-spacing-normal)',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--en-font-family-base)',
            marginBottom: children ? 'var(--space-md)' : 'var(--space-lg)',
          }}
        >
          {description}
        </DialogDescription>
      )}

      {/* Custom Content */}
      {children && (
        <div style={{ width: '100%', marginBottom: primaryAction || secondaryAction ? 'var(--space-lg)' : 0 }}>
          {children}
        </div>
      )}

      {/* Footer with Actions - Primary action MUST be right-aligned per Dialog rules */}
      {(primaryAction || secondaryAction) && (
        <DialogFooter 
          className="flex justify-end"
          style={{
            gap: 'var(--space-md)',
            marginTop: 'var(--space-md)',
            width: '100%',
          }}
        >
          {/* Secondary Action - MUST NOT use brand colors, MUST be outline/ghost/muted per Dialog rules */}
          {secondaryAction && (
            <DialogClose asChild>
              <button
                type="button"
                onClick={handleSecondaryAction}
                className="rounded-full transition-colors hover:opacity-90"
                style={{
                  ...secondaryActionStyle,
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--alert-dialog-button-font-size)', // Alert Dialog variable
                  fontWeight: 'var(--alert-dialog-secondary-weight)', // Alert Dialog variable
                  lineHeight: 'var(--alert-dialog-button-line-height)', // Alert Dialog variable
                  letterSpacing: 'var(--alert-dialog-button-letter-spacing)', // Alert Dialog variable
                  fontFamily: 'var(--en-font-family-base)',
                  padding: 'var(--alert-dialog-button-padding)', // Alert Dialog variable
                  minWidth: '100px',
                  cursor: 'pointer',
                }}
              >
                {secondaryAction}
              </button>
            </DialogClose>
          )}
          {/* Primary Action - MUST use primary.teal.500 (#308282), radius.full (9999px), visually dominant, right-aligned per Dialog rules */}
          {primaryAction && (
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="rounded-full transition-colors hover:opacity-90"
              style={{
                ...primaryActionStyle,
                borderRadius: 'var(--radius-full)', // radius.full (9999px) as per Dialog rules
                fontSize: 'var(--alert-dialog-button-font-size)', // Alert Dialog variable
                fontWeight: 'var(--alert-dialog-primary-weight)', // Alert Dialog variable
                lineHeight: 'var(--alert-dialog-button-line-height)', // Alert Dialog variable
                letterSpacing: 'var(--alert-dialog-button-letter-spacing)', // Alert Dialog variable
                fontFamily: 'var(--en-font-family-base)',
                padding: 'var(--alert-dialog-button-padding)', // Alert Dialog variable
                minWidth: '100px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: isBrandConfirmation ? 'var(--shadow-sm)' : 'none', // Add shadow for brand-confirmation to make it dominant
              }}
            >
              {primaryAction}
            </button>
          )}
        </DialogFooter>
      )}
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
