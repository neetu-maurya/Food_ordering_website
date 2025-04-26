import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { restaurantFormSchema } from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";

type RestaurantForm = z.infer<typeof restaurantFormSchema>;

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantForm>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [cuisineText, setCuisineText] = useState(""); // Temp input for cuisines
  const [errors, setErrors] = useState<
    Partial<Record<keyof RestaurantForm, string>>
  >({});

  const {
    loading,
    restaurant,
    createRestaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  // ✅ Fixing useEffect: Runs when restaurant changes
  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
    };
    fetchRestaurant();
  }, []);

  useEffect(() => {
    if (restaurant) {
      setInput({
        restaurantName: restaurant.restaurantName || "",
        city: restaurant.city || "",
        country: restaurant.country || "",
        deliveryTime: restaurant.deliveryTime || 0,
        cuisines: restaurant.cuisines ? [...restaurant.cuisines] : [],
        imageFile: undefined,
      });
    }
  }, [restaurant]); // ✅ Now updates when restaurant is available

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" && value !== "" ? Number(value) : value,
    });
  };

  // ✅ Improved cuisine handling (adds on Enter or Comma)
  const handleCuisineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedCuisine = cuisineText.trim();
      if (trimmedCuisine && !input.cuisines.includes(trimmedCuisine)) {
        setInput({ ...input, cuisines: [...input.cuisines, trimmedCuisine] });
      }
      setCuisineText(""); // Reset input field
    }
  };

  // ✅ Allows removing a cuisine from list
  const removeCuisine = (cuisine: string) => {
    setInput({
      ...input,
      cuisines: input.cuisines.filter((c) => c !== cuisine),
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFormSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Partial<Record<keyof RestaurantForm, string>>);
      return;
    }

    setErrors({});
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile instanceof File) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="font-extrabold text-2xl mb-5">
        {restaurant ? "Update Restaurant" : "Add Restaurant"}
      </h1>
      <form onSubmit={submitHandler}>
        <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
          {/* ✅ Restaurant Name */}
          <div>
            <Label>Restaurant Name</Label>
            <Input
              type="text"
              name="restaurantName"
              placeholder="Enter your Restaurant name"
              value={input.restaurantName}
              onChange={changeEventHandler}
            />
            {errors.restaurantName && (
              <span className="text-xs text-red-600">
                {errors.restaurantName}
              </span>
            )}
          </div>

          {/* ✅ City */}
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              placeholder="Enter city"
              value={input.city}
              onChange={changeEventHandler}
            />
            {errors.city && (
              <span className="text-xs text-red-600">{errors.city}</span>
            )}
          </div>

          {/* ✅ Country */}
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              placeholder="Enter country"
              value={input.country}
              onChange={changeEventHandler}
            />
            {errors.country && (
              <span className="text-xs text-red-600">{errors.country}</span>
            )}
          </div>

          {/* ✅ Delivery Time */}
          <div>
            <Label>Delivery Time (mins)</Label>
            <Input
              type="number"
              name="deliveryTime"
              placeholder="Enter time"
              value={input.deliveryTime}
              onChange={changeEventHandler}
            />
            {errors.deliveryTime && (
              <span className="text-xs text-red-600">
                {errors.deliveryTime}
              </span>
            )}
          </div>

          {/* ✅ Cuisines (Improved) */}
          <div>
            <Label>Cuisines</Label>
            <div className="flex flex-wrap gap-2">
              {input.cuisines.map((cuisine, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-md">
                  {cuisine}
                  <button
                    onClick={() => removeCuisine(cuisine)}
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <Input
              type="text"
              name="cuisines"
              placeholder="Type and press Enter"
              value={cuisineText}
              onChange={(e) => setCuisineText(e.target.value)}
              onKeyDown={handleCuisineKeyDown}
            />
            {errors.cuisines && (
              <span className="text-xs text-red-600">{errors.cuisines}</span>
            )}
          </div>

          {/* ✅ File Upload */}
          <div>
            <Label>Upload Banner</Label>
            <Input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={(e) =>
                setInput({
                  ...input,
                  imageFile: e.target.files?.[0] || undefined,
                })
              }
            />
            {errors.imageFile && (
              <span className="text-xs text-red-600">{errors.imageFile}</span>
            )}
          </div>

          {/* ✅ Submit Button */}
          <div className="my-5 w-fit">
            <Button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : restaurant ? (
                "Update Your Restaurant"
              ) : (
                "Add Your Restaurant"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Restaurant;
