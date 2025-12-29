# Contributing to Native ShadCN

Thank you for your interest in contributing to Native ShadCN! This document provides guidelines and information for contributors.

## Philosophy

Native ShadCN follows the same philosophy as shadcn/ui:

- **Copy, not install**: Components are copied into your project, giving you full control
- **Customizable**: Every component can be modified to fit your needs
- **Accessible**: Components follow React Native accessibility best practices
- **Beautiful**: Clean, modern design that works out of the box

## Project Structure

\`\`\`
native-shadcn/
├── src/                      # Documentation website source
│   ├── pages/                # Documentation pages
│   └── components/           # Website components
├── packages/
│   └── cli/                  # CLI package
│       ├── src/
│       │   ├── commands/     # CLI commands (init, add, list)
│       │   ├── templates/    # Component templates (one file per component)
│       │   └── utils/        # Utilities (config, registry, logger)
│       └── package.json
├── index.html                # Website entry point
├── vite.config.ts            # Website build config
├── package.json              # Website dependencies
├── README.md
├── CONTRIBUTING.md
└── LICENSE
\`\`\`

## Adding a New Component

### 1. Create the Component Template

Create a new file in `packages/cli/src/templates/<component-name>.ts`:

\`\`\`typescript
export const <componentName>Template = \`
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

// Your component code here
\`;
\`\`\`

**Important guidelines:**
- Use `React.forwardRef` for all components
- Include proper TypeScript types
- Use the `cn` utility for className merging
- Follow NativeWind conventions
- Include displayName for better debugging
- Use `* as React` import style
- Export all subcomponents

### 2. Register the Component

1. Add to `packages/cli/src/templates/index.ts`:

\`\`\`typescript
import { componentNameTemplate } from './<component-name>';

export const templates: Record<string, string> = {
  // ... other templates
  '<component-name>': componentNameTemplate,
};
\`\`\`

2. Add to `packages/cli/src/utils/registry.ts`:

\`\`\`typescript
export const REGISTRY: Record<string, ComponentInfo> = {
  '<component-name>': {
    name: '<component-name>',
    type: 'ui',
    description: 'Brief description',
    dependencies: ['clsx'], // NPM dependencies
    registryDependencies: [], // Other components it depends on
    files: ['ui/<component-name>.tsx'],
    category: 'core', // core | forms | overlays | navigation | layout | feedback
  },
};
\`\`\`

### 3. Component Guidelines

#### Styling
- Use NativeWind classes (e.g., `className="bg-primary text-white"`)
- Use the `cn()` utility for conditional classes
- Follow the existing color system from `tailwind.config.js`

#### Variants
For components with variants, use `class-variance-authority`:

\`\`\`typescript
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      secondary: 'secondary-classes',
    },
    size: {
      default: 'size-default',
      sm: 'size-sm',
      lg: 'size-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
\`\`\`

#### Accessibility
- Use appropriate React Native accessibility props
- Include `accessibilityLabel` where needed
- Support keyboard navigation when applicable
- Test with screen readers

#### Props
- Extend React Native component props when possible
- Use TypeScript for all prop definitions
- Include JSDoc comments for complex props

### 4. Testing

Before submitting:
1. Test the component in a real React Native/Expo app
2. Test on both iOS and Android
3. Verify TypeScript types work correctly
4. Check accessibility with screen reader
5. Test all variants and props

## Development Setup

### Prerequisites
- Node.js 16+
- npm or pnpm

### Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/nativeshadcn/native-shadcn
cd native-shadcn

# Install dependencies
npm install

# Build the CLI
cd packages/cli
npm run build

# Link for local development
npm link
\`\`\`

### Testing Locally

\`\`\`bash
# In your test React Native/Expo project
native-shadcn init
native-shadcn add <your-component>
\`\`\`

## Code Style

- Use TypeScript
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and single-purpose

## Git Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

### Commit Message Format

```
category(scope or module): message
```

### Categories

- `feat` / `feature` — New features or functionality
- `fix` — Bug fixes (reference related issues when possible)
- `refactor` — Code changes that neither fix bugs nor add features
- `docs` — Documentation changes
- `build` — Changes to build system or dependencies
- `test` — Adding or modifying tests
- `ci` — CI/CD configuration changes
- `chore` — Other changes that don't modify src or test files

### Examples

```bash
feat(components): add Slider component
fix(button): resolve press state on Android
docs(readme): update installation instructions
refactor(utils): simplify cn function logic
```

### Scope

The scope should be the name of the affected component or module:
- `components` - for new components
- `cli` - for CLI changes
- `button`, `card`, `input` - specific component names
- `utils` - utility functions
- `docs` - documentation

## Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-component`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit using conventional format**: `git commit -m "feat(components): add Slider component"`
6. **Push to your fork**: `git push origin feature/new-component`
7. **Open a Pull Request**

### PR Guidelines

- **Title**: Use conventional commits format (`feat:`, `fix:`, `docs:`, etc.)
- **Description**: Explain what and why, not just how
- **Screenshots**: Include screenshots for UI components
- **Testing**: Describe how you tested the changes
- **Breaking changes**: Clearly mark any breaking changes
- **Check existing PRs**: Make sure someone isn't already working on the same thing

## Component Design Principles

### 1. Composability
Components should be composable and work well together:

\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Action</Button>
  </CardContent>
</Card>
\`\`\`

### 2. Flexibility
Allow customization through props and className:

\`\`\`tsx
<Button variant="destructive" size="lg" className="custom-class">
  Delete
</Button>
\`\`\`

### 3. Sensible Defaults
Work great out of the box, but allow customization:

\`\`\`tsx
// Works with defaults
<Button>Click me</Button>

// Can be customized
<Button variant="outline" size="sm">Small</Button>
\`\`\`

## React Native Considerations

### Platform Differences
- Test on both iOS and Android
- Handle platform-specific behaviors
- Use Platform-specific styling when needed

### Performance
- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Optimize FlatList usage

### Gestures
- Use react-native-gesture-handler for complex gestures
- Provide haptic feedback where appropriate
- Handle touch states properly

## Getting Help

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community (link TBD)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- The README.md contributors section
- Release notes for significant contributions
- The project's documentation

Thank you for contributing to Native ShadCN!
