import { Document, Types } from "mongoose";
import { IHistory } from "./history.interface";

export interface IRoles extends Document {
  name: string;
  code: string; 
  description: string;
  permission_groups: Types.ObjectId[];
  users: Types.ObjectId[];
  is_active: boolean;
  createdUser: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
