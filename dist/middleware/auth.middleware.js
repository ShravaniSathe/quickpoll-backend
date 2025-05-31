"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret is not configured." });
    }
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // You can optionally attach the decoded payload to req.user for later use
        //req.user = decoded;
        next();
    });
};
exports.verifyAdmin = verifyAdmin;
