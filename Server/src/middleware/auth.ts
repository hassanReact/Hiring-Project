import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
     res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if(req.user = decoded){
        next();
    };
  } catch (err) {
     res.status(401).json({ message: 'Invalid or expired token' });
  }
};
