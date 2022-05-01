"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("./repository"));
const repository_2 = __importDefault(require("../admin/repository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerNewUser = async (name, email, password) => {
    const user = await repository_1.default.getUserByEmail(email);
    if (user) {
        return false;
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const encryptedPassword = await bcryptjs_1.default.hash(password, salt);
    await repository_1.default.registerUser(email, name, encryptedPassword);
    await repository_2.default.addUser(email, name);
    return true;
};
const login = async (password, email) => {
    const user = await repository_1.default.getUserByEmail(email);
    if (!user) {
        return false;
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    return isMatch;
};
exports.default = {
    login,
    registerNewUser
};
