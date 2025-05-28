
import nodemailer from 'nodemailer';
import { VERIFICATION_EMAIL_TEMPLATE } from './template';

export const sendVerificationEmail = async (email: string, VerificationToken: string) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", VerificationToken);


  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.GMAIL_FROM,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const response = transporter.sendMail({
      from: process.env.GMAIL_FROM,
      to: email,
      subject: 'Verify your email address',
      html,
    });

    if (response) {
      console.log("Verification Email Sent Succesfully", response)
    }
    return response;

  } catch (err) {
    console.error('Unexpected error sending email:', err);
  }
};
