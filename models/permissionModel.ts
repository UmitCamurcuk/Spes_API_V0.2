import { Schema, model } from 'mongoose';
import { IPermission } from '../interfaces/permission.interface';

const PermissionSchema = new Schema<IPermission>({
  name: { type: String, required: true },
  description: { type: String },
  code: { type: String, required: true },
  type: { type: String, required: true },
  group: { type: String },
  isActive: { type: Boolean, default: true },
  createdUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: [{ type: Schema.Types.ObjectId, ref: 'History' }],
});

export const PermissionModel = model<IPermission>('Permission', PermissionSchema);
