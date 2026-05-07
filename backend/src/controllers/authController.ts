import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { UserModel } from '../models/User.js';
import { DoctorModel } from '../models/Doctor.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken, generateResetToken, verifyResetToken } from '../utils/jwt.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import config from '../config/env.js';

export class AuthController {
  static async register(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password, name, phone, role } = req.body;

      // Check if user exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const user = await UserModel.create({
        email,
        password_hash: passwordHash,
        name,
        phone,
        role: role || 'patient',
        status: 'active',
      });

      if (!user) {
        res.status(500).json({ message: 'Failed to create user' });
        return;
      }

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  static async login(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Compare password
      const isMatch = await comparePassword(password, user.password_hash);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate token
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  }

  static async logout(req: AuthRequest, res: Response): Promise<void> {
    res.json({ message: 'Logout successful' });
  }

  static async refreshToken(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const token = generateToken({
        userId: req.user.userId,
        email: req.user.email,
        role: req.user.role,
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Token refresh failed' });
    }
  }

  static async forgotPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const user = await UserModel.findByEmail(email);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const resetToken = generateResetToken(user.email);
      const resetLink = `${config.frontendUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;
      const emailSent = await sendPasswordResetEmail(user.email, resetLink);

      if (!emailSent) {
        res.status(500).json({ message: 'Failed to send password reset email' });
        return;
      }

      res.json({ message: 'Password reset link sent to email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Failed to process request' });
    }
  }

  static async resetPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        res.status(400).json({ message: 'Token and new password are required' });
        return;
      }

      const payload = verifyResetToken(token);
      if (!payload) {
        res.status(400).json({ message: 'Invalid or expired password reset token' });
        return;
      }

      const user = await UserModel.findByEmail(payload.email);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const passwordHash = await hashPassword(newPassword);
      await UserModel.update(user.id, { password_hash: passwordHash });

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Password reset failed' });
    }
  }
}
