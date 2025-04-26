"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    var _a;
    try {
        console.log("Received Cookies:", req.cookies);
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
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
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.userId)) {
            console.warn("Invalid token payload:", decoded);
            res.status(401).json({ success: false, message: "Invalid token" });
            return;
        }
        req.id = decoded.userId;
        console.log("User Authenticated:", decoded.userId);
        next();
    }
    catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
exports.isAuthenticated = isAuthenticated;
