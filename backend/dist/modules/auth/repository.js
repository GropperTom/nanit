"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./models/user_model");
const getUserByEmail = async (email) => {
    return user_model_1.user_model.findOne({ email });
};
const registerUser = async (email, name, password) => {
    await user_model_1.user_model.create({ email, name, password });
};
exports.default = {
    getUserByEmail,
    registerUser
};
