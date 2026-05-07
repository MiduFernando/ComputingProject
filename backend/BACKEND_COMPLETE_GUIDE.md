# E-Health Backend - Complete Setup Guide

## 🚀 Backend Status: READY FOR DEPLOYMENT

The E-Health Connect backend is fully implemented and ready to be deployed. Follow the steps below to complete the setup.

---

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- Supabase account (free or paid)
- PostgreSQL database (provided by Supabase)
- Git

---

## 🔧 Setup Steps

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: `e-health-connect` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your location
5. Click "Create new project" and wait for it to initialize (5-10 minutes)

### Step 2: Get Your Supabase Credentials

1. Once the project is created, go to **Settings** → **API**
2. Copy the following credentials:
   - **Project URL** → `SUPABASE_URL`
   - **Anon Public Key** → `SUPABASE_ANON_KEY`
   - **Service Role Secret** → `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)

### Step 3: Update Environment Variables

Update the `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@ehealth.com

# App Configuration
APP_NAME=E-Health Connect
APP_URL=http://localhost:3001

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

### Step 4: Create Database Tables

In Supabase, go to **SQL Editor** and run the migration files in order:

1. [001_create_users_table.sql](supabase/migrations/001_create_users_table.sql)
2. [002_create_doctors_table.sql](supabase/migrations/002_create_doctors_table.sql)
3. [003_create_hospitals_table.sql](supabase/migrations/003_create_hospitals_table.sql)
4. [004_create_appointments_table.sql](supabase/migrations/004_create_appointments_table.sql)
5. [005_create_medical_records_table.sql](supabase/migrations/005_create_medical_records_table.sql)
6. [006_create_prescriptions_table.sql](supabase/migrations/006_create_prescriptions_table.sql)
7. [007_create_lab_reports_table.sql](supabase/migrations/007_create_lab_reports_table.sql)

**How to run a migration:**
1. Open Supabase SQL Editor
2. Copy the entire SQL from each migration file
3. Paste it into the SQL Editor
4. Click "Run"
5. Wait for completion

### Step 5: Seed Demo Data (Optional)

To populate the database with test data for development:

1. In Supabase SQL Editor, copy the contents of [008_seed_demo_data.sql](supabase/migrations/008_seed_demo_data.sql)
2. Paste it into the SQL Editor
3. Click "Run"

**Demo Data Includes:**
- 5 hospitals with different specializations
- 3 patient users (test credentials provided below)
- 4 doctor users with full details
- 1 admin user
- Sample appointments with different statuses
- Sample medical records and prescriptions
- Sample lab reports

---

## 🏃 Running the Backend

### Start Development Server

```bash
# Navigate to backend directory
cd backend/

# Install dependencies (if not already done)
npm install

# Start development server with hot reload
npm run dev
```

The server will start on **http://localhost:3001**

Health check endpoint: **http://localhost:3001/health**

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

---

## 🧪 Testing the Backend

### Using the Health Check Endpoint

```bash
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-05-01T10:30:00Z"
}
```

### Test Credentials (if demo data is seeded)

**Patient Login:**
- Email: `patient1@example.com`
- Password: `password123`

**Doctor Login:**
- Email: `doctor1@example.com`
- Password: `password123`

**Admin Login:**
- Email: `admin@example.com`
- Password: `password123`

Note: All demo accounts use the password `password123` (bcrypt hashed: `$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK`)

---

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

```bash
# Register
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "phone": "+94712345678",
  "role": "patient"
}

# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "patient1@example.com",
  "password": "password123"
}

# Logout
POST /api/auth/logout

# Refresh Token
POST /api/auth/refresh

# Forgot Password
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "patient1@example.com"
}

# Reset Password
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "newPassword": "NewPassword123"
}
```

### User Routes (`/api/user`)

```bash
# Get Profile
GET /api/user/profile
Authorization: Bearer <token>

# Update Profile
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+94712345678"
}

# Get User Appointments
GET /api/user/appointments
Authorization: Bearer <token>

# Get Medical History
GET /api/user/medical-history
Authorization: Bearer <token>
```

### Doctor Routes (`/api/doctor`)

```bash
# List All Doctors
GET /api/doctor

# Get Doctor Profile (authenticated)
GET /api/doctor/profile
Authorization: Bearer <token>

# Get Doctor Appointments
GET /api/doctor/appointments
Authorization: Bearer <token>

# Update Appointment Status (doctor)
PUT /api/doctor/appointments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "approved"
}

# Get Dashboard Stats
GET /api/doctor/stats
Authorization: Bearer <token>

# Create Medical Record
POST /api/doctor/medical-record
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient_id": "a23e4567-e89b-12d3-a456-426614174000",
  "appointment_id": "a43e4567-e89b-12d3-a456-426614174000",
  "diagnosis": "Hypertension",
  "notes": "Patient shows signs of high blood pressure"
}

# Create Prescription
POST /api/doctor/prescription
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient_id": "a23e4567-e89b-12d3-a456-426614174000",
  "medical_record_id": "m44e4567-e89b-12d3-a456-426614174000",
  "medications": [
    {
      "name": "Lisinopril",
      "dosage": "10mg",
      "frequency": "Once daily",
      "duration": "6 months"
    }
  ]
}
```

### Hospital Routes (`/api/hospital`)

```bash
# List All Hospitals
GET /api/hospital

# Get Hospital Details
GET /api/hospital/:id

# Get Doctors by Hospital
GET /api/hospital/:id/doctors

# Check Daily Availability
GET /api/hospital/:id/availability

# Create Hospital (admin)
POST /api/hospital
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Hospital",
  "location": "City Name",
  "type": "Private",
  "departments": ["Cardiology", "Orthopedics"],
  "contact": "+94112345678",
  "email": "hospital@example.com",
  "website": "www.hospital.lk",
  "beds": 200,
  "daily_limit": 150
}
```

### Appointment Routes (`/api/appointment`)

```bash
# Create Appointment
POST /api/appointment
Authorization: Bearer <token>
Content-Type: application/json

{
  "doctor_id": "d43e4567-e89b-12d3-a456-426614174000",
  "hospital_id": "223e4567-e89b-12d3-a456-426614174000",
  "appointment_date": "2026-05-20",
  "appointment_time": "10:30 AM",
  "reason": "General checkup",
  "patient_age": 35,
  "patient_gender": "Male"
}

# Get Appointment Details
GET /api/appointment/:id
Authorization: Bearer <token>

# Update Appointment
PUT /api/appointment/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "cancelled",
  "notes": "Emergency"
}

# Cancel Appointment
DELETE /api/appointment/:id
Authorization: Bearer <token>

# List All Appointments (admin)
GET /api/appointment?status=pending
Authorization: Bearer <admin_token>
```

### Admin Routes (`/api/admin`)

```bash
# Get All Users
GET /api/admin/users
Authorization: Bearer <admin_token>

# Get All Doctors
GET /api/admin/doctors
Authorization: Bearer <admin_token>

# Add Doctor
POST /api/admin/doctors
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "user_id": "d23e4567-e89b-12d3-a456-426614174000",
  "specialization": "Cardiology",
  "hospital": "Apollo Hospital",
  "experience": 15,
  "consultation_fee": 2500
}

# Update Doctor
PUT /api/admin/doctors/:id
Authorization: Bearer <admin_token>

# Delete Doctor
DELETE /api/admin/doctors/:id
Authorization: Bearer <admin_token>

# Get All Hospitals
GET /api/admin/hospitals
Authorization: Bearer <admin_token>

# Get All Appointments
GET /api/admin/appointments
Authorization: Bearer <admin_token>

# Get System Statistics
GET /api/admin/stats
Authorization: Bearer <admin_token>
```

### AI Routes (`/api/ai`)

```bash
# Get Doctor Recommendations
POST /api/ai/recommend-doctors
Content-Type: application/json

{
  "symptoms": ["chest pain", "shortness of breath"],
  "location": "Colombo",
  "maxResults": 5
}
```

### Patient History Routes (`/api/patient`)

```bash
# Get Patient Medical History (QR)
GET /api/patient/history/:userId
Authorization: Bearer <token>

# Generate Patient QR Code URL
GET /api/patient/qr/:userId
Authorization: Bearer <token>
```

---

## 🔐 Security Features

The backend includes the following security measures:

✅ **JWT Token Authentication**
- Access tokens with 7-day expiry
- Secure token generation and validation
- Token refresh endpoints

✅ **Password Security**
- bcryptjs password hashing (10 salt rounds)
- Password strength validation
- Password reset via email

✅ **Role-Based Access Control (RBAC)**
- Patient role permissions
- Doctor role permissions
- Admin role permissions
- Middleware enforcement

✅ **Input Validation**
- Email format validation
- Phone number validation
- Required field validation
- XSS and SQL injection prevention (via parameterized queries)

✅ **CORS Protection**
- Configured to accept only frontend origin
- Credentials support enabled

✅ **Helmet Security**
- HTTP header security
- XSS protection
- Clickjacking prevention

---

## 📧 Email Configuration (Optional)

To enable email notifications for password resets and appointment confirmations:

1. Set up Gmail App Password:
   - Enable 2-Factor Authentication on your Gmail account
   - Go to Google Account → Security → App passwords
   - Generate an app password for "Mail"

2. Update `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   SMTP_FROM=noreply@ehealth.com
   ```

3. Email features will be automatically enabled

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Or change PORT in .env
PORT=3002
```

### Database Connection Error

Check:
1. SUPABASE_URL is correct (includes https://)
2. SUPABASE_ANON_KEY is not empty
3. Database tables exist in Supabase
4. Network connection to Supabase

### CORS Errors

Ensure `FRONTEND_URL` in `.env` matches your frontend URL (usually `http://localhost:5173`)

### Authentication Failures

- Check JWT_SECRET is set in .env
- Verify token is included in Authorization header: `Bearer <token>`
- Ensure token is not expired

---

## 📦 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set \
  SUPABASE_URL=your_url \
  SUPABASE_ANON_KEY=your_key \
  SUPABASE_SERVICE_ROLE_KEY=your_key \
  JWT_SECRET=your_secret \
  NODE_ENV=production

# Deploy
git push heroku main
```

### Deploy to Railway

1. Connect GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Railway will auto-deploy on git push

### Deploy to AWS EC2

```bash
# SSH into EC2 instance
ssh -i key.pem ec2-user@instance-ip

# Clone repository
git clone <repo-url>

# Install Node and dependencies
node index.js &

# Use PM2 for process management
npm install -g pm2
pm2 start src/index.ts --name "e-health-api"
```

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] Database tables created from migration files
- [ ] Demo data seeded (optional)
- [ ] `.env` file updated with Supabase credentials
- [ ] Backend started successfully: `npm run dev`
- [ ] Health check endpoint responding
- [ ] Frontend can connect to backend on http://localhost:3001
- [ ] Authentication endpoints working
- [ ] User can register and login
- [ ] Appointments can be created and retrieved

---

## 📞 Support

For issues or questions regarding the backend:

1. Check the [TESTING.md](./TESTING.md) file for testing procedures
2. Review error logs in the terminal where backend is running
3. Check Supabase SQL Editor for database errors
4. Verify all environment variables are correctly set

---

## 🎉 You're All Set!

Your E-Health Connect backend is now fully configured and ready to serve the frontend application. The API is secured with JWT authentication and role-based access control, and all endpoints are documented above.

**Next Steps:**
- Start the frontend: `npm run dev` in the frontend directory
- Test API endpoints with the sample credentials provided
- Monitor the backend logs for any issues
- Deploy to production when ready

Happy coding! 🚀
