import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { hoverCardTemplate } from '@templates/hover-card'

// Functional hover card preview
function HoverCardPreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative inline-block">
        <button
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary underline hover:no-underline cursor-pointer"
        >
          @nextjs
        </button>

        {isOpen && (
          <div className="absolute z-50 w-80 rounded-md border border-border bg-popover p-4 shadow-md animate-in fade-in-0 zoom-in-95 top-full mt-2">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                N
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm text-muted-foreground">
                  The React Framework - created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <svg
                    className="mr-2 h-4 w-4 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function HoverCardDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Hover Card</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Display contextual information on hover or press (mobile-adapted for React Native).
        </p>
      </div>

      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          <strong>Note:</strong> This component is adapted for React Native as a "Press Card" since hover interactions don't exist on mobile devices. Use press or long-press to trigger the content.
        </p>
      </div>

      <ComponentPreview
        name="Hover Card"
        preview={<HoverCardPreview />}
        code={`import { useState } from 'react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';
import { Text, View } from 'react-native';

export function HoverCardExample() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Text className="text-primary underline">@nextjs</Text>
      </HoverCardTrigger>
      <HoverCardContent>
        <View className="flex-row gap-4">
          <View className="h-12 w-12 rounded-full bg-primary items-center justify-center">
            <Text className="text-primary-foreground font-semibold">N</Text>
          </View>
          <View className="space-y-2">
            <Text className="text-sm font-semibold">@nextjs</Text>
            <Text className="text-sm text-muted-foreground">
              The React Framework - created and maintained by @vercel.
            </Text>
            <View className="flex-row items-center pt-2">
              <Text className="text-xs text-muted-foreground">
                Joined December 2021
              </Text>
            </View>
          </View>
        </View>
      </HoverCardContent>
    </HoverCard>
  );
}`}
      />

      <InstallationSteps
        cli="npx native-shadcn add hover-card"
        manual={hoverCardTemplate}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <pre className="rounded-lg border bg-muted p-4">
              <code>{`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/ui/hover-card';`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Props</h2>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Component</th>
                <th className="p-4 text-left font-semibold">Props</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">HoverCard</td>
                <td className="p-4 text-sm text-muted-foreground">children</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">HoverCardTrigger</td>
                <td className="p-4 text-sm text-muted-foreground">All Pressable props</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">HoverCardContent</td>
                <td className="p-4 text-sm text-muted-foreground">align, sideOffset, className</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
