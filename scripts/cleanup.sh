#!/bin/bash

# Script to clean up node_modules and lock files
# This helps save disk space while keeping the project intact
# Run: pnpm install to restore dependencies

echo "🧹 Starting cleanup process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Find and remove all node_modules directories
echo -e "${YELLOW}Finding and removing node_modules directories...${NC}"
find "$PROJECT_ROOT" -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null || true

# Remove pnpm lock file if exists
if [ -f "$PROJECT_ROOT/pnpm-lock.yaml" ]; then
    echo -e "${YELLOW}Removing pnpm-lock.yaml...${NC}"
    rm -f "$PROJECT_ROOT/pnpm-lock.yaml"
fi

# Remove other lock files if they exist
[ -f "$PROJECT_ROOT/package-lock.json" ] && rm -f "$PROJECT_ROOT/package-lock.json"
[ -f "$PROJECT_ROOT/yarn.lock" ] && rm -f "$PROJECT_ROOT/yarn.lock"

# Remove dist folders
echo -e "${YELLOW}Removing dist directories...${NC}"
find "$PROJECT_ROOT" -type d -name "dist" -exec rm -rf {} + 2>/dev/null || true

# Remove .next folders
find "$PROJECT_ROOT" -type d -name ".next" -exec rm -rf {} + 2>/dev/null || true

# Remove .vite folders
find "$PROJECT_ROOT" -type d -name ".vite" -exec rm -rf {} + 2>/dev/null || true

echo -e "${GREEN}✅ Cleanup complete!${NC}"
echo -e "${YELLOW}To restore dependencies, run:${NC}"
echo -e "${GREEN}pnpm install${NC}"
