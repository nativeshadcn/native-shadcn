import { transformFromAstSync } from '@babel/core';
import { type ParserOptions, parse } from '@babel/parser';
// @ts-ignore
import transformTypescript from '@babel/plugin-transform-typescript';
import * as recast from 'recast';
import type { Config } from './config';

/**
 * Transform TypeScript/TSX to JavaScript/JSX by stripping type annotations
 * Based on shadcn/ui's approach: https://github.com/shadcn-ui/ui/blob/v3/packages/shadcn/src/utils/transformers/transform-jsx.ts
 *
 * This is a copy of the babel options from recast/parser.
 * The goal here is to tolerate as much syntax as possible.
 * We want to be able to parse any valid tsx code.
 */
const PARSE_OPTIONS: ParserOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,
  tokens: true,
  plugins: [
    'asyncGenerators',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    'classStaticBlock',
    'decimal',
    'decorators-legacy',
    'doExpressions',
    'dynamicImport',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importAssertions',
    'importMeta',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    ['pipelineOperator', { proposal: 'minimal' }],
    ['recordAndTuple', { syntaxType: 'hash' }],
    'throwExpressions',
    'topLevelAwait',
    'v8intrinsic',
    'typescript',
    'jsx',
  ],
};

export async function transformJsx(
  input: string,
  config: Config
): Promise<string> {
  // If TypeScript is enabled, return unchanged
  if (config.typescript) {
    return input;
  }

  // Handle empty input
  if (!input || input.trim() === '') {
    return input;
  }

  try {
    // Parse with recast to preserve formatting
    const ast = recast.parse(input, {
      parser: {
        parse: (code: string) => parse(code, PARSE_OPTIONS),
      },
    });

    // Transform: Strip TypeScript syntax using Babel
    const result = transformFromAstSync(ast, input, {
      cloneInputAst: false,
      code: false,
      ast: true,
      plugins: [transformTypescript],
      configFile: false,
    });

    if (!result || !result.ast) {
      return input;
    }

    // Print with recast to preserve formatting
    return recast.print(result.ast).code;
  } catch (error) {
    // Silently return original if transformation fails
    // This ensures CLI doesn't crash on edge cases
    return input;
  }
}
