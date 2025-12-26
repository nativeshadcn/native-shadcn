import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { inputTemplate } from '@templates/input'

export function InputDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Input</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays a form input field or a component that looks like an input field.
        </p>
      </div>

      <ComponentPreview
        name="Input"
        preview={
          <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
            <input
              type="text"
              placeholder="Email"
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        }
        code={`import { Input } from '@/components/ui/input';

<Input placeholder="Email" />`}
      />

      <InstallationSteps
        cli="npx native-shadcn add input"
        manual={inputTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Input } from '@/components/ui/input';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Input />`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Default</h3>
          <ComponentPreview
            name="Default Input"
            preview={
              <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
                <input
                  type="email"
                  placeholder="Email"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
            }
            code={`import { Input } from '@/components/ui/input';

<Input placeholder="Email" />`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">File</h3>
          <ComponentPreview
            name="File Input"
            preview={
              <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
                <input
                  type="file"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
              </div>
            }
            code={`import { Input } from '@/components/ui/input';

<Input type="file" />`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Disabled</h3>
          <ComponentPreview
            name="Disabled Input"
            preview={
              <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
                <input
                  type="email"
                  placeholder="Email"
                  disabled
                  className="h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground opacity-50 cursor-not-allowed"
                />
              </div>
            }
            code={`import { Input } from '@/components/ui/input';

<Input disabled placeholder="Email" />
// or in React Native
<Input editable={false} placeholder="Email" />`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Label</h3>
          <ComponentPreview
            name="Input with Label"
            preview={
              <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="m@example.com"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
              </div>
            }
            code={`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';

<View className="gap-2">
  <Label nativeID="email">Email</Label>
  <Input placeholder="m@example.com" aria-labelledby="email" />
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Button</h3>
          <ComponentPreview
            name="Input with Button"
            preview={
              <div className="flex flex-col gap-4 p-8 w-full max-w-sm">
                <div className="flex w-full items-center space-x-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                  <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Subscribe
                  </button>
                </div>
              </div>
            }
            code={`import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { View } from 'react-native';

<View className="flex-row items-center gap-2">
  <Input className="flex-1" placeholder="Email" />
  <Button>Subscribe</Button>
</View>`}
          />
        </div>
      </div>
    </div>
  )
}
