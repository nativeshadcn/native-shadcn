import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { CodeBlock } from './code-block'
import { cn } from '@/lib/utils'

interface ComponentPreviewProps {
  name: string
  preview: React.ReactNode
  code: string
  className?: string
}

export function ComponentPreview({ name: _name, preview, code, className }: ComponentPreviewProps) {
  return (
    <div className={cn('relative my-8', className)}>
      <Tabs defaultValue="preview" className="relative">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex min-h-[350px] items-center justify-center p-10">
            <div className="w-full max-w-xl">{preview}</div>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="rounded-md border">
            <CodeBlock code={code} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
