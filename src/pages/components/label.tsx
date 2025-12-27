import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import labelSource from '@templates/label?raw'

export function LabelDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Label</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Renders an accessible label associated with controls.
        </p>
      </div>

      <ComponentPreview
        name="Label"
        preview={
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-sm space-y-2">
              <label className="text-sm font-medium">Your email address</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        }
        code={`import { Label } from '@/components/ui/label';

<Label>Your email address</Label>`}
      />

      <InstallationSteps
        cli="npx native-shadcn add label"
        manual={labelSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Label } from '@/components/ui/label';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Label nativeID="email">Email</Label>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
