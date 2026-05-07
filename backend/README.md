# E-Health Backend API

Complete backend API for the E-Health Connect platform.

## Setup

### 1. Install Dependencies
\`\`\`bash
cd backend
pnpm install
\`\`\`

### 2. Configure Environment Variables
\`\`\`bash
cp .env.example .env
\`\`\`

Update the `.env` file with your Supabase credentials:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- JWT_SECRET

### 3. Create Database Tables

Log in to your Supabase dashboard and create these tables:

#### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Doctors Table
\`\`\`sql
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(255) NOT NULL,
  hospital VARCHAR(255) NOT NULL,
  experience INTEGER,
  qualifications TEXT,
  consultation_fee INTEGER,
  rating DECIMAL(2,1) DEFAULT 0,
  languages TEXT[],
  education TEXT,
  available_days TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Hospitals Table
\`\`\`sql
CREATE TABLE hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  image_url TEXT,
  specialties TEXT[],
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Appointments Table
\`\`\`sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES users(id),
  doctor_id UUID REFERENCES doctors(id),
  hospital_id UUID REFERENCES hospitals(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Medical Records Table
\`\`\`sql
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES users(id),
  doctor_id UUID REFERENCES doctors(id),
  record_type VARCHAR(255),
  description TEXT,
  date DATE,
  attachments TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### Prescriptions Table
\`\`\`sql
CREATE TABLE prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID REFERENCES doctors(id),
  patient_id UUID REFERENCES users(id),
  appointment_id UUID REFERENCES appointments(id),
  medications TEXT[],
  dosage TEXT[],
  frequency TEXT[],
  duration VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 4. Start the Server

Development:
\`\`\`bash
pnpm dev
\`\`\`

Production:
\`\`\`bash
pnpm build
pnpm start
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`POST /api/auth/logout\` - Logout user
- \`POST /api/auth/refresh\` - Refresh token
- \`POST /api/auth/forgot-password\` - Request password reset
- \`POST /api/auth/reset-password\` - Reset password

### Users
- \`GET /api/user/profile\` - Get user profile
- \`PUT /api/user/profile\` - Update user profile
- \`GET /api/user/appointments\` - Get user appointments
- \`GET /api/user/medical-history\` - Get medical history

### Doctors
- \`GET /api/doctor/all\` - List all doctors
- \`GET /api/doctor/specialization/:spec\` - Find doctors by specialization
- \`GET /api/doctor/profile\` - Get doctor profile
- \`GET /api/doctor/appointments\` - Get doctor appointments
- \`PUT /api/doctor/appointments/:appointmentId\` - Update appointment status

### Hospitals
- \`GET /api/hospital/all\` - List all hospitals
- \`GET /api/hospital/:id\` - Get hospital details
- \`POST /api/hospital\` - Create hospital (admin)
- \`PUT /api/hospital/:id\` - Update hospital (admin)
- \`DELETE /api/hospital/:id\` - Delete hospital (admin)

### Appointments
- \`POST /api/appointment\` - Create appointment
- \`GET /api/appointment/:id\` - Get appointment
- \`PUT /api/appointment/:id\` - Update appointment
- \`DELETE /api/appointment/:id\` - Delete appointment
- \`GET /api/appointment\` - List all appointments (admin)

### Admin
- \`GET /api/admin/users\` - List all users
- \`POST /api/admin/doctors\` - Add new doctor
- \`PUT /api/admin/doctors/:doctorId\` - Update doctor
- \`DELETE /api/admin/doctors/:doctorId\` - Delete doctor
- \`GET /api/admin/stats\` - Get system statistics

### AI
- \`POST /api/ai/recommend-doctor\` - Get doctor recommendations
- \`POST /api/ai/analyze-symptoms\` - Analyze symptoms

## Environment Variables

\`\`\`
PORT=3000
NODE_ENV=development
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
\`\`\`

## Status

✅ Backend API fully implemented
✅ Database models created
✅ All routes implemented
✅ Authentication system ready
✅ Admin endpoints ready

### Next Steps:
- [ ] Connect to Supabase database
- [ ] Deploy to production
- [ ] Set up email notifications
- [ ] Implement advanced AI recommendations
