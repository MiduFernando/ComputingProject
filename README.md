# E-Health Management System

A comprehensive healthcare management platform built with React, TypeScript, Node.js, and Supabase.

## Features

- **User Authentication**: Secure login/registration for patients, doctors, and admins
- **Appointment Booking**: Easy scheduling with doctors and hospitals
- **AI-Powered Recommendations**: Intelligent doctor matching based on symptoms
- **QR Code Integration**: Patient records and QR code generation
- **Multi-language Support**: English, Sinhala, and Tamil
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Supabase Functions

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Supabase account

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run database migrations:
   ```bash
   cd supabase
   supabase db reset
   ```
5. Start the development servers:
   ```bash
   pnpm dev
   ```

### Available Scripts

- `pnpm dev` - Start both frontend and backend
- `pnpm dev:frontend` - Start frontend only
- `pnpm dev:backend` - Start backend only
- `pnpm build` - Build for production
- `pnpm setup` - Initial project setup

## Project Structure

```
├── backend/          # Express.js API server
├── frontend/         # React application
├── supabase/         # Database migrations and functions
├── scripts/          # Setup and utility scripts
└── utils/            # Shared utilities
```

## API Documentation

Once the backend is running, visit `http://localhost:3001/api` for API docs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.