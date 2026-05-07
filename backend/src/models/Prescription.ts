import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export interface Prescription {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_id: string;
  medications: string[];
  dosage: string[];
  frequency: string[];
  duration: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export class PrescriptionModel {
  static async create(prescriptionData: Partial<Prescription>): Promise<Prescription | null> {
    try {
      const id = uuidv4();
      const { data, error } = await supabase
        .from('prescriptions')
        .insert([{ id, ...prescriptionData, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data as Prescription;
    } catch (error) {
      console.error('Error creating prescription:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<Prescription | null> {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as Prescription;
    } catch (error) {
      console.error('Error finding prescription:', error);
      return null;
    }
  }

  static async findByPatientId(patientId: string): Promise<Prescription[]> {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as Prescription[];
    } catch (error) {
      console.error('Error finding prescriptions by patient:', error);
      return [];
    }
  }

  static async findByDoctorId(doctorId: string): Promise<Prescription[]> {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('doctor_id', doctorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as Prescription[];
    } catch (error) {
      console.error('Error finding prescriptions by doctor:', error);
      return [];
    }
  }

  static async update(id: string, updates: Partial<Prescription>): Promise<Prescription | null> {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Prescription;
    } catch (error) {
      console.error('Error updating prescription:', error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('prescriptions').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting prescription:', error);
      return false;
    }
  }
}
