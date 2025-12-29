import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { dropdownMenuTemplate } from '@templates/dropdown-menu'

function DropdownMenuPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>('')

  const handleSelect = (item: string) => {
    setSelectedItem(item)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
        >
          Open Menu
          <svg className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-md border border-border bg-background p-1 shadow-md animate-in fade-in-0 zoom-in-95">
              <button
                onClick={() => handleSelect('Profile')}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent transition-colors"
              >
                <span>👤</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">Profile</div>
                  <div className="text-xs text-muted-foreground">View your profile</div>
                </div>
              </button>
              <button
                onClick={() => handleSelect('Settings')}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent transition-colors"
              >
                <span>⚙️</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">Settings</div>
                  <div className="text-xs text-muted-foreground">Manage preferences</div>
                </div>
              </button>
              <div className="my-1 h-px bg-border"></div>
              <button
                onClick={() => handleSelect('Logout')}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-destructive hover:bg-accent transition-colors"
              >
                <span>🚪</span>
                <div className="flex-1 text-left font-medium">Logout</div>
              </button>
            </div>
          </>
        )}
      </div>
      {selectedItem && (
        <div className="ml-4 text-sm text-muted-foreground">
          Selected: {selectedItem}
        </div>
      )}
    </div>
  )
}

export function DropdownMenuDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dropdown Menu</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Displays a menu with actions when triggered.
        </p>
      </div>
      <ComponentPreview
        name="Dropdown Menu"
        preview={<DropdownMenuPreview />}
        code={`import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const [open, setOpen] = useState(false);

const handleSelect = (item) => {
  console.log('Selected:', item);
  setOpen(false);
};

<DropdownMenu open={open} onOpenChange={setOpen}>
  <DropdownMenuTrigger>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onPress={() => handleSelect('Profile')}>
      <Text>👤 Profile</Text>
      <Text className="text-xs text-muted-foreground">View your profile</Text>
    </DropdownMenuItem>
    <DropdownMenuItem onPress={() => handleSelect('Settings')}>
      <Text>⚙️ Settings</Text>
      <Text className="text-xs text-muted-foreground">Manage preferences</Text>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onPress={() => handleSelect('Logout')} variant="destructive">
      <Text>🚪 Logout</Text>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add dropdown-menu"
        manual={dropdownMenuTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
