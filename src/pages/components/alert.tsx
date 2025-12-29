import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { alertTemplate } from '@templates/alert'

export function AlertDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Alert</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Important messages and notifications.
        </p>
      </div>
      <ComponentPreview
        name="Alert"
        preview={
          <div className="flex flex-col items-center justify-center p-8 gap-4 w-full max-w-2xl">
            <div className="w-full rounded-lg border border-border bg-background p-4">
              <div className="flex gap-3">
                <svg className="h-5 w-5 text-foreground mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h5 className="font-medium text-sm mb-1">Heads up!</h5>
                  <p className="text-sm text-muted-foreground">
                    You can add components to your app using the CLI.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex gap-3">
                <svg className="h-5 w-5 text-destructive mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h5 className="font-medium text-sm mb-1 text-destructive">Error</h5>
                  <p className="text-sm text-destructive">
                    Your session has expired. Please log in again.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full rounded-lg border border-green-500/50 bg-green-500/10 p-4">
              <div className="flex gap-3">
                <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <h5 className="font-medium text-sm mb-1 text-green-600">Success</h5>
                  <p className="text-sm text-green-600">
                    Your changes have been saved successfully.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
              <div className="flex gap-3">
                <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                  <h5 className="font-medium text-sm mb-1 text-yellow-600">Warning</h5>
                  <p className="text-sm text-yellow-600">
                    This action cannot be undone. Please proceed with caution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
        code={`import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

<View className="gap-4">
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the CLI.
    </AlertDescription>
  </Alert>

  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Your session has expired. Please log in again.
    </AlertDescription>
  </Alert>

  <Alert variant="success">
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>
      Your changes have been saved successfully.
    </AlertDescription>
  </Alert>

  <Alert variant="warning">
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>
      This action cannot be undone. Please proceed with caution.
    </AlertDescription>
  </Alert>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add alert"
        manual={alertTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`}
              language="tsx"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
