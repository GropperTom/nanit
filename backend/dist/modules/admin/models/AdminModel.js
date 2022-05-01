"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.adminSchema = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true }
};
const mongooseAdminSchema = new mongoose_1.Schema(exports.adminSchema);
exports.AdminModel = (0, mongoose_1.model)('Administrator', mongooseAdminSchema);
