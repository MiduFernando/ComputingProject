import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = path.resolve(__dirname, '..');
const files = [
  { example: path.join(projectRoot, '.env.example'), target: path.join(projectRoot, '.env') },
  { example: path.join(projectRoot, 'backend', '.env.example'), target: path.join(projectRoot, 'backend', '.env') },
  { example: path.join(projectRoot, 'frontend', '.env.example'), target: path.join(projectRoot, 'frontend', '.env') },
];

function copyIfMissing(examplePath, targetPath) {
  if (!fs.existsSync(examplePath)) {
    console.warn(`⚠️ Missing example file: ${examplePath}`);
    return false;
  }

  if (fs.existsSync(targetPath)) {
    console.log(`✅ Already exists: ${path.relative(projectRoot, targetPath)}`);
    return true;
  }

  fs.copyFileSync(examplePath, targetPath);
  console.log(`✅ Created: ${path.relative(projectRoot, targetPath)}`);
  return true;
}

function runCommand(command, cwd = projectRoot) {
  console.log(`\n⏳ Running: ${command}`);
  execSync(command, { stdio: 'inherit', cwd });
}

function main() {
  console.log('🛠️  Project setup starting...');

  files.forEach(({ example, target }) => copyIfMissing(example, target));

  console.log('\n📦 Installing dependencies for the workspace...');
  runCommand('pnpm install');

  console.log('\n✅ Setup complete. Next step: pnpm dev');
}

main();
