import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { UserModel } from '../models/User.js';
import { DoctorModel } from '../models/Doctor.js';
import { HospitalModel } from '../models/Hospital.js';
import { hashPassword } from '../utils/password.js';

export class AdminController {
  static async getAllUsers(req: AuthRequest, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();
      const usersWithoutPasswords = users.map(({ password_hash, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  }

  static async addDoctor(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password, name, phone, ...doctorData } = req.body;

      // Create user
      const passwordHash = await hashPassword(password);
      const user = await UserModel.create({
        email,
        password_hash: passwordHash,
        name,
        phone,
        role: 'doctor',
        status: 'active',
      });

      if (!user) {
        res.status(500).json({ message: 'Failed to create user' });
        return;
      }

      // Create doctor profile
      const doctor = await DoctorModel.create({
        user_id: user.id,
        ...doctorData,
      });

      res.status(201).json({
        message: 'Doctor added successfully',
        user: { id: user.id, email: user.email, name: user.name },
        doctor,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add doctor' });
    }
  }

  static async updateDoctor(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { doctorId } = req.params;
      const updates = req.body;

      const doctor = await DoctorModel.update(doctorId, updates);

      if (!doctor) {
        res.status(404).json({ message: 'Doctor not found' });
        return;
      }

      res.json({
        message: 'Doctor updated successfully',
        doctor,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update doctor' });
    }
  }

  static async deleteDoctor(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { doctorId } = req.params;
      const success = await DoctorModel.delete(doctorId);

      if (!success) {
        res.status(404).json({ message: 'Doctor not found' });
        return;
      }

      res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete doctor' });
    }
  }

  static async getHospitalStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();
      const doctors = await DoctorModel.findAll();
      const hospitals = await HospitalModel.findAll();

      res.json({
        totalUsers: users.length,
        totalDoctors: doctors.length,
        totalHospitals: hospitals.length,
        patientCount: users.filter((u) => u.role === 'patient').length,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  }
}
