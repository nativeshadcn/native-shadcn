import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import drawerSource from '@templates/drawer?raw'

function DrawerPreview() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '👤', label: 'Profile' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📊', label: 'Analytics' },
    { icon: '📧', label: 'Messages' },
  ]

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Open Drawer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r border-border shadow-lg animate-in slide-in-from-left">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 hover:bg-accent"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-1">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DrawerSidePreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('left')

  return (
    <div className="flex items-center justify-center p-8 gap-2">
      <button
        onClick={() => { setSide('left'); setIsOpen(true) }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Left
      </button>
      <button
        onClick={() => { setSide('right'); setIsOpen(true) }}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Right
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)}></div>
          <div
            className={`fixed top-0 bottom-0 z-50 w-72 bg-background shadow-lg ${
              side === 'left'
                ? 'left-0 border-r border-border animate-in slide-in-from-left'
                : 'right-0 border-l border-border animate-in slide-in-from-right'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Drawer from {side}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 hover:bg-accent"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                This drawer slides in from the {side}.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function DrawerDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Drawer</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A panel that slides out from the edge of the screen, typically used for navigation menus.
        </p>
      </div>

      <ComponentPreview
        name="Drawer"
        preview={<DrawerPreview />}
        code={`import { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const [isOpen, setIsOpen] = useState(false);

const menuItems = [
  { icon: '🏠', label: 'Home' },
  { icon: '👤', label: 'Profile' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '📊', label: 'Analytics' },
  { icon: '📧', label: 'Messages' },
];

<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="left">
    <DrawerHeader>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">Navigation</Text>
        <DrawerClose />
      </View>
    </DrawerHeader>
    <View className="flex-1 p-4">
      {menuItems.map((item, index) => (
        <Pressable key={index} className="flex-row items-center gap-3 p-3">
          <Text className="text-lg">{item.icon}</Text>
          <Text className="font-medium">{item.label}</Text>
        </Pressable>
      ))}
    </View>
  </DrawerContent>
</Drawer>`}
      />

      <InstallationSteps
        cli="npx native-shadcn-cli add drawer"
        manual={drawerSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock
              code={`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';`}
              language="tsx"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<Drawer>
  <DrawerTrigger>
    <Button>Open</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>
        Drawer description goes here.
      </DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`}
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
            name="Default Drawer"
            preview={<DrawerPreview />}
            code={`import { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { View, Text, Pressable } from 'react-native';

export function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '👤', label: 'Profile' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📊', label: 'Analytics' },
    { icon: '📧', label: 'Messages' },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Navigation</Text>
            <DrawerClose />
          </View>
        </DrawerHeader>
        <View className="flex-1 p-4">
          {menuItems.map((item, index) => (
            <Pressable key={index} className="flex-row items-center gap-3 p-3">
              <Text className="text-lg">{item.icon}</Text>
              <Text className="font-medium">{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </DrawerContent>
    </Drawer>
  );
}`}
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Side</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use the side property to control which edge of the screen the drawer slides in from.
          </p>
          <ComponentPreview
            name="Drawer Sides"
            preview={<DrawerSidePreview />}
            code={`import { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerClose } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { View, Text } from 'react-native';

export function DrawerSideExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="gap-2">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Left</Button>
        </DrawerTrigger>
        <DrawerContent side="left">
          <DrawerHeader>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Drawer from left</Text>
              <DrawerClose />
            </View>
          </DrawerHeader>
          <View className="p-4">
            <Text className="text-muted-foreground">
              This drawer slides in from the left.
            </Text>
          </View>
        </DrawerContent>
      </Drawer>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Drawer from right</Text>
              <DrawerClose />
            </View>
          </DrawerHeader>
          <View className="p-4">
            <Text className="text-muted-foreground">
              This drawer slides in from the right.
            </Text>
          </View>
        </DrawerContent>
      </Drawer>
    </View>
  );
}`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>

        <div>
          <h3 className="text-lg font-semibold mb-3">Drawer</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The root component that manages the drawer state.
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
                  <td className="p-4 font-mono text-sm">open</td>
                  <td className="p-4 text-sm text-muted-foreground">boolean</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Controlled open state</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">onOpenChange</td>
                  <td className="p-4 text-sm text-muted-foreground">(open: boolean) =&gt; void</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Callback when open state changes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Drawer content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerTrigger</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The button that opens the drawer.
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
                  <td className="p-4 font-mono text-sm">asChild</td>
                  <td className="p-4 text-sm text-muted-foreground">boolean</td>
                  <td className="p-4 text-sm">false</td>
                  <td className="p-4 text-sm">Merge props with child element</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Trigger element</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerContent</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The drawer content container.
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
                  <td className="p-4 font-mono text-sm">side</td>
                  <td className="p-4 text-sm text-muted-foreground">"left" | "right"</td>
                  <td className="p-4 text-sm">"left"</td>
                  <td className="p-4 text-sm">Side of the screen to slide in from</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm text-muted-foreground">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Drawer content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerHeader</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Container for the drawer title and close button.
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
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm text-muted-foreground">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Header content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerFooter</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Container for drawer action buttons.
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
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm text-muted-foreground">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Footer content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerTitle</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The title of the drawer.
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
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm text-muted-foreground">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Title text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerDescription</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The description of the drawer.
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
                  <td className="p-4 font-mono text-sm">className</td>
                  <td className="p-4 text-sm text-muted-foreground">string</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Additional CSS classes</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Description text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">DrawerClose</h3>
          <p className="text-sm text-muted-foreground mb-3">
            A button that closes the drawer.
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
                  <td className="p-4 font-mono text-sm">asChild</td>
                  <td className="p-4 text-sm text-muted-foreground">boolean</td>
                  <td className="p-4 text-sm">false</td>
                  <td className="p-4 text-sm">Merge props with child element</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-sm">children</td>
                  <td className="p-4 text-sm text-muted-foreground">React.ReactNode</td>
                  <td className="p-4 text-sm">-</td>
                  <td className="p-4 text-sm">Close button content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
