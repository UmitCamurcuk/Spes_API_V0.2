import { Document, Types } from 'mongoose';

export interface IHistory extends Document {
    entityID: Types.ObjectId;
    entityType: string;
    action: string;
    comment?: string; // Opsiyonel alan
    changedValues: Record<string, any>; // Eski ve yeni değerler
    createdUser: Types.ObjectId;
    timestamp: Date;
    ipAddress?: string; // Opsiyonel alan
    status: string;
    createdAt?:Date,
    updatedAt?:Date
  }
  