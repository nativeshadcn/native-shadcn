import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import sheetSource from '@templates/sheet?raw'

function SheetPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
      >
        Open Sheet
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-lg border-t border-border bg-background p-6 shadow-lg animate-in slide-in-from-bottom">
            <div className="mx-auto w-12 h-1 rounded-full bg-muted mb-4"></div>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Edit Profile</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Make changes to your profile here. Click save when you're done.
                </p>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SheetSidePreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [side, setSide] = useState<'top' | 'right' | 'bottom' | 'left'>('right')

  return (
    <div className="flex items-center justify-center p-8 gap-2">
      <button
        onClick={() => { setSide('top'); setIsOpen(true) }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Top
      </button>
      <button
        onClick={() => { setSide('right'); setIsOpen(true) }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Right
      </button>
      <button
        onClick={() => { setSide('bottom'); setIsOpen(true) }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Bottom
      </button>
      <button
        onClick={() => { setSide('left'); setIsOpen(true) }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Left
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div
            className={`fixed z-50 bg-background border-border shadow-lg p-6 ${
              side === 'top' ? 'top-0 left-0 right-0 border-b rounded-b-lg animate-in slide-in-from-top' :
              side === 'right' ? 'top-0 right-0 bottom-0 border-l rounded-l-lg animate-in slide-in-from-right w-80' :
              side === 'bottom' ? 'bottom-0 left-0 right-0 border-t rounded-t-lg animate-in slide-in-from-bottom' :
              'top-0 left-0 bottom-0 border-r rounded-r-lg animate-in slide-in-from-left w-80'
            }`}
          >
            <h2 className="text-lg font-semibold">Sheet from {side}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              This sheet slides in from the {side}.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function SheetDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Sheet</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Extends the Dialog component to display content that complements the main content of the screen.
        </p>
      </div>

      <ComponentPreview
        name="Sheet"
        preview={<SheetPreview />}
        code={`import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const [isOpen, setIsOpen] = useState(false);

<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <View className="gap-3 py-4">
      <View className="gap-1">
        <Label>Name</Label>
        <Input defaultValue="John Doe" />
      </View>
      <View className="gap-1">
        <Label>Email</Label>
        <Input defaultValue="john@example.com" />
      </View>
    </View>
    <Button onPress={() => setIsOpen(false)}>
      Save changes
    </Button>
  </SheetContent>
</Sheet>`}
      />

      <InstallationSteps
        cli="npx native-shadcn-cli add sheet"
        manual={sheetSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock
              code={`import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';`}
              language="tsx"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<Sheet>
  <SheetTrigger>
    <Button>Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>
        Sheet description goes here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
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
            name="Default Sheet"
            preview={<SheetPreview />}
            code={`import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { View } from 'react-native';

export function SheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <View className="gap-3 py-4">
          <View className="gap-1">
            <Label>Name</Label>
            <Input defaultValue="John Doe" />
          </View>
          <View className="gap-1">
            <Label>Email</Label>
            <Input defaultValue="john@example.com" />
          </View>
        </View>
        <Button onPress={() => setIsOpen(false)}>
          Save changes
        </Button>
      </SheetContent>
    </Sheet>
  );
}`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Side</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use the side property to control which edge of the screen the sheet slides in from.
          </p>
          <ComponentPreview
            name="Sheet Sides"
            preview={<SheetSidePreview />}
            code={`import { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { View } from 'react-native';

export function SheetSideExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="gap-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Sheet from top</SheetTitle>
            <SheetDescription>
              This sheet slides in from the top.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet from right</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Sheet from bottom</SheetTitle>
            <SheetDescription>
              This sheet slides in from the bottom.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Sheet from left</SheetTitle>
            <SheetDescription>
              This sheet slides in from the left.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </View>
  );
}`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Draggable Sheet</h2>
        <p className="text-sm text-muted-foreground">
          The Sheet component now supports draggable functionality, allowing users to resize the sheet by dragging.
        </p>

        <div>
          <h3 className="text-xl font-semibold mb-4">Basic Draggable Sheet</h3>
          <CodeBlock
            code={`import { Sheet, SheetContent, SheetDragHandle } from '@/components/ui/sheet';

export function DraggableSheetExample() {
  return (
    <Sheet open>
      <SheetContent
        draggable
        minHeight={200}
        maxHeight={600}
        initialHeight={300}
      >
        <SheetDragHandle />
        <View className="p-4">
          <Text>Drag the handle above to resize!</Text>
        </View>
      </SheetContent>
    </Sheet>
  );
}`}
            language="tsx"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">With Custom Snap Points</h3>
          <CodeBlock
            code={`<SheetContent
  draggable
  snapPoints={[200, 400, 600, 800]}
  onHeightChange={(height) => {
    console.log('Sheet height changed to:', height);
  }}
>
  <SheetDragHandle />
  {/* Content */}
</SheetContent>`}
            language="tsx"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Draggable Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Prop</th>
                  <th className="text-left py-2 px-4">Type</th>
                  <th className="text-left py-2 px-4">Default</th>
                  <th className="text-left py-2 px-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">draggable</td>
                  <td className="py-2 px-4 font-mono text-xs">boolean</td>
                  <td className="py-2 px-4">false</td>
                  <td className="py-2 px-4">Enable drag-to-resize functionality</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">minHeight</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4">200</td>
                  <td className="py-2 px-4">Minimum sheet height</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">maxHeight</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4">SCREEN_HEIGHT * 0.75</td>
                  <td className="py-2 px-4">Maximum sheet height</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">initialHeight</td>
                  <td className="py-2 px-4 font-mono text-xs">number</td>
                  <td className="py-2 px-4">minHeight</td>
                  <td className="py-2 px-4">Starting height of the sheet</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">snapPoints</td>
                  <td className="py-2 px-4 font-mono text-xs">number[]</td>
                  <td className="py-2 px-4">[minHeight, maxHeight]</td>
                  <td className="py-2 px-4">Custom snap positions</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-mono">onHeightChange</td>
                  <td className="py-2 px-4 font-mono text-xs">(height: number) =&gt; void</td>
                  <td className="py-2 px-4">-</td>
                  <td className="py-2 px-4">Callback when height changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <h3 className="font-semibold mb-2">💡 Tip</h3>
          <p className="text-sm text-muted-foreground">
            When <code className="text-xs bg-muted px-1 py-0.5 rounded">draggable=true</code>, the SheetDragHandle component automatically wires up to enable dragging. Without it, the sheet behaves as a normal modal sheet.
          </p>
        </div>
      </div>

    </div>
  )
}
