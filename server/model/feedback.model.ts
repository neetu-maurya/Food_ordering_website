import mongoose, { Document, Schema } from "mongoose";

interface IFeedback extends Document {
  rating: number;
  feedback: string;
  date: Date;
}

const feedbackSchema = new Schema<IFeedback>({
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);
