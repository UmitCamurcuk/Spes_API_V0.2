import { Schema, model } from 'mongoose';
import { IPermissionGroup } from '../interfaces/permissionsGroup.interface';

const PermissionGroupSchema = new Schema<IPermissionGroup>({
  name: { type: String, required: true },
  description: { type: String },
  code: { type: String, required: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permissions' }], // Dizi olarak tanımlandı
  isActive: { type: Boolean, default: true },
  createdUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  history: [{ type: Schema.Types.ObjectId, ref: 'History' }], // Bu da bir dizi
});

export const PermissionGroupModel = model<IPermissionGroup>('PermissionGroup', PermissionGroupSchema);
