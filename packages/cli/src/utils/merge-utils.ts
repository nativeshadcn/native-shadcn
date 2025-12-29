import fs from "fs/promises";
import path from "path";

/**
 * Check if lib/utils file has the cn function
 */
export async function hasCnFunction(filePath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // Check if cn function exists (either export function cn or export const cn)
    return (
      content.includes("export function cn") ||
      content.includes("export const cn")
    );
  } catch {
    return false;
  }
}

/**
 * Merge cn function into existing utils file
 */
export async function mergeUtilsFile(
  filePath: string,
  cnFunctionContent: string
): Promise<void> {
  try {
    // Check if file exists
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      // File doesn't exist, create it with full content
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, cnFunctionContent);
      return;
    }

    // File exists, check if cn function is already there
    const hasCn = await hasCnFunction(filePath);

    if (hasCn) {
      // cn function already exists, skip
      return;
    }

    // Read existing content
    let existingContent = await fs.readFile(filePath, "utf-8");

    // Extract imports from cn function content
    const cnImports: string[] = [];
    const cnImportRegex = /import\s+.*\s+from\s+['"][^'"]+['"]/g;
    let match;
    while ((match = cnImportRegex.exec(cnFunctionContent)) !== null) {
      cnImports.push(match[0]);
    }

    // Extract the cn function itself (without imports)
    const cnFunctionOnly = cnFunctionContent
      .replace(/import\s+.*\s+from\s+['"][^'"]+['"];?\n*/g, "")
      .trim();

    // Merge imports
    for (const importStatement of cnImports) {
      if (!existingContent.includes(importStatement)) {
        // Add import at the top
        existingContent = importStatement + "\n" + existingContent;
      }
    }

    // Add cn function at the end
    existingContent = existingContent.trimEnd() + "\n\n" + cnFunctionOnly + "\n";

    // Write merged content
    await fs.writeFile(filePath, existingContent);
  } catch (error) {
    throw new Error(
      `Failed to merge utils file: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Get the cn function template
 */
export function getCnFunctionTemplate(typescript: boolean): string {
  if (typescript) {
    return `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
  } else {
    return `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
`;
  }
}
