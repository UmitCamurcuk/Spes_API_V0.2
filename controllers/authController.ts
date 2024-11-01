import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import SystemUser from '../models/systemUserModel'; // Model dosyanızı burada tanımlayın
import bcrypt from 'bcrypt';

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
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // 1 saat geçerli
    });

    res.json({ token });
    return;
  } catch (err) {
     res.status(500).json({ message: 'An error occurred' });
     return;
  }
};
