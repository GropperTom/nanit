import { model, Schema, Model, Document } from 'mongoose';

export const userSchema = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
}

export interface IUser extends Document {
    name: string
    email: string
    password: string
}

const mongooseUserSchema: Schema = new Schema(userSchema);

export const user_model: Model<IUser> = model('User', mongooseUserSchema);
