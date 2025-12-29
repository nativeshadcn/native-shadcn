import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { buttonTemplate } from '@templates/button'

// Mock preview components (these would render on web)
function ButtonPreview() {
  return (
    <div className="flex flex-col gap-4">
      <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Button
      </button>
    </div>
  )
}

export function ButtonDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Button</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <ComponentPreview
        name="Button"
        preview={<ButtonPreview />}
        code={`import { Button } from '@/components/ui/button';

<Button onPress={() => console.log('Pressed')}>
  Button
</Button>`}
      />

      <InstallationSteps
        cli="npx native-shadcn add button"
        manual={buttonTemplate}
        dependencies={['class-variance-authority', 'clsx', 'tailwind-merge']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Button } from '@/components/ui/button';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<Button variant="outline" size="lg" onPress={() => {}}>
  Click me
</Button>`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Primary</h3>
          <ComponentPreview
            name="Primary Button"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Button
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';

<Button variant="default">Button</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Secondary</h3>
          <ComponentPreview
            name="Secondary Button"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90">
                  Secondary
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';

<Button variant="secondary">Secondary</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Destructive</h3>
          <ComponentPreview
            name="Destructive Button"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                  Destructive
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';

<Button variant="destructive">Destructive</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Outline</h3>
          <ComponentPreview
            name="Outline Button"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  Outline
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';

<Button variant="outline">Outline</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Ghost</h3>
          <ComponentPreview
            name="Ghost Button"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                  Ghost
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';

<Button variant="ghost">Ghost</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Link</h3>
          <ComponentPreview
            name="Link Button"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary underline-offset-4 hover:underline">
                  Link
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';

<Button variant="link">Link</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Icon</h3>
          <ComponentPreview
            name="Button with Icon"
            preview={
              <div className="flex justify-center p-8">
                <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                  Login
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';
import { View, Text } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

<Button>
  <View className="flex-row items-center gap-2">
    <ArrowRight size={16} />
    <Text>Login</Text>
  </View>
</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Loading</h3>
          <ComponentPreview
            name="Loading Button"
            preview={
              <div className="flex justify-center p-8">
                <button disabled className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-50">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Please wait
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';
import { View, Text, ActivityIndicator } from 'react-native';

<Button disabled>
  <View className="flex-row items-center gap-2">
    <ActivityIndicator size="small" color="currentColor" />
    <Text>Please wait</Text>
  </View>
</Button>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Size Variants</h3>
          <ComponentPreview
            name="Button Sizes"
            preview={
              <div className="flex flex-wrap items-center gap-4 p-8">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                  Small
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Default
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90">
                  Large
                </button>
                <button className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>
              </div>
            }
            code={`import { Button } from '@/components/ui/button';
import { View } from 'react-native';

<View className="flex-row flex-wrap items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <ChevronRight />
  </Button>
</View>`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Props</h2>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Prop</th>
                <th className="p-4 text-left font-semibold">Type</th>
                <th className="p-4 text-left font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">variant</td>
                <td className="p-4 text-sm text-muted-foreground">
                  "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
                </td>
                <td className="p-4 text-sm">"default"</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">size</td>
                <td className="p-4 text-sm text-muted-foreground">
                  "default" | "sm" | "lg" | "icon"
                </td>
                <td className="p-4 text-sm">"default"</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">className</td>
                <td className="p-4 text-sm text-muted-foreground">string</td>
                <td className="p-4 text-sm">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
