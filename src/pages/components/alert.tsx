import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import alertSource from '@templates/alert?raw'
import { AlertExample } from '@/examples/components/alert-example'
import alertExampleSource from '@/examples/components/alert-example?raw'

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
        preview={<AlertExample />}
        code={alertExampleSource}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add alert"
        manual={alertSource}
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
