"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const parseToDto = (admin) => {
    return {
        name: admin.name,
        status: admin.status,
        email: admin.email
    };
};
const getMe = async (req, res, next) => {
    try {
        const me = await service_1.default.getMe(req.user.email);
        const meDto = parseToDto(me);
        res.status(200).json(meDto);
    }
    catch (e) {
        res.status(400).json({ msg: "error" });
    }
};
const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await service_1.default.getAllAdmins();
        const adminsDto = admins.map((admin) => parseToDto(admin));
        res.status(200).json(adminsDto);
    }
    catch (e) {
    }
};
const setStatus = async (req, res, next) => {
    try {
        const email = req.user.email;
        await service_1.default.setStatus(req.body.status, email);
        res.status(200).json();
    }
    catch (e) {
        res.status(400).send();
    }
};
const fillDbWithMock = async (req, res, next) => {
    try {
        await service_1.default.fillDbWithMock();
        res.status(200).send();
    }
    catch (e) {
        //
    }
};
exports.default = {
    getMe,
    getAllAdmins,
    setStatus,
    fillDbWithMock
};
