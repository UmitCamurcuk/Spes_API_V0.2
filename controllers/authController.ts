import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import SystemUser from '../models/systemUserModel'; // Model dosyanızı burada tanımlayın
import bcrypt from 'bcrypt';

interface LoginResponse { 
  user: {
    token: string;
    first_name : string;
    middle_name? : string;
    last_name : string;
    username: string
  }
}

export const loginUser = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await SystemUser.findOne({ username });
    if (!user) {
       res.status(400).json({ message: 'Invalid username or password' });
       return;
    }

    // Şifreyi karşılaştır
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       res.status(400).json({ message: 'Invalid username or password' });
       return;
    }

    // JWT oluştur
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Sadece HTTPS üzerinden geçiş yapmasını sağlıyor
      sameSite: 'strict', // CSRF koruması için
      maxAge: 3600000, // 1 saat
    });

    return res.json({
      user: {
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        username: user.username
      }
    });

  } catch (err) {
     res.status(500).json({ message: 'An error occurred' });
     return;
  }
};

