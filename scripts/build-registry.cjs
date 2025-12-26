const fs = require('fs');
const path = require('path');

// Paths - updated to match shadcn/ui structure
const TEMPLATES_DIR = path.join(__dirname, '../src/registry');
const REGISTRY_DIR = path.join(__dirname, '../packages/cli/src/registry');
const OUTPUT_DIR = path.join(__dirname, '../public/registry');

// Read registry metadata from schema.ts (shadcn/ui structure)
const registryPath = path.join(REGISTRY_DIR, 'schema.ts');
const registryContent = fs.readFileSync(registryPath, 'utf-8');

// Extract all component metadata from REGISTRY object
function getAllComponents() {
  const components = {};

  // Match each component block like: button: { name: 'button', ... }
  const componentRegex = /(\w+(?:-\w+)*)\s*:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs;
  const matches = [...registryContent.matchAll(componentRegex)];

  for (const match of matches) {
    const name = match[1];
    if (name === 'ComponentInfo') continue;

    const block = match[2];

    // Extract fields
    const getName = () => {
      const m = block.match(/name\s*:\s*['"]([^'"]+)['"]/);
      return m ? m[1] : name;
    };

    const getType = () => {
      const m = block.match(/type\s*:\s*['"]([^'"]+)['"]/);
      return m ? m[1] : 'ui';
    };

    const getDescription = () => {
      const m = block.match(/description\s*:\s*['"]([^'"]+)['"]/);
      return m ? m[1] : '';
    };

    const getArray = (field) => {
      const m = block.match(new RegExp(`${field}\\s*:\\s*\\[([^\\]]+)\\]`));
      if (!m) return [];
      return m[1].split(',')
        .map(s => s.trim().replace(/['"]/g, ''))
        .filter(Boolean);
    };

    components[name] = {
      name: getName(),
      type: getType(),
      description: getDescription(),
      dependencies: getArray('dependencies'),
      devDependencies: getArray('devDependencies'),
      registryDependencies: getArray('registryDependencies'),
      files: getArray('files'),
    };
  }

  return components;
}

// Read template content from template file
function readTemplateContent(name) {
  const templatePath = path.join(TEMPLATES_DIR, `${name}.ts`);

  if (!fs.existsSync(templatePath)) {
    console.warn(`⚠️  Template file not found: ${name}.ts`);
    return '';
  }

  const content = fs.readFileSync(templatePath, 'utf-8');

  // Extract template string (export const xxxTemplate = `...`;)
  const singleLineMatch = content.match(/export const \w+Template = `([\s\S]*?)`;\s*$/m);
  if (singleLineMatch && singleLineMatch[1]) {
    return singleLineMatch[1];
  }

  // Try multiline extraction
  const multilineMatch = content.match(/export const \w+Template = `([\s\S]*)`/);
  if (multilineMatch && multilineMatch[1]) {
    return multilineMatch[1].replace(/`;\s*$/, '');
  }

  console.warn(`⚠️  Could not extract template from ${name}.ts`);
  return '';
}

// Build registry
function buildRegistry() {
  console.log('🏗️  Building registry...\n');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const components = getAllComponents();
  const index = [];
  let successCount = 0;
  let failCount = 0;

  // Process each component
  for (const [name, metadata] of Object.entries(components)) {
    try {
      const templateContent = readTemplateContent(name);

      const registryItem = {
        name: metadata.name,
        type: metadata.type,
        description: metadata.description,
        dependencies: metadata.dependencies,
        devDependencies: metadata.devDependencies,
        registryDependencies: metadata.registryDependencies,
        files: [
          {
            path: metadata.files[0] || `ui/${name}.tsx`,
            content: templateContent,
            type: 'registry:ui',
          },
        ],
      };

      // Write component JSON
      const outputPath = path.join(OUTPUT_DIR, `${name}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2), 'utf-8');

      // Add to index
      index.push({
        name: metadata.name,
        type: metadata.type,
        description: metadata.description,
        dependencies: metadata.dependencies,
        devDependencies: metadata.devDependencies,
        registryDependencies: metadata.registryDependencies,
        files: metadata.files,
      });

      console.log(`✓ ${name}.json`);
      successCount++;
    } catch (error) {
      console.error(`✗ ${name}:`, error.message);
      failCount++;
    }
  }

  // Write index.json
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(index, null, 2),
    'utf-8'
  );

  console.log(`\n✓ index.json`);
  console.log(`\n✅ Registry built successfully!`);
  console.log(`   ${successCount} components`);
  if (failCount > 0) {
    console.log(`   ${failCount} failed`);
  }
  console.log(`\n📁 Output: ${OUTPUT_DIR}`);
  console.log(`\n🌐 Serve with: npm run dev`);
  console.log(`   Local: http://localhost:5173/registry/button.json`);
  console.log(`   Production: https://your-docs-site.com/registry/button.json`);
}

buildRegistry();
