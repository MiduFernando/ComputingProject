import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { DoctorModel } from '../models/Doctor.js';
import { UserModel } from '../models/User.js';

export class AIController {
  static async recommendDoctor(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { symptoms } = req.body;

      // Assume symptoms is a string, split into array
      const symptomList = typeof symptoms === 'string' ? symptoms.split(',').map(s => s.trim().toLowerCase()) : symptoms;

      // Simple mapping to specialization
      let specialization = 'General Practitioner';
      if (symptomList.some(s => s.includes('heart') || s.includes('chest') || s.includes('cardiac'))) {
        specialization = 'Cardiologist';
      } else if (symptomList.some(s => s.includes('skin') || s.includes('dermat'))) {
        specialization = 'Dermatologist';
      } else if (symptomList.some(s => s.includes('eye') || s.includes('vision'))) {
        specialization = 'Ophthalmologist';
      } else if (symptomList.some(s => s.includes('stomach') || s.includes('digest'))) {
        specialization = 'Gastroenterologist';
      } else if (symptomList.some(s => s.includes('back') || s.includes('bone') || s.includes('joint'))) {
        specialization = 'Orthopedic Surgeon';
      } else if (symptomList.some(s => s.includes('mental') || s.includes('anxiety') || s.includes('depress'))) {
        specialization = 'Psychiatrist';
      }

      // Fetch doctors by specialization
      const doctors = await DoctorModel.findBySpecialization(specialization);
      const topDoctors = doctors.slice(0, 3); // Limit to 3

      // Fetch user details for each doctor
      const recommendations = await Promise.all(topDoctors.map(async (doctor) => {
        const user = await UserModel.findById(doctor.user_id);
        return {
          id: doctor.id,
          name: user ? user.name : 'Unknown Doctor',
          specialty: doctor.specialization,
          hospital: doctor.hospital,
          hospitalId: '', // Assuming hospital is name, not id
          experience: doctor.experience,
          rating: doctor.rating,
          availability: 'Available Today', // Simplified
          matchScore: Math.floor(Math.random() * 20) + 80, // Random 80-99
          reason: `Specialized in ${doctor.specialization} with ${doctor.experience} years of experience`,
          consultationFee: doctor.consultation_fee,
        };
      }));

      res.json({
        message: 'Doctor recommendations based on your symptoms',
        symptoms: symptomList,
        recommendations,
      });
    } catch (error) {
      console.error('Error in recommendDoctor:', error);
      res.status(500).json({ message: 'Failed to get recommendations' });
    }
  }

  static async analyzeSymptoms(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { symptoms } = req.body;

      const analysis = {
        message: 'Symptom analysis',
        symptoms: symptoms,
        analysis: 'Please consult with a healthcare professional for proper diagnosis',
        urgency: 'moderate',
      };

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: 'Failed to analyze symptoms' });
    }
  }
}
