import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { textTemplate } from '@templates/text'

export function TextDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Text</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Typography component with variants.
        </p>
      </div>

      <ComponentPreview
        name="Text"
        preview={
          <div className="flex flex-col items-start justify-center p-8 gap-4 w-full max-w-2xl">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <h2 className="text-3xl font-bold">Heading 2</h2>
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <h4 className="text-xl font-semibold">Heading 4</h4>
            <p className="text-base">
              This is a paragraph with regular text. It uses the base font size and default line height for optimal readability.
            </p>
            <p className="text-sm text-muted-foreground">
              This is muted text, typically used for secondary information or descriptions.
            </p>
            <p className="text-xs text-muted-foreground">
              This is small text, often used for captions or helper text.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="font-bold">Bold text</span>
              <span className="font-semibold">Semibold text</span>
              <span className="font-medium">Medium text</span>
              <span className="font-normal">Normal text</span>
              <span className="font-light">Light text</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-primary">Primary color</span>
              <span className="text-destructive">Destructive color</span>
              <span className="text-muted-foreground">Muted color</span>
            </div>
          </div>
        }
        code={`import { Text } from '@/components/ui/text';

<View className="gap-4">
  {/* Headings */}
  <Text variant="h1">Heading 1</Text>
  <Text variant="h2">Heading 2</Text>
  <Text variant="h3">Heading 3</Text>
  <Text variant="h4">Heading 4</Text>

  {/* Body text */}
  <Text variant="body">
    This is a paragraph with regular text. It uses the base font size and default line height for optimal readability.
  </Text>

  <Text variant="muted">
    This is muted text, typically used for secondary information or descriptions.
  </Text>

  <Text variant="small">
    This is small text, often used for captions or helper text.
  </Text>

  {/* Font weights */}
  <View className="flex-row gap-2 flex-wrap">
    <Text className="font-bold">Bold text</Text>
    <Text className="font-semibold">Semibold text</Text>
    <Text className="font-medium">Medium text</Text>
    <Text className="font-normal">Normal text</Text>
    <Text className="font-light">Light text</Text>
  </View>

  {/* Colors */}
  <View className="flex-row gap-2 flex-wrap">
    <Text className="text-primary">Primary color</Text>
    <Text className="text-destructive">Destructive color</Text>
    <Text className="text-muted-foreground">Muted color</Text>
  </View>
</View>`}
      />

      <InstallationSteps
        cli="npx native-shadcn add text"
        manual={textTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Text } from '@/components/ui/text';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Text variant="body">Your text here</Text>`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Headings</h3>
          <ComponentPreview
            name="Text Headings"
            preview={
              <div className="flex flex-col items-start justify-center p-8 gap-4 w-full max-w-2xl">
                <h1 className="text-4xl font-bold">Heading 1</h1>
                <h2 className="text-3xl font-bold">Heading 2</h2>
                <h3 className="text-2xl font-semibold">Heading 3</h3>
                <h4 className="text-xl font-semibold">Heading 4</h4>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="gap-4">
  <Text variant="h1">Heading 1</Text>
  <Text variant="h2">Heading 2</Text>
  <Text variant="h3">Heading 3</Text>
  <Text variant="h4">Heading 4</Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Body Text</h3>
          <ComponentPreview
            name="Body Text"
            preview={
              <div className="flex flex-col items-start justify-center p-8 gap-4 w-full max-w-2xl">
                <p className="text-base">
                  This is a paragraph with regular text. It uses the base font size and default line height for optimal readability.
                </p>
                <p className="text-sm text-muted-foreground">
                  This is muted text, typically used for secondary information or descriptions.
                </p>
                <p className="text-xs text-muted-foreground">
                  This is small text, often used for captions or helper text.
                </p>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="gap-4">
  <Text variant="body">
    This is a paragraph with regular text. It uses the base font size and default line height for optimal readability.
  </Text>

  <Text variant="muted">
    This is muted text, typically used for secondary information or descriptions.
  </Text>

  <Text variant="small">
    This is small text, often used for captions or helper text.
  </Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Font Weights</h3>
          <ComponentPreview
            name="Font Weights"
            preview={
              <div className="flex flex-col items-start justify-center p-8 gap-4 w-full max-w-2xl">
                <div className="flex gap-2 flex-wrap">
                  <span className="font-bold">Bold text</span>
                  <span className="font-semibold">Semibold text</span>
                  <span className="font-medium">Medium text</span>
                  <span className="font-normal">Normal text</span>
                  <span className="font-light">Light text</span>
                </div>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="flex-row gap-2 flex-wrap">
  <Text className="font-bold">Bold text</Text>
  <Text className="font-semibold">Semibold text</Text>
  <Text className="font-medium">Medium text</Text>
  <Text className="font-normal">Normal text</Text>
  <Text className="font-light">Light text</Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Colors</h3>
          <ComponentPreview
            name="Text Colors"
            preview={
              <div className="flex flex-col items-start justify-center p-8 gap-4 w-full max-w-2xl">
                <div className="flex gap-2 flex-wrap">
                  <span className="text-primary">Primary color</span>
                  <span className="text-destructive">Destructive color</span>
                  <span className="text-muted-foreground">Muted color</span>
                  <span className="text-foreground">Foreground color</span>
                  <span className="text-accent-foreground">Accent color</span>
                </div>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="flex-row gap-2 flex-wrap">
  <Text className="text-primary">Primary color</Text>
  <Text className="text-destructive">Destructive color</Text>
  <Text className="text-muted-foreground">Muted color</Text>
  <Text className="text-foreground">Foreground color</Text>
  <Text className="text-accent-foreground">Accent color</Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Text Alignment</h3>
          <ComponentPreview
            name="Text Alignment"
            preview={
              <div className="flex flex-col items-stretch justify-center p-8 gap-4 w-full max-w-2xl">
                <p className="text-left">Left aligned text</p>
                <p className="text-center">Center aligned text</p>
                <p className="text-right">Right aligned text</p>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="gap-4">
  <Text className="text-left">Left aligned text</Text>
  <Text className="text-center">Center aligned text</Text>
  <Text className="text-right">Right aligned text</Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Text Styles</h3>
          <ComponentPreview
            name="Text Styles"
            preview={
              <div className="flex flex-col items-start justify-center p-8 gap-4 w-full max-w-2xl">
                <p className="italic">Italic text</p>
                <p className="underline">Underlined text</p>
                <p className="line-through">Strikethrough text</p>
                <p className="uppercase">Uppercase text</p>
                <p className="lowercase">LOWERCASE TEXT</p>
                <p className="capitalize">capitalize each word</p>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="gap-4">
  <Text className="italic">Italic text</Text>
  <Text className="underline">Underlined text</Text>
  <Text className="line-through">Strikethrough text</Text>
  <Text className="uppercase">Uppercase text</Text>
  <Text className="lowercase">LOWERCASE TEXT</Text>
  <Text className="capitalize">capitalize each word</Text>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Line Height</h3>
          <ComponentPreview
            name="Line Height"
            preview={
              <div className="flex flex-col items-start justify-center p-8 gap-6 w-full max-w-2xl">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Tight (leading-tight)</p>
                  <p className="leading-tight">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Normal (leading-normal)</p>
                  <p className="leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Relaxed (leading-relaxed)</p>
                  <p className="leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            }
            code={`import { Text } from '@/components/ui/text';
import { View } from 'react-native';

<View className="gap-6">
  <View className="gap-2">
    <Text className="text-sm font-semibold">Tight (leading-tight)</Text>
    <Text className="leading-tight">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  </View>
  <View className="gap-2">
    <Text className="text-sm font-semibold">Normal (leading-normal)</Text>
    <Text className="leading-normal">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  </View>
  <View className="gap-2">
    <Text className="text-sm font-semibold">Relaxed (leading-relaxed)</Text>
    <Text className="leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  </View>
</View>`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Props</h2>
        <p className="text-muted-foreground">
          The Text component extends the React Native Text component, so you can use all of its props.
        </p>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Prop</th>
                <th className="p-4 text-left font-semibold">Type</th>
                <th className="p-4 text-left font-semibold">Default</th>
                <th className="p-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">variant</td>
                <td className="p-4 text-sm text-muted-foreground">"h1" | "h2" | "h3" | "h4" | "body" | "muted" | "small"</td>
                <td className="p-4 text-sm">"body"</td>
                <td className="p-4 text-sm">The text style variant</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">className</td>
                <td className="p-4 text-sm text-muted-foreground">string</td>
                <td className="p-4 text-sm">-</td>
                <td className="p-4 text-sm">Additional CSS classes</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">children</td>
                <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                <td className="p-4 text-sm">-</td>
                <td className="p-4 text-sm">The text content</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">numberOfLines</td>
                <td className="p-4 text-sm text-muted-foreground">number</td>
                <td className="p-4 text-sm">-</td>
                <td className="p-4 text-sm">Maximum number of lines to display</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">ellipsizeMode</td>
                <td className="p-4 text-sm text-muted-foreground">"head" | "middle" | "tail" | "clip"</td>
                <td className="p-4 text-sm">"tail"</td>
                <td className="p-4 text-sm">How to truncate text when numberOfLines is set</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">selectable</td>
                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                <td className="p-4 text-sm">false</td>
                <td className="p-4 text-sm">Whether text is selectable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Variant Styles</h3>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-semibold">Variant</th>
                  <th className="p-4 text-left font-semibold">Font Size</th>
                  <th className="p-4 text-left font-semibold">Font Weight</th>
                  <th className="p-4 text-left font-semibold">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">h1</td>
                  <td className="p-4 text-sm">text-4xl (36px)</td>
                  <td className="p-4 text-sm">font-bold</td>
                  <td className="p-4 text-sm">Page titles</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">h2</td>
                  <td className="p-4 text-sm">text-3xl (30px)</td>
                  <td className="p-4 text-sm">font-bold</td>
                  <td className="p-4 text-sm">Section headings</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">h3</td>
                  <td className="p-4 text-sm">text-2xl (24px)</td>
                  <td className="p-4 text-sm">font-semibold</td>
                  <td className="p-4 text-sm">Subsection headings</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">h4</td>
                  <td className="p-4 text-sm">text-xl (20px)</td>
                  <td className="p-4 text-sm">font-semibold</td>
                  <td className="p-4 text-sm">Minor headings</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">body</td>
                  <td className="p-4 text-sm">text-base (16px)</td>
                  <td className="p-4 text-sm">font-normal</td>
                  <td className="p-4 text-sm">Body text, paragraphs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">muted</td>
                  <td className="p-4 text-sm">text-sm (14px)</td>
                  <td className="p-4 text-sm">font-normal</td>
                  <td className="p-4 text-sm">Secondary information</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">small</td>
                  <td className="p-4 text-sm">text-xs (12px)</td>
                  <td className="p-4 text-sm">font-normal</td>
                  <td className="p-4 text-sm">Captions, helper text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
