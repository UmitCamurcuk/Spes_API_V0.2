import { Document, Types } from 'mongoose';

export interface IRoles extends Document {
    name: string;
    code: string; // optional
    permission_groups: Types.ObjectId;
    users: string;
    is_active: boolean;
    created_user: string;
    history: Types.ObjectId;
}
    