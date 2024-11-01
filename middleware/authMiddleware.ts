import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return; // Fonksiyonu sonlandır
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); // Devam etmek için `next` fonksiyonunu çağırmak önemli
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
    return; // Fonksiyonu sonlandır
  }
};
