import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import tabsSource from '@templates/tabs?raw'

function TabsPreview() {
  const [activeTab, setActiveTab] = useState('account')

  const tabs = [
    { id: 'account', label: 'Account', content: 'Make changes to your account here. Click save when you\'re done.' },
    { id: 'password', label: 'Password', content: 'Change your password here. After saving, you\'ll be logged out.' },
    { id: 'settings', label: 'Settings', content: 'Manage your account settings and preferences.' }
  ]

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-md bg-muted/50">
        <p className="text-sm">{tabs.find(t => t.id === activeTab)?.content}</p>
      </div>
    </div>
  )
}

export function TabsDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Tabs</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Organize content into multiple sections with tab navigation.
        </p>
      </div>
      <ComponentPreview
        name="Tabs"
        preview={<TabsPreview />}
        code={`import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const [activeTab, setActiveTab] = useState('account');

const tabs = [
  { id: 'account', label: 'Account', content: 'Make changes to your account here. Click save when you\\'re done.' },
  { id: 'password', label: 'Password', content: 'Change your password here. After saving, you\\'ll be logged out.' },
  { id: 'settings', label: 'Settings', content: 'Manage your account settings and preferences.' }
];

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    {tabs.map((tab) => (
      <TabsTrigger key={tab.id} value={tab.id}>
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>
  {tabs.map((tab) => (
    <TabsContent key={tab.id} value={tab.id}>
      <Text>{tab.content}</Text>
    </TabsContent>
  ))}
</Tabs>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add tabs"
        manual={tabsSource}
        dependencies={['clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
