import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  verifyEmail,
} from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);

// Password Management Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Profile and Protected Routes
router.get("/check-auth", isAuthenticated, checkAuth);
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
