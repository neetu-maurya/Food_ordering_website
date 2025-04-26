"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("../controller/feedback.controller");
const router = express_1.default.Router();
// ✅ Fix: Use `/` instead of `/feedback` since it's already mounted at `/api/v1/feedback`
router.post("/", feedback_controller_1.submitFeedback);
router.get("/", feedback_controller_1.getFeedback);
exports.default = router;
