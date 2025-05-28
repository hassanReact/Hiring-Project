import asyncHandler from 'express-async-handler';
import prisma from '../../db/db.config';
import { sendVerificationEmail } from '../utils/MailerSender';
import jwt from 'jsonwebtoken';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie';

export const authentication = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const otp = generateOtp();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      user = await prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt },
      });
    } else {
      user = await prisma.user.create({
        data: { email, otp, otpExpiresAt },
      });
    }

    await sendVerificationEmail(email, otp);

    res.json({ message: 'OTP sent to email' });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error sending OTP' });
    return;
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400).json({ message: 'Email and OTP are required' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or OTP' });
      return;
    }

    if (
      user.otp !== otp ||
      !user.otpExpiresAt ||
      new Date() > user.otpExpiresAt
    ) {
      res.status(400).json({ message: 'Invalid or expired OTP' });
      return;
    }

    // Clear OTP fields
    await prisma.user.update({
      where: { email },
      data: { otp: null, otpExpiresAt: null },
    });

    const token = generateTokenAndSetCookie(res, {
      id: user.id.toString(),
      email: user.email,
      role: user.role ?? ''
    });
    
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error verifying OTP' });
  }
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
})