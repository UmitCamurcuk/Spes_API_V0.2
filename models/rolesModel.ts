import { Schema, model } from "mongoose";
import { IRoles } from "../interfaces/roles.interface";

const RolesSchema = new Schema<IRoles>(
  {
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, unique: true },
    permission_groups: [
      { type: Schema.Types.ObjectId, ref: "PermissionGroup" },
    ],
    users: [{ type: Schema.Types.ObjectId, ref: "SystemUser" }],
    is_active: { type: Boolean, default: true },
    createdUser: { type: Schema.Types.ObjectId, ref: "SystemUser"},
  },
  {
    timestamps: true,
  }
);

export const RolesModel = model<IRoles>("Roles", RolesSchema);
