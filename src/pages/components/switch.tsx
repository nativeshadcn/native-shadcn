import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import switchSource from '@templates/switch?raw'

export function SwitchDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Switch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A control that allows the user to toggle between checked and not checked.
        </p>
      </div>

      <ComponentPreview
        name="Switch"
        preview={
          <div className="flex items-center justify-center p-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white shadow-lg transition-transform" />
              </div>
              <span className="text-sm">Airplane Mode</span>
            </label>
          </div>
        }
        code={`import { Switch } from '@/components/ui/switch';

<Switch />`}
      />

      <InstallationSteps
        cli="npx native-shadcn add switch"
        manual={switchSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Switch } from '@/components/ui/switch';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Switch />`} language="tsx" />
          </div>
        </div>
      </div>

    </div>
  )
}
