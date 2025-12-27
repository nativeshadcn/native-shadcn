import { useState } from 'react'
import { ComponentPreview } from '@/components/component-preview'
import { InstallationSteps } from '@/components/installation-steps'
import { CodeBlock } from '@/components/code-block'
import formSource from '@templates/form?raw'

// Functional form preview
function FormPreview() {
  const [formData, setFormData] = useState({ username: '', email: '' })
  const [errors, setErrors] = useState({ username: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = { username: '', email: '' }

    if (!formData.username || formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters.'
    }
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email.'
    }

    setErrors(newErrors)

    if (!newErrors.username && !newErrors.email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {submitted && (
        <div className="mb-4 rounded-md bg-green-500/10 border border-green-500/50 p-4">
          <p className="text-sm text-green-600 dark:text-green-400">
            Form submitted successfully!
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Enter username"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.username && (
            <p className="text-sm font-medium text-red-500">{errors.username}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p className="text-sm text-muted-foreground">We'll never share your email.</p>
          {errors.email && (
            <p className="text-sm font-medium text-red-500">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export function FormDoc() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Form</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Building forms with React Hook Form and Zod validation.
        </p>
      </div>

      <ComponentPreview
        name="Form"
        preview={<FormPreview />}
        code={`import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function FormExample() {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [errors, setErrors] = useState({ username: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const newErrors = { username: '', email: '' };

    if (!formData.username || formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters.';
    }
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email.';
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <View className="space-y-6">
      {submitted && (
        <View className="rounded-md bg-green-500/10 border border-green-500/50 p-4">
          <Text className="text-sm text-green-600">
            Form submitted successfully!
          </Text>
        </View>
      )}

      <View className="space-y-2">
        <Text className="text-sm font-medium">Username</Text>
        <Input
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          placeholder="Enter username"
        />
        {errors.username && (
          <Text className="text-sm text-red-500">{errors.username}</Text>
        )}
      </View>

      <View className="space-y-2">
        <Text className="text-sm font-medium">Email</Text>
        <Input
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter email"
        />
        <Text className="text-sm text-muted-foreground">
          We'll never share your email.
        </Text>
        {errors.email && (
          <Text className="text-sm text-red-500">{errors.email}</Text>
        )}
      </View>

      <Button onPress={handleSubmit}>Submit</Button>
    </View>
  );
}`}
      />

      <InstallationSteps
        cli="npx native-shadcn add form"
        manual={formSource}
        dependencies={['react-hook-form', '@hookform/resolvers', 'zod', 'clsx']}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Import</h3>
            <CodeBlock code={`import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';`} language="tsx" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Example</h3>
            <CodeBlock code={`<Form>
  <FormField name="email">
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="Enter email" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</Form>`} language="tsx" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Type-safe form validation with Zod schemas</li>
          <li>Automatic error message handling</li>
          <li>Composable form components</li>
          <li>Accessibility support with proper ARIA attributes</li>
          <li>Integration with React Hook Form</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Components</h2>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-4 text-left font-semibold">Component</th>
                <th className="p-4 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">Form</td>
                <td className="p-4 text-sm text-muted-foreground">Wrapper component that provides form context</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">FormField</td>
                <td className="p-4 text-sm text-muted-foreground">Connects input to form state</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">FormItem</td>
                <td className="p-4 text-sm text-muted-foreground">Container for form field elements</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">FormLabel</td>
                <td className="p-4 text-sm text-muted-foreground">Label with error state styling</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">FormControl</td>
                <td className="p-4 text-sm text-muted-foreground">Wrapper for input with accessibility</td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-mono text-sm">FormDescription</td>
                <td className="p-4 text-sm text-muted-foreground">Helper text for the field</td>
              </tr>
              <tr>
                <td className="p-4 font-mono text-sm">FormMessage</td>
                <td className="p-4 text-sm text-muted-foreground">Displays validation errors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
