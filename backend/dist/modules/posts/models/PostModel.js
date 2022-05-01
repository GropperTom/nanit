"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
exports.postSchema = {
    id: { type: Number, required: true },
    content: { type: String, required: true },
};
const mongoosePostSchema = new mongoose_1.Schema(exports.postSchema);
exports.PostModel = (0, mongoose_1.model)('Posts', mongoosePostSchema);
