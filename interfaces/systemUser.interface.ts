import { Document, Types } from 'mongoose';

export interface ISystemUser extends Document {
    first_name: string;
    middle_name?: string; // optional
    last_name: string;
    username: string;
    password: string;
    email: string;
    roles: Types.ObjectId;
    is_active: boolean;
    history: Types.ObjectId;
}
