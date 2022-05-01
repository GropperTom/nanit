import e, {RequestHandler} from "express";
import service from "./service";
import {IPost} from "./models/PostModel";
import PostDto from "./dto/PostDto";
import * as core from "express-serve-static-core";
import {validationResult} from "express-validator";

const parseToDto = (post: IPost): PostDto => {
    return {
        id: post.id,
        content: post.content
    };
}

const getAllPosts: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    try {
        const posts: IPost[] = await service.getAllPosts();
        const postsDto: PostDto[] = posts.map((post) => parseToDto(post));

        res.status(200).json(postsDto);
    }
    catch(e) {
        res.status(400).send(e)
    }
}

const addPost: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const success: boolean = await service.addPost(req.body.content)
    if(success) {
        res.status(200).json()
    }
    else {
        res.status(400).send()
    }
}

const editPost: RequestHandler = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    const success: boolean = await service.editPost(Number(req.params.id), req.body.content)
    if(success) {
        res.status(200).json()
    }
    else {
        res.status(400).send()
    }
}

const deletePost: RequestHandler = async (req, res, next) => {
    const success: boolean = await service.deletePost(Number(req.params.id), req.body.content)
    if(success) {
        res.status(200).json()
    }
    else {
        res.status(400).send()
    }
}

export default {
    getAllPosts,
    addPost,
    editPost,
    deletePost
}
