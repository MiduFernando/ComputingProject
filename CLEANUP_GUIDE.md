# Cleanup And Installation Guide

## Cleaned Up Files (Deleted)

✅ **Removed:**
- `/node_modules` - Root dependencies (~500MB+)
- `/backend/node_modules` - Backend dependencies
- `/frontend/node_modules` - Frontend dependencies  
- `/dist` - Build outputs
- `/backend/dist` - Backend build
- `/frontend/dist` - Frontend build
- `pnpm-lock.yaml` - Lock file

**Space Saved: ~1.5GB+**

## Restoration Steps

### 1. Install All Dependencies
```bash
# Install all workspace dependencies (root, backend, frontend)
pnpm install
```

### 2. Development

**Option A: Run Everything**
```bash
pnpm dev
```
This runs both frontend and backend development servers.

**Option B: Run Individually**
```bash
# Frontend only (port 5173)
pnpm dev --filter frontend

# Backend only (port 3000)  
pnpm dev --filter backend
```

### 3. Build

```bash
# Build everything
pnpm build

# Build specific package
pnpm build --filter frontend
pnpm build --filter backend
```

## Cleanup Scripts (For Future Use)

### Option 1: Bash Script
```bash
bash scripts/cleanup.sh
```

### Option 2: Node.js Script
```bash
node scripts/cleanup.js
```

### Option 3: Manual Cleanup
```bash
rm -rf node_modules backend/node_modules frontend/node_modules
rm -rf dist backend/dist frontend/dist
rm -f pnpm-lock.yaml
```

Then restore with:
```bash
pnpm install
```

## Project Structure

```
Final Year Project Computing/
├── backend/              # Express backend
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # React frontend  
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── supabase/            # Database migrations
├── utils/               # Shared utilities
├── scripts/             # Cleanup and utility scripts
│   ├── cleanup.sh
│   └── cleanup.js
├── package.json         # Root workspace config
└── pnpm-workspace.yaml  # pnpm workspaces config
```

## Quick Start

1. **Clone & Navigate**
   ```bash
   cd "Final Year Project Computing"
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

4. **Start Development**
   ```bash
   pnpm dev
   ```

5. **Build for Production**
   ```bash
   pnpm build
   ```

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start both dev servers |
| `pnpm build` | Build all packages for production |
| `pnpm lint` | Run linters |
| `pnpm test` | Run tests |
| `node scripts/cleanup.js` | Clean up node_modules and lock files |

## Notes

- ✅ Project structure is intact, only node_modules removed
- ✅ All source code is preserved
- ✅ Configuration files are in place
- ✅ Ready to install and run with `pnpm install && pnpm dev`
- ✅ Cleanup scripts added for future maintenance
