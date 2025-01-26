// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {  Types } from "mongoose";

export interface UserPayload extends JwtPayload {
  id: Types.ObjectId;
  username: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload; // `user` artık UserPayload türünde olacak
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // HTTP-Only cookie'den token alınır
  const token = req.cookies?.token;

  // Token kontrolü
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return ;
  }

  try {
    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = decoded; // Kullanıcı bilgilerini req.user içine atıyoruz

    // Middleware'den sonraki işleme devam
    next();
  } catch (err) {
    // Hatalı token durumunda yanıt gönder
   res.status(403).json({ message: 'Invalid Token' });
   return ;
  }
};
