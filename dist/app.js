"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const poll_routes_1 = __importDefault(require("./routes/poll.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
// connect to Db
(0, db_1.connectDB)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use("/api/polls", poll_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
exports.default = app;
