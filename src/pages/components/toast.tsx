import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { toastTemplate } from '@templates/toast'

function ToastPreview() {
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<'default' | 'success' | 'error'>('default')

  const showToastMessage = (type: 'default' | 'success' | 'error') => {
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const toastContent = {
    default: { icon: 'ℹ', message: 'Message sent successfully', bg: 'bg-background' },
    success: { icon: '✓', message: 'Success! Your changes have been saved.', bg: 'bg-green-500' },
    error: { icon: '✕', message: 'Error! Something went wrong.', bg: 'bg-destructive' }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => showToastMessage('default')}
          className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Show Default
        </button>
        <button
          onClick={() => showToastMessage('success')}
          className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          Show Success
        </button>
        <button
          onClick={() => showToastMessage('error')}
          className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
        >
          Show Error
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-md border border-border bg-background p-4 shadow-lg animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            <span className="text-lg">{toastContent[toastType].icon}</span>
            <p className="text-sm">{toastContent[toastType].message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function ToastDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Toast</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Temporary notification messages.
        </p>
      </div>
      <ComponentPreview
        name="Toast"
        preview={<ToastPreview />}
        code={`import { useState } from 'react';
import { Toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

const [showToast, setShowToast] = useState(false);
const [toastType, setToastType] = useState('default');

const showToastMessage = (type) => {
  setToastType(type);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 3000);
};

<View className="gap-2">
  <Button onPress={() => showToastMessage('default')}>
    Show Default
  </Button>
  <Button onPress={() => showToastMessage('success')}>
    Show Success
  </Button>
  <Button onPress={() => showToastMessage('error')}>
    Show Error
  </Button>
</View>

{showToast && (
  <Toast variant={toastType}>
    <Text>
      {toastType === 'success' && '✓ Success! Your changes have been saved.'}
      {toastType === 'error' && '✕ Error! Something went wrong.'}
      {toastType === 'default' && 'ℹ Message sent successfully'}
    </Text>
  </Toast>
)}`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add toast"
        manual={toastTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Toast } from '@/components/ui/toast';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Toast
  message="Success!"
  variant="success"
  visible={show}
  onDismiss={() => setShow(false)}
/>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
