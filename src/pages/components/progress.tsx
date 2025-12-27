import { useState, useEffect } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import progressSource from '@templates/progress?raw'

function ProgressPreview() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev >= 100 ? 0 : prev + 5)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 w-full max-w-md">
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading...</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm">
          <span>Static Progress</span>
          <span>75%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  )
}

export function ProgressDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Progress</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Loading progress indicator.
        </p>
      </div>
      <ComponentPreview
        name="Progress"
        preview={<ProgressPreview />}
        code={`import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress(prev => prev >= 100 ? 0 : prev + 5);
  }, 200);
  return () => clearInterval(interval);
}, []);

<View className="gap-4">
  <View>
    <Text className="text-sm mb-2">Uploading... {progress}%</Text>
    <Progress value={progress} />
  </View>
  <View>
    <Text className="text-sm mb-2">Static Progress 75%</Text>
    <Progress value={75} />
  </View>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add progress"
        manual={progressSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Progress } from '@/components/ui/progress';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Progress value={60} />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
