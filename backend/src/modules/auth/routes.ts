import {Router} from "express";
import controller from "./controller";
import {body} from "express-validator";

const authRouter = Router();

const basePath = '/auth';

authRouter.post('/register',
    body('email', 'invalid username')
        .isEmail(),
    body('password', 'invalid password')
        .isLength({min: 6}),
    body('name', 'invalid name')
        .not()
        .isEmpty()
    , controller.registerNewUser);

authRouter.post('/login', [
    body('email', 'invalid username')
        .isEmail(),
    body('password', 'invalid password')
        .isLength({min: 6})
], controller.login);

export default {
    router: authRouter,
    path: basePath
};
