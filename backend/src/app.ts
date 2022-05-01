import express, {NextFunction, Request, Response} from "express";
import adminRouter from "./modules/admin/routes"
import authRouter from "./modules/auth/routes"
import postRouter from "./modules/posts/routes"
import {json} from "body-parser";
import connectMongoDB from "./db";
import cors from "cors";
// import jwtFilter from "./modules/auth/middleware/jwt_filter";

const app = express();

// JSON
app.use(json());

// CORS
app.use(cors());

// Cache-control
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

// Routers
// app.use("*", jwtFilter);
app.use(postRouter.path, postRouter.router)
app.use(adminRouter.path, adminRouter.router)
app.use(authRouter.path, authRouter.router)

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});


// DB
connectMongoDB().then(() => {
    app.listen(3001)
});
