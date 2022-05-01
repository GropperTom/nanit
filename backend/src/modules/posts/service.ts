import {IPost} from "./models/PostModel";
import postRepo from "./repository"

const getAllPosts = async (): Promise<IPost[]> => {
    return await postRepo.getAllPosts()
}

const addPost = async (content: string): Promise<boolean> => {
    try {
        await postRepo.addPost(content)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

const editPost = async (id: number, newContent: string): Promise<boolean> => {
    try {
        await postRepo.editPost(id, newContent)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

const deletePost = async (id: number, newContent: string): Promise<boolean> => {
    try {
        await postRepo.deletePost(id, newContent)
        return true
    }
    catch(e) {
        console.log(e)
        return false
    }
}

export default {
    getAllPosts,
    addPost,
    editPost,
    deletePost
}
