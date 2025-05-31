import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "JWT secret is not configured." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // You can optionally attach the decoded payload to req.user for later use
    //req.user = decoded;

    next();
  });
};
