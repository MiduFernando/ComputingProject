-- Create hospitals table
CREATE TABLE IF NOT EXISTS public.hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  departments TEXT[],
  contact VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  beds INTEGER,
  rating DECIMAL(2,1) DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  daily_limit INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hospitals_name ON public.hospitals(name);
CREATE INDEX IF NOT EXISTS idx_hospitals_location ON public.hospitals(location);
CREATE INDEX IF NOT EXISTS idx_hospitals_status ON public.hospitals(status);

-- Enable RLS
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

-- Allow public to read hospitals
CREATE POLICY "Hospitals are publicly readable" ON public.hospitals
  FOR SELECT USING (true);

-- Allow inserts for admin
CREATE POLICY "Anyone can create hospital" ON public.hospitals
  FOR INSERT WITH CHECK (true);

-- Allow updates
CREATE POLICY "Hospital data can be updated" ON public.hospitals
  FOR UPDATE USING (true);
