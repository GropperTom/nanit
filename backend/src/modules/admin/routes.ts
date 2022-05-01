import {Router} from "express";
import controller from "./controller";
const AdminRouter = Router();

const basePath = '/admins';

AdminRouter.get('/', controller.getAllAdmins);
AdminRouter.put('/status', controller.setStatus);
AdminRouter.post('/mock',controller.fillDbWithMock);
AdminRouter.get('/me', controller.getMe);

export default {
    router: AdminRouter,
    path: basePath
};
