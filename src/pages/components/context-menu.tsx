import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import contextmenuSource from '@templates/context-menu?raw'

function ContextMenuPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedAction, setSelectedAction] = useState<string>('')

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
  }

  const handleAction = (action: string) => {
    setSelectedAction(action)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div
        onContextMenu={handleContextMenu}
        className="rounded-md border border-dashed border-border px-12 py-16 text-center cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <p className="text-sm text-muted-foreground">Right click here</p>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div
            className="fixed z-50 w-48 rounded-md border border-border bg-background p-1 shadow-md animate-in fade-in-0 zoom-in-95"
            style={{ left: menuPosition.x, top: menuPosition.y }}
          >
            <button
              onClick={() => handleAction('Copy')}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent transition-colors"
            >
              <span>📋</span>
              <span>Copy</span>
            </button>
            <button
              onClick={() => handleAction('Edit')}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent transition-colors"
            >
              <span>✏️</span>
              <span>Edit</span>
            </button>
            <div className="my-1 h-px bg-border"></div>
            <button
              onClick={() => handleAction('Delete')}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-destructive hover:bg-accent transition-colors"
            >
              <span>🗑️</span>
              <span>Delete</span>
            </button>
          </div>
        </>
      )}

      {selectedAction && (
        <div className="text-sm text-muted-foreground">
          Action: <span className="font-medium text-foreground">{selectedAction}</span>
        </div>
      )}
    </div>
  )
}

export function ContextMenuDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Context Menu</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Display a menu when user long presses an element.
        </p>
      </div>
      <ComponentPreview
        name="Context Menu"
        preview={<ContextMenuPreview />}
        code={`import { useState } from 'react';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@/components/ui/context-menu';

const [selectedAction, setSelectedAction] = useState('');

const handleAction = (action) => {
  setSelectedAction(action);
  console.log('Action:', action);
};

<ContextMenu>
  <ContextMenuTrigger>
    <View className="border border-dashed p-12">
      <Text>Right click here</Text>
    </View>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onPress={() => handleAction('Copy')}>
      <Text>📋 Copy</Text>
    </ContextMenuItem>
    <ContextMenuItem onPress={() => handleAction('Edit')}>
      <Text>✏️ Edit</Text>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem onPress={() => handleAction('Delete')} variant="destructive">
      <Text>🗑️ Delete</Text>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add context-menu"
        manual={contextmenuSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
