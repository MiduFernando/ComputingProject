import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export interface MedicalRecord {
  id: string;
  patient_id: string;
  doctor_id: string;
  record_type: string;
  description: string;
  date: string;
  attachments?: string[];
  created_at: string;
  updated_at: string;
}

export class MedicalRecordModel {
  static async create(recordData: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
    try {
      const id = uuidv4();
      const { data, error } = await supabase
        .from('medical_records')
        .insert([{ id, ...recordData, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data as MedicalRecord;
    } catch (error) {
      console.error('Error creating medical record:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<MedicalRecord | null> {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as MedicalRecord;
    } catch (error) {
      console.error('Error finding medical record:', error);
      return null;
    }
  }

  static async findByPatientId(patientId: string): Promise<MedicalRecord[]> {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', patientId)
        .order('date', { ascending: false });

      if (error) throw error;
      return (data || []) as MedicalRecord[];
    } catch (error) {
      console.error('Error finding medical records by patient:', error);
      return [];
    }
  }

  static async update(id: string, updates: Partial<MedicalRecord>): Promise<MedicalRecord | null> {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as MedicalRecord;
    } catch (error) {
      console.error('Error updating medical record:', error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('medical_records').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting medical record:', error);
      return false;
    }
  }
}
