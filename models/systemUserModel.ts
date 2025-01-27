import mongoose, { Document, Schema } from "mongoose";
import { ISystemUser } from "../interfaces/systemUser.interface";

const systemUserSchema: Schema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    middle_name: {
      type: String,
      trim: true,
      default: null,
      required: false,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: false,
    }],
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const SystemUser = mongoose.model<ISystemUser>("SystemUser", systemUserSchema);

export default SystemUser;
