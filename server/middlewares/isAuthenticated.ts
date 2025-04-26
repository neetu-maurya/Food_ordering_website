import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include 'id' for user identification
declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log("Received Cookies:", req.cookies);

    const token = req.cookies?.token;
    if (!token) {
      console.warn("No token found in cookies");
      res.status(401).json({ success: false, message: "User not authenticated" });
      return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      console.error("SECRET_KEY is missing in the environment variables.");
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    if (!decoded?.userId) {
      console.warn("Invalid token payload:", decoded);
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    req.id = decoded.userId;
    console.log("User Authenticated:", decoded.userId);

    next();
  } catch (error) {
    console.error("JWT Verification Error:", (error as Error).message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

