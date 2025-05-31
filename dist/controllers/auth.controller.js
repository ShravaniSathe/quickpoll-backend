"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "password123";
const adminLogin = (req, res) => {
    const { email, password } = req.body;
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT secret is not configured." });
        }
        const token = jsonwebtoken_1.default.sign({ email }, secret, { expiresIn: "1h" });
        return res.json({ token });
    }
    return res.status(401).json({ message: "Invalid credentials" });
};
exports.adminLogin = adminLogin;
