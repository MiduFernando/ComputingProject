import { Router } from 'express';
import { AppointmentController } from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.use(authMiddleware);

router.post('/', AppointmentController.create);
router.get('/:id', AppointmentController.getById);
router.put('/:id', AppointmentController.update);
router.delete('/:id', AppointmentController.delete);

router.use(roleMiddleware(['admin']));
router.get('/', AppointmentController.getAll);

export default router;
