# Project Structure and Setup Guide

## Directory Structure

### Root Level
- **backend/** - Express.js server and database logic
- **frontend/** - React application with UI components
- **supabase/** - Supabase configuration and migrations
- **utils/** - Shared utility functions
- **guidelines/** - Project guidelines and documentation
- **logs/** - Application logs directory

### Backend Structure
```
backend/
├── src/
│   ├── index.ts           # Main server file
│   ├── config/            # Configuration files
│   │   ├── database.ts    # Database setup
│   │   └── env.ts         # Environment variables
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript type definitions
├── supabase/
│   └── migrations/       # Database migrations
└── package.json
```

### Frontend Structure
```
frontend/
├── app/
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   │   ├── ui/         # shadcn/ui components
│   │   └── figma/      # Figma-based components
│   ├── context/        # React context providers
│   └── routes.tsx      # Route configuration
├── assets/             # Static files (images, etc.)
├── styles/             # CSS stylesheets
├── main.tsx           # Entry point
└── public/            # Public static files
```

## Environment Variables

See `.env.example` and `frontend/.env.example` for all required variables.

### Key Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `OPENAI_API_KEY` - OpenAI API key for AI recommendations

## Getting Started

1. Install dependencies: `pnpm install`
2. Configure environment variables
3. Run migrations: `pnpm run migrate` (in backend)
4. Start development: `pnpm dev`

## Available Scripts

- `pnpm install` - Install all dependencies
- `pnpm dev` - Start development servers
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm lint` - Run linters
- `pnpm format` - Format code

## File Creation Checklist

- [x] .env files (frontend and root)
- [x] .env.example files
- [x] public/ directory
- [x] logs/ directory
- [x] README.md
- [x] .editorconfig
- [x] STRUCTURE.md (this file)
