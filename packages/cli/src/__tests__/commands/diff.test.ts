import { describe, it, expect } from 'vitest';

/**
 * Generate diff output between two strings
 */
function generateDiff(
  original: string,
  modified: string,
  fileName: string = 'file'
): string[] {
  const originalLines = original.split('\n');
  const modifiedLines = modified.split('\n');
  const diff: string[] = [];

  diff.push(`--- ${fileName}`);
  diff.push(`+++ ${fileName}`);

  let i = 0;
  let j = 0;

  while (i < originalLines.length || j < modifiedLines.length) {
    if (i >= originalLines.length) {
      diff.push(`+ ${modifiedLines[j]}`);
      j++;
    } else if (j >= modifiedLines.length) {
      diff.push(`- ${originalLines[i]}`);
      i++;
    } else if (originalLines[i] === modifiedLines[j]) {
      diff.push(`  ${originalLines[i]}`);
      i++;
      j++;
    } else {
      diff.push(`- ${originalLines[i]}`);
      diff.push(`+ ${modifiedLines[j]}`);
      i++;
      j++;
    }
  }

  return diff;
}

/**
 * Format file change summary
 */
function formatChangeSummary(
  added: number,
  modified: number,
  deleted: number
): string {
  const parts: string[] = [];

  if (added > 0) {
    parts.push(`${added} added`);
  }
  if (modified > 0) {
    parts.push(`${modified} modified`);
  }
  if (deleted > 0) {
    parts.push(`${deleted} deleted`);
  }

  return parts.join(', ');
}

describe('diff', () => {
  describe('generateDiff', () => {
    it('should generate diff for identical content', () => {
      const original = 'line 1\nline 2\nline 3';
      const modified = 'line 1\nline 2\nline 3';
      const result = generateDiff(original, modified, 'test.txt');
      expect(result).toMatchSnapshot();
    });

    it('should generate diff for added lines', () => {
      const original = 'line 1\nline 2';
      const modified = 'line 1\nline 2\nline 3';
      const result = generateDiff(original, modified, 'test.txt');
      expect(result).toMatchSnapshot();
    });

    it('should generate diff for deleted lines', () => {
      const original = 'line 1\nline 2\nline 3';
      const modified = 'line 1\nline 2';
      const result = generateDiff(original, modified, 'test.txt');
      expect(result).toMatchSnapshot();
    });

    it('should generate diff for modified lines', () => {
      const original = 'line 1\nline 2\nline 3';
      const modified = 'line 1\nmodified line 2\nline 3';
      const result = generateDiff(original, modified, 'test.txt');
      expect(result).toMatchSnapshot();
    });

    it('should generate diff for component changes', () => {
      const original = `export const Button = () => {
  return <Pressable />;
};`;
      const modified = `export const Button = ({ className }) => {
  return <Pressable className={className} />;
};`;
      const result = generateDiff(original, modified, 'button.tsx');
      expect(result).toMatchSnapshot();
    });

    it('should generate diff for import changes', () => {
      const original = `import React from 'react';
import { View } from 'react-native';`;
      const modified = `import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '@/lib/utils';`;
      const result = generateDiff(original, modified, 'component.tsx');
      expect(result).toMatchSnapshot();
    });
  });

  describe('formatChangeSummary', () => {
    it('should format single addition', () => {
      const result = formatChangeSummary(1, 0, 0);
      expect(result).toMatchSnapshot();
    });

    it('should format single modification', () => {
      const result = formatChangeSummary(0, 1, 0);
      expect(result).toMatchSnapshot();
    });

    it('should format single deletion', () => {
      const result = formatChangeSummary(0, 0, 1);
      expect(result).toMatchSnapshot();
    });

    it('should format multiple changes', () => {
      const result = formatChangeSummary(3, 2, 1);
      expect(result).toMatchSnapshot();
    });

    it('should format additions and modifications', () => {
      const result = formatChangeSummary(5, 3, 0);
      expect(result).toMatchSnapshot();
    });

    it('should format all zero changes', () => {
      const result = formatChangeSummary(0, 0, 0);
      expect(result).toMatchSnapshot();
    });
  });

  describe('diff snapshots', () => {
    it('should match complete component update diff', () => {
      const original = `import * as React from 'react';
import { Pressable } from 'react-native';

export const Button = ({ children }) => {
  return <Pressable>{children}</Pressable>;
};`;

      const modified = `import * as React from 'react';
import { Pressable } from 'react-native';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {}

export const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <Pressable ref={ref} className={cn('button', className)} {...props}>
      {children}
    </Pressable>
  );
});
Button.displayName = 'Button';`;

      const result = generateDiff(original, modified, 'ui/button.tsx');
      expect(result).toMatchSnapshot();
    });

    it('should match config file diff', () => {
      const original = `{
  "style": "nativewind",
  "typescript": true
}`;

      const modified = `{
  "style": "nativewind",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "global.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`;

      const result = generateDiff(original, modified, 'components.json');
      expect(result).toMatchSnapshot();
    });
  });
});
