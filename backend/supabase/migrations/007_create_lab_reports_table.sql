-- Create lab_reports table
CREATE TABLE IF NOT EXISTS public.lab_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  test_name VARCHAR(255),
  result TEXT,
  normal_range VARCHAR(255),
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_lab_reports_patient_id ON public.lab_reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_lab_reports_date ON public.lab_reports(date);

-- Enable RLS
ALTER TABLE public.lab_reports ENABLE ROW LEVEL SECURITY;

-- Allow patients to read their own lab reports
CREATE POLICY "Patients can read own lab reports" ON public.lab_reports
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Allow inserts
CREATE POLICY "Lab reports can be created" ON public.lab_reports
  FOR INSERT WITH CHECK (true);

-- Allow updates
CREATE POLICY "Lab reports can be updated" ON public.lab_reports
  FOR UPDATE USING (true);
