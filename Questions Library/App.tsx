import React, { useState } from 'react';
import { Tabs } from './components/Tabs';
import { TextQuestion } from './components/TextQuestion';
import { MultipleChoiceQuestion } from './components/MultipleChoiceQuestion';
import { RadioQuestion } from './components/RadioQuestion';
import { DropdownQuestion } from './components/DropdownQuestion';
import { RatingQuestion } from './components/RatingQuestion';
import { NumericQuestion } from './components/NumericQuestion';
import { DateQuestion } from './components/DateQuestion';
import { ListQuestion } from './components/ListQuestion';
import { EncAlert, type EncAlertVariant } from './components/ui/EncAlert';
import { EncAlertDialog, type EncAlertDialogVariant } from './components/ui/EncAlertDialog';
import { EncDialog } from './components/ui/EncDialog';
import { Archive } from '@phosphor-icons/react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all-questions');

  const tabs = [
    { id: 'all-questions', label: 'All Questions' },
    { id: 'showcase', label: 'Showcase' },
  ];

  // All Questions - Full width list, no explanations
  const AllQuestionsView = () => (
    <div className="w-full flex justify-center">
      <div className="space-y-8" style={{ paddingTop: 'var(--space-xl)', maxWidth: '900px', width: '100%' }}>
        {/* Text Input - Short */}
        <TextQuestion
          id="q1"
          label="What is your name?"
          placeholder="Enter your name"
          required
        />

        {/* Text Input - Long */}
        <TextQuestion
          id="q2"
          label="Tell us about your experience"
          placeholder="Share your detailed feedback..."
          multiline
          required
        />

        {/* Radio Button - Single Select */}
        <RadioQuestion
          id="q3"
          label="Which option best describes you?"
          options={[
            { id: '1', label: 'Option A' },
            { id: '2', label: 'Option B' },
            { id: '3', label: 'Option C' },
            { id: '4', label: 'Option D' },
          ]}
          required
        />

        {/* Radio Button with Comment */}
        <RadioQuestion
          id="q4"
          label="What is your preferred option?"
          options={[
            { id: '1', label: 'Option 1' },
            { id: '2', label: 'Option 2' },
            { id: '3', label: 'Option 3' },
          ]}
          allowComment
          required
        />

        {/* Multiple Choice - Checkboxes */}
        <MultipleChoiceQuestion
          id="q5"
          label="Select all that apply"
          options={[
            { id: '1', label: 'Feature A' },
            { id: '2', label: 'Feature B' },
            { id: '3', label: 'Feature C' },
            { id: '4', label: 'Feature D' },
          ]}
          multiple={true}
          required
        />

        {/* Dropdown - Single Select */}
        <DropdownQuestion
          id="q6"
          label="Choose an option"
          options={[
            { id: '1', label: 'Option One' },
            { id: '2', label: 'Option Two' },
            { id: '3', label: 'Option Three' },
            { id: '4', label: 'Option Four' },
            { id: '5', label: 'Option Five' },
          ]}
          placeholder="Select an option..."
          required
        />

        {/* Dropdown - Multiple Select */}
        <DropdownQuestion
          id="q7"
          label="Select multiple options"
          options={[
            { id: '1', label: 'Option A' },
            { id: '2', label: 'Option B' },
            { id: '3', label: 'Option C' },
            { id: '4', label: 'Option D' },
          ]}
          multiple={true}
          placeholder="Select options..."
          required
        />

        {/* Dropdown - Searchable */}
        <DropdownQuestion
          id="q8"
          label="Search and select"
          options={[
            { id: '1', label: 'Apple' },
            { id: '2', label: 'Banana' },
            { id: '3', label: 'Cherry' },
            { id: '4', label: 'Date' },
            { id: '5', label: 'Elderberry' },
            { id: '6', label: 'Fig' },
            { id: '7', label: 'Grape' },
          ]}
          searchable
          placeholder="Search and select..."
          required
        />

        {/* Rating */}
        <RatingQuestion
          id="q9"
          label="How would you rate this?"
          maxRating={5}
          required
        />

        {/* Rating with Labels */}
        <RatingQuestion
          id="q10"
          label="Rate your satisfaction"
          maxRating={5}
          showLabels
          required
        />

        {/* Numeric - Whole Number */}
        <NumericQuestion
          id="q11"
          label="What is your age?"
          type="whole"
          placeholder="Enter your age"
          min={0}
          max={120}
          required
        />

        {/* Numeric - Decimal */}
        <NumericQuestion
          id="q12"
          label="Enter a decimal value"
          type="decimal"
          placeholder="0.00"
          min={0}
          max={1000}
          step={0.01}
          precision={2}
          required
        />

        {/* Numeric - Currency */}
        <NumericQuestion
          id="q13"
          label="What is your salary?"
          type="currency"
          placeholder="0.00"
          currency="USD"
          min={0}
          required
        />

        {/* Numeric - Percentage */}
        <NumericQuestion
          id="q14"
          label="What percentage?"
          type="percentage"
          placeholder="0%"
          min={0}
          max={100}
          required
        />

        {/* Date Picker */}
        <DateQuestion
          id="q15"
          label="What is your birth date?"
          type="date"
          required
        />

        {/* Date Range */}
        <DateQuestion
          id="q16"
          label="Select a date range"
          type="date-range"
          required
        />

        {/* Open Ended List */}
        <ListQuestion
          id="q17"
          label="List your skills"
          placeholder="Enter a skill"
          minItems={0}
          maxItems={10}
          required
        />
      </div>
    </div>
  );

  // Showcase View (existing implementation)
  const ShowcaseView = () => {
    const [showAlert, setShowAlert] = useState<EncAlertVariant | null>(null);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [alertDialogVariant, setAlertDialogVariant] = useState<EncAlertDialogVariant>('default');
    
    return (
      <div className="w-full">
        <div className="mb-12">
          <p
            style={{
              fontSize: 'var(--en-font-size-body)',
              color: 'var(--text-secondary)',
            }}
          >
            Component showcase with descriptions and examples
          </p>
        </div>
        
        {/* Alert Component Showcase */}
        <div className="space-y-6 mb-12">
          <h2
            style={{
              fontSize: 'var(--en-font-size-h3)',
              fontWeight: 'var(--en-font-weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Alert Component
          </h2>
          
          {/* Interactive Button Demo */}
          <div className="mb-8" style={{ maxWidth: '900px' }}>
            <h3
              style={{
                fontSize: 'var(--en-font-size-h4)',
                fontWeight: 'var(--en-font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Interactive Demo
            </h3>
            <p
              style={{
                fontSize: 'var(--en-font-size-body-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Click the buttons below to show different alert types:
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowAlert('success')}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-success)',
                  color: 'var(--action-text-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Success Alert
              </button>
              
              <button
                onClick={() => setShowAlert('warning')}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-warning)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Warning Alert
              </button>
              
              <button
                onClick={() => setShowAlert('error')}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-error)',
                  color: 'var(--action-text-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Error Alert
              </button>
              
              <button
                onClick={() => setShowAlert('info')}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-info)',
                  color: 'var(--action-text-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Info Alert
              </button>
            </div>
            
            {/* Dynamic Alert */}
            {showAlert && (
              <EncAlert
                variant={showAlert}
                title={
                  showAlert === 'success' ? 'Success!' :
                  showAlert === 'warning' ? 'Warning' :
                  showAlert === 'error' ? 'Error' :
                  showAlert === 'info' ? 'Information' :
                  'Alert'
                }
                dismissible
                onDismiss={() => setShowAlert(null)}
              >
                {showAlert === 'success' && 'Your action was completed successfully!'}
                {showAlert === 'warning' && 'Please review this warning before proceeding.'}
                {showAlert === 'error' && 'An error occurred. Please try again.'}
                {showAlert === 'info' && 'Here is some helpful information for you.'}
              </EncAlert>
            )}
          </div>
          
          {/* Static Examples */}
          <div className="space-y-4" style={{ maxWidth: '900px' }}>
            <h3
              style={{
                fontSize: 'var(--en-font-size-h4)',
                fontWeight: 'var(--en-font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Static Examples
            </h3>
            
            <EncAlert variant="success" title="Success!" dismissible>
              Your changes have been saved successfully.
            </EncAlert>
            
            <EncAlert variant="warning" title="Warning" dismissible>
              Please review your input before submitting.
            </EncAlert>
            
            <EncAlert variant="error" title="Error" dismissible>
              Something went wrong. Please try again.
            </EncAlert>
            
            <EncAlert variant="info" title="Information" dismissible>
              This is an informational message.
            </EncAlert>
            
            <EncAlert variant="default" dismissible>
              Default alert without a title.
            </EncAlert>
            
            <EncAlert variant="success" showIcon={false}>
              Alert without icon.
            </EncAlert>
          </div>
        </div>

        {/* Alert Dialog Component Showcase */}
        <div className="space-y-6 mb-12" style={{ maxWidth: '900px' }}>
          <h2
            style={{
              fontSize: 'var(--en-font-size-h3)',
              fontWeight: 'var(--en-font-weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Alert Dialog Component
          </h2>
          
          {/* Interactive Dialog Demo */}
          <div className="mb-8">
            <h3
              style={{
                fontSize: 'var(--en-font-size-h4)',
                fontWeight: 'var(--en-font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Interactive Demo
            </h3>
            <p
              style={{
                fontSize: 'var(--en-font-size-body-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Click the buttons below to open different alert dialog types:
            </p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => {
                  setAlertDialogVariant('success');
                  setAlertDialogOpen(true);
                }}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-success)',
                  color: 'var(--action-text-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Success Dialog
              </button>
              
              <button
                onClick={() => {
                  setAlertDialogVariant('warning');
                  setAlertDialogOpen(true);
                }}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-warning)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Warning Dialog
              </button>
              
              <button
                onClick={() => {
                  setAlertDialogVariant('error');
                  setAlertDialogOpen(true);
                }}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-error)',
                  color: 'var(--action-text-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Error Dialog
              </button>
              
              <button
                onClick={() => {
                  setAlertDialogVariant('info');
                  setAlertDialogOpen(true);
                }}
                className="px-4 py-2 rounded-full font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--state-info)',
                  color: 'var(--action-text-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--en-font-size-body)',
                }}
              >
                Show Info Dialog
              </button>
            </div>

            {/* Alert Dialog */}
            <EncAlertDialog
              open={alertDialogOpen}
              onOpenChange={setAlertDialogOpen}
              variant={alertDialogVariant}
              title={
                alertDialogVariant === 'success' ? 'Success!' :
                alertDialogVariant === 'warning' ? 'Warning' :
                alertDialogVariant === 'error' ? 'Error' :
                alertDialogVariant === 'info' ? 'Information' :
                'Alert'
              }
              description={
                alertDialogVariant === 'success' ? 'Your action was completed successfully!' :
                alertDialogVariant === 'warning' ? 'Please review this warning before proceeding.' :
                alertDialogVariant === 'error' ? 'An error occurred. Please try again.' :
                alertDialogVariant === 'info' ? 'Here is some helpful information for you.' :
                'This is an alert dialog.'
              }
              actionLabel="OK"
              cancelLabel="Cancel"
              onAction={() => {
                console.log(`${alertDialogVariant} dialog action clicked`);
              }}
              onCancel={() => {
                console.log(`${alertDialogVariant} dialog cancelled`);
              }}
            />
          </div>

          {/* Static Examples with Trigger Buttons */}
          <div className="space-y-4">
            <h3
              style={{
                fontSize: 'var(--en-font-size-h4)',
                fontWeight: 'var(--en-font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Examples with Triggers
            </h3>
            
            <div className="flex flex-wrap gap-3">
              <EncAlertDialog
                variant="success"
                title="Changes Saved"
                description="Your changes have been saved successfully."
                actionLabel="Continue"
                cancelLabel="Close"
                trigger={
                  <button
                    className="px-4 py-2 rounded-full font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--state-success)',
                      color: 'var(--action-text-on-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--en-font-size-body)',
                    }}
                  >
                    Success Dialog
                  </button>
                }
              />
              
              <EncAlertDialog
                variant="warning"
                title="Confirm Action"
                description="Are you sure you want to proceed? This action cannot be undone."
                actionLabel="Proceed"
                cancelLabel="Cancel"
                trigger={
                  <button
                    className="px-4 py-2 rounded-full font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--state-warning)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--en-font-size-body)',
                    }}
                  >
                    Warning Dialog
                  </button>
                }
              />
              
              <EncAlertDialog
                variant="error"
                title="Error Occurred"
                description="Something went wrong. Please try again or contact support if the problem persists."
                actionLabel="Retry"
                cancelLabel="Close"
                trigger={
                  <button
                    className="px-4 py-2 rounded-full font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--state-error)',
                      color: 'var(--action-text-on-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--en-font-size-body)',
                    }}
                  >
                    Error Dialog
                  </button>
                }
              />
              
              <EncAlertDialog
                variant="info"
                title="Information"
                description="This is an informational message. You can proceed with your current action."
                actionLabel="Got it"
                cancelLabel="Close"
                trigger={
                  <button
                    className="px-4 py-2 rounded-full font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--state-info)',
                      color: 'var(--action-text-on-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--en-font-size-body)',
                    }}
                  >
                    Info Dialog
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* EncDialog Component Showcase */}
        <div className="space-y-6 mb-12" style={{ maxWidth: '900px' }}>
          <h2
            style={{
              fontSize: 'var(--en-font-size-h3)',
              fontWeight: 'var(--en-font-weight-semibold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Dialog Component (Figma Design)
          </h2>
          
          {/* Finalized Brand Colored Dialog Demo */}
          <div className="mb-8">
            <h3
              style={{
                fontSize: 'var(--en-font-size-h4)',
                fontWeight: 'var(--en-font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Finalized Brand Colored Dialog (Figma Design)
            </h3>
            <p
              style={{
                fontSize: 'var(--en-font-size-body-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Click the button below to open the finalized brand color dialog matching the Figma design:
            </p>
            
            <EncDialog
              intent="brand-confirmation"
              title="Are you sure you want to leave this page?"
              icon={<Archive weight="regular" size={24} />}
              primaryAction="Proceed"
              secondaryAction="Leave this page"
              onPrimaryAction={() => {
                console.log('Proceed action confirmed!');
                alert('Proceed action confirmed!');
              }}
              onSecondaryAction={() => {
                console.log('Leave page action cancelled');
              }}
              trigger={
                <button
                  className="px-4 py-2 rounded-full font-medium transition-colors hover:opacity-90"
                  style={{
                    // Primary trigger button should follow Dialog rules primary.teal.500 (#308282)
                    backgroundColor: '#308282',
                    color: 'var(--action-text-on-primary)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--en-font-size-body)',
                    fontWeight: 'var(--en-font-weight-medium)',
                    padding: 'var(--space-sm) var(--space-lg)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  Open Finalized Brand Dialog
                </button>
              }
            >
              {/* Main Message */}
              <div
                style={{
                  fontSize: 'var(--alert-dialog-body-size)', // Alert Dialog variable
                  fontWeight: 'var(--alert-dialog-body-weight-semibold)', // Alert Dialog variable
                  lineHeight: 'var(--alert-dialog-body-line-height)', // Alert Dialog variable
                  letterSpacing: 'var(--alert-dialog-body-letter-spacing)', // Alert Dialog variable
                  color: 'var(--alert-dialog-body-color-primary)', // Alert Dialog variable
                  fontFamily: 'var(--en-font-family-base)',
                  marginBottom: 'var(--space-md)',
                }}
              >
                You're about to archive 2,089 questions from question library.
              </div>

              {/* Information List */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  marginBottom: 'var(--space-md)',
                }}
              >
                {[
                  "Archived questions will no longer appear in active question & survey templates, but their data will remain safely stored for reactivation later.",
                  "This action applies immediately across all linked question & survey templates.",
                  "If you're unsure, consider closing or resolving this action instead."
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      fontSize: 'var(--alert-dialog-body-size)', // Alert Dialog variable
                      lineHeight: 'var(--alert-dialog-body-line-height)', // Alert Dialog variable
                      letterSpacing: 'var(--alert-dialog-body-letter-spacing)', // Alert Dialog variable
                      color: 'var(--alert-dialog-body-color)', // Alert Dialog variable
                      fontFamily: 'var(--en-font-family-base)',
                      marginBottom: index < 2 ? 'var(--space-sm)' : 0,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--alert-dialog-body-color)', // Alert Dialog variable
                        marginRight: 'var(--space-sm)',
                        marginTop: '6px',
                        flexShrink: 0,
                      }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Confirmation Question */}
              <div
                style={{
                  fontSize: 'var(--alert-dialog-body-size)', // Alert Dialog variable
                  lineHeight: 'var(--alert-dialog-body-line-height)', // Alert Dialog variable
                  letterSpacing: 'var(--alert-dialog-body-letter-spacing)', // Alert Dialog variable
                  color: 'var(--alert-dialog-body-color)', // Alert Dialog variable
                  fontFamily: 'var(--en-font-family-base)',
                }}
              >
                Would you like to{' '}
                <span style={{ fontWeight: 'var(--alert-dialog-body-weight-semibold)' }}>
                  proceed
                </span>
                ?
              </div>
            </EncDialog>
          </div>

          {/* Other Dialog Intents */}
          <div className="mb-8">
            <h3
              style={{
                fontSize: 'var(--en-font-size-h4)',
                fontWeight: 'var(--en-font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Other Dialog Variants
            </h3>
            <p
              style={{
                fontSize: 'var(--en-font-size-body-sm)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Examples of other dialog intents:
            </p>
            
            <div className="flex flex-wrap gap-3">
              <EncDialog
                intent="destructive-warning"
                title="Delete Item"
                description="This action cannot be undone. Are you sure you want to delete this item?"
                primaryAction="Delete"
                secondaryAction="Cancel"
                onPrimaryAction={() => {
                  console.log('Destructive action confirmed');
                }}
                trigger={
                  <button
                    className="px-4 py-2 rounded-full font-medium transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--state-error)',
                      color: 'var(--action-text-on-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--en-font-size-body)',
                      fontWeight: 'var(--en-font-weight-medium)',
                      padding: 'var(--space-sm) var(--space-lg)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    Destructive Dialog
                  </button>
                }
              />
              
              <EncDialog
                intent="neutral"
                title="Neutral Dialog"
                description="This is a neutral dialog with teal primary action button."
                primaryAction="Continue"
                secondaryAction="Cancel"
                onPrimaryAction={() => {
                  console.log('Neutral dialog confirmed');
                }}
                trigger={
                  <button
                    className="px-4 py-2 rounded-full font-medium transition-colors hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--text-secondary)',
                      color: 'var(--action-text-on-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--en-font-size-body)',
                      fontWeight: 'var(--en-font-weight-medium)',
                      padding: 'var(--space-sm) var(--space-lg)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    Neutral Dialog
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: 'var(--surface-page)',
        color: 'var(--text-primary)',
      }}
    >
      <div className="w-full" style={{ paddingLeft: 'var(--space-lg)', paddingRight: 'var(--space-lg)', paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}>
        {/* Header */}
        <header className="mb-8" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1
            className="mb-2"
            style={{
              fontSize: 'var(--en-font-size-h1)',
              fontWeight: 'var(--en-font-weight-bold)',
              lineHeight: 'var(--en-line-height-tight)',
              color: 'var(--text-primary)',
            }}
          >
            Questions Library
          </h1>
          <p
            style={{
              fontSize: 'var(--en-font-size-body)',
              color: 'var(--text-secondary)',
            }}
          >
            Reusable question components for surveys and forms
          </p>
        </header>

        {/* Tabs */}
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content - Full Width */}
        <div className="mt-8 w-full">
          {activeTab === 'all-questions' && <AllQuestionsView />}
          {activeTab === 'showcase' && <ShowcaseView />}
        </div>
      </div>
    </div>
  );
};

export default App;
