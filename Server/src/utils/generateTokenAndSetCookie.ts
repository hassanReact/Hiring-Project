import jwt from 'jsonwebtoken';


export const generateTokenAndSetCookie = (res: any, user: { id: string; email: string; role: string }) => {
    const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: '1d' }
        );
        
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });

    return token;
};
