import { Document, Types } from 'mongoose';
import { IHistory } from './history.interface';

export interface IPermission extends Document {
  name: string;
  description: string;
  code: string;
  type: string;
  group: string;
  isActive: boolean; // Booelan doğru yazıldı.
  createdUser: Types.ObjectId; // User ilişkilendirme
  history: Types.ObjectId[] | IHistory[]; // History ile ilişki
}
