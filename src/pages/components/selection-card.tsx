import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import { selectionCardTemplate } from '@templates/selection-card'

function SelectionCardPreview() {
  const [selected, setSelected] = useState('starter')

  const plans = [
    { id: 'starter', title: 'Starter', price: '$9/month' },
    { id: 'pro', title: 'Pro', price: '$29/month' },
    { id: 'enterprise', title: 'Enterprise', price: '$99/month' },
  ]

  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={'relative border-2 rounded-lg p-4 transition-all ' + (
              selected === plan.id
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-border'
            )}
          >
            {selected === plan.id && (
              <div className="absolute top-2 right-2">
                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <svg className="h-3 w-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            <div className="text-center space-y-2">
              <h3 className="font-semibold">{plan.title}</h3>
              <p className="text-sm text-muted-foreground">{plan.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function SelectionCardDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Selection Card</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A composable selectable card component for choosing between multiple options.
        </p>
      </div>
      <ComponentPreview
        name="Selection Card"
        preview={<SelectionCardPreview />}
        code={`import { SelectionCard, SelectionCardTitle, SelectionCardDescription } from '@/components/ui/selection-card';
import { View } from 'react-native';
import { useState } from 'react';

const [selected, setSelected] = useState('starter');

<View className="gap-4">
  <SelectionCard
    selected={selected === 'starter'}
    onPress={() => setSelected('starter')}
  >
    <SelectionCardTitle>Starter</SelectionCardTitle>
    <SelectionCardDescription>/month</SelectionCardDescription>
  </SelectionCard>

  <SelectionCard
    selected={selected === 'pro'}
    onPress={() => setSelected('pro')}
  >
    <SelectionCardTitle>Pro</SelectionCardTitle>
    <SelectionCardDescription>9/month</SelectionCardDescription>
  </SelectionCard>

  <SelectionCard
    selected={selected === 'enterprise'}
    onPress={() => setSelected('enterprise')}
  >
    <SelectionCardTitle>Enterprise</SelectionCardTitle>
    <SelectionCardDescription>9/month</SelectionCardDescription>
  </SelectionCard>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add selection-card"
        manual={selectionCardTemplate}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { SelectionCard } from '@/components/ui/selection-card';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<SelectionCard
  selected={isSelected}
  onPress={() => setSelected(true)}
  title="Premium Plan"
  description="$29/month"
/>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
