import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import separatorSource from '@templates/separator?raw'

export function SeparatorDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Separator</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Visual divider between content.
        </p>
      </div>
      <ComponentPreview
        name="Separator"
        preview={
          <div className="flex flex-col items-center justify-center p-8 w-full max-w-md gap-6">
            <div className="w-full space-y-1">
              <h4 className="text-sm font-medium">Horizontal Separator</h4>
              <div className="h-px bg-border w-full"></div>
            </div>
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 space-y-1">
                <p className="text-sm">Left Content</p>
              </div>
              <div className="h-16 w-px bg-border"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">Right Content</p>
              </div>
            </div>
          </div>
        }
        code={`import { Separator } from '@/components/ui/separator';

<View>
  <Text>Content above</Text>
  <Separator />
  <Text>Content below</Text>
</View>

{/* Vertical separator */}
<View className="flex-row">
  <Text>Left</Text>
  <Separator orientation="vertical" />
  <Text>Right</Text>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add separator"
        manual={separatorSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Separator } from '@/components/ui/separator';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Separator />
<Separator orientation="vertical" />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
