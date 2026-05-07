import { Router } from 'express';
import { AIController } from '../controllers/aiController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router: ReturnType<typeof Router> = Router();

router.use(authMiddleware);

router.post('/recommend-doctor', AIController.recommendDoctor);
router.post('/analyze-symptoms', AIController.analyzeSymptoms);

export default router;
