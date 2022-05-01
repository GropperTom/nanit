import {Router} from "express";
import controller from "./controller";
import {body} from "express-validator";

const PostRouter = Router();

const basePath = '/posts';

PostRouter.get('/',
    body('content', 'missing field "content"').not().isEmpty(),    
    controller.getAllPosts)
PostRouter.post('/',
    body('content', 'missing field "content"').not().isEmpty(),
    controller.addPost)
PostRouter.put(
    '/:id',
    body('content', 'missing field "content"').not().isEmpty(),
    controller.editPost)
PostRouter.delete(
    '/:id',
    controller.deletePost)

export default {
    router: PostRouter,
    path: basePath
};
