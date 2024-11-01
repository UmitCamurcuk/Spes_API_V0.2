import { Document, Types } from 'mongoose';

export interface IHistory extends Document {
    entityID: number;
    entityType: string;
    action: string;
    comment?: string; // Opsiyonel alan
    changedValues: Record<string, any>; // Eski ve yeni değerler
    createdUser: Types.ObjectId;
    timestamp: Date;
    ipAddress?: string; // Opsiyonel alan
    status: string;
  }
  