import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import collapsibleSource from '@templates/collapsible?raw'

function CollapsiblePreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-md">
      <div className="rounded-md border border-border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
        >
          <div>
            <div className="text-sm font-medium">@peduarte starred 3 repositories</div>
            <div className="text-sm text-muted-foreground">Click to {isOpen ? 'hide' : 'show'} details</div>
          </div>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="border-t border-border p-4 space-y-2 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>@radix-ui/primitives</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>@radix-ui/colors</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>@stitches/react</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function CollapsibleDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Collapsible</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          An interactive component that expands and collapses content.
        </p>
      </div>
      <ComponentPreview
        name="Collapsible"
        preview={<CollapsiblePreview />}
        code={`import { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger>
    <View className="flex-row items-center justify-between p-4">
      <View>
        <Text className="font-medium">@peduarte starred 3 repositories</Text>
        <Text className="text-muted-foreground">
          Click to {isOpen ? 'hide' : 'show'} details
        </Text>
      </View>
      <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} />
    </View>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <View className="p-4 gap-2">
      <Text>@radix-ui/primitives</Text>
      <Text>@radix-ui/colors</Text>
      <Text>@stitches/react</Text>
    </View>
  </CollapsibleContent>
</Collapsible>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add collapsible"
        manual={collapsibleSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Collapsible>
  <CollapsibleTrigger>Can I use this?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes! It's fully supported.
  </CollapsibleContent>
</Collapsible>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
