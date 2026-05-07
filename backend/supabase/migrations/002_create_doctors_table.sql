-- Create doctors table
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  specialization VARCHAR(255) NOT NULL,
  hospital VARCHAR(255),
  experience INTEGER,
  qualifications TEXT,
  consultation_fee INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  languages TEXT[],
  education TEXT,
  available_days TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctors_user_id ON public.doctors(user_id);
CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON public.doctors(specialization);
CREATE INDEX IF NOT EXISTS idx_doctors_hospital ON public.doctors(hospital);

-- Enable RLS
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Allow public to read doctor profiles
CREATE POLICY "Doctors are publicly readable" ON public.doctors
  FOR SELECT USING (true);

-- Allow doctor to update own profile
CREATE POLICY "Doctors can update own profile" ON public.doctors
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Allow inserts for admin
CREATE POLICY "Anyone can create doctor profile" ON public.doctors
  FOR INSERT WITH CHECK (true);
