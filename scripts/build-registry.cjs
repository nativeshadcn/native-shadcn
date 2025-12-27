const fs = require('fs');
const path = require('path');

// Paths - updated structure
const TEMPLATES_DIR = path.join(__dirname, '../src/registry');
const REGISTRY_DIR = path.join(__dirname, '../packages/cli/src/registry');
const OUTPUT_DIR = path.join(__dirname, '../public/registry');

// Read registry metadata from registry.ts
const registryPath = path.join(REGISTRY_DIR, 'registry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf-8');

// Extract all component metadata from REGISTRY object
function getAllComponents() {
  const components = {};

  // Match the entire REGISTRY object
  const registryMatch = registryContent.match(/export const REGISTRY[^=]*=\s*\{([\s\S]+)\};?\s*$/m);
  if (!registryMatch) {
    console.error('❌ Could not find REGISTRY object in registry.ts');
    return components;
  }

  const registryBody = registryMatch[1];

  // Split by component entries - look for pattern: name: { or 'name': {
  // More robust approach: split by top-level commas and parse each entry
  const lines = registryBody.split('\n');
  let currentComponent = null;
  let currentBlock = '';
  let braceDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments
    if (line.trim().startsWith('//')) continue;

    // Check if this is a new component entry
    const componentMatch = line.match(/^\s{2}(?:\/\/.*\n\s{2})?['"]?([\w-]+)['"]?\s*:\s*\{/);
    if (componentMatch && braceDepth === 0) {
      // Save previous component if exists
      if (currentComponent && currentBlock) {
        parseComponentBlock(components, currentComponent, currentBlock);
      }
      // Start new component
      currentComponent = componentMatch[1];
      currentBlock = '';
      braceDepth = 1;
      continue;
    }

    // Track brace depth
    if (currentComponent) {
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      braceDepth += openBraces - closeBraces;

      if (braceDepth > 0) {
        currentBlock += line + '\n';
      } else if (braceDepth === 0) {
        // Component block ended
        parseComponentBlock(components, currentComponent, currentBlock);
        currentComponent = null;
        currentBlock = '';
      }
    }
  }

  // Don't forget the last component
  if (currentComponent && currentBlock) {
    parseComponentBlock(components, currentComponent, currentBlock);
  }

  return components;
}

function parseComponentBlock(components, name, block) {
  const getName = () => {
    const m = block.match(/name\s*:\s*['"]([^'"]+)['"]/);
    return m ? m[1] : name;
  };

  const getType = () => {
    const m = block.match(/type\s*:\s*['"]([^'"]+)['"]/);
    return m ? m[1] : 'registry:ui';
  };

  const getDescription = () => {
    const m = block.match(/description\s*:\s*['"]([^'"]+)['"]/);
    return m ? m[1] : '';
  };

  const getArray = (field) => {
    const m = block.match(new RegExp(`${field}\\s*:\\s*\\[([^\\]]+)\\]`, 's'));
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

// Unescape template literal escape sequences
function unescapeTemplate(str) {
  return str
    .replace(/\\`/g, '`')
    .replace(/\\\$/g, '$')
    .replace(/\\\\/g, '\\');
}

// Read template content from template file
function readTemplateContent(name) {
  // Try .tsx first, then .ts
  const extensions = ['.tsx', '.ts'];
  let templatePath = null;
  let content = '';

  for (const ext of extensions) {
    const testPath = path.join(TEMPLATES_DIR, `${name}${ext}`);
    if (fs.existsSync(testPath)) {
      templatePath = testPath;
      content = fs.readFileSync(templatePath, 'utf-8');
      break;
    }
  }

  if (!templatePath) {
    console.warn(`⚠️  Template file not found: ${name}.ts or ${name}.tsx`);
    return '';
  }

  // First, try to extract old-style template string for backwards compatibility
  const singleLineMatch = content.match(/export const \w+Template = `([\s\S]*?)`;\s*$/m);
  if (singleLineMatch && singleLineMatch[1]) {
    return unescapeTemplate(singleLineMatch[1]);
  }

  const multilineMatch = content.match(/export const \w+Template = `([\s\S]*)`/);
  if (multilineMatch && multilineMatch[1]) {
    return unescapeTemplate(multilineMatch[1].replace(/`;\s*$/, ''));
  }

  // New approach: Use the entire file content as the template
  // This works for actual component files (not template strings)
  return content;
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
  console.log(`   Production: https://native-shadcn-ui.netlify.app/registry/button.json`);
}

buildRegistry();
