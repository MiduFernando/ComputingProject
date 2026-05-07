import { supabase, supabaseAdmin } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'patient' | 'doctor' | 'admin';
  password_hash: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

export class UserModel {
  static async create(userData: Partial<User>): Promise<User | null> {
    try {
      const id = uuidv4();
      const { data, error } = await supabase
        .from('users')
        .insert([{ id, ...userData, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) return null;
      return data as User;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as User;
    } catch (error) {
      console.error('Error finding user by id:', error);
      return null;
    }
  }

  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as User;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  static async findAll(): Promise<User[]> {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      return (data || []) as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  static async findByRole(role: string): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', role);

      if (error) throw error;
      return (data || []) as User[];
    } catch (error) {
      console.error('Error finding users by role:', error);
      return [];
    }
  }
}
