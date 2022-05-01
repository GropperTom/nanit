"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./modules/admin/routes"));
const routes_2 = __importDefault(require("./modules/auth/routes"));
const routes_3 = __importDefault(require("./modules/posts/routes"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
// import jwtFilter from "./modules/auth/middleware/jwt_filter";
const app = (0, express_1.default)();
// JSON
app.use((0, body_parser_1.json)());
// CORS
app.use((0, cors_1.default)());
// Cache-control
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
// Routers
// app.use("*", jwtFilter);
app.use(routes_3.default.path, routes_3.default.router);
app.use(routes_1.default.path, routes_1.default.router);
app.use(routes_2.default.path, routes_2.default.router);
// Error handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
// DB
(0, db_1.default)().then(() => {
    app.listen(3001);
});
