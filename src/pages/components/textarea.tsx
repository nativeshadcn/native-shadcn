import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { textareaTemplate } from '@templates/textarea'

export function TextareaDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Textarea</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays a form textarea or a component that looks like a textarea.
        </p>
      </div>

      <ComponentPreview
        name="Textarea"
        preview={
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <textarea
                placeholder="Type your message here."
                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                rows={4}
              />
            </div>
          </div>
        }
        code={`import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Type your message here." />`}
      />

      <InstallationSteps
        cli="npx native-shadcn add textarea"
        manual={textareaTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Textarea } from '@/components/ui/textarea';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Textarea />`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Default</h3>
          <ComponentPreview
            name="Default Textarea"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                  <textarea
                    placeholder="Type your message here."
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={4}
                  />
                </div>
              </div>
            }
            code={`import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Type your message here." />`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Disabled</h3>
          <ComponentPreview
            name="Disabled Textarea"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                  <textarea
                    placeholder="Type your message here."
                    disabled
                    className="min-h-[80px] w-full rounded-md border border-input bg-muted px-3 py-2 text-sm resize-none opacity-50 cursor-not-allowed"
                    rows={4}
                  />
                </div>
              </div>
            }
            code={`import { Textarea } from '@/components/ui/textarea';

<Textarea disabled placeholder="Type your message here." />
// or in React Native
<Textarea editable={false} placeholder="Type your message here." />`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Label</h3>
          <ComponentPreview
            name="Textarea with Label"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-2">
                  <label className="text-sm font-medium">Your message</label>
                  <textarea
                    placeholder="Type your message here."
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={4}
                  />
                </div>
              </div>
            }
            code={`import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';

<View className="gap-2">
  <Label nativeID="message">Your message</Label>
  <Textarea
    placeholder="Type your message here."
    aria-labelledby="message"
  />
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Text</h3>
          <ComponentPreview
            name="Textarea with Text"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-2">
                  <label className="text-sm font-medium">Your message</label>
                  <textarea
                    placeholder="Type your message here."
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your message will be copied to the support team.
                  </p>
                </div>
              </div>
            }
            code={`import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { View, Text } from 'react-native';

<View className="gap-2">
  <Label nativeID="message">Your message</Label>
  <Textarea
    placeholder="Type your message here."
    aria-labelledby="message"
  />
  <Text className="text-xs text-muted-foreground">
    Your message will be copied to the support team.
  </Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Button</h3>
          <ComponentPreview
            name="Textarea with Button"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-2">
                  <textarea
                    placeholder="Type your message here."
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={4}
                  />
                  <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Send message
                  </button>
                </div>
              </div>
            }
            code={`import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { View } from 'react-native';

<View className="gap-2">
  <Textarea placeholder="Type your message here." />
  <Button>Send message</Button>
</View>`}
          />
        </div>
      </div>

    </div>
  )
}
