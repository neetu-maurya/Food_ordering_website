"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
// Authentication Routes
router.post("/signup", user_controller_1.signup);
router.post("/login", user_controller_1.login);
router.post("/logout", user_controller_1.logout);
router.post("/verify-email", user_controller_1.verifyEmail);
// Password Management Routes
router.post("/forgot-password", user_controller_1.forgotPassword);
router.post("/reset-password/:token", user_controller_1.resetPassword);
// Profile and Protected Routes
router.get("/check-auth", isAuthenticated_1.isAuthenticated, user_controller_1.checkAuth);
router.put("/profile/update", isAuthenticated_1.isAuthenticated, user_controller_1.updateProfile);
exports.default = router;
