import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export interface Doctor {
  id: string;
  user_id: string;
  specialization: string;
  hospital: string;
  experience: number;
  qualifications: string;
  consultation_fee: number;
  rating: number;
  languages: string[];
  education: string;
  available_days: string[];
  created_at: string;
  updated_at: string;
}

export class DoctorModel {
  static async create(doctorData: Partial<Doctor>): Promise<Doctor | null> {
    try {
      const id = uuidv4();
      const { data, error } = await supabase
        .from('doctors')
        .insert([{ id, ...doctorData, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data as Doctor;
    } catch (error) {
      console.error('Error creating doctor:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<Doctor | null> {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as Doctor;
    } catch (error) {
      console.error('Error finding doctor:', error);
      return null;
    }
  }

  static async findByUserId(userId: string): Promise<Doctor | null> {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) return null;
      return data as Doctor;
    } catch (error) {
      console.error('Error finding doctor by user id:', error);
      return null;
    }
  }

  static async update(id: string, updates: Partial<Doctor>): Promise<Doctor | null> {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Doctor;
    } catch (error) {
      console.error('Error updating doctor:', error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('doctors').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting doctor:', error);
      return false;
    }
  }

  static async findAll(): Promise<Doctor[]> {
    try {
      const { data, error } = await supabase.from('doctors').select('*');
      if (error) throw error;
      return (data || []) as Doctor[];
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  }

  static async findBySpecialization(specialization: string): Promise<Doctor[]> {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .ilike('specialization', `%${specialization}%`);

      if (error) throw error;
      return (data || []) as Doctor[];
    } catch (error) {
      console.error('Error finding doctors by specialization:', error);
      return [];
    }
  }
}
