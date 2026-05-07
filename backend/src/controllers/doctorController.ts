import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { DoctorModel } from '../models/Doctor.js';
import { AppointmentModel } from '../models/Appointment.js';

export class DoctorController {
  static async getAppointments(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const doctor = await DoctorModel.findByUserId(req.user.userId);
      if (!doctor) {
        res.status(404).json({ message: 'Doctor profile not found' });
        return;
      }

      const appointments = await AppointmentModel.findByDoctorId(doctor.id);
      res.json({ appointments });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch appointments' });
    }
  }

  static async updateAppointmentStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { appointmentId } = req.params;
      const { status } = req.body;

      const appointment = await AppointmentModel.update(appointmentId, { status });

      if (!appointment) {
        res.status(404).json({ message: 'Appointment not found' });
        return;
      }

      res.json({
        message: 'Appointment status updated',
        appointment,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update appointment' });
    }
  }

  static async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const doctor = await DoctorModel.findByUserId(req.user.userId);
      if (!doctor) {
        res.status(404).json({ message: 'Doctor profile not found' });
        return;
      }

      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch doctor profile' });
    }
  }

  static async getAllDoctors(req: AuthRequest, res: Response): Promise<void> {
    try {
      const doctors = await DoctorModel.findAll();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch doctors' });
    }
  }

  static async getDoctorsBySpecialization(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { specialization } = req.params;
      const doctors = await DoctorModel.findBySpecialization(specialization);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch doctors' });
    }
  }
}
