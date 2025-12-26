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
            Initialize Native ShadCN in your project:
          </p>
          <CodeBlock code="npx native-shadcn-cli init" language="bash" />
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
            Add components to your project:
          </p>
          <CodeBlock code="npx native-shadcn-cli add [components...]" language="bash" />
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
                  <span className="ml-2 text-muted-foreground">Add all components</span>
                </li>
                <li>
                  <code className="text-sm bg-muted px-2 py-1 rounded">-o, --overwrite</code>
                  <span className="ml-2 text-muted-foreground">Overwrite existing files</span>
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
