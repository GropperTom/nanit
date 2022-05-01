"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminModel_1 = require("./models/AdminModel");
const repository_1 = __importDefault(require("./repository"));
const getMe = async (email) => {
    return await repository_1.default.getMe(email);
};
const getAllAdmins = async () => {
    return await repository_1.default.getAllAdmins();
};
const setStatus = async (newStatus, email) => {
    await repository_1.default.setStatus(newStatus, email);
};
const fillDbWithMock = async () => {
    const newRecords = [...Array(20).keys()].map(i => {
        const randomType = ["WORKING", "ON_VACATION", "LUNCH_TIME", "BUSINESS_TRIP"][Math.floor(Math.random() * 4)];
        return new AdminModel_1.AdminModel({
            email: i.toString() + "@" + i.toString() + ".com",
            name: i.toString(),
            status: randomType
        });
    });
    // Recreate collection with newly generated records
    await AdminModel_1.AdminModel.insertMany(newRecords);
};
exports.default = {
    getMe,
    getAllAdmins,
    setStatus,
    fillDbWithMock
};
