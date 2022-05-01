"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostModel_1 = require("./models/PostModel");
let idCounter = 0;
const getAllPosts = async () => {
    return PostModel_1.PostModel.find({});
};
const addPost = async (content) => {
    await PostModel_1.PostModel.create({ "id": idCounter, content });
    idCounter++;
};
const editPost = async (id, newContent) => {
    await PostModel_1.PostModel.findOneAndUpdate({ id }, { $set: { "content": newContent } });
};
const deletePost = async (id, newContent) => {
    await PostModel_1.PostModel.findOneAndDelete({ id });
};
exports.default = {
    getAllPosts,
    addPost,
    editPost,
    deletePost
};
