"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const registerNewUser = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const registerSuccess = await service_1.default.registerNewUser(name, email, password);
        if (registerSuccess) {
            res.status(200).send();
        }
        else {
            res.status(400).json({ msg: "username already exists" });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something went wrong" });
    }
};
const login = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const loginSuccess = await service_1.default.login(password, email);
        if (loginSuccess) {
            const payload = {
                user: {
                    email
                }
            };
            jsonwebtoken_1.default.sign(payload, config_1.default.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) {
                    res.status(400).json({ msg: "something went wrong" });
                }
                else {
                    res.status(200).json({ "x-auth-token": token });
                }
            });
        }
        else {
            res.status(400).json({ msg: "invalid credentials" });
        }
    }
    catch (e) {
        res.status(400).json({ msg: "something went wrong" });
    }
};
exports.default = {
    registerNewUser,
    login
};
