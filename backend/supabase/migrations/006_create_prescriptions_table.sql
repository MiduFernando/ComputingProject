-- Create prescriptions table
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
  medical_record_id UUID REFERENCES public.medical_records(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  medications JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON public.prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_date ON public.prescriptions(date);

-- Enable RLS
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Allow patients to read their own prescriptions
CREATE POLICY "Patients can read own prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Allow doctors to read prescriptions they created
CREATE POLICY "Doctors can read prescriptions" ON public.prescriptions
  FOR SELECT USING (auth.uid()::text = doctor_id::text OR auth.uid()::text = patient_id::text);

-- Allow inserts
CREATE POLICY "Prescriptions can be created" ON public.prescriptions
  FOR INSERT WITH CHECK (true);

-- Allow updates
CREATE POLICY "Prescriptions can be updated" ON public.prescriptions
  FOR UPDATE USING (true);
