import {RequestHandler} from "express";
import service from "./service";
import {validationResult} from "express-validator";
import * as core from "express-serve-static-core";
import jwt from "jsonwebtoken";
import config from "config";
import JwtPayload from "./models/jwt_model";

const registerNewUser: RequestHandler<core.ParamsDictionary, unknown, {name: string, email: string, password: string}> =
    async (req, res, next) => {
        const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    try {
        const registerSuccess: boolean = await service.registerNewUser(name, email, password);

        if(registerSuccess) {
                res.status(200).send();
            } else {
            res.status(400).json({msg: "username already exists"});
        }
    }
    catch(e) {
        res.status(400).json({msg: "something went wrong"});
    }
};

const login: RequestHandler<core.ParamsDictionary, unknown, {email: string, password: string}> =
    async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
            const loginSuccess = await service.login(password, email);

        if(loginSuccess) {
            const payload: JwtPayload = {
                user: {
                    email
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},(err, token) => {
                if(err) {
                    res.status(400).json({msg: "something went wrong"});
                }
                else {
                        res.status(200).json({"x-auth-token": token});
                }
            })
        }
        else {
            res.status(400).json({msg: "invalid credentials"});
        }
    }
    catch(e) {
        res.status(400).json({msg: "something went wrong"});
    }
}

export default {
    registerNewUser,
    login
}
