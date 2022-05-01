"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const express_validator_1 = require("express-validator");
const parseToDto = (post) => {
    return {
        id: post.id,
        content: post.content
    };
};
const getAllPosts = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const posts = await service_1.default.getAllPosts();
        const postsDto = posts.map((post) => parseToDto(post));
        res.status(200).json(postsDto);
    }
    catch (e) {
        res.status(400).send(e);
    }
};
const addPost = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const success = await service_1.default.addPost(req.body.content);
    if (success) {
        res.status(200).json();
    }
    else {
        res.status(400).send();
    }
};
const editPost = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const success = await service_1.default.editPost(Number(req.params.id), req.body.content);
    if (success) {
        res.status(200).json();
    }
    else {
        res.status(400).send();
    }
};
const deletePost = async (req, res, next) => {
    const success = await service_1.default.deletePost(Number(req.params.id), req.body.content);
    if (success) {
        res.status(200).json();
    }
    else {
        res.status(400).send();
    }
};
exports.default = {
    getAllPosts,
    addPost,
    editPost,
    deletePost
};
