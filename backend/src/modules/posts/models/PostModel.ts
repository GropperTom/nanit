import { model, Schema, Model, Document } from 'mongoose';

export const postSchema = {
    id: {type: Number, required: true},
    content: {type: String, required: true},
}

export interface IPost extends Document {
    id: Number;
    content: String;
}

const mongoosePostSchema: Schema = new Schema(postSchema);

export const PostModel: Model<IPost> = model('Posts', mongoosePostSchema);
