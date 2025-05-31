import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "password";

export const adminLogin = (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return res.status(500).json({ message: "JWT secret is not configured." });
        }

        const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
        return res.json({ token });

    }

    return res.status(401).json({ message: "Invalid credentials" });
};
