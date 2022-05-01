"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const express_validator_1 = require("express-validator");
const PostRouter = (0, express_1.Router)();
const basePath = '/posts';
PostRouter.get('/', (0, express_validator_1.body)('content', 'missing field "content"').not().isEmpty(), controller_1.default.getAllPosts);
PostRouter.post('/', (0, express_validator_1.body)('content', 'missing field "content"').not().isEmpty(), controller_1.default.addPost);
PostRouter.put('/:id', (0, express_validator_1.body)('content', 'missing field "content"').not().isEmpty(), controller_1.default.editPost);
PostRouter.delete('/:id', controller_1.default.deletePost);
exports.default = {
    router: PostRouter,
    path: basePath
};
