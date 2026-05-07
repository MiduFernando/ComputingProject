-- Seed data for E-Health Connect Database
-- This file contains demo data for testing and development

-- Disable RLS temporarily for seeding
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_reports DISABLE ROW LEVEL SECURITY;

-- Insert sample hospitals
INSERT INTO public.hospitals (id, name, location, type, departments, contact, email, website, beds, rating, status, daily_limit) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Sri Jayewardenepura General Hospital', 'Nugegoda, Sri Lanka', 'Government', ARRAY['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'], '+94112822661', 'info@sjh.lk', 'www.sjh.lk', 500, 4.5, 'active', 150),
('223e4567-e89b-12d3-a456-426614174000', 'Apollo Hospital Sri Lanka', 'Colombo 7, Sri Lanka', 'Private', ARRAY['Cardiology', 'Oncology', 'Gastroenterology', 'Urology'], '+94112396900', 'info@apollosl.lk', 'www.apollosl.lk', 400, 4.8, 'active', 200),
('323e4567-e89b-12d3-a456-426614174000', 'Nawaloka Hospital', 'Colombo 2, Sri Lanka', 'Private', ARRAY['Cardiology', 'Orthopedics', 'Neurology', 'Emergency'], '+94112343333', 'info@nawaloka.lk', 'www.nawaloka.lk', 350, 4.6, 'active', 180),
('423e4567-e89b-12d3-a456-426614174000', 'National Hospital of Sri Lanka', 'Colombo 10, Sri Lanka', 'Government', ARRAY['General Medicine', 'Surgery', 'Pediatrics', 'Psychiatry'], '+94112692111', 'info@nationalhospital.lk', 'www.nationalhospital.lk', 800, 4.2, 'active', 250),
('523e4567-e89b-12d3-a456-426614174000', 'Durdans Hospital', 'Colombo 4, Sri Lanka', 'Private', ARRAY['Cardiology', 'Orthopedics', 'Urology', 'ENT'], '+94112386000', 'info@durdans.lk', 'www.durdans.lk', 300, 4.7, 'active', 170);

-- Insert sample patient users
INSERT INTO public.users (id, email, password_hash, name, phone, role, status) VALUES
('a23e4567-e89b-12d3-a456-426614174000', 'patient1@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Kamal Sharma', '+94712345678', 'patient', 'active'),
('b23e4567-e89b-12d3-a456-426614174000', 'patient2@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Reena Silva', '+94712345679', 'patient', 'active'),
('c23e4567-e89b-12d3-a456-426614174000', 'patient3@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Malini Perera', '+94712345680', 'patient', 'active'),
('p23e4567-e89b-12d3-a456-426614174000', 'patient@test.lk', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Test Patient', '+94771234567', 'patient', 'active');

-- Insert sample doctor users
INSERT INTO public.users (id, email, password_hash, name, phone, role, status) VALUES
('d23e4567-e89b-12d3-a456-426614174000', 'doctor1@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Dr. Amit Patel', '+94712345681', 'doctor', 'active'),
('e23e4567-e89b-12d3-a456-426614174000', 'doctor2@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Dr. Priya Desai', '+94712345682', 'doctor', 'active'),
('f23e4567-e89b-12d3-a456-426614174000', 'doctor3@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Dr. Roshan Kumar', '+94712345683', 'doctor', 'active'),
('g23e4567-e89b-12d3-a456-426614174000', 'doctor4@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Dr. Meera Nair', '+94712345684', 'doctor', 'active'),
('i23e4567-e89b-12d3-a456-426614174000', 'doctor5@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Dr. General Doctor', '+94712345685', 'doctor', 'active'),
('doctore4567-e89b-12d3-a456-426614174000', 'doctor@test.lk', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Dr. Test Doctor', '+94771234567', 'doctor', 'active');

-- Insert sample admin user
INSERT INTO public.users (id, email, password_hash, name, phone, role, status) VALUES
('h23e4567-e89b-12d3-a456-426614174000', 'admin@example.com', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Admin User', '+94712345685', 'admin', 'active'),
('admine4567-e89b-12d3-a456-426614174000', 'admin@ehealthconnect.lk', '$2b$10$YPql.8qHgAmD51KfQaxQ/uviKVkZ23AXJ8VBvU5q5pqmNt2swBqZK', 'Admin User', '+94771234567', 'admin', 'active');

-- Insert sample doctors with details
INSERT INTO public.doctors (id, user_id, specialization, hospital, experience, qualifications, consultation_fee, rating, languages, education, available_days) VALUES
('d43e4567-e89b-12d3-a456-426614174000', 'd23e4567-e89b-12d3-a456-426614174000', 'Cardiology', 'Apollo Hospital Sri Lanka', 15, 'MD in Cardiology, Board Certified', 2500, 4.8, ARRAY['English', 'Hindi', 'Tamil'], 'MBBS from University of Colombo, MD from All India Institute', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
('d44e4567-e89b-12d3-a456-426614174000', 'e23e4567-e89b-12d3-a456-426614174000', 'Orthopedics', 'Apollo Hospital Sri Lanka', 12, 'MS in Orthopedic Surgery', 2000, 4.6, ARRAY['English', 'Tamil'], 'MBBS from University of Colombo, MS from Apollo', ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday']),
('d45e4567-e89b-12d3-a456-426614174000', 'f23e4567-e89b-12d3-a456-426614174000', 'Neurology', 'National Hospital of Sri Lanka', 18, 'MD in Neurology', 2800, 4.7, ARRAY['English', 'Sinhala', 'Tamil'], 'MBBS from University of Colombo, MD from AIIMS', ARRAY['Tuesday', 'Thursday', 'Saturday']),
('d46e4567-e89b-12d3-a456-426614174000', 'g23e4567-e89b-12d3-a456-426614174000', 'Pediatrics', 'Sri Jayewardenepura General Hospital', 10, 'MD in Pediatrics', 1800, 4.9, ARRAY['English', 'Sinhala'], 'MBBS from University of Colombo, MD in Pediatrics', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
('d47e4567-e89b-12d3-a456-426614174000', 'i23e4567-e89b-12d3-a456-426614174000', 'General Practitioner', 'Nawaloka Hospital', 8, 'MBBS, General Practice', 1500, 4.5, ARRAY['English', 'Sinhala'], 'MBBS from University of Colombo', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
('d48e4567-e89b-12d3-a456-426614174000', 'doctore4567-e89b-12d3-a456-426614174000', 'General Physician', 'Nawaloka Hospital', 5, 'MBBS', 1200, 4.5, ARRAY['English', 'Sinhala'], 'MBBS from University of Colombo', ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

-- Insert sample appointments
INSERT INTO public.appointments (id, patient_id, doctor_id, hospital_id, appointment_date, appointment_time, status, patient_name, patient_email, patient_phone, patient_age, patient_gender, reason, priority, token_number, fee, type) VALUES
('a43e4567-e89b-12d3-a456-426614174000', 'a23e4567-e89b-12d3-a456-426614174000', 'd43e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174000', '2026-05-15', '10:30 AM', 'approved', 'Kamal Sharma', 'patient1@example.com', '+94712345678', 45, 'Male', 'Chest pain and hypertension check', 'normal', '001', 2500, 'Consultation'),
('a44e4567-e89b-12d3-a456-426614174000', 'b23e4567-e89b-12d3-a456-426614174000', 'd44e4567-e89b-12d3-a456-426614174000', '223e4567-e89b-12d3-a456-426614174000', '2026-05-16', '02:00 PM', 'pending', 'Reena Silva', 'patient2@example.com', '+94712345679', 38, 'Female', 'Knee pain and swelling', 'normal', '002', 2000, 'Consultation'),
('a45e4567-e89b-12d3-a456-426614174000', 'c23e4567-e89b-12d3-a456-426614174000', 'd45e4567-e89b-12d3-a456-426614174000', '423e4567-e89b-12d3-a456-426614174000', '2026-05-17', '11:00 AM', 'completed', 'Malini Perera', 'patient3@example.com', '+94712345680', 52, 'Female', 'Headaches and dizziness', 'elderly', '003', 2800, 'Consultation');

-- Insert sample medical records
INSERT INTO public.medical_records (id, patient_id, doctor_id, appointment_id, date, diagnosis, notes, hospital) VALUES
('m43e4567-e89b-12d3-a456-426614174000', 'c23e4567-e89b-12d3-a456-426614174000', 'd45e4567-e89b-12d3-a456-426614174000', 'a45e4567-e89b-12d3-a456-426614174000', '2026-05-17', 'Migraine with aura', 'Patient reports chronic headaches. Blood pressure normal. Prescribed migraine medication.', 'National Hospital of Sri Lanka'),
('m44e4567-e89b-12d3-a456-426614174000', 'a23e4567-e89b-12d3-a456-426614174000', 'd43e4567-e89b-12d3-a456-426614174000', 'a43e4567-e89b-12d3-a456-426614174000', '2026-05-15', 'Hypertension Stage 1', 'Patient reports chest discomfort. ECG performed - normal. Lifestyle modification advised.', 'Apollo Hospital Sri Lanka');

-- Insert sample prescriptions
INSERT INTO public.prescriptions (id, patient_id, doctor_id, medical_record_id, date, medications, notes) VALUES
('p43e4567-e89b-12d3-a456-426614174000', 'c23e4567-e89b-12d3-a456-426614174000', 'd45e4567-e89b-12d3-a456-426614174000', 'm43e4567-e89b-12d3-a456-426614174000', '2026-05-17', '{"medications": [{"name": "Sumatriptan", "dosage": "50mg", "frequency": "As needed", "duration": "3 months"}, {"name": "Propranolol", "dosage": "40mg", "frequency": "Twice daily", "duration": "6 months"}]}'::jsonb, 'For migraine management. Follow up after 2 weeks.'),
('p44e4567-e89b-12d3-a456-426614174000', 'a23e4567-e89b-12d3-a456-426614174000', 'd43e4567-e89b-12d3-a456-426614174000', 'm44e4567-e89b-12d3-a456-426614174000', '2026-05-15', '{"medications": [{"name": "Lisinopril", "dosage": "10mg", "frequency": "Once daily", "duration": "6 months"}, {"name": "Aspirin", "dosage": "75mg", "frequency": "Once daily", "duration": "Ongoing"}]}'::jsonb, 'For hypertension management. Monitor BP regularly. Reduce salt intake.');

-- Insert sample lab reports
INSERT INTO public.lab_reports (id, patient_id, date, test_name, result, normal_range, status) VALUES
('l43e4567-e89b-12d3-a456-426614174000', 'a23e4567-e89b-12d3-a456-426614174000', '2026-05-10', 'Blood Pressure', '140/90 mmHg', '< 120/80 mmHg', 'High'),
('l44e4567-e89b-12d3-a456-426614174000', 'a23e4567-e89b-12d3-a456-426614174000', '2026-05-10', 'Cholesterol', '220 mg/dL', '< 200 mg/dL', 'High'),
('l45e4567-e89b-12d3-a456-426614174000', 'c23e4567-e89b-12d3-a456-426614174000', '2026-05-12', 'Blood Sugar', '95 mg/dL', '70-100 mg/dL', 'Normal'),
('l46e4567-e89b-12d3-a456-426614174000', 'b23e4567-e89b-12d3-a456-426614174000', '2026-05-13', 'X-Ray Knee', 'Mild osteoarthritis', 'Normal', 'Abnormal');

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_reports ENABLE ROW LEVEL SECURITY;
