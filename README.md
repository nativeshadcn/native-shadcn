# Native shadcn/ui

A beautiful collection of re-usable components built with React Native and NativeWind, inspired by shadcn/ui.

## Why Native shadcn/ui?

- 🎯 **True shadcn/ui Experience** - Works exactly like shadcn/ui, but for React Native
- 🎨 **Automatic Configuration** - One command setup, no manual config needed
- 🌓 **Dark Mode Ready** - CSS variables for seamless light/dark theming
- 📱 **Mobile-Optimized** - Built specifically for React Native, not web ports
- 🔧 **Production-Ready** - Battle-tested components for real apps
- 🚀 **Fast Setup** - Get started in under 60 seconds
- 💪 **Type-Safe** - Full TypeScript support out of the box
- 🎭 **Own Your Code** - Copy-paste components, no package bloat

## Features

- 🎨 **48 Beautiful Components** - Ready-to-use, production-grade components
- 🎯 **shadcn/ui Philosophy** - Copy the code into your project, you own it
- 🌊 **NativeWind v4** - Tailwind CSS for React Native
- 📦 **One-Command Setup** - `npx native-shadcn-cli init` does everything
- 🌓 **Dark Mode** - CSS variables system like shadcn/ui
- 🔧 **Fully Customizable** - Built with class-variance-authority (CVA)
- 📱 **Mobile-First** - Designed specifically for React Native
- 📚 **Interactive Documentation** - Live previews and copy-paste examples
- ⚡ **TypeScript & JavaScript** - Full TypeScript support, or use plain JavaScript
- 🎭 **Accessible** - Built with accessibility best practices
- 🔄 **Always Up-to-Date** - Components stay in your repo, update on your terms

## Components

All components are sorted alphabetically for easy reference:

- Accordion
- Alert
- Alert Dialog
- Aspect Ratio
- Avatar
- Badge
- Button
- Calendar
- Card
- Carousel
- Checkbox
- Collapsible
- Combobox
- Command
- Context Menu
- Data Table
- Dialog
- Drawer
- Dropdown Menu
- Empty State
- Error State
- Form
- Hover Card
- Input
- Label
- Loader
- Map View
- Menu Item
- Popover
- Progress
- Radio Group
- Searchable Map
- Select
- Selection Card
- Separator
- Sheet
- Skeleton
- Slider
- Sonner
- Star Rating
- Switch
- Table
- Tabs
- Text
- Textarea
- Toast
- Toggle
- Tooltip

## Quick Start

### Prerequisites

- React Native project (Expo or bare workflow)
- Node.js 16.x or later
- npm or yarn

### Installation

#### 1. Using CLI (Recommended)

Initialize the project with a single command :

```bash
npx native-shadcn-cli init
```

This will automatically:
- ✅ Install required dependencies (NativeWind, CVA, clsx, tailwind-merge)
- ✅ Create and configure `tailwind.config.js` with theme tokens
- ✅ Create `global.css` with CSS variables for light/dark mode
- ✅ Configure or create `babel.config.js` with NativeWind preset
- ✅ Update `tsconfig.json` with path aliases (`@/components`, `@/lib`) - **optional**
- ✅ Create `nativewind-env.d.ts` for TypeScript className support - **optional**
- ✅ Auto-import `global.css` in your root component (App.tsx or _layout.tsx)
- ✅ Create `lib/utils.ts` with the `cn()` helper function
- ✅ Set up `components/ui` directory structure
- ✅ Create `components.json` configuration file

**No manual setup required!** Everything is configured automatically.

#### 2. Adding Components

Add components individually:

```bash
npx native-shadcn-cli add button
npx native-shadcn-cli add input dialog card
```

Or add all components at once:

```bash
npx native-shadcn-cli add --all
```

#### 3. List Available Components

View all available components:

```bash
npx native-shadcn-cli list
```

Components are displayed in alphabetical order for easy reference.

## What Gets Configured

### tailwind.config.js
```js
// Automatically created with shadcn/ui color tokens
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}', ...],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        primary: { DEFAULT: 'hsl(var(--primary))', ... },
        // ... al tokens
      },
    },
  },
};
```

### global.css
```css
/* CSS variables for light and dark mode */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    /* ... */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... */
  }
}
```

### babel.config.js
```js
// Automatically updated or created
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['nativewind/babel'], // ✅ Added automatically
};
```

### tsconfig.json
```json
// Automatically updated with path aliases
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

### nativewind-env.d.ts
```typescript
/// <reference types="nativewind/types" />
```
This file enables TypeScript support for the `className` prop on React Native components.

## Manual Installation (Alternative)

If you prefer manual setup:

1. Install dependencies:

```bash
npm install nativewind tailwindcss class-variance-authority clsx tailwind-merge
```

2. Set up NativeWind in your project following the [NativeWind documentation](https://www.nativewind.dev/quick-starts/expo)

3. Copy components from the documentation site

## Usage Example

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Text>Enter your email to get started</Text>
        <Input placeholder="Enter your email" />
      </CardContent>
      <CardFooter>
        <Button onPress={() => console.log('Pressed')}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Dark Mode Support

Native shadcn/ui comes with built-in dark mode support using CSS variables :

```tsx
import { View } from 'react-native';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <View className={colorScheme === 'dark' ? 'dark' : ''}>
      {/* Your app content */}
    </View>
  );
}
```

All components automatically adapt to light/dark mode through CSS variables. You can customize the colors in `global.css`:

```css
/* Light mode */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... customize your colors */
}

/* Dark mode */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... customize your dark colors */
}
```

## Documentation

Visit the documentation site for:
- 📖 Component previews with live demos
- 💻 Interactive code examples
- 📚 Complete API reference
- 🚀 Detailed installation guides
- 🎨 Customization options
- 💡 Best practices and usage patterns

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - React Native development platform
- **NativeWind** - Tailwind CSS for React Native
- **class-variance-authority (CVA)** - Component variant management
- **clsx & tailwind-merge** - Utility class merging
- **TypeScript** - Full type safety and developer experience
- **Vite + React** - Lightning-fast documentation website
- **React Hook Form + Zod** - Form validation (Form component)

## Project Structure

```
native-shadcn/
├── src/                     # Documentation site source
│   ├── pages/               # Documentation pages
│   └── components/          # Website components
├── packages/
│   └── cli/                 # CLI tool
│       ├── src/
│       │   ├── commands/    # CLI commands (init, add, list)
│       │   ├── registry/    # Registry management
│       │   ├── utils/       # Utility functions
│       │   └── __tests__/   # Test suite (21 files, 257 tests)
│       │       ├── commands/     # Command tests
│       │       ├── config/       # Config tests
│       │       ├── fixtures/     # Test fixtures (6 scenarios)
│       │       ├── registry/     # Registry tests
│       │       └── utils/        # Utility tests
│       ├── vitest.config.ts # Test configuration
│       └── package.json
├── public/
│   └── registry/            # Component registry (48 components)
├── index.html               # Documentation site entry
├── vite.config.ts           # Vite configuration
└── package.json             # Documentation site dependencies
```

## Testing

Native ShadCN CLI has a comprehensive test suite to ensure reliability:

```bash
cd packages/cli

# Run all tests
npm test

# Watch mode (development)
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Suite:**
- ✅ **21 test files** organized into commands, config, registry, utils, and fixtures
- ✅ **257 tests** covering all CLI functionality
- ✅ **10 snapshot files** for consistency validation
- ✅ **6 fixture directories** simulating real project scenarios

**Test Coverage:**
- ✅ Command tests (init, add, diff)
- ✅ Config management and validation
- ✅ Registry API and dependency resolution
- ✅ Schema validation with snapshots
- ✅ Component template processing
- ✅ Import transformations
- ✅ Utils merging (preserves custom code)
- ✅ Package manager detection (npm, yarn, pnpm, bun)
- ✅ TypeScript project detection
- ✅ Project type detection (Expo vs Bare RN)
- ✅ Path resolution
- ✅ Dependency handling
- ✅ Output formatting
- ✅ Logger functionality

**Fixtures:**
- `with-aliases/` - Project with path aliases configured
- `without-aliases/` - Project without path aliases
- `expo-project/` - Complete Expo project structure
- `bare-rn-project/` - Bare React Native project
- `typescript-project/` - TypeScript configuration
- `javascript-project/` - JavaScript configuration

## FAQ

### How is this different from React Native Paper or React Native Elements?

Native shadcn/ui follows the shadcn/ui philosophy - you copy the component code into your project rather than installing a package. This gives you:
- Full ownership and control over components
- Easy customization without fighting package APIs
- No package version lock-in
- Smaller bundle size (only include what you use)

### Does it really work like shadcn/ui?

Yes! The `init` command automatically:
- ✅ Configures Tailwind with CSS variables
- ✅ Sets up babel.config.js
- ✅ Updates tsconfig.json with path aliases
- ✅ Creates nativewind-env.d.ts for TypeScript support
- ✅ Imports global.css in your root component
- ✅ Creates the cn() utility function
- ✅ Adds dark mode support

Everything is configured automatically with one command.

### Can I use this with Expo?

Yes! Native shadcn/ui works perfectly with both Expo and bare React Native projects. The CLI automatically detects your setup.

### Do I need to use all components?

No! Pick and choose only the components you need. Each component is self-contained and can be added individually.

### Can I customize the styling?

Absolutely! Since the component code lives in your project, you have complete control. Modify colors, sizes, animations, or anything else to match your design system. The CSS variables in `global.css` make it easy to customize the entire theme.

### How do I enable dark mode?

Dark mode is automatically set up during `init`. Just add the `dark` className to your root View based on the color scheme:

```tsx
const colorScheme = useColorScheme();
<View className={colorScheme === 'dark' ? 'dark' : ''}>
```

All components will automatically use the dark mode colors defined in `global.css`.

### Is TypeScript required?

No! While components are written in TypeScript, the CLI automatically transforms them to JavaScript if you choose "no" during setup. The transformation:
- Removes all type annotations, interfaces, and TypeScript syntax
- Preserves JSX and all functionality
- Generates clean `.jsx` files

TypeScript is recommended for the best developer experience, but JavaScript is fully supported.

## Contributing

We welcome contributions! Here's how you can help:

1. 🐛 **Report bugs** - Open an issue with detailed reproduction steps
2. 💡 **Suggest features** - Share your ideas for new components or improvements
3. 🔧 **Submit PRs** - Fix bugs, add features, or improve documentation
4. 📖 **Improve docs** - Help make the documentation better
5. ⭐ **Star the repo** - Show your support!

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Support

- 📖 [Documentation](https://github.com/nativeshadcn/native-shadcn#readme)
- 💬 [GitHub Discussions](https://github.com/nativeshadcn/native-shadcn/discussions)
- 🐛 [Issue Tracker](https://github.com/nativeshadcn/native-shadcn/issues)

## Roadmap

- [x] Comprehensive testing suite (257 tests) ✅
- [x] Smart utils merging (preserves custom code) ✅
- [x] Environment variable support for development ✅
- [x] Complete fixture-based testing ✅
- [x] Snapshot testing for schemas and templates ✅
- [ ] More components (Date Picker, File Upload, etc.)
- [ ] Dark mode examples
- [ ] Animation presets
- [ ] Storybook integration
- [ ] VS Code snippets
- [ ] GitHub Actions CI/CD

## License

MIT © [Your Name]

See [LICENSE](LICENSE) for more information.

## Acknowledgments

Built with inspiration and gratitude:

- 🎨 [shadcn/ui](https://ui.shadcn.com/) - The original inspiration and design philosophy
- 🌊 [NativeWind](https://www.nativewind.dev/) - Making Tailwind CSS work beautifully in React Native
- ⚛️ [React Native](https://reactnative.dev/) - The foundation for cross-platform mobile development
- 🎭 [CVA](https://cva.style/) - Component variant management made simple

## Star History

If you find this project useful, please consider giving it a star ⭐

---

Made with ❤️ for the React Native community
