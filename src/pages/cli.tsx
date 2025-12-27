import { CodeBlock } from '../components/code-block'

export function CLI() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">CLI</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use the CLI to add components to your project.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">init</h2>
          <p className="text-muted-foreground mb-4">
            Initialize Native ShadCN in your project. This command automatically configures everything you need:
          </p>
          <CodeBlock code="npx native-shadcn-cli init" language="bash" />

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What happens during init:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✔ Checking framework</li>
              <li>✔ Writing components.json</li>
              <li>✔ Installing dependencies</li>
              <li>✔ Writing tailwind.config.js</li>
              <li>✔ Writing global.css</li>
              <li>✔ Writing lib/utils</li>
              <li>✔ Writing babel.config.js</li>
              <li>✔ Importing global styles</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Smart Utils Merging</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              If you already have a <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">lib/utils.ts</code> file with custom functions,
              init will intelligently merge the <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">cn()</code> function
              without overwriting your existing code. Your custom utilities are always preserved!
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Options</h3>
            <ul className="space-y-2">
              <li>
                <code className="text-sm bg-muted px-2 py-1 rounded">-y, --yes</code>
                <span className="ml-2 text-muted-foreground">Skip confirmation prompts</span>
              </li>
              <li>
                <code className="text-sm bg-muted px-2 py-1 rounded">-c, --cwd &lt;path&gt;</code>
                <span className="ml-2 text-muted-foreground">Set the working directory</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">add</h2>
          <p className="text-muted-foreground mb-4">
            Add components to your project. Dependencies are automatically resolved and installed:
          </p>
          <CodeBlock code="npx native-shadcn-cli add [components...]" language="bash" />

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Example output:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground font-mono">
              <li>✔ Registry: 218ms | Resolve: 0ms | Components: 2</li>
              <li>✔ Installing dependencies</li>
              <li>✔ Done</li>
              <li className="text-green-600 dark:text-green-400">Success! Added 2 component(s)</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">Duplicate Detection</h3>
            <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
              If you try to add a component that already exists, you'll be prompted to confirm overwrite:
            </p>
            <code className="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded block">
              ? ui/button.tsx already exists. Overwrite? › (y/N)
            </code>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-2">
              Defaults to <strong>No</strong> to keep your customizations safe. Utils files are intelligently merged without prompting.
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Examples</h3>
              <div className="space-y-2">
                <CodeBlock code="npx native-shadcn-cli add button" language="bash" />
                <CodeBlock code="npx native-shadcn-cli add button card input" language="bash" />
                <CodeBlock code="npx native-shadcn-cli add --all" language="bash" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Options</h3>
              <ul className="space-y-2">
                <li>
                  <code className="text-sm bg-muted px-2 py-1 rounded">-a, --all</code>
                  <span className="ml-2 text-muted-foreground">Add all 48 components</span>
                </li>
                <li>
                  <code className="text-sm bg-muted px-2 py-1 rounded">-o, --overwrite</code>
                  <span className="ml-2 text-muted-foreground">Overwrite existing files without prompting</span>
                </li>
                <li>
                  <code className="text-sm bg-muted px-2 py-1 rounded">-c, --cwd &lt;path&gt;</code>
                  <span className="ml-2 text-muted-foreground">Set the working directory</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">list</h2>
          <p className="text-muted-foreground mb-4">
            List all available components:
          </p>
          <CodeBlock code="npx native-shadcn-cli list" language="bash" />
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Options</h3>
            <ul className="space-y-2">
              <li>
                <code className="text-sm bg-muted px-2 py-1 rounded">-c, --cwd &lt;path&gt;</code>
                <span className="ml-2 text-muted-foreground">Set the working directory</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
