import {PostModel, IPost} from "./models/PostModel";

let idCounter: number = 0

const getAllPosts = async (): Promise<IPost[]> => {
    return PostModel.find({});
}

const addPost = async (content: string): Promise<void> => {
    await PostModel.create({"id": idCounter, content})
    idCounter++
}

const editPost = async (id: number, newContent: string): Promise<void> => {
    await PostModel.findOneAndUpdate({id}, {$set: {"content": newContent}})
}

const deletePost = async (id: number, newContent: string): Promise<void> => {
    await PostModel.findOneAndDelete({id})
}

export default {
    getAllPosts,
    addPost,
    editPost,
    deletePost
}
