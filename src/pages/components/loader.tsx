import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import loaderSource from '@templates/loader?raw'

function LoaderPreview() {
  return (
    <div className="flex items-center justify-center gap-8 p-8">
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
      <div className="h-8 w-8 rounded-full bg-primary animate-pulse"></div>
    </div>
  )
}

export function LoaderDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Loader</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          An animated loader component with multiple variants (dots, spinner, pulse).
        </p>
      </div>
      <ComponentPreview
        name="Loader"
        preview={<LoaderPreview />}
        code={`import { Loader } from '@/components/ui/loader';

// Dots variant (default)
<Loader variant="dots" />

// Spinner variant
<Loader variant="spinner" size="lg" />

// Pulse variant
<Loader variant="pulse" />`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add loader"
        manual={loaderSource}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Loader } from '@/components/ui/loader';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Loader variant="spinner" />
<Loader variant="dots" />
<Loader variant="pulse" />`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Variants</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>dots</strong> - Three bouncing dots</li>
          <li><strong>spinner</strong> - Rotating circular spinner</li>
          <li><strong>pulse</strong> - Pulsing circle</li>
        </ul>
      </div>
    </div>
  )
}
