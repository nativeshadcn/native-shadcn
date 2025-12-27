import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import aspectratioSource from '@templates/aspect-ratio?raw'

export function AspectRatioDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Aspect Ratio</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Maintains a consistent aspect ratio for content containers.
        </p>
      </div>
      <ComponentPreview
        name="Aspect Ratio"
        preview={
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="w-full bg-muted rounded-md flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                <span className="text-sm text-muted-foreground">16:9 Aspect Ratio</span>
              </div>
            </div>
          </div>
        }
        code={`import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Image } from 'react-native';

<AspectRatio ratio={16/9}>
  <Image
    source={{ uri: 'https://example.com/image.jpg' }}
    style={{ width: '100%', height: '100%' }}
    resizeMode="cover"
  />
</AspectRatio>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add aspect-ratio"
        manual={aspectratioSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { AspectRatio } from '@/components/ui/aspect-ratio';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<AspectRatio ratio={16/9}>
  <Image source={{ uri: 'https://example.com/image.jpg' }} />
</AspectRatio>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
