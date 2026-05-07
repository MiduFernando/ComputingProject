import { Router } from 'express';
import { DoctorController } from '../controllers/doctorController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.get('/all', DoctorController.getAllDoctors);
router.get('/specialization/:specialization', DoctorController.getDoctorsBySpecialization);

router.use(authMiddleware);
router.get('/appointments', DoctorController.getAppointments);
router.put('/appointments/:appointmentId', DoctorController.updateAppointmentStatus);
router.get('/profile', DoctorController.getProfile);

export default router;
