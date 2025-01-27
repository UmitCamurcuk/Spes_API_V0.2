import { Document, Types } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  description: string;
  code: string;
  type: string;
  group: Types.ObjectId[];
  isActive: boolean;
  createdUser: Types.ObjectId; 
  createdAt?:Date,
  updatedAt?:Date
}
