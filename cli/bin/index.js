#!/usr/bin/env node

import kleur from 'kleur';
import prompts from 'prompts';
import degit from 'degit';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { templates, getTemplateByValue } from '../lib/templates.js';
import { validateProjectName } from '../lib/validation.js';

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

// Run a shell command with output
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command} ${args.join(' ')}" exited with code ${code}`));
      }
    });

    proc.on('error', (err) => {
      reject(err);
    });
  });
}

// Update package.json with project name
function updatePackageJson(targetDir, projectName) {
  const packageJsonPath = path.join(targetDir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('package.json not found in cloned template');
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

// Create .env file from .env.example
function createEnvFile(targetDir) {
  const envExamplePath = path.join(targetDir, '.env.example');
  const envPath = path.join(targetDir, '.env');

  if (!fs.existsSync(envExamplePath)) {
    return false; // No .env.example to copy
  }

  if (fs.existsSync(envPath)) {
    return false; // .env already exists, don't overwrite
  }

  fs.copyFileSync(envExamplePath, envPath);
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

  const selectedTemplate = getTemplateByValue(templateResponse.template);

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

    // Step 4: Update package.json name
    console.log(kleur.blue('  ◐ ') + kleur.gray('Updating package.json...'));
    try {
      updatePackageJson(targetDir, projectName);
      console.log(kleur.green('  ✓ ') + kleur.gray('Package.json updated'));
    } catch (err) {
      console.log(kleur.yellow('  ! ') + kleur.gray(`Could not update package.json: ${err.message}`));
    }

    // Step 5: Create .env from .env.example
    console.log(kleur.blue('  ◐ ') + kleur.gray('Creating .env file...'));
    const envCreated = createEnvFile(targetDir);
    if (envCreated) {
      console.log(kleur.green('  ✓ ') + kleur.gray('.env file created from .env.example'));
    } else {
      console.log(kleur.yellow('  ! ') + kleur.gray('.env file already exists or .env.example not found'));
    }

    // Step 6: Install dependencies
    console.log(kleur.blue('  ◐ ') + kleur.gray('Installing dependencies...'));
    console.log();
    try {
      await runCommand('pnpm', ['install'], targetDir);
      console.log();
      console.log(kleur.green('  ✓ ') + kleur.gray('Dependencies installed'));
    } catch (err) {
      console.log();
      console.log(kleur.yellow('  ! ') + kleur.gray('Could not install dependencies automatically'));
      console.log(kleur.gray(`    Error: ${err.message}`));
      console.log(kleur.gray('    You can install them manually with: pnpm install'));
    }

    console.log();

    // Success message with next steps
    console.log(kleur.bold().green('  ╭─────────────────────────────────────────╮'));
    console.log(kleur.bold().green('  │') + kleur.bold().white('           Project Created!             ') + kleur.bold().green('│'));
    console.log(kleur.bold().green('  ╰─────────────────────────────────────────╯'));
    console.log();
    console.log(`  Created ${kleur.cyan(projectName)} using ${kleur.cyan(selectedTemplate.title)} template`);
    console.log();
    console.log(kleur.bold('  Next steps:'));
    console.log();
    console.log(`  ${kleur.cyan('1.')} ${kleur.white('cd')} ${kleur.cyan(projectName)}`);
    console.log();
    console.log(`  ${kleur.cyan('2.')} ${kleur.white('Configure your database')}`);
    console.log(kleur.gray(`     Edit .env and set your DATABASE_URL`));
    console.log(kleur.gray(`     Example: postgres://user:password@localhost:5432/mydb`));
    console.log();
    console.log(`  ${kleur.cyan('3.')} ${kleur.white('Seed demo content')} ${kleur.gray('(optional)')}`);
    console.log(`     ${kleur.cyan('pnpm seed')}`);
    console.log();
    console.log(`  ${kleur.cyan('4.')} ${kleur.white('Start development server')}`);
    console.log(`     ${kleur.cyan('pnpm dev')}`);
    console.log();
    console.log(kleur.gray('  The admin panel will be available at http://localhost:3000/admin'));
    console.log();
  } catch (error) {
    console.log(kleur.red('  ✗ ') + kleur.gray('Failed to clone template'));
    console.log();
    console.log(kleur.red(`  Error: ${error.message}`));
    console.log();
    console.log(kleur.gray('  Troubleshooting:'));
    console.log(kleur.gray('  - Check your internet connection'));
    console.log(kleur.gray('  - Ensure you have write permissions in the current directory'));
    console.log(kleur.gray('  - Try running the command again'));
    console.log();
    process.exit(1);
  }
}

main().catch(error => {
  console.error(kleur.red('  Error:'), error.message);
  process.exit(1);
});
