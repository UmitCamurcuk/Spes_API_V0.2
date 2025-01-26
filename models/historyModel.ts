import mongoose, { Schema, Document, Types } from 'mongoose';
import { IHistory } from '../interfaces/history.interface';

const historySchema: Schema = new Schema({
  entityID: { type: Types.ObjectId, required: true },
  entityType: { type: String, required: true },
  action: { type: String, required: true },
  comment: { type: String, required: false },
  changedValues: { type: Object, required: true },
  createdUser: { type: Schema.Types.ObjectId, ref: 'User', required: false},
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String, required: false },
  status: { type: String, required: true },
});

const History = mongoose.model<IHistory>('History', historySchema);

export default History;
