import { CodeBlock } from './code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface InstallationStepsProps {
  cli?: string
  manual?: string
  dependencies?: string[]
}

export function InstallationSteps({ cli, manual, dependencies }: InstallationStepsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Installation</h2>
      </div>

      <Tabs defaultValue="cli" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="cli" className="space-y-4">
          {cli && (
            <>
              <p className="text-sm text-muted-foreground">
                Use the CLI to automatically add the component to your project.
              </p>
              <CodeBlock code={cli} language="bash" />
            </>
          )}
          {dependencies && dependencies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Install dependencies</h3>
              <CodeBlock code={`npm install ${dependencies.join(' ')}`} language="bash" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          {manual && (
            <>
              <p className="text-sm text-muted-foreground">
                Copy and paste the following code into your project.
              </p>
              <CodeBlock code={manual} showLineNumbers />
            </>
          )}
          {dependencies && dependencies.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Install dependencies</h3>
              <CodeBlock code={`npm install ${dependencies.join(' ')}`} language="bash" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
