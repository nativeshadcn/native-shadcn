# native-shadcn-cli

CLI tool for adding beautifully designed React Native components to your project. Built with NativeWind and inspired by shadcn/ui.

## Features

- One-command setup with automatic configuration
- 46 production-ready components
- Full dark mode support with CSS variables
- TypeScript support
- Works with Expo and bare React Native projects
- Components are copied to your project - you own the code

## Quick Start

### Initialize in your project

```bash
npx native-shadcn-cli init
```

This automatically configures:
- NativeWind with Tailwind CSS
- CSS variables for theming
- Babel configuration
- Component utilities

### Add components

```bash
# Add individual components
npx native-shadcn-cli add button input card

# Add all components
npx native-shadcn-cli add --all

# List available components
npx native-shadcn-cli list
```

## Commands

### `init`

Initialize native-shadcn in your React Native project.

```bash
npx native-shadcn-cli init [options]
```

**Options:**
- `-y, --yes` - Skip confirmation prompts
- `-c, --cwd <path>` - Set the working directory

### `add`

Add components to your project.

```bash
npx native-shadcn-cli add [components...] [options]
```

**Options:**
- `-a, --all` - Add all available components
- `-o, --overwrite` - Overwrite existing files
- `-c, --cwd <path>` - Set the working directory

**Examples:**
```bash
npx native-shadcn-cli add button
npx native-shadcn-cli add button input dialog
npx native-shadcn-cli add --all
```

### `list`

List all available components.

```bash
npx native-shadcn-cli list [options]
```

**Options:**
- `-c, --cwd <path>` - Set the working directory

## Available Components

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
- Menu Item
- Popover
- Progress
- Radio Group
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

## Requirements

- Node.js 16.x or later
- React Native project (Expo or bare workflow)
- npm or yarn

## Documentation

For full documentation, visit the documentation site.

## License

MIT
