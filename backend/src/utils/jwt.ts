import jwt from 'jsonwebtoken';
import config from '../config/env.js';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export interface PasswordResetPayload {
  email: string;
  type: 'password-reset';
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any,
  });
};

export const generateResetToken = (email: string): string => {
  return jwt.sign({ email, type: 'password-reset' } as PasswordResetPayload, config.jwtSecret, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as JWTPayload;
  } catch (error) {
    return null;
  }
};

export const verifyResetToken = (token: string): PasswordResetPayload | null => {
  try {
    const payload = jwt.verify(token, config.jwtSecret) as PasswordResetPayload;
    if (payload.type !== 'password-reset') {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload | null;
  } catch (error) {
    return null;
  }
};
