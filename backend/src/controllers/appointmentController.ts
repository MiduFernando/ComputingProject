import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { AppointmentModel } from '../models/Appointment.js';

export class AppointmentController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const appointmentData = {
        ...req.body,
        patient_id: req.user.userId,
        status: 'pending',
      };

      const appointment = await AppointmentModel.create(appointmentData);

      if (!appointment) {
        res.status(500).json({ message: 'Failed to create appointment' });
        return;
      }

      res.status(201).json({
        message: 'Appointment created successfully',
        appointment,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create appointment' });
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await AppointmentModel.findById(id);

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointment' });
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const appointments = await AppointmentModel.findAll();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointments' });
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const appointment = await AppointmentModel.update(id, updates);

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      res.json({
        message: 'Appointment updated successfully',
        appointment,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update appointment' });
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await AppointmentModel.delete(id);

      if (!success) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete appointment' });
    }
  }
}
