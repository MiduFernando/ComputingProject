import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { HospitalModel } from '../models/Hospital.js';

export class HospitalController {
  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const hospitals = await HospitalModel.findAll();
      res.json(hospitals);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hospitals' });
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const hospital = await HospitalModel.findById(id);

      if (!hospital) {
        res.status(404).json({ message: 'Hospital not found' });
        return;
      }

      res.json(hospital);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch hospital' });
    }
  }

  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const hospitalData = req.body;
      const hospital = await HospitalModel.create(hospitalData);

      if (!hospital) {
        res.status(500).json({ message: 'Failed to create hospital' });
        return;
      }

      res.status(201).json({
        message: 'Hospital created successfully',
        hospital,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create hospital' });
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const hospital = await HospitalModel.update(id, updates);

      if (!hospital) {
        res.status(404).json({ message: 'Hospital not found' });
        return;
      }

      res.json({
        message: 'Hospital updated successfully',
        hospital,
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update hospital' });
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await HospitalModel.delete(id);

      if (!success) {
        res.status(404).json({ message: 'Hospital not found' });
        return;
      }

      res.json({ message: 'Hospital deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete hospital' });
    }
  }
}
