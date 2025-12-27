import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import skeletonSource from '@templates/skeleton?raw'

export function SkeletonDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Skeleton</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Loading placeholder with pulse animation.
        </p>
      </div>
      <ComponentPreview
        name="Skeleton"
        preview={
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        }
        code={`import { Skeleton } from '@/components/ui/skeleton';

<View className="flex-row gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <View className="flex-1 gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </View>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add skeleton"
        manual={skeletonSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Skeleton } from '@/components/ui/skeleton';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Skeleton className="h-12 w-full rounded" />
<Skeleton className="h-4 w-3/4" />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
