import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import checkboxSource from '@templates/checkbox?raw'

export function CheckboxDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Checkbox</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      <ComponentPreview
        name="Checkbox"
        preview={
          <div className="flex items-center gap-2 p-8">
            <div className="h-4 w-4 rounded border-2 border-primary bg-primary flex items-center justify-center">
              <svg className="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <label className="text-sm cursor-pointer">Accept terms and conditions</label>
          </div>
        }
        code={`import { Checkbox } from '@/components/ui/checkbox';

<Checkbox label="Accept terms and conditions" />`}
      />

      <InstallationSteps
        cli="npx native-shadcn add checkbox"
        manual={checkboxSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Checkbox } from '@/components/ui/checkbox';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Checkbox />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
