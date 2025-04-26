"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, user) => {
    // Ensure SECRET_KEY is defined before proceeding
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined in environment variables.");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, secretKey, { expiresIn: "1d" } // Token expiration set to 1 day
    );
    // Set the token as a secure HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict", // Ensure cross-site request cookie handling
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    return token;
};
exports.generateToken = generateToken;
