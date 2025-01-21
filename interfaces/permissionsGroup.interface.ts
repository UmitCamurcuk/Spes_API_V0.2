import { Document, Types } from 'mongoose';
import { IHistory } from './history.interface';

export interface IPermissionGroup extends Document {
  name: string;
  description: string;
  code: string;
  permissions: Types.ObjectId[] ;
  isActive: boolean; 
  createdUser: Types.ObjectId; 
  history: Types.ObjectId[] | IHistory[]; 
}
