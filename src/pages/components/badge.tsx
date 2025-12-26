import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { badgeTemplate } from '@templates/badge'

export function BadgeDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Badge</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Status indicators and labels.
        </p>
      </div>
      <ComponentPreview
        name="Badge"
        preview={
          <div className="flex flex-col gap-4 p-8">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground transition-colors">
                Default
              </span>
              <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors">
                Secondary
              </span>
              <span className="inline-flex items-center rounded-full border border-transparent bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground transition-colors">
                Destructive
              </span>
              <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors">
                Outline
              </span>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="inline-flex items-center gap-1 rounded-full border border-transparent bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Success
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-transparent bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Warning
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-transparent bg-blue-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Info
              </span>
            </div>
          </div>
        }
        code={`import { Badge } from '@/components/ui/badge';

{/* Basic badges */}
<View className="flex-row gap-2 flex-wrap">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
</View>

{/* Status badges with icons */}
<View className="flex-row gap-2 flex-wrap">
  <Badge variant="success">
    <Icon name="check-circle" size={12} />
    <Text>Success</Text>
  </Badge>
  <Badge variant="warning">
    <Icon name="alert-triangle" size={12} />
    <Text>Warning</Text>
  </Badge>
  <Badge variant="info">
    <Icon name="info" size={12} />
    <Text>Info</Text>
  </Badge>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add badge"
        manual={badgeTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Badge } from '@/components/ui/badge';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
