import { Router, type Router as ExpressRouter } from 'express';
import { AuthController } from '../controllers/authController.js';
import { validationMiddleware } from '../middleware/validation.middleware.js';
import { body } from 'express-validator';

const router: ReturnType<typeof Router> = Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty(),
  ],
  validationMiddleware,
  AuthController.register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validationMiddleware,
  AuthController.login
);

router.post('/logout', AuthController.logout);

router.post('/refresh', AuthController.refreshToken);

router.post('/forgot-password', AuthController.forgotPassword);

router.post('/reset-password', AuthController.resetPassword);

export default router;
