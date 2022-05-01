"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const AdminRouter = (0, express_1.Router)();
const basePath = '/admins';
AdminRouter.get('/', controller_1.default.getAllAdmins);
AdminRouter.put('/status', controller_1.default.setStatus);
AdminRouter.post('/mock', controller_1.default.fillDbWithMock);
AdminRouter.get('/me', controller_1.default.getMe);
exports.default = {
    router: AdminRouter,
    path: basePath
};
