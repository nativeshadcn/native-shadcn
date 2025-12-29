import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { comboboxTemplate } from '@templates/combobox'

function ComboboxPreview() {
  const [search, setSearch] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const frameworks = [
    { label: 'React Native', value: 'react-native' },
    { label: 'React', value: 'react' },
    { label: 'Vue.js', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
  ]

  const filtered = frameworks.filter(framework =>
    framework.label.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (_value: string, label: string) => {
    setSelectedValue(label)
    setSearch(label)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="w-full max-w-xs relative">
        <input
          type="text"
          placeholder="Search framework..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />

        {isOpen && filtered.length > 0 && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute top-full mt-1 z-50 w-full rounded-md border border-border bg-background shadow-md max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95">
              {filtered.map((framework) => (
                <button
                  key={framework.value}
                  onClick={() => handleSelect(framework.value, framework.label)}
                  className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {framework.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedValue && (
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{selectedValue}</span>
        </div>
      )}
    </div>
  )
}

export function ComboboxDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Combobox</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Searchable autocomplete select component.
        </p>
      </div>
      <ComponentPreview
        name="Combobox"
        preview={<ComboboxPreview />}
        code={`import { useState } from 'react';
import { Combobox } from '@/components/ui/combobox';

const [search, setSearch] = useState('');
const [selectedValue, setSelectedValue] = useState('');

const frameworks = [
  { label: 'React Native', value: 'react-native' },
  { label: 'React', value: 'react' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
];

const handleSelect = (value, label) => {
  setSelectedValue(label);
  setSearch(label);
};

<Combobox
  options={frameworks}
  value={search}
  onValueChange={setSearch}
  onSelect={handleSelect}
  placeholder="Search framework..."
/>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add combobox"
        manual={comboboxTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Combobox } from '@/components/ui/combobox';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Combobox
  value={selected}
  onValueChange={setSelected}
  items={items}
  placeholder="Select..."
/>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
