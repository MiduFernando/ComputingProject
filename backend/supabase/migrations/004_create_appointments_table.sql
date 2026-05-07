-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  patient_name VARCHAR(255),
  patient_email VARCHAR(255),
  patient_phone VARCHAR(20),
  patient_age INTEGER,
  patient_gender VARCHAR(10),
  reason TEXT,
  notes TEXT,
  priority VARCHAR(20) DEFAULT 'normal',
  token_number VARCHAR(20),
  fee INTEGER,
  type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_hospital_id ON public.appointments(hospital_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow patients to read their own appointments
CREATE POLICY "Patients can read own appointments" ON public.appointments
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Allow doctors to read their appointments
CREATE POLICY "Doctors can read their appointments" ON public.appointments
  FOR SELECT USING (auth.uid()::text = doctor_id::text OR auth.uid()::text = patient_id::text);

-- Allow inserts for authenticated users
CREATE POLICY "Authenticated users can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Allow updates
CREATE POLICY "Appointments can be updated" ON public.appointments
  FOR UPDATE USING (true);

-- Allow deletes
CREATE POLICY "Appointments can be cancelled" ON public.appointments
  FOR DELETE USING (true);
