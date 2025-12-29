import type { RegistryItem } from './schema';

/**
 * Component registry
 *
 * This file defines all components available in the registry with their metadata.
 * The build script uses this to generate the public registry files.
 */

export const REGISTRY: Record<string, Omit<RegistryItem, 'files'> & { files: string[] }> = {
  // Utils - Core utility functions
  utils: {
    name: 'utils',
    type: 'registry:lib',
    description: 'Utility functions for className merging',
    dependencies: ['clsx', 'tailwind-merge'],
    devDependencies: [],
    registryDependencies: [],
    files: ['lib/utils.ts'],
  },

  // UI Components
  avatar: {
    name: 'avatar',
    type: 'registry:ui',
    description: 'A user avatar with fallback support',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/avatar.tsx'],
  },

  button: {
    name: 'button',
    type: 'registry:ui',
    description: 'A customizable button component with multiple variants',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/button.tsx'],
  },

  card: {
    name: 'card',
    type: 'registry:ui',
    description: 'A flexible card component for displaying content',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/card.tsx'],
  },

  input: {
    name: 'input',
    type: 'registry:ui',
    description: 'A text input component with validation support',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/input.tsx'],
  },

  label: {
    name: 'label',
    type: 'registry:ui',
    description: 'A label component for form inputs',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/label.tsx'],
  },

  text: {
    name: 'text',
    type: 'registry:ui',
    description: 'A customizable text component with typography variants',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/text.tsx'],
  },

  badge: {
    name: 'badge',
    type: 'registry:ui',
    description: 'A badge component for displaying status or labels',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/badge.tsx'],
  },

  separator: {
    name: 'separator',
    type: 'registry:ui',
    description: 'A visual separator component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/separator.tsx'],
  },

  skeleton: {
    name: 'skeleton',
    type: 'registry:ui',
    description: 'A skeleton loading component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/skeleton.tsx'],
  },

  switch: {
    name: 'switch',
    type: 'registry:ui',
    description: 'A toggle switch component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/switch.tsx'],
  },

  checkbox: {
    name: 'checkbox',
    type: 'registry:ui',
    description: 'A checkbox component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/checkbox.tsx'],
  },

  slider: {
    name: 'slider',
    type: 'registry:ui',
    description: 'A slider component for selecting values',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/slider.tsx'],
  },

  progress: {
    name: 'progress',
    type: 'registry:ui',
    description: 'A progress indicator component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/progress.tsx'],
  },

  textarea: {
    name: 'textarea',
    type: 'registry:ui',
    description: 'A multi-line text input component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/textarea.tsx'],
  },

  alert: {
    name: 'alert',
    type: 'registry:ui',
    description: 'An alert component for displaying important messages',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/alert.tsx'],
  },

  dialog: {
    name: 'dialog',
    type: 'registry:ui',
    description: 'A modal dialog component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/dialog.tsx'],
  },

  sheet: {
    name: 'sheet',
    type: 'registry:ui',
    description: 'A sheet/drawer component that slides in from the edge',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/sheet.tsx'],
  },

  tabs: {
    name: 'tabs',
    type: 'registry:ui',
    description: 'A tabs component for organizing content',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/tabs.tsx'],
  },

  tooltip: {
    name: 'tooltip',
    type: 'registry:ui',
    description: 'A tooltip component for displaying contextual information',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/tooltip.tsx'],
  },

  popover: {
    name: 'popover',
    type: 'registry:ui',
    description: 'A popover component for displaying floating content',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/popover.tsx'],
  },

  select: {
    name: 'select',
    type: 'registry:ui',
    description: 'A select dropdown component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/select.tsx'],
  },

  'radio-group': {
    name: 'radio-group',
    type: 'registry:ui',
    description: 'A radio button group component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/radio-group.tsx'],
  },

  toggle: {
    name: 'toggle',
    type: 'registry:ui',
    description: 'A toggle button component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/toggle.tsx'],
  },

  accordion: {
    name: 'accordion',
    type: 'registry:ui',
    description: 'An accordion component for collapsible content',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/accordion.tsx'],
  },

  collapsible: {
    name: 'collapsible',
    type: 'registry:ui',
    description: 'A collapsible component for hiding/showing content',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/collapsible.tsx'],
  },

  table: {
    name: 'table',
    type: 'registry:ui',
    description: 'A table component for displaying tabular data',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/table.tsx'],
  },

  'context-menu': {
    name: 'context-menu',
    type: 'registry:ui',
    description: 'A context menu component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/context-menu.tsx'],
  },

  'dropdown-menu': {
    name: 'dropdown-menu',
    type: 'registry:ui',
    description: 'A dropdown menu component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/dropdown-menu.tsx'],
  },

  'hover-card': {
    name: 'hover-card',
    type: 'registry:ui',
    description: 'A card that appears on hover',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/hover-card.tsx'],
  },

  'alert-dialog': {
    name: 'alert-dialog',
    type: 'registry:ui',
    description: 'An alert dialog for important confirmations',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/alert-dialog.tsx'],
  },

  calendar: {
    name: 'calendar',
    type: 'registry:ui',
    description: 'A calendar component for date selection',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils', 'button'],
    files: ['ui/calendar.tsx'],
  },

  command: {
    name: 'command',
    type: 'registry:ui',
    description: 'A command palette component',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils', 'dialog'],
    files: ['ui/command.tsx'],
  },

  combobox: {
    name: 'combobox',
    type: 'registry:ui',
    description: 'A combobox component with autocomplete',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils', 'button', 'popover', 'command'],
    files: ['ui/combobox.tsx'],
  },

  form: {
    name: 'form',
    type: 'registry:ui',
    description: 'Form components with validation',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils', 'label'],
    files: ['ui/form.tsx'],
  },

  toast: {
    name: 'toast',
    type: 'registry:ui',
    description: 'A toast notification component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/toast.tsx'],
  },

  sonner: {
    name: 'sonner',
    type: 'registry:ui',
    description: 'An opinionated toast component built with Sonner',
    dependencies: ['sonner'],
    devDependencies: [],
    registryDependencies: [],
    files: ['ui/sonner.tsx'],
  },

  carousel: {
    name: 'carousel',
    type: 'registry:ui',
    description: 'A carousel component for sliding content',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils', 'button'],
    files: ['ui/carousel.tsx'],
  },

  drawer: {
    name: 'drawer',
    type: 'registry:ui',
    description: 'A drawer component that slides in from the bottom',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/drawer.tsx'],
  },

  'aspect-ratio': {
    name: 'aspect-ratio',
    type: 'registry:ui',
    description: 'A component for maintaining aspect ratios',
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/aspect-ratio.tsx'],
  },

  loader: {
    name: 'loader',
    type: 'registry:ui',
    description: 'A loading spinner component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/loader.tsx'],
  },

  'star-rating': {
    name: 'star-rating',
    type: 'registry:ui',
    description: 'A star rating component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/star-rating.tsx'],
  },

  'empty-state': {
    name: 'empty-state',
    type: 'registry:ui',
    description: 'An empty state component for no data scenarios',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/empty-state.tsx'],
  },

  'error-state': {
    name: 'error-state',
    type: 'registry:ui',
    description: 'An error state component for error scenarios',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/error-state.tsx'],
  },

  'selection-card': {
    name: 'selection-card',
    type: 'registry:ui',
    description: 'A selectable card component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/selection-card.tsx'],
  },

  'menu-item': {
    name: 'menu-item',
    type: 'registry:ui',
    description: 'A menu item component',
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/menu-item.tsx'],
  },

  'map-view': {
    name: 'map-view',
    type: 'registry:ui',
    description: 'A map view component for React Native',
    dependencies: ['react-native-maps'],
    devDependencies: [],
    registryDependencies: ['utils'],
    files: ['ui/map-view.tsx'],
  },

  'searchable-map': {
    name: 'searchable-map',
    type: 'registry:ui',
    description: 'A searchable map component',
    dependencies: ['react-native-maps'],
    devDependencies: [],
    registryDependencies: ['utils', 'map-view', 'input'],
    files: ['ui/searchable-map.tsx'],
  },
};
