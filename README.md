# e-Health Connect

A comprehensive healthcare management system with AI-powered doctor recommendations and QR code-based patient record access.

## Project Structure

```
├── backend/                 # Express.js backend server
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Configuration files
│   ├── supabase/           # Database migrations
│   └── package.json
├── frontend/               # React + TypeScript frontend
│   ├── app/               # React application
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   └── routes.tsx     # Route definitions
│   ├── assets/            # Static assets
│   ├── styles/            # Stylesheets
│   └── main.tsx
├── supabase/              # Supabase configuration
│   └── functions/         # Serverless functions
├── utils/                 # Shared utilities
└── guidelines/            # Project guidelines
```

## Installation

### Prerequisites
- Node.js (v16+)
- pnpm
- Supabase account
- OpenAI API key (for AI recommendations)

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd "Final Year Project Computing"
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
```bash
# Copy example files
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Edit .env files with your configuration
```

4. Run migrations (if needed)
```bash
cd backend
pnpm run migrate
```

5. Start development servers
```bash
# Root directory - runs both frontend and backend
pnpm dev

# Or individually:
# Backend only
pnpm dev --filter backend

# Frontend only
pnpm dev --filter frontend
```

## Features

- 🏥 Hospital and doctor management
- 👨‍⚕️ Appointment booking system
- 🤖 AI-powered doctor recommendations
- 🔐 QR code-based patient records
- 📱 Multi-language support (English, Sinhala, Tamil)
- 💳 Secure payment processing
- 📊 Real-time queue tracking
- 👥 Role-based access control (Admin, Doctor, Patient)

## Technologies Used

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- Vite

### Backend
- Node.js
- Express.js
- TypeScript
- Supabase
- PostgreSQL

### Additional Services
- OpenAI API (for AI recommendations)
- Stripe/Payment Gateway

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
```

### Linting and Formatting
```bash
pnpm lint
pnpm format
```

## API Documentation

API endpoints are documented in the backend routes files. Key endpoints include:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/doctors` - List all doctors
- `GET /api/hospitals` - List all hospitals
- `POST /api/appointments` - Book appointment
- `GET /api/recommendations` - Get AI recommendations

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a pull request

## License

This project is part of a final year computing project.
