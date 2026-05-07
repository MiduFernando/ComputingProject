import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { UserModel } from '../models/User.js';
import { AppointmentModel } from '../models/Appointment.js';
import { supabase } from '../config/database.js';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const user = await UserModel.findById(req.user.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const { password_hash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch profile' });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { name, phone } = req.body;
      const user = await UserModel.update(req.user.userId, { name, phone });

      if (!user) {
        res.status(500).json({ message: 'Failed to update profile' });
        return;
      }

      const { password_hash, ...userWithoutPassword } = user;
      res.json({
        message: 'Profile updated successfully',
        user: userWithoutPassword,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
  }

  static async getAppointments(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const appointments = await AppointmentModel.findByPatientId(req.user.userId);
      res.json({ appointments });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointments' });
    }
  }

  static async getMedicalHistory(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .eq('patient_id', req.user.userId)
        .order('date', { ascending: false });

      if (error) {
        res.status(500).json({ message: 'Failed to fetch medical history' });
        return;
      }

      res.json({ medicalHistory: data || [] });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch medical history' });
    }
  }
}
