import { Router } from 'express';
import { HospitalController } from '../controllers/hospitalController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.get('/all', HospitalController.getAll);
router.get('/:id', HospitalController.getById);

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));
router.post('/', HospitalController.create);
router.put('/:id', HospitalController.update);
router.delete('/:id', HospitalController.delete);

export default router;
