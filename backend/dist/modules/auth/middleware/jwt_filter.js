"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const routes_1 = __importDefault(require("../../../modules/auth/routes"));
const jwtFilter = (req, res, next) => {
    if (req.baseUrl.startsWith(routes_1.default.path)) {
        return next();
    }
    const token = req.get('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'no token, authorization denied' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (e) {
        res.status(401).json({ msg: "invalid token" });
    }
};
exports.default = jwtFilter;
