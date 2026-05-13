#!/usr/bin/env node

/**
 * Cleanup Script for e-Health Connect Project
 * 
 * This script removes:
 * - All node_modules directories
 * - Lock files (pnpm-lock.yaml, package-lock.json, yarn.lock)
 * - Build outputs (dist, .next, .vite)
 * 
 * Usage: node scripts/cleanup.js
 * 
 * To restore: pnpm install
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function deleteRecursively(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
  } catch (error) {
    log(`Warning: Could not delete ${dirPath}`, 'yellow');
  }
}

function main() {
  const projectRoot = path.resolve(__dirname, '..');
  
  log('\n🧹 Starting cleanup process...\n', 'yellow');
  
  // Directories to remove
  const dirsToRemove = [
    path.join(projectRoot, 'node_modules'),
    path.join(projectRoot, 'backend', 'node_modules'),
    path.join(projectRoot, 'frontend', 'node_modules'),
    path.join(projectRoot, 'dist'),
    path.join(projectRoot, 'backend', 'dist'),
    path.join(projectRoot, 'frontend', 'dist'),
    path.join(projectRoot, '.next'),
    path.join(projectRoot, '.vite'),
  ];
  
  // Files to remove
  const filesToRemove = [
    path.join(projectRoot, 'pnpm-lock.yaml'),
    path.join(projectRoot, 'package-lock.json'),
    path.join(projectRoot, 'yarn.lock'),
  ];
  
  // Remove directories
  log('Removing node_modules and build directories...', 'yellow');
  dirsToRemove.forEach(dir => {
    if (fs.existsSync(dir)) {
      log(`  Removing ${path.relative(projectRoot, dir)}`);
      deleteRecursively(dir);
    }
  });
  
  // Remove files
  log('\nRemoving lock files...', 'yellow');
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      log(`  Removing ${path.relative(projectRoot, file)}`);
      try {
        fs.unlinkSync(file);
      } catch (error) {
        log(`Warning: Could not delete ${file}`, 'yellow');
      }
    }
  });
  
  log('\n✅ Cleanup complete!', 'green');
  log('\nTo restore dependencies, run:', 'yellow');
  log('  pnpm install\n', 'green');
}

main();
