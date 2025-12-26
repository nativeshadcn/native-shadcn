export type ComponentInfo = {
  name: string;
  type: 'component' | 'ui';
  description: string;
  dependencies: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};

export const REGISTRY: Record<string, ComponentInfo> = {
  // Core UI Components
  avatar: {
    name: 'avatar',
    type: 'ui',
    description: 'A user avatar with fallback support',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/avatar.tsx'],
  },
  badge: {
    name: 'badge',
    type: 'ui',
    description: 'A badge component for status and labels',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/badge.tsx'],
  },
  button: {
    name: 'button',
    type: 'ui',
    description: 'A customizable button component with variants',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/button.tsx'],
  },
  card: {
    name: 'card',
    type: 'ui',
    description: 'A flexible card container component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/card.tsx'],
  },
  input: {
    name: 'input',
    type: 'ui',
    description: 'A styled text input component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/input.tsx'],
  },
  text: {
    name: 'text',
    type: 'ui',
    description: 'Typography component with variants',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/text.tsx'],
  },

  // Form Components
  checkbox: {
    name: 'checkbox',
    type: 'ui',
    description: 'A checkbox component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/checkbox.tsx'],
  },
  switch: {
    name: 'switch',
    type: 'ui',
    description: 'A toggle switch component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/switch.tsx'],
  },
  select: {
    name: 'select',
    type: 'ui',
    description: 'A select/picker component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/select.tsx'],
  },

  // Overlay Components
  dialog: {
    name: 'dialog',
    type: 'ui',
    description: 'A modal dialog component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/dialog.tsx'],
  },
  sheet: {
    name: 'sheet',
    type: 'ui',
    description: 'A bottom sheet component',
    dependencies: ['clsx', '@gorhom/bottom-sheet'],
    registryDependencies: [],
    files: ['ui/sheet.tsx'],
  },
  popover: {
    name: 'popover',
    type: 'ui',
    description: 'A popover component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/popover.tsx'],
  },
  tooltip: {
    name: 'tooltip',
    type: 'ui',
    description: 'A tooltip component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/tooltip.tsx'],
  },

  // Navigation Components
  tabs: {
    name: 'tabs',
    type: 'ui',
    description: 'A tabs navigation component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/tabs.tsx'],
  },
  accordion: {
    name: 'accordion',
    type: 'ui',
    description: 'An expandable accordion component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/accordion.tsx'],
  },

  // Feedback Components
  alert: {
    name: 'alert',
    type: 'ui',
    description: 'Alert messages for user notifications',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/alert.tsx'],
  },
  'alert-dialog': {
    name: 'alert-dialog',
    type: 'ui',
    description: 'A modal alert dialog for confirmations',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/alert-dialog.tsx'],
  },
  toast: {
    name: 'toast',
    type: 'ui',
    description: 'Temporary notification messages',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/toast.tsx'],
  },
  progress: {
    name: 'progress',
    type: 'ui',
    description: 'Progress bar for loading states',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/progress.tsx'],
  },
  skeleton: {
    name: 'skeleton',
    type: 'ui',
    description: 'Loading placeholder skeleton',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/skeleton.tsx'],
  },

  // Layout Components
  separator: {
    name: 'separator',
    type: 'ui',
    description: 'Visual divider between content',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/separator.tsx'],
  },
  carousel: {
    name: 'carousel',
    type: 'ui',
    description: 'Flexible carousel/slider for images, cards, or custom content',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/carousel.tsx'],
  'empty-state': {
    name: 'empty-state',
    type: 'ui',
    description: 'Composable empty state for no data scenarios',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/empty-state.tsx'],
  },
  'error-state': {
    name: 'error-state',
    type: 'ui',
    description: 'Composable error state with retry functionality',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/error-state.tsx'],
  },
  'star-rating': {
    name: 'star-rating',
    type: 'ui',
    description: 'Customizable star rating display and input',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/star-rating.tsx'],
  },
  loader: {
    name: 'loader',
    type: 'ui',
    description: 'Animated loader with multiple variants (dots, spinner, pulse)',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/loader.tsx'],
  },
  'menu-item': {
    name: 'menu-item',
    type: 'ui',
    description: 'Composable menu list item for navigation',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/menu-item.tsx'],
  },
  'selection-card': {
    name: 'selection-card',
    type: 'ui',
    description: 'Composable selectable card component',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/selection-card.tsx'],
  },
  },

  // Additional Form Components
  'radio-group': {
    name: 'radio-group',
    type: 'ui',
    description: 'Radio button group for single selection',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/radio-group.tsx'],
  },
  label: {
    name: 'label',
    type: 'ui',
    description: 'Form label component',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/label.tsx'],
  },
  slider: {
    name: 'slider',
    type: 'ui',
    description: 'Slider for range selection',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/slider.tsx'],
  },
  textarea: {
    name: 'textarea',
    type: 'ui',
    description: 'Multi-line text input',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/textarea.tsx'],
  },
  toggle: {
    name: 'toggle',
    type: 'ui',
    description: 'Toggle button component',
    dependencies: ['class-variance-authority', 'clsx'],
    registryDependencies: [],
    files: ['ui/toggle.tsx'],
  },
  combobox: {
    name: 'combobox',
    type: 'ui',
    description: 'Searchable autocomplete select',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/combobox.tsx'],
  },
  command: {
    name: 'command',
    type: 'ui',
    description: 'Command palette menu',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/command.tsx'],
  },
  'dropdown-menu': {
    name: 'dropdown-menu',
    type: 'ui',
    description: 'Dropdown menu for actions',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/dropdown-menu.tsx'],
  },
  'context-menu': {
    name: 'context-menu',
    type: 'ui',
    description: 'Context menu activated by long press',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/context-menu.tsx'],
  },
  drawer: {
    name: 'drawer',
    type: 'ui',
    description: 'Side drawer for navigation',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/drawer.tsx'],
  },
  collapsible: {
    name: 'collapsible',
    type: 'ui',
    description: 'Collapsible content container',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/collapsible.tsx'],
  },
  calendar: {
    name: 'calendar',
    type: 'ui',
    description: 'Calendar date picker',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/calendar.tsx'],
  },
  'aspect-ratio': {
    name: 'aspect-ratio',
    type: 'ui',
    description: 'Maintain aspect ratio container',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/aspect-ratio.tsx'],
  },
  form: {
    name: 'form',
    type: 'ui',
    description: 'Form components with React Hook Form and validation',
    dependencies: ['clsx', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['label'],
    files: ['ui/form.tsx'],
  },
  'hover-card': {
    name: 'hover-card',
    type: 'ui',
    description: 'Press card for preview content (mobile-adapted hover card)',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/hover-card.tsx'],
  },
  sonner: {
    name: 'sonner',
    type: 'ui',
    description: 'Modern toast notification system',
    dependencies: ['clsx', 'sonner-native'],
    registryDependencies: [],
    files: ['ui/sonner.tsx'],
  },
  table: {
    name: 'table',
    type: 'ui',
    description: 'Responsive table component for displaying data',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: ['ui/table.tsx'],
  },
};

export function getComponent(name: string): ComponentInfo | undefined {
  return REGISTRY[name];
}

export function getAllComponents(): ComponentInfo[] {
  return Object.values(REGISTRY).sort((a, b) => a.name.localeCompare(b.name));
}
