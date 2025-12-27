import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import tooltipSource from '@templates/tooltip?raw'

function TooltipPreview() {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="flex gap-4 items-center justify-center p-8">
      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          Hover me
        </button>
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-primary-foreground bg-primary rounded-md whitespace-nowrap animate-in fade-in-0 zoom-in-95">
            This is a helpful tooltip
            <div className="absolute top-full left-1/2 -translate-x-1/2">
              <div className="border-4 border-transparent border-t-primary"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function TooltipDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Tooltip</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
        </p>
      </div>

      <ComponentPreview
        name="Tooltip"
        preview={<TooltipPreview />}
        code={`import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <Text>This is a helpful tooltip</Text>
  </TooltipContent>
</Tooltip>`}
      />

      <InstallationSteps
        cli="npx native-shadcn-cli add tooltip"
        manual={tooltipSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock
              code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';`}
              language="tsx"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock
              code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Button>Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <Text>Tooltip text</Text>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
              language="tsx"
            />
          </div>
        </div>
      </div>

    </div>
  )
}
