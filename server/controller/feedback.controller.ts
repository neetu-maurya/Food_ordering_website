import { Request, Response } from "express";
import Feedback from "../model/feedback.model"; // Ensure the correct path

// Save feedback
export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating, feedback } = req.body;

    if (!rating || !feedback) {
      res.status(400).json({ error: "Rating and feedback are required" });
      return;
    }

    const newFeedback = new Feedback({ rating, feedback });
    await newFeedback.save();

    res.status(201).json(newFeedback); // ✅ Return the newly created feedback
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get feedback
export const getFeedback = async (_req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
