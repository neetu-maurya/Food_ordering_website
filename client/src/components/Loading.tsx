import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-800 to-emerald-900 flex items-center justify-center">
      <Loader className="animate-spin w-16 h-16 text-white" aria-label="Loading" />
    </div>
  );
};

export default Loading;
