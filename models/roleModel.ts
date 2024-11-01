import mongoose, { Schema, Document } from 'mongoose';
import { IRoles } from '../interfaces/roles.interface';

const historySchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    permission_groups: { type: mongoose.Schema.Types.ObjectId, required: true },
    users: { type: mongoose.Schema.Types.ObjectId, required: true },
    is_active: { type: Object, required: true },
    created_user: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemUsers', required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String, required: false },
    history: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: false }
});

const History = mongoose.model<IRoles>('Roles', historySchema);

export default History;
