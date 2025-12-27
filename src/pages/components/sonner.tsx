import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import sonnerSource from '@templates/sonner?raw'

function SonnerPreview() {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; description?: string; type: string }>>([])
  const [expanded, setExpanded] = useState(false)

  const showToast = (message: string, type: string = 'default', description?: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, description, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  const getToastStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-100'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100'
      default:
        return 'bg-background border-border text-foreground'
    }
  }

  const containerHeight = expanded ? toasts.length * 60 + 40 : toasts.length * 8 + 100

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50 w-80">
        <div
          className="relative cursor-pointer"
          style={{ height: toasts.length > 0 ? `${containerHeight}px` : '0px' }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          {toasts.map((toast, index) => {
            const stackOffset = index * 8
            const expandedOffset = index * 60
            const stackScale = 1 - (index * 0.05)
            const stackOpacity = 1 - (index * 0.15)

            return (
              <div
                key={toast.id}
                className={`absolute w-full rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out ${getToastStyles(toast.type)}`}
                style={{
                  top: expanded ? `${expandedOffset}px` : `${stackOffset}px`,
                  transform: `scale(${expanded ? 1 : stackScale})`,
                  opacity: expanded ? 1 : stackOpacity,
                  zIndex: toasts.length - index,
                  transformOrigin: 'top center',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold">{toast.message}</p>
                    {toast.description && (
                      <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                    className="text-lg opacity-70 hover:opacity-100 ml-4 -mt-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 p-6">
        <button
          onClick={() => showToast('Event has been created')}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Show Toast
        </button>
        <button
          onClick={() => showToast('Success!', 'success', 'Your changes have been saved.')}
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          Success
        </button>
        <button
          onClick={() => showToast('Error!', 'error', 'Something went wrong.')}
          className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Error
        </button>
        <button
          onClick={() => showToast('Warning!', 'warning', 'Please check your input.')}
          className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
        >
          Warning
        </button>
        <button
          onClick={() => showToast('Info', 'info', 'New update available.')}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Info
        </button>
      </div>
    </div>
  )
}

export function SonnerDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Sonner</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          An opinionated toast component for React Native.
        </p>
      </div>

      <ComponentPreview
        name="Sonner"
        preview={<SonnerPreview />}
        code={`import { View } from 'react-native';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

export function ToastDemo() {
  return (
    <View className="flex-row flex-wrap gap-3">
      <Button
        onPress={() => toast('Event has been created')}
      >
        Show Toast
      </Button>

      <Button
        variant="default"
        onPress={() =>
          toast.success('Success!', {
            description: 'Your changes have been saved.',
          })
        }
      >
        Success
      </Button>

      <Button
        variant="destructive"
        onPress={() =>
          toast.error('Error!', {
            description: 'Something went wrong.',
          })
        }
      >
        Error
      </Button>

      <Button
        onPress={() =>
          toast.warning('Warning!', {
            description: 'Please check your input.',
          })
        }
      >
        Warning
      </Button>

      <Button
        onPress={() =>
          toast.info('Info', {
            description: 'New update available.',
          })
        }
      >
        Info
      </Button>
    </View>
  );
}`}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="text-muted-foreground">
          Add the Toaster component to your root layout:
        </p>
        <pre className="rounded-lg border bg-muted p-4">
          <code>{`import { Toaster } from '@/components/ui/sonner';

export default function RootLayout() {
  return (
    <>
      {/* Your app content */}
      <Toaster />
    </>
  );
}`}</code>
        </pre>
      </div>

      <InstallationSteps
        cli="npx native-shadcn add sonner"
        manual={sonnerSource}
        dependencies={['sonner-native']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Toast</h3>
            <pre className="rounded-lg border bg-muted p-4">
              <code>{`import { toast } from '@/components/ui/sonner';

toast('Hello World');`}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">With Description</h3>
            <pre className="rounded-lg border bg-muted p-4">
              <code>{`toast('Event Created', {
  description: 'Your event has been scheduled.',
});`}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">With Action</h3>
            <pre className="rounded-lg border bg-muted p-4">
              <code>{`toast('Undo Changes', {
  description: 'Your changes have been saved.',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
});`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Toast Types</h2>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Type</th>
                <th className="p-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">default</td>
                <td className="p-4 text-sm text-muted-foreground">Standard notification</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">success</td>
                <td className="p-4 text-sm text-muted-foreground">Success message with green styling</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">error</td>
                <td className="p-4 text-sm text-muted-foreground">Error message with red styling</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">warning</td>
                <td className="p-4 text-sm text-muted-foreground">Warning message with yellow styling</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">info</td>
                <td className="p-4 text-sm text-muted-foreground">Info message with blue styling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
