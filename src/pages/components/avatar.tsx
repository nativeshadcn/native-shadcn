import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import avatarSource from '@templates/avatar?raw'

export function AvatarDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Avatar</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          User profile picture with fallback support.
        </p>
      </div>
      <ComponentPreview
        name="Avatar"
        preview={
          <div className="flex gap-4 items-center">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">AB</span>
            </div>
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <span className="text-base font-medium">CD</span>
            </div>
          </div>
        }
        code={`import { Avatar } from '@/components/ui/avatar';

<View className="flex-row gap-4 items-center">
  <Avatar fallback="JD" size="default" />
  <Avatar fallback="AB" size="lg" />
  <Avatar fallback="CD" size="xl" />
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add avatar"
        manual={avatarSource}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Avatar } from '@/components/ui/avatar';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Avatar fallback="JD" size="default" />`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
