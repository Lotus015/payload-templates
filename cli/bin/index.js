#!/usr/bin/env node

import kleur from 'kleur';
import prompts from 'prompts';
import degit from 'degit';
import fs from 'fs';
import path from 'path';

// Template definitions with colors and use cases
const templates = [
  {
    value: 'premium',
    title: 'Premium',
    description: 'Navy + Gold - Elegant, high-end law firms',
    colors: '#1a1f36 + #d4af37'
  },
  {
    value: 'traditional',
    title: 'Traditional',
    description: 'Burgundy + Gold - Classic, established practices',
    colors: '#800020 + #d4af37'
  },
  {
    value: 'modern',
    title: 'Modern',
    description: 'Blue + White - Clean, contemporary firms',
    colors: '#4a90e2 + #ffffff'
  },
  {
    value: 'boutique',
    title: 'Boutique',
    description: 'Green + Beige - Specialized, personal practices',
    colors: '#2c5f2d + #e8dcc4'
  }
];

// Help text
const helpText = `
${kleur.bold().blue('Payload Templates')} - Create law firm websites

${kleur.bold('USAGE')}
  npx payload-templates [project-name]

${kleur.bold('OPTIONS')}
  --help, -h    Show this help message

${kleur.bold('TEMPLATES')}
${templates.map(t => `  ${kleur.cyan(t.title.padEnd(12))} ${t.description}`).join('\n')}

${kleur.bold('EXAMPLES')}
  npx payload-templates
  npx payload-templates my-law-firm

${kleur.bold('LEARN MORE')}
  https://github.com/Lotus015/payload-templates
`;

// Display welcome banner
function showWelcome() {
  console.log();
  console.log(kleur.bold().blue('  ╭─────────────────────────────────────────╮'));
  console.log(kleur.bold().blue('  │                                         │'));
  console.log(kleur.bold().blue('  │') + kleur.bold().white('       Payload Templates CLI            ') + kleur.bold().blue('│'));
  console.log(kleur.bold().blue('  │                                         │'));
  console.log(kleur.bold().blue('  ╰─────────────────────────────────────────╯'));
  console.log();
  console.log(kleur.gray('  Create a law firm website with Next.js, Payload CMS, and shadcn/ui'));
  console.log();
}

// Validate project name
function validateProjectName(name) {
  if (!name || name.trim().length === 0) {
    return 'Project name is required';
  }
  if (name.includes(' ')) {
    return 'Project name cannot contain spaces';
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    return 'Project name can only contain letters, numbers, hyphens, and underscores';
  }
  const targetDir = path.resolve(process.cwd(), name);
  if (fs.existsSync(targetDir)) {
    return `Directory "${name}" already exists`;
  }
  return true;
}

// Main CLI function
async function main() {
  // Check for help flag
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(helpText);
    process.exit(0);
  }

  // Show welcome banner
  showWelcome();

  // Handle cancellation
  const onCancel = () => {
    console.log();
    console.log(kleur.yellow('  Cancelled'));
    console.log();
    process.exit(0);
  };

  // Step 1: Template selection
  const templateResponse = await prompts({
    type: 'select',
    name: 'template',
    message: 'Select a template',
    choices: templates.map(t => ({
      title: `${kleur.bold(t.title)} ${kleur.gray(`(${t.colors})`)}`,
      description: t.description,
      value: t.value
    })),
    initial: 0
  }, { onCancel });

  if (!templateResponse.template) {
    return;
  }

  const selectedTemplate = templates.find(t => t.value === templateResponse.template);

  // Step 2: Project name
  let initialProjectName = args[0] || '';

  const nameResponse = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name',
    initial: initialProjectName,
    validate: validateProjectName
  }, { onCancel });

  if (!nameResponse.projectName) {
    return;
  }

  const projectName = nameResponse.projectName;
  const targetDir = path.resolve(process.cwd(), projectName);

  // Step 3: Clone template
  console.log();
  console.log(kleur.blue('  ◐ ') + kleur.gray(`Cloning ${selectedTemplate.title} template...`));

  const emitter = degit(`Lotus015/payload-templates/templates/${templateResponse.template}`, {
    cache: false,
    force: true,
    verbose: false
  });

  // Progress events
  emitter.on('info', info => {
    if (info.code === 'DEST_NOT_EMPTY') {
      console.log(kleur.yellow('  ! ') + kleur.gray('Destination not empty'));
    }
  });

  try {
    await emitter.clone(targetDir);
    console.log(kleur.green('  ✓ ') + kleur.gray('Template cloned successfully'));
    console.log();

    // Success message with next steps
    console.log(kleur.bold().green('  Success! ') + `Created ${kleur.cyan(projectName)}`);
    console.log();
    console.log(kleur.gray('  Next steps:'));
    console.log();
    console.log(`    ${kleur.cyan('cd')} ${projectName}`);
    console.log(`    ${kleur.cyan('pnpm install')}`);
    console.log(`    ${kleur.gray('# Set up your DATABASE_URL in .env')}`);
    console.log(`    ${kleur.cyan('pnpm seed')}    ${kleur.gray('# Optional: seed demo content')}`);
    console.log(`    ${kleur.cyan('pnpm dev')}`);
    console.log();
  } catch (error) {
    console.log(kleur.red('  ✗ ') + kleur.gray('Failed to clone template'));
    console.log();
    console.log(kleur.red(`  Error: ${error.message}`));
    console.log();
    process.exit(1);
  }
}

main().catch(error => {
  console.error(kleur.red('  Error:'), error.message);
  process.exit(1);
});
