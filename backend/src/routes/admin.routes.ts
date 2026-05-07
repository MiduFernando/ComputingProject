import { Router } from 'express';
import { AdminController } from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

router.get('/users', AdminController.getAllUsers);
router.post('/doctors', AdminController.addDoctor);
router.put('/doctors/:doctorId', AdminController.updateDoctor);
router.delete('/doctors/:doctorId', AdminController.deleteDoctor);
router.get('/stats', AdminController.getHospitalStats);

export default router;
