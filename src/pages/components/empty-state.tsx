import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { emptyStateTemplate } from '@templates/empty-state'

function EmptyStatePreview() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center p-8 border border-border rounded-lg max-w-md">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">No items found</h3>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first item.
          </p>
        </div>
        <button 
          onClick={() => alert('Create item clicked!')}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Create Item
        </button>
      </div>
    </div>
  )
}

export function EmptyStateDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Empty State</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A composable empty state component with Context API for displaying when there is no data.
        </p>
      </div>
      <ComponentPreview
        name="Empty State"
        preview={<EmptyStatePreview />}
        code={`import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateAction } from '@/components/ui/empty-state';
import { View } from 'react-native';

<EmptyState>
  <EmptyStateIcon>
    <InboxIcon />
  </EmptyStateIcon>
  <EmptyStateTitle>No items found</EmptyStateTitle>
  <EmptyStateDescription>
    Get started by creating your first item.
  </EmptyStateDescription>
  <EmptyStateAction onPress={() => console.log('Create')}>
    Create Item
  </EmptyStateAction>
</EmptyState>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add empty-state"
        manual={emptyStateTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { EmptyState } from '@/components/ui/empty-state';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<EmptyState
  title="No results found"
  description="Try adjusting your search or filters"
/>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
