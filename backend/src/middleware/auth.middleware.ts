import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  user?: JWTPayload & { userId: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = decoded as JWTPayload & { userId: string };
    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication error' });
  }
};

export default authMiddleware;
