import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import accordionSource from '@templates/accordion?raw'

function AccordionPreview() {
  const [openItems, setOpenItems] = useState<string[]>(['item-1'])

  const toggleItem = (item: string) => {
    setOpenItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  const items = [
    {
      id: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    },
    {
      id: 'item-2',
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that you can customize.'
    },
    {
      id: 'item-3',
      title: 'Is it animated?',
      content: 'Yes. It uses smooth animations when expanding and collapsing.'
    }
  ]

  return (
    <div className="w-full max-w-md">
      <div className="divide-y divide-border rounded-md border border-border">
        {items.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
            >
              <span className="text-sm font-medium">{item.title}</span>
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(item.id) ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openItems.includes(item.id) && (
              <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AccordionDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Accordion</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Vertically stacked set of expandable panels.
        </p>
      </div>
      <ComponentPreview
        name="Accordion"
        preview={<AccordionPreview />}
        code={`import { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const [openItems, setOpenItems] = useState(['item-1']);

const toggleItem = (item) => {
  setOpenItems(prev =>
    prev.includes(item)
      ? prev.filter(i => i !== item)
      : [...prev, item]
  );
};

const items = [
  {
    id: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.'
  },
  {
    id: 'item-2',
    title: 'Is it styled?',
    content: 'Yes. It comes with default styles that you can customize.'
  },
  {
    id: 'item-3',
    title: 'Is it animated?',
    content: 'Yes. It uses smooth animations when expanding and collapsing.'
  }
];

<Accordion value={openItems} onValueChange={setOpenItems}>
  {items.map((item) => (
    <AccordionItem key={item.id} value={item.id}>
      <AccordionTrigger>{item.title}</AccordionTrigger>
      <AccordionContent>{item.content}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add accordion"
        manual={accordionSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`const [openItems, setOpenItems] = useState(['item-1']);

<Accordion value={openItems} onValueChange={setOpenItems}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>`}
              language="tsx"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
