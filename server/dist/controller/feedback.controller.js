"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedback = exports.submitFeedback = void 0;
const feedback_model_1 = __importDefault(require("../model/feedback.model")); // Ensure the correct path
// Save feedback
const submitFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, feedback } = req.body;
        if (!rating || !feedback) {
            res.status(400).json({ error: "Rating and feedback are required" });
            return;
        }
        const newFeedback = new feedback_model_1.default({ rating, feedback });
        yield newFeedback.save();
        res.status(201).json(newFeedback); // ✅ Return the newly created feedback
    }
    catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ error: "Server Error" });
    }
});
exports.submitFeedback = submitFeedback;
// Get feedback
const getFeedback = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedback_model_1.default.find().sort({ date: -1 });
        res.status(200).json(feedbacks);
    }
    catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Server Error" });
    }
});
exports.getFeedback = getFeedback;
