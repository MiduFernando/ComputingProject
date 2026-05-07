import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.use(authMiddleware);

router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.get('/appointments', UserController.getAppointments);
router.get('/medical-history', UserController.getMedicalHistory);

export default router;
