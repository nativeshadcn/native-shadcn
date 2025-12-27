import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import menuitemSource from '@templates/menu-item?raw'

function MenuItemPreview() {
  const [selected, setSelected] = useState('profile')

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-md space-y-1 border border-border rounded-lg p-2 bg-background">
        <button
          onClick={() => setSelected('home')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            selected === 'home' ? 'bg-accent' : 'hover:bg-accent/50'
          }`}
        >
          <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-sm font-medium">Home</span>
        </button>
        
        <button
          onClick={() => setSelected('profile')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            selected === 'profile' ? 'bg-accent' : 'hover:bg-accent/50'
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm font-medium">Profile</span>
        </button>
        
        <button
          onClick={() => setSelected('settings')}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors ${
            selected === 'settings' ? 'bg-accent' : 'hover:bg-accent/50'
          }`}
        >
          <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  )
}

export function MenuItemDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Menu Item</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A composable menu list item component for navigation menus.
        </p>
      </div>
      <ComponentPreview
        name="Menu Item"
        preview={<MenuItemPreview />}
        code={`import { MenuItem, MenuItemIcon, MenuItemLabel } from '@/components/ui/menu-item';
import { View } from 'react-native';

<View>
  <MenuItem onPress={() => console.log('Home')}>
    <MenuItemIcon>
      <HomeIcon />
    </MenuItemIcon>
    <MenuItemLabel>Home</MenuItemLabel>
  </MenuItem>
  
  <MenuItem active onPress={() => console.log('Profile')}>
    <MenuItemIcon>
      <UserIcon />
    </MenuItemIcon>
    <MenuItemLabel>Profile</MenuItemLabel>
  </MenuItem>
  
  <MenuItem onPress={() => console.log('Settings')}>
    <MenuItemIcon>
      <SettingsIcon />
    </MenuItemIcon>
    <MenuItemLabel>Settings</MenuItemLabel>
  </MenuItem>
</View>`}
      />
      <InstallationSteps
        cli="npx native-shadcn-cli add menu-item"
        manual={menuitemSource}
        dependencies={['class-variance-authority', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { MenuItem } from '@/components/ui/menu-item';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<MenuItem
  label="Profile"
  icon={<UserIcon />}
  onPress={() => navigate('Profile')}
/>`} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}
