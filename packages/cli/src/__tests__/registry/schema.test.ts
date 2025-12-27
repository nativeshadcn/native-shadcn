import { describe, it, expect } from 'vitest';
import { registryItemSchema, registryIndexItemSchema, registryIndexSchema } from '../../registry/schema';

describe('schema validation', () => {
  describe('registryIndexItemSchema', () => {
    it('should validate valid index item with string files', () => {
      const validItem = {
        name: 'button',
        type: 'registry:ui',
        description: 'A button component',
        dependencies: ['class-variance-authority'],
        files: ['ui/button.tsx'], // Strings in index
      };

      const result = registryIndexItemSchema.safeParse(validItem);
      expect(result.success).toBe(true);
    });

    it('should validate minimal index item', () => {
      const minimalItem = {
        name: 'separator',
        type: 'registry:ui',
        files: ['ui/separator.tsx'],
      };

      const result = registryIndexItemSchema.safeParse(minimalItem);
      expect(result.success).toBe(true);
    });

    it('should reject invalid type', () => {
      const invalidItem = {
        name: 'button',
        type: 'invalid-type',
        files: ['ui/button.tsx'],
      };

      const result = registryIndexItemSchema.safeParse(invalidItem);
      expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
      const invalidItem = {
        name: 'button',
        // missing type
        files: ['ui/button.tsx'],
      };

      const result = registryIndexItemSchema.safeParse(invalidItem);
      expect(result.success).toBe(false);
    });
  });

  describe('registryItemSchema', () => {
    it('should validate valid component with file objects', () => {
      const validComponent = {
        name: 'button',
        type: 'registry:ui',
        description: 'A button component',
        dependencies: ['class-variance-authority'],
        files: [
          {
            path: 'ui/button.tsx',
            content: 'export const Button = () => <View />',
            type: 'registry:ui',
            target: '',
          },
        ],
      };

      const result = registryItemSchema.safeParse(validComponent);
      expect(result.success).toBe(true);
    });

    it('should validate component with registry dependencies', () => {
      const component = {
        name: 'dialog',
        type: 'registry:ui',
        files: [
          {
            path: 'ui/dialog.tsx',
            content: 'export const Dialog = () => <View />',
            type: 'registry:ui',
          },
        ],
        registryDependencies: ['button', 'utils'],
      };

      const result = registryItemSchema.safeParse(component);
      expect(result.success).toBe(true);
    });

    it('should validate lib type component', () => {
      const libComponent = {
        name: 'utils',
        type: 'registry:lib',
        files: [
          {
            path: 'lib/utils.ts',
            content: 'export function cn() {}',
            type: 'registry:lib',
          },
        ],
      };

      const result = registryItemSchema.safeParse(libComponent);
      expect(result.success).toBe(true);
    });

    it('should accept empty dependencies array', () => {
      const component = {
        name: 'separator',
        type: 'registry:ui',
        files: [
          {
            path: 'ui/separator.tsx',
            content: 'export const Separator = () => <View />',
            type: 'registry:ui',
          },
        ],
        dependencies: [],
        registryDependencies: [],
      };

      const result = registryItemSchema.safeParse(component);
      expect(result.success).toBe(true);
    });
  });

  describe('registryIndexSchema', () => {
    it('should validate array of index items', () => {
      const index = [
        {
          name: 'button',
          type: 'registry:ui',
          files: ['ui/button.tsx'],
          dependencies: ['class-variance-authority'],
        },
        {
          name: 'card',
          type: 'registry:ui',
          files: ['ui/card.tsx'],
        },
        {
          name: 'utils',
          type: 'registry:lib',
          files: ['lib/utils.ts'],
        },
      ];

      const result = registryIndexSchema.safeParse(index);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(3);
      }
    });

    it('should reject invalid items in array', () => {
      const invalidIndex = [
        {
          name: 'button',
          type: 'registry:ui',
          files: ['ui/button.tsx'],
        },
        {
          name: 'invalid',
          // missing type
          files: ['ui/invalid.tsx'],
        },
      ];

      const result = registryIndexSchema.safeParse(invalidIndex);
      expect(result.success).toBe(false);
    });

    it('should accept empty array', () => {
      const emptyIndex: any[] = [];

      const result = registryIndexSchema.safeParse(emptyIndex);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(0);
      }
    });
  });

  describe('schema snapshots', () => {
    it('should match registry index item schema snapshot', () => {
      const validIndexItem = {
        name: 'button',
        type: 'registry:ui',
        description: 'A button component',
        files: ['ui/button.tsx'],
        dependencies: ['class-variance-authority'],
        registryDependencies: ['utils'],
      };

      const result = registryIndexItemSchema.safeParse(validIndexItem);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toMatchSnapshot();
      }
    });

    it('should match registry item schema snapshot', () => {
      const validComponent = {
        name: 'button',
        type: 'registry:ui',
        description: 'A button component',
        files: [
          {
            path: 'ui/button.tsx',
            content: 'export const Button = () => <View />',
            type: 'registry:ui',
            target: '',
          },
        ],
        dependencies: ['class-variance-authority'],
        registryDependencies: ['utils'],
      };

      const result = registryItemSchema.safeParse(validComponent);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toMatchSnapshot();
      }
    });

    it('should match lib component schema snapshot', () => {
      const libComponent = {
        name: 'utils',
        type: 'registry:lib',
        description: 'Utility functions',
        files: [
          {
            path: 'lib/utils.ts',
            content: 'export function cn() {}',
            type: 'registry:lib',
          },
        ],
        dependencies: ['clsx', 'tailwind-merge'],
      };

      const result = registryItemSchema.safeParse(libComponent);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toMatchSnapshot();
      }
    });

    it('should match minimal component schema snapshot', () => {
      const minimalComponent = {
        name: 'separator',
        type: 'registry:ui',
        files: [
          {
            path: 'ui/separator.tsx',
            content: 'export const Separator = () => <View />',
            type: 'registry:ui',
          },
        ],
      };

      const result = registryItemSchema.safeParse(minimalComponent);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data).toMatchSnapshot();
      }
    });
  });
});
