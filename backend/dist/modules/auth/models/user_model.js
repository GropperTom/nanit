"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_model = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
};
const mongooseUserSchema = new mongoose_1.Schema(exports.userSchema);
exports.user_model = (0, mongoose_1.model)('User', mongooseUserSchema);
