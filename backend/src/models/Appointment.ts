import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export class AppointmentModel {
  static async create(appointmentData: Partial<Appointment>): Promise<Appointment | null> {
    try {
      const id = uuidv4();
      const { data, error } = await supabase
        .from('appointments')
        .insert([{ id, ...appointmentData, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return data as Appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      return null;
    }
  }

  static async findById(id: string): Promise<Appointment | null> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as Appointment;
    } catch (error) {
      console.error('Error finding appointment:', error);
      return null;
    }
  }

  static async findByPatientId(patientId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patientId)
        .order('appointment_date', { ascending: false });

      if (error) throw error;
      return (data || []) as Appointment[];
    } catch (error) {
      console.error('Error finding appointments by patient:', error);
      return [];
    }
  }

  static async findByDoctorId(doctorId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', doctorId)
        .order('appointment_date', { ascending: false });

      if (error) throw error;
      return (data || []) as Appointment[];
    } catch (error) {
      console.error('Error finding appointments by doctor:', error);
      return [];
    }
  }

  static async update(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Appointment;
    } catch (error) {
      console.error('Error updating appointment:', error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('appointments').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return false;
    }
  }

  static async findAll(): Promise<Appointment[]> {
    try {
      const { data, error } = await supabase.from('appointments').select('*');
      if (error) throw error;
      return (data || []) as Appointment[];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return [];
    }
  }
}
