import nodemailer from 'nodemailer';
import config from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@ehealth.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: `Welcome to ${config.appName}`,
    html: `<h1>Welcome ${name}!</h1><p>Thank you for registering on ${config.appName}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: `Password Reset - ${config.appName}`,
    html: `<h1>Password Reset</h1><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};
