import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { popoverTemplate } from '@templates/popover'

function PopoverPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open Popover
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-80 rounded-md border border-border bg-background p-4 shadow-md animate-in fade-in-0 zoom-in-95">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm">Width</label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label className="text-sm">Height</label>
                    <input
                      type="number"
                      defaultValue="25"
                      className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                <div className="border-8 border-transparent border-t-border"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function PopoverDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Popover</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays rich content in a portal, triggered by a button.
        </p>
      </div>

      <ComponentPreview
        name="Popover"
        preview={<PopoverPreview />}
        code={`import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const [isOpen, setIsOpen] = useState(false);

<Popover open={isOpen} onOpenChange={setIsOpen}>
  <PopoverTrigger asChild>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <View className="gap-2">
      <Text className="font-medium text-sm">Dimensions</Text>
      <Text className="text-sm text-muted-foreground">
        Set the dimensions for the layer.
      </Text>
      <View className="gap-2">
        <View className="flex-row items-center gap-4">
          <Label className="w-16">Width</Label>
          <Input defaultValue="100" keyboardType="numeric" />
        </View>
        <View className="flex-row items-center gap-4">
          <Label className="w-16">Height</Label>
          <Input defaultValue="25" keyboardType="numeric" />
        </View>
      </View>
    </View>
  </PopoverContent>
</Popover>`}
      />

      <InstallationSteps
        cli="npx native-shadcn-cli add popover"
        manual={popoverTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock
              code={`import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';`}
              language="tsx"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Text>Content goes here.</Text>
  </PopoverContent>
</Popover>`}
              language="tsx"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
