import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { errorStateTemplate } from '@templates/error-state'

function ErrorStatePreview() {
  const [retryCount, setRetryCount] = useState(0)

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border border-destructive/50 rounded-lg max-w-md bg-destructive/5">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg className="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-destructive">Something went wrong</h3>
          <p className="text-sm text-muted-foreground">
            We could not load your data. Please try again.
          </p>
          {retryCount > 0 && (
            <p className="text-xs text-muted-foreground">Retried {retryCount} time(s)</p>
          )}
        </div>
        <button 
          onClick={() => setRetryCount(retryCount + 1)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export function ErrorStateDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Error State</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A composable error state component with Context API and retry functionality.
        </p>
      </div>
      <ComponentPreview
        name="Error State"
        preview={<ErrorStatePreview />}
        code={`import { ErrorState, ErrorStateIcon, ErrorStateTitle, ErrorStateDescription, ErrorStateAction } from '@/components/ui/error-state';
import { View } from 'react-native';

<ErrorState>
  <ErrorStateIcon>
    <AlertCircleIcon />
  </ErrorStateIcon>
  <ErrorStateTitle>Something went wrong</ErrorStateTitle>
  <ErrorStateDescription>
    We could not load your data. Please try again.
  </ErrorStateDescription>
  <ErrorStateAction onPress={() => console.log('Retry')}>
    Try Again
  </ErrorStateAction>
</ErrorState>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add error-state"
        manual={errorStateTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { ErrorState } from '@/components/ui/error-state';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<ErrorState
  title="Something went wrong"
  description="Please try again later"
  onRetry={() => refetch()}
/>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
