import {RequestHandler} from "express";
import service from "./service";
import {IAdmin} from "./models/AdminModel";
import AdminDataDto from "./dto/AdminDataDto";

const parseToDto = (admin: IAdmin): AdminDataDto => {
    return {
        name: admin.name,
        status: admin.status,
        email: admin.email
    };
}

const getMe: RequestHandler = async (req, res, next) => {
    try {
        const me: IAdmin = await service.getMe(req.user!.email);
        const meDto: AdminDataDto = parseToDto(me);

        res.status(200).json(meDto);
    }
    catch(e) {
        res.status(400).json({msg: "error"});
    }
}

const getAllAdmins: RequestHandler = async (req, res, next) => {
    try {
        const admins: IAdmin[] = await service.getAllAdmins();
        const adminsDto: AdminDataDto[] = admins.map((admin) => parseToDto(admin));

        res.status(200).json(adminsDto);
    }
    catch(e) {
    }
}

const setStatus: RequestHandler = async (req, res, next) => {
    try {
        const email = req.user!.email;
        await service.setStatus(req.body.status, email);
        res.status(200).json();
    }
    catch(e) {
        res.status(400).send();
    }
}

const fillDbWithMock: RequestHandler = async (req, res, next) => {
    try {
        await service.fillDbWithMock();
        res.status(200).send();
    }
    catch(e) {
        //
    }
}

export default {
    getMe,
    getAllAdmins,
    setStatus,
    fillDbWithMock
}
