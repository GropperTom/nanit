import { model, Schema, Model, Document } from 'mongoose';

export const adminSchema = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String, required: true}
}

export interface IAdmin extends Document {
    name: string;
    email: string;
    status: string;
}

const mongooseAdminSchema: Schema = new Schema(adminSchema);

export const AdminModel: Model<IAdmin> = model('Administrator', mongooseAdminSchema);
