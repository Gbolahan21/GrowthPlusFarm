import { useNavigate } from "react-router-dom";

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "Paid" | "Pending";
};

type Props = {
  orders: Order[];
};

const Orders = ({ orders }: Props) => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <p className="text-green-700 text-xl mb-4">No orders yet.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 lg:p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-900">Your Orders</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition cursor-pointer"
        >
          ← Go Home
        </button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-700"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-bold text-green-800">Order ID: {order.id}</p>
                <p className="text-gray-500 text-sm">{order.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-bold text-sm ${
                  order.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-gray-700">
                    <span>
                      {item.name} x{item.quantity ?? 1} {/* fallback to 1 */}
                    </span>
                    <span>₦{((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="text-right font-bold mt-4 text-green-900">
              Total: ₦{order.total.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;