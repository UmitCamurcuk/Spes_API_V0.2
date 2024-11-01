import mongoose, { Schema, Document } from 'mongoose';
import { IHistory } from '../interfaces/history.interface';

const historySchema: Schema = new Schema({
  entityID: { type: Number, required: true },
  entityType: { type: String, required: true },
  action: { type: String, required: true },
  comment: { type: String, required: false },
  changedValues: { type: Object, required: true },
  createdUser: { type: mongoose.Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String, required: false },
  status: { type: String, required: true },
});

const History = mongoose.model<IHistory>('History', historySchema);

export default History;
