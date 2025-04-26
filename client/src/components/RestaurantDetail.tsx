
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const RestaurantDetail = () => {
  const params = useParams();
  const {singleRestaurant,getSingleRestaurant} = useRestaurantStore();
  
  useEffect(()=>
  {
    getSingleRestaurant(params.id!);
    console.log(singleRestaurant);

  },[params.id]);
  return (
    <div className="max-w-6xl mx-auto my-6 px-4">
      {/* Restaurant Image */}
      <div className="relative w-full h-32 md:h-56 lg:h-64 mb-4">
        <img
          src={singleRestaurant?.imageUrl || "Loading..."}
          alt="res_image"
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
      </div>

      {/* Restaurant Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="font-medium text-2xl mb-1">{singleRestaurant?.restaurantName || "Loading..."}</h1>
          {/* Cuisine Badges */}
          <div className="flex gap-2 mb-2">
            {singleRestaurant?.cuisines.map((cuisine, idx) => (
              <Badge
                key={idx}
                className="text-black px-3 py-1 bg-yellow-300 hover:bg-yellow-200 shadow-sm rounded-full transition duration-200"
              >
                {cuisine}
              </Badge>
            ))}
          </div>
          {/* Delivery Time */}
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gray-600" />
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Delivery Time:{" "}
              <span className="text-red-600 font-semibold">{singleRestaurant?.deliveryTime || "NA"} mins</span>
            </p>
          </div>
        </div>
      </div>

      {/* Available Menu */}
      <AvailableMenu menus={singleRestaurant?.menus!}/>
    </div>
  );
};

export default RestaurantDetail;
