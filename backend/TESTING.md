# API Testing Guide

## Backend API Endpoints

### Test with cURL or Postman

#### 1. Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "phone": "1234567890",
    "role": "patient"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### 3. Get User Profile (requires token)
```bash
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 4. Get All Doctors
```bash
curl -X GET http://localhost:3000/api/doctor/all
```

#### 5. Get All Hospitals
```bash
curl -X GET http://localhost:3000/api/hospital/all
```

#### 6. Create Appointment (requires token)
```bash
curl -X POST http://localhost:3000/api/appointment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "doctor_id": "DOCTOR_UUID",
    "hospital_id": "HOSPITAL_UUID",
    "appointment_date": "2024-05-15",
    "appointment_time": "10:00",
    "reason": "General Checkup"
  }'
```

## Supabase Setup Instructions

1. Go to https://supabase.com
2. Create a new project
3. Get your SUPABASE_URL and SUPABASE_ANON_KEY from project settings
4. Create the database tables using the SQL provided in README.md
5. Update your .env file with the credentials

## Running the Backend

```bash
# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
pnpm dev

# Server will be available at http://localhost:3000
```

## Frontend Integration

The frontend is already set up to work with this backend. Update the API endpoint in the frontend to point to your backend server:

In frontend files, replace mock data endpoints with actual API calls to `http://localhost:3000/api`
