import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import radiogroupSource from '@templates/radio-group?raw'

function RadioGroupPreview() {
  const [selectedPlan, setSelectedPlan] = useState('free')

  const plans = [
    { id: 'free', label: 'Free', description: 'Perfect for getting started' },
    { id: 'pro', label: 'Pro', description: 'Best for professionals' },
    { id: 'enterprise', label: 'Enterprise', description: 'For large organizations' },
  ]

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-3">
        <label className="text-sm font-medium">Choose a plan</label>
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className="flex w-full items-start gap-3 rounded-md border border-input p-4 text-left hover:bg-accent transition-colors"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary mt-0.5">
              {selectedPlan === plan.id && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{plan.label}</div>
              <div className="text-sm text-muted-foreground">{plan.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function RadioGroupDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Radio Group</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
        </p>
      </div>

      <ComponentPreview
        name="Radio Group"
        preview={<RadioGroupPreview />}
        code={`import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const [selectedPlan, setSelectedPlan] = useState('free');

const plans = [
  { id: 'free', label: 'Free', description: 'Perfect for getting started' },
  { id: 'pro', label: 'Pro', description: 'Best for professionals' },
  { id: 'enterprise', label: 'Enterprise', description: 'For large organizations' },
];

<RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
  {plans.map((plan) => (
    <RadioGroupItem
      key={plan.id}
      value={plan.id}
      label={plan.label}
      description={plan.description}
    />
  ))}
</RadioGroup>`}
      />

      <InstallationSteps
        cli="npx native-shadcn add radio-group"
        manual={radiogroupSource}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItem value="option1" label="Option 1" />
  <RadioGroupItem value="option2" label="Option 2" />
</RadioGroup>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
