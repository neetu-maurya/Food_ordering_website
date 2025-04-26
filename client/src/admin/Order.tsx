import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Order = () => {
  return (
    <div className="max-w-6xl mx-auto my-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Order Details
      </h1>
      <div className="space-y-8">
        {/* Single Order Card */}
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700 space-y-4 md:space-y-0">
          <div className="flex-1 mb-6 sm:mb-0 text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              Order #12345
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold">Customer:</span> John Doe
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold">Address:</span> 123 Main Street,
              Springfield
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold">Total Amount:</span> ₹1200
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order Status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "Pending",
                    "Confirmed",
                    "Preparing",
                    "Out for Delivery",
                    "Delivered",
                  ].map((status, index) => (
                    <SelectItem key={index} value={status.toLowerCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
