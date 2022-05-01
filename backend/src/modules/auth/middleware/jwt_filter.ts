import jwt from "jsonwebtoken"
import config from "config"
import JwtPayload from "../models/jwt_model";
import authRouter from "../../../modules/auth/routes"
import {NextFunction, Request, Response} from "express-serve-static-core";

const jwtFilter = (req: Request, res: Response, next: NextFunction) => {
    if (req.baseUrl.startsWith(authRouter.path)) {
        return next();
    }
    const token = req.get('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'no token, authorization denied'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')) as JwtPayload;

        req.user = decoded.user;
        next();
    }
    catch(e) {
        res.status(401).json({msg: "invalid token"})
    }
};

export default jwtFilter;
