import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

interface Feedback {
  _id?: string;
  rating: number;
  feedback: string;
}

interface FeedbackState {
  feedbackList: Feedback[];
  loading: boolean;
  error: string | null;
  fetchFeedback: () => Promise<void>;
  submitFeedback: (rating: number, feedback: string) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbackList: [],
      loading: false,
      error: null,

      // Fetch Feedback
      fetchFeedback: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.get("http://localhost:8000/api/v1/feedback");

          if (Array.isArray(response.data)) {
            set({ feedbackList: response.data, loading: false });
          } else {
            throw new Error("Invalid data format from server");
          }
        } catch (error: any) {
          console.error("Error fetching feedback:", error);
          set({
            error: error.response?.data?.message || error.message || "Failed to fetch feedback",
            loading: false,
          });
        }
      },

      // Submit Feedback
      submitFeedback: async (rating, feedback) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post("http://localhost:8000/api/v1/feedback", {
            rating,
            feedback,
          });

          const newFeedback = response.data;

          set((state) => ({
            feedbackList: [newFeedback, ...state.feedbackList], // Add new feedback to the top
            loading: false,
          }));
        } catch (error: any) {
          console.error("Error submitting feedback:", error);
          set({
            error: error.response?.data?.message || error.message || "Failed to submit feedback",
            loading: false,
          });
        }
      },
    }),
    {
      name: "feedback-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
