"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFICATION_EMAIL_TEMPLATE = void 0;
exports.VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header Card -->
    <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: 20px 20px 0 0; padding: 40px 30px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.2);">
      <div style="width: 80px; height: 80px; background: linear-gradient(45deg, #4facfe, #00f2fe); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.09 8.26L12 14L20.91 8.26L12 2Z" fill="white"/>
          <path d="M12 14L3.09 8.26V15.74L12 22L20.91 15.74V8.26L12 14Z" fill="white" opacity="0.7"/>
        </svg>
      </div>
      <h1 style="color: #2d3748; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Verify Your Email</h1>
      <p style="color: #718096; margin: 10px 0 0 0; font-size: 16px; opacity: 0.8;">Secure your account in just one step</p>
    </div>

    <!-- Main Content Card -->
    <div style="background: white; padding: 40px 30px; border-radius: 0 0 20px 20px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-top: none;">
      
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #2d3748; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">Welcome aboard! 🚀</h2>
        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">
          We're excited to have you join us. To complete your registration and secure your account, please verify your email address using the code below:
        </p>
      </div>

      <!-- Verification Code -->
      <div style="background: linear-gradient(135deg, #f7fafc, #edf2f7); border: 2px dashed #cbd5e0; border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(79, 172, 254, 0.05) 0%, transparent 70%); animation: pulse 3s ease-in-out infinite;"></div>
        <p style="color: #718096; font-size: 14px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Verification Code</p>
        <div style="font-size: 36px; font-weight: 800; color: #4facfe; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(79, 172, 254, 0.2); position: relative;">
          {verificationCode}
        </div>
        <p style="color: #a0aec0; font-size: 12px; margin: 15px 0 0 0;">⏰ Expires in 15 minutes</p>
      </div>

      <!-- Instructions -->
      <div style="background: #f8fafc; border-left: 4px solid #4facfe; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #2d3748; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">How to verify:</h3>
        <ol style="color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
          <li>Copy the verification code above</li>
          <li>Return to the verification page</li>
          <li>Paste the code and click "Verify"</li>
        </ol>
      </div>

      <!-- Security Note -->
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 0;">
          If you didn't create an account with us, you can safely ignore this email. 
          <br>This verification code will expire automatically.
        </p>
      </div>

      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 35px;">
        <div style="display: inline-block; background: linear-gradient(45deg, #4facfe, #00f2fe); padding: 3px; border-radius: 12px;">
          <div style="background: white; padding: 15px 30px; border-radius: 10px;">
            <p style="margin: 0; color: #4facfe; font-weight: 600; font-size: 14px;">Ready to get started? 🎉</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding: 20px;">
      <p style="color: rgba(255, 255, 255, 0.8); font-size: 13px; margin: 0; line-height: 1.5;">
        This is an automated security message. Please do not reply to this email.
        <br>
        <span style="opacity: 0.7;">If you need assistance, please contact our support team.</span>
      </p>
    </div>
  </div>

  <style>
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.1); opacity: 0.1; }
    }
  </style>
</body>
</html>
`;
