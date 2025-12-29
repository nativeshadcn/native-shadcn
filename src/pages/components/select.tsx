import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { selectTemplate } from '@templates/select'

export function SelectDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Select</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays a list of options for the user to pick from—triggered by a button.
        </p>
      </div>

      <ComponentPreview
        name="Select"
        preview={
          <div className="flex items-center justify-center p-8">
            <select className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Select a fruit...</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
              <option value="grape">Grape</option>
            </select>
          </div>
        }
        code={`import { Select } from '@/components/ui/select';

<Select placeholder="Select a fruit..." />`}
      />

      <InstallationSteps
        cli="npx native-shadcn add select"
        manual={selectTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Select } from '@/components/ui/select';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<Select
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]}
  placeholder="Select a fruit..."
/>`}
              language="tsx"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Default</h3>
          <ComponentPreview
            name="Default Select"
            preview={
              <div className="flex items-center justify-center p-8">
                <select className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select a fruit...</option>
                  <option value="apple">Apple</option>
                  <option value="banana">Banana</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
            }
            code={`import { Select } from '@/components/ui/select';

<Select
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]}
  placeholder="Select a fruit..."
/>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Label</h3>
          <ComponentPreview
            name="Select with Label"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-2">
                  <label className="text-sm font-medium">Choose a fruit</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select...</option>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>
              </div>
            }
            code={`import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';

<View className="gap-2">
  <Label nativeID="fruit">Choose a fruit</Label>
  <Select
    options={[
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ]}
    placeholder="Select..."
    aria-labelledby="fruit"
  />
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Disabled</h3>
          <ComponentPreview
            name="Disabled Select"
            preview={
              <div className="flex items-center justify-center p-8">
                <select disabled className="w-full max-w-xs rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50 cursor-not-allowed">
                  <option value="">Select...</option>
                  <option value="apple">Apple</option>
                </select>
              </div>
            }
            code={`import { Select } from '@/components/ui/select';

<Select
  disabled
  options={[{ label: 'Apple', value: 'apple' }]}
  placeholder="Select..."
/>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Controlled</h3>
          <ComponentPreview
            name="Controlled Select"
            preview={
              <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-2">
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select a fruit...</option>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                  </select>
                  <p className="text-sm text-muted-foreground">Selected: apple</p>
                </div>
              </div>
            }
            code={`import { useState } from 'react';
import { Select } from '@/components/ui/select';
import { View, Text } from 'react-native';

function SelectDemo() {
  const [value, setValue] = useState('apple');

  return (
    <View className="gap-2">
      <Select
        value={value}
        onValueChange={setValue}
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ]}
        placeholder="Select a fruit..."
      />
      <Text className="text-sm text-muted-foreground">
        Selected: {value}
      </Text>
    </View>
  );
}`}
          />
        </div>
      </div>

    </div>
  )
}
