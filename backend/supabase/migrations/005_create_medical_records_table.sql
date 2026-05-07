-- Create medical_records table
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  diagnosis TEXT,
  notes TEXT,
  hospital VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_medical_records_patient_id ON public.medical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_doctor_id ON public.medical_records(doctor_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_appointment_id ON public.medical_records(appointment_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_date ON public.medical_records(date);

-- Enable RLS
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- Allow patients to read their own records
CREATE POLICY "Patients can read own medical records" ON public.medical_records
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Allow doctors to read records of their patients
CREATE POLICY "Doctors can read patient records" ON public.medical_records
  FOR SELECT USING (auth.uid()::text = doctor_id::text OR auth.uid()::text = patient_id::text);

-- Allow inserts
CREATE POLICY "Medical records can be created" ON public.medical_records
  FOR INSERT WITH CHECK (true);

-- Allow updates
CREATE POLICY "Medical records can be updated" ON public.medical_records
  FOR UPDATE USING (true);
