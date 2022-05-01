"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminModel_1 = require("./models/AdminModel");
const getAllAdmins = async () => {
    return AdminModel_1.AdminModel.find({});
};
const getMe = async (email) => {
    return AdminModel_1.AdminModel.findOne({ email });
};
const setStatus = async (status, email) => {
    await AdminModel_1.AdminModel.findOneAndUpdate({ email }, { $set: { status } });
};
const addUser = async (email, name) => {
    const status = "WORKING";
    await AdminModel_1.AdminModel.create({ email, name, status });
};
exports.default = {
    getMe,
    getAllAdmins,
    addUser,
    setStatus
};
