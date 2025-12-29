import { CodeBlock } from '../components/code-block'

export function Installation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          How to install dependencies and structure your app.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React Native 0.73+ or Expo SDK 50+</li>
            <li>Node.js 16+</li>
            <li>TypeScript (recommended) or JavaScript</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Installation</h2>
          <p className="text-muted-foreground mb-4">
            Run the following command to initialize Native ShadCN in your project:
          </p>
          <CodeBlock code="npx native-shadcn-cli init" language="bash" />
          <p className="mt-4 text-sm text-muted-foreground">
            💡 The CLI will ask if you want TypeScript or JavaScript. Components are automatically transformed to your choice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What it does</h2>
          <p className="text-muted-foreground mb-4">
            The init command automatically sets up everything for you:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Installs required dependencies (NativeWind, Tailwind CSS, CVA, clsx, tailwind-merge, Reanimated, Gesture Handler)</li>
            <li>Creates <code className="text-sm">components.json</code> configuration file</li>
            <li>Creates <code className="text-sm">tailwind.config.js</code> with theme tokens and CSS variables</li>
            <li>Creates <code className="text-sm">global.css</code> with light/dark mode support</li>
            <li>Updates <code className="text-sm">tsconfig.json</code> with path aliases (@/components, @/lib) - <strong>optional</strong></li>
            <li>Creates <code className="text-sm">nativewind-env.d.ts</code> for TypeScript className support - <strong>optional</strong></li>
            <li>Creates <code className="text-sm">lib/utils.ts</code> with the cn() helper function</li>
            <li>Creates <code className="text-sm">components/ui</code> directory structure</li>
            <li>Configures or creates <code className="text-sm">babel.config.js</code> with NativeWind preset</li>
            <li>Auto-imports global.css in your root component (App.tsx or app/_layout.tsx)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Path Aliases Configuration</h2>
          <p className="text-muted-foreground mb-4">
            During init, you'll be asked if you want to configure path aliases in your <code className="text-sm">tsconfig.json</code>. If you choose yes, you can use <code className="text-sm">@/components</code> and <code className="text-sm">@/lib</code> imports.
          </p>
          <p className="text-muted-foreground mb-4">
            <strong>Optional:</strong> If you need runtime path resolution (e.g., for Metro bundler), you can also install <code className="text-sm">babel-plugin-module-resolver</code>:
          </p>
          <CodeBlock code="npm install -D babel-plugin-module-resolver" language="bash" />
          <p className="mt-4 text-muted-foreground mb-4">
            Then update your <code className="text-sm">babel.config.js</code>:
          </p>
          <CodeBlock
            code={`module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
      ],
    ],
  };
};`}
            language="javascript"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">That's it!</h2>
          <p className="text-muted-foreground mb-4">
            You're ready to start adding components. Try adding your first component:
          </p>
          <CodeBlock code="npx native-shadcn-cli add button" language="bash" />
        </div>
      </div>
    </div>
  )
}
