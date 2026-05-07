import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export interface Hospital {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  website?: string;
  image_url?: string;
  specialties: string[];
  rating: number;
  created_at: string;
  updated_at: string;
}

export class HospitalModel {
  static async create(hospitalData: Partial<Hospital>): Promise<Hospital | null> {
    try {
      const id = uuidv4();
      const { data, error } = await supabase
        .from('hospitals')
        .insert([{ id, ...hospitalData, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data as Hospital;
    } catch (error) {
      console.error('Error creating hospital:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<Hospital | null> {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as Hospital;
    } catch (error) {
      console.error('Error finding hospital:', error);
      return null;
    }
  }

  static async update(id: string, updates: Partial<Hospital>): Promise<Hospital | null> {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Hospital;
    } catch (error) {
      console.error('Error updating hospital:', error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('hospitals').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting hospital:', error);
      return false;
    }
  }

  static async findAll(): Promise<Hospital[]> {
    try {
      const { data, error } = await supabase.from('hospitals').select('*');
      if (error) throw error;
      return (data || []) as Hospital[];
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      return [];
    }
  }
}
