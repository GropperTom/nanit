"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostModel_1 = require("./models/PostModel");
const repository_1 = __importDefault(require("./repository"));
const getAllPosts = async () => {
    return await repository_1.default.getAllPosts();
};
const addPost = async (content) => {
    try {
        await repository_1.default.addPost(content);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
const editPost = async (id, newContent) => {
    try {
        await repository_1.default.editPost(id, newContent);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
const deletePost = async (id, newContent) => {
    try {
        await repository_1.default.deletePost(id, newContent);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
const fillDbWithMock = async () => {
    const newRecords = [...Array(20).keys()].map(i => {
        const randomType = ["WORKING", "ON_VACATION", "LUNCH_TIME", "BUSINESS_TRIP"][Math.floor(Math.random() * 4)];
        return new PostModel_1.PostModel({
            email: i.toString() + "@" + i.toString() + ".com",
            name: i.toString(),
            status: randomType
        });
    });
    // Recreate collection with newly generated records
    await PostModel_1.PostModel.insertMany(newRecords);
};
exports.default = {
    getAllPosts,
    addPost,
    editPost,
    fillDbWithMock,
    deletePost
};
