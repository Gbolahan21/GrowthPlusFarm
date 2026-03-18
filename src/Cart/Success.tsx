import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Confetti from "react-confetti";

const Success = () => {
  const navigate = useNavigate();

  // ✅ Generate orderId once when component mounts
  const [orderId] = useState(() => {
    return "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 relative overflow-hidden">
      <Confetti />
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center z-10 w-[400px]">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-2">
          Your order has been placed successfully.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Order ID: <span className="font-bold text-green-700">{orderId}</span>
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-green-700 text-white px-5 py-3 rounded-lg font-bold hover:bg-green-800 transition cursor-pointer"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="bg-gray-200 text-gray-800 px-5 py-3 rounded-lg font-bold hover:bg-gray-300 transition cursor-pointer"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;