import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { commandTemplate } from '@templates/command'

function CommandPreview() {
  const [search, setSearch] = useState('')

  const items = [
    { icon: '📅', label: 'Calendar', description: 'View your calendar' },
    { icon: '⚙️', label: 'Settings', description: 'Manage settings' },
    { icon: '👤', label: 'Profile', description: 'View your profile' },
    { icon: '🔔', label: 'Notifications', description: 'View notifications' },
    { icon: '📊', label: 'Analytics', description: 'View analytics' },
  ]

  const filtered = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full max-w-md rounded-md border border-border bg-background overflow-hidden shadow-lg">
      <div className="border-b border-border px-3">
        <input
          type="text"
          placeholder="Type a command or search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        ) : (
          filtered.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-2 py-2 text-sm rounded-sm hover:bg-accent transition-colors text-left"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export function CommandDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Command</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Command palette menu for quick actions and navigation.
        </p>
      </div>
      <ComponentPreview
        name="Command"
        preview={<CommandPreview />}
        code={`import { useState } from 'react';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

const [search, setSearch] = useState('');

const items = [
  { icon: '📅', label: 'Calendar', description: 'View your calendar' },
  { icon: '⚙️', label: 'Settings', description: 'Manage settings' },
  { icon: '👤', label: 'Profile', description: 'View your profile' },
  { icon: '🔔', label: 'Notifications', description: 'View notifications' },
  { icon: '📊', label: 'Analytics', description: 'View analytics' },
];

const filtered = items.filter(item =>
  item.label.toLowerCase().includes(search.toLowerCase())
);

<Command>
  <CommandInput
    placeholder="Type a command or search..."
    value={search}
    onChangeText={setSearch}
  />
  <CommandList>
    {filtered.length === 0 ? (
      <Text className="text-center py-6 text-muted-foreground">
        No results found.
      </Text>
    ) : (
      filtered.map((item, index) => (
        <CommandItem key={index}>
          <Text className="text-lg">{item.icon}</Text>
          <View>
            <Text className="font-medium">{item.label}</Text>
            <Text className="text-xs text-muted-foreground">
              {item.description}
            </Text>
          </View>
        </CommandItem>
      ))
    )}
  </CommandList>
</Command>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add command"
        manual={commandTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandItem>Item 1</CommandItem>
    <CommandItem>Item 2</CommandItem>
  </CommandList>
</Command>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
