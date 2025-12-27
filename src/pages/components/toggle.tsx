import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import toggleSource from '@templates/toggle?raw'

function TogglePreview() {
  const [boldPressed, setBoldPressed] = useState(false)
  const [italicPressed, setItalicPressed] = useState(false)
  const [underlinePressed, setUnderlinePressed] = useState(true)

  return (
    <div className="flex gap-2 items-center justify-center p-8">
      <button
        onClick={() => setBoldPressed(!boldPressed)}
        className={`inline-flex items-center justify-center rounded-md text-sm font-bold h-10 px-3 border border-input transition-colors ${
          boldPressed ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        B
      </button>
      <button
        onClick={() => setItalicPressed(!italicPressed)}
        className={`inline-flex items-center justify-center rounded-md text-sm italic h-10 px-3 border border-input transition-colors ${
          italicPressed ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        I
      </button>
      <button
        onClick={() => setUnderlinePressed(!underlinePressed)}
        className={`inline-flex items-center justify-center rounded-md text-sm underline h-10 px-3 border border-input transition-colors ${
          underlinePressed ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        U
      </button>
    </div>
  )
}

function DefaultTogglePreview() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex gap-2 items-center justify-center p-8">
      <button
        onClick={() => setPressed(!pressed)}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border border-input transition-colors ${
          pressed ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        Toggle
      </button>
    </div>
  )
}

function DisabledTogglePreview() {
  return (
    <div className="flex gap-2 items-center justify-center p-8">
      <button
        disabled
        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border border-input bg-transparent opacity-50 cursor-not-allowed"
      >
        Toggle
      </button>
    </div>
  )
}

function WithTextTogglePreview() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex gap-2 items-center justify-center p-8">
      <button
        onClick={() => setPressed(!pressed)}
        className={`inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium h-10 px-3 border border-input transition-colors ${
          pressed ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span>Toggle with Icon</span>
      </button>
    </div>
  )
}

function SizesTogglePreview() {
  const [small, setSmall] = useState(false)
  const [medium, setMedium] = useState(false)
  const [large, setLarge] = useState(false)

  return (
    <div className="flex gap-2 items-center justify-center p-8">
      <button
        onClick={() => setSmall(!small)}
        className={`inline-flex items-center justify-center rounded-md text-xs font-medium h-8 px-2 border border-input transition-colors ${
          small ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        Small
      </button>
      <button
        onClick={() => setMedium(!medium)}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border border-input transition-colors ${
          medium ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        Medium
      </button>
      <button
        onClick={() => setLarge(!large)}
        className={`inline-flex items-center justify-center rounded-md text-base font-medium h-12 px-4 border border-input transition-colors ${
          large ? 'bg-accent' : 'bg-transparent hover:bg-accent'
        }`}
      >
        Large
      </button>
    </div>
  )
}

function OutlineTogglePreview() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex gap-2 items-center justify-center p-8">
      <button
        onClick={() => setPressed(!pressed)}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border-2 transition-colors ${
          pressed ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-transparent hover:bg-accent'
        }`}
      >
        Outline Toggle
      </button>
    </div>
  )
}

export function ToggleDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Toggle</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A two-state button that can be either on or off.
        </p>
      </div>

      <ComponentPreview
        name="Toggle"
        preview={<TogglePreview />}
        code={`import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';

const [boldPressed, setBoldPressed] = useState(false);
const [italicPressed, setItalicPressed] = useState(false);
const [underlinePressed, setUnderlinePressed] = useState(true);

<View className="flex-row gap-2">
  <Toggle pressed={boldPressed} onPressedChange={setBoldPressed}>
    <Text className="font-bold">B</Text>
  </Toggle>
  <Toggle pressed={italicPressed} onPressedChange={setItalicPressed}>
    <Text className="italic">I</Text>
  </Toggle>
  <Toggle pressed={underlinePressed} onPressedChange={setUnderlinePressed}>
    <Text className="underline">U</Text>
  </Toggle>
</View>`}
      />

      <InstallationSteps
        cli="npx native-shadcn add toggle"
        manual={toggleSource}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Toggle } from '@/components/ui/toggle';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Toggle pressed={pressed} onPressedChange={setPressed}>
  <Text>Toggle</Text>
</Toggle>`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Examples</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Default</h3>
          <ComponentPreview
            name="Default Toggle"
            preview={<DefaultTogglePreview />}
            code={`import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Text } from 'react-native';

const [pressed, setPressed] = useState(false);

<Toggle pressed={pressed} onPressedChange={setPressed}>
  <Text>Toggle</Text>
</Toggle>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Disabled</h3>
          <ComponentPreview
            name="Disabled Toggle"
            preview={<DisabledTogglePreview />}
            code={`import { Toggle } from '@/components/ui/toggle';
import { Text } from 'react-native';

<Toggle disabled>
  <Text>Toggle</Text>
</Toggle>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Icon</h3>
          <ComponentPreview
            name="Toggle with Icon"
            preview={<WithTextTogglePreview />}
            code={`import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { View, Text } from 'react-native';

const [pressed, setPressed] = useState(false);

<Toggle pressed={pressed} onPressedChange={setPressed}>
  <View className="flex-row items-center gap-2">
    <ChevronDown size={16} />
    <Text>Toggle with Icon</Text>
  </View>
</Toggle>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Sizes</h3>
          <ComponentPreview
            name="Toggle Sizes"
            preview={<SizesTogglePreview />}
            code={`import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { View, Text } from 'react-native';

const [small, setSmall] = useState(false);
const [medium, setMedium] = useState(false);
const [large, setLarge] = useState(false);

<View className="flex-row gap-2">
  <Toggle size="sm" pressed={small} onPressedChange={setSmall}>
    <Text className="text-xs">Small</Text>
  </Toggle>
  <Toggle size="default" pressed={medium} onPressedChange={setMedium}>
    <Text className="text-sm">Medium</Text>
  </Toggle>
  <Toggle size="lg" pressed={large} onPressedChange={setLarge}>
    <Text className="text-base">Large</Text>
  </Toggle>
</View>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Outline Variant</h3>
          <ComponentPreview
            name="Outline Toggle"
            preview={<OutlineTogglePreview />}
            code={`import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Text } from 'react-native';

const [pressed, setPressed] = useState(false);

<Toggle variant="outline" pressed={pressed} onPressedChange={setPressed}>
  <Text>Outline Toggle</Text>
</Toggle>`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Text Formatting</h3>
          <ComponentPreview
            name="Text Formatting Toggle"
            preview={<TogglePreview />}
            code={`import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { View, Text } from 'react-native';

const [boldPressed, setBoldPressed] = useState(false);
const [italicPressed, setItalicPressed] = useState(false);
const [underlinePressed, setUnderlinePressed] = useState(true);

<View className="flex-row gap-2">
  <Toggle pressed={boldPressed} onPressedChange={setBoldPressed}>
    <Text className="font-bold">B</Text>
  </Toggle>
  <Toggle pressed={italicPressed} onPressedChange={setItalicPressed}>
    <Text className="italic">I</Text>
  </Toggle>
  <Toggle pressed={underlinePressed} onPressedChange={setUnderlinePressed}>
    <Text className="underline">U</Text>
  </Toggle>
</View>`}
          />
        </div>
      </div>

    </div>
  )
}
