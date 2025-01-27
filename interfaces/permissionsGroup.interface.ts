import { Document, Types } from 'mongoose';

export interface IPermissionGroup extends Document {
  name: string;
  description: string;
  code: string;
  permissions: Types.ObjectId[] ;
  isActive: boolean; 
  createdUser: Types.ObjectId; 
  createdAt?:Date,
  updatedAt?:Date
}
