import prompts from "prompts";
import execa = require("execa");
import ora from "ora";
import path from "path";
import fs from "fs/promises";
import { logger } from "../utils/logger";
import { getConfig } from "../utils/config";
import {
  getComponent,
  getAllComponents,
  fetchTemplateWithRetry,
  resolveTree,
  getRegistryIndex,
} from "../registry";
import { mergeUtilsFile, hasCnFunction, getCnFunctionTemplate } from "../utils/merge-utils";

interface AddOptions {
  all?: boolean;
  overwrite?: boolean;
  cwd: string;
}

export async function add(components: string[], options: AddOptions) {
  const cwd = path.resolve(options.cwd);

  // Check if project is initialized
  const config = await getConfig(cwd);
  if (!config) {
    logger.error(
      'Project not initialized. Run "npx native-shadcn init" first.'
    );
    process.exit(1);
  }

  let selectedComponents: string[] = [];

  if (options.all) {
    // Fetch all components from registry
    const allComponents = await getAllComponents();
    selectedComponents = allComponents.map((c) => c.name);
  } else if (components.length === 0) {
    // Interactive mode
    const allComponents = await getAllComponents();
    const choices = allComponents.map((c) => ({
      title: c.name,
      value: c.name,
      description: c.description,
    }));

    const { selected } = await prompts({
      type: "multiselect",
      name: "selected",
      message: "Select components to add:",
      choices,
      hint: "Space to select. Return to submit",
    });

    if (!selected || selected.length === 0) {
      logger.info("No components selected.");
      process.exit(0);
    }

    selectedComponents = selected;
  } else {
    selectedComponents = components;
  }

  // Validate components
  const invalidComponents: string[] = [];
  for (const name of selectedComponents) {
    const component = await getComponent(name);
    if (!component) {
      invalidComponents.push(name);
    }
  }
  if (invalidComponents.length > 0) {
    logger.error("Invalid components: " + invalidComponents.join(", "));
    logger.info(
      'Run "npx native-shadcn list" to see all available components.'
    );
    process.exit(1);
  }

  let spinner = ora("Adding components...").start();

  try {
    // Fetch registry index once
    spinner.text = "Fetching registry index...";
    const startIndex = Date.now();
    const index = await getRegistryIndex();
    const indexTime = Date.now() - startIndex;

    // Resolve component tree from index (faster in-memory search)
    spinner.text = "Resolving component dependencies...";
    const startResolve = Date.now();
    const tree = await resolveTree(index, selectedComponents);
    const resolveTime = Date.now() - startResolve;

    // spinner.succeed(
    //   `Registry: ${indexTime}ms | Resolve: ${resolveTime}ms | Components: ${tree.length}`
    // );
    spinner.stop();

    // Collect all npm dependencies from the resolved tree
    const allDependencies = new Set<string>();
    const allDevDependencies = new Set<string>();

    for (const item of tree) {
      item.dependencies?.forEach((dep) => allDependencies.add(dep));
      item.devDependencies?.forEach((dep) => allDevDependencies.add(dep));
    }

    // Update selectedComponents to include all resolved items
    selectedComponents = tree.map((item) => item.name);

    // Install dependencies
    if (allDependencies.size > 0) {
      spinner = ora("Installing dependencies").start();
      await execa("npm", ["install", ...Array.from(allDependencies)], { cwd });
    }

    if (allDevDependencies.size > 0) {
      spinner.text = "Installing dev dependencies";
      await execa("npm", ["install", "-D", ...Array.from(allDevDependencies)], {
        cwd,
      });
    }

    // Add components
    spinner.text = "Creating component files...";
    const componentsDir = path.join(cwd, "components", "ui");
    await fs.mkdir(componentsDir, { recursive: true });

    for (const name of selectedComponents) {
      const component = await getComponent(name);

      if (!component) {
        logger.warn(`Component "${name}" not found, skipping...`);
        continue;
      }

      // Fetch template from remote registry
      spinner.text = `Fetching ${name} from registry...`;
      const template = await fetchTemplateWithRetry(name);

      if (!template && name !== "utils") {
        logger.warn("No template found for " + name + ", skipping...");
        continue;
      }

      if (!component.files || component.files.length === 0) {
        logger.warn(`No files defined for ${name}, skipping...`);
        continue;
      }

      spinner.text = `Installing ${name}...`;

      for (const file of component.files) {
        // Determine base directory: lib files go to root, UI files go to components
        const isLibFile = file.path.startsWith('lib/') || component.type === 'registry:lib';
        const baseDir = isLibFile ? cwd : path.join(cwd, "components");

        // Use file.path from registry schema
        const filePath = path.join(baseDir, file.path);
        const fileExists = await fs
          .access(filePath)
          .then(() => true)
          .catch(() => false);

        // Special handling for lib/utils - check if cn function exists
        if (name === 'utils' && file.path.includes('utils')) {
          const hasCn = fileExists && await hasCnFunction(filePath);

          if (hasCn) {
            // cn function already exists, skip this file
            continue;
          }

          if (fileExists && !hasCn) {
            // File exists but no cn function, merge it
            spinner.text = "Merging cn function into existing utils file...";
            const cnTemplate = getCnFunctionTemplate(config.typescript);
            await mergeUtilsFile(filePath, cnTemplate);
            continue;
          }
        }

        if (fileExists && !options.overwrite) {
          spinner.stop();
          const { overwrite } = await prompts({
            type: "confirm",
            name: "overwrite",
            message: file.path + " already exists. Overwrite?",
            initial: false,
          });
          spinner.start();

          if (!overwrite) {
            continue;
          }
        }

        // Use file.content from registry (already fetched with the component)
        let content = file.content || template;

        // Use the template content
        if (!content && name !== "utils") {
          logger.warn("No template content for " + name + ", skipping...");
          continue;
        }

        // Transform TypeScript to JavaScript if needed
        const { transformJsx } = await import('../utils/transform-jsx');
        content = await transformJsx(content || "", config);

        // Adjust file extension based on TypeScript config
        const fileName = config.typescript
          ? file.path
          : file.path.replace(/\.tsx?$/, ".jsx");

        const fullPath = path.join(baseDir, fileName);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, content || "");
      }
    }

    spinner.succeed("Done.");
  } catch (error) {
    spinner.fail("Failed to add components");
    logger.error(error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  }
}
