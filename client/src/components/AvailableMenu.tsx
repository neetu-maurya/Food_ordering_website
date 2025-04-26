import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

import { MenuItem } from "@/types/restaurantType";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFeedbackStore } from "@/store/useFeedbackStore";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const { submitFeedback, fetchFeedback, feedbackList, loading, error } =
    useFeedbackStore();

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleFeedbackSubmit = async () => {
    if (!rating || !feedback.trim()) {
      alert("Please provide both a rating and feedback.");
      return;
    }
    await submitFeedback(rating, feedback);
    if (error) {
      alert(`Error: ${error}`);
    } else {
      alert("Thank you for your feedback!");
      setIsFeedbackOpen(false);
      setFeedback("");
      setRating(0);
      fetchFeedback(); // Refresh feedback
    }
  };

  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menus?.map((menu: MenuItem, index) => (
          <Card
            key={index}
            className="w-full md:max-w-[300px] shadow-lg rounded-lg overflow-hidden flex flex-col max-h-[400px]"
          >
            {/* Image Section */}
            <div className="h-[180px] w-full bg-white flex justify-center items-center">
              <img
                src={menu.image}
                alt={menu.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Content Section */}
            <CardContent className="p-4 flex-1 flex flex-col justify-between">
              <h2 className="text-xl font-semibold">{menu.name}</h2>
              <p className="text-sm text-gray mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold">
                Price:{" "}
                <span className="text-red-600 font-bold">₹{menu.price}</span>
              </h3>
            </CardContent>
            {/* Footer Section */}
            <CardFooter className="p-4 flex flex-col gap-2">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-md w-full"
              >
                Add to Cart
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white rounded-md w-full"
                onClick={() => setIsFeedbackOpen(true)}
              >
                Give Feedback
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Feedback Display */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Feedback from Customers</h2>
        {loading ? (
          <p>Loading feedback...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : feedbackList.length === 0 ? (
          <p>No feedback available</p>
        ) : (
          <ul>
            {feedbackList.map((item, index) => (
              <li key={index} className="border p-4 rounded-md mb-2">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < item.rating ? "text-yellow-500" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p>{item.feedback}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feedback Form Modal */}
      {isFeedbackOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Feedback</h2>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    rating >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              className="w-full border p-2 rounded-md"
              rows={4}
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button
                className="bg-gray-300 hover:bg-gray-200 text-black rounded-md px-4 py-2"
                onClick={() => setIsFeedbackOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={`text-black px-3 py-1 bg-yellow-300 ${
                  loading ? "opacity-50" : "hover:bg-yellow-200"
                } rounded-full transition duration-200`}
                onClick={handleFeedbackSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableMenu;


