import express from "express";
import { submitFeedback, getFeedback } from "../controller/feedback.controller";

const router = express.Router();

// ✅ Fix: Use `/` instead of `/feedback` since it's already mounted at `/api/v1/feedback`
router.post("/", submitFeedback);
router.get("/", getFeedback);

export default router;
