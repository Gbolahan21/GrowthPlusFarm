import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PaystackButton } from "react-paystack";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "Paid" | "Pending";
};

type CheckoutProps = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
};

const Checkout = ({ cart, setCart, setOrders }: CheckoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total || 0;

  // generate orderId once per render
  const [orderId] = useState(() =>
    "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0")
  );

  const publicKey = "pk_test_c1fb07c196d55dab679a138f0425c87eef092832";

  const componentProps = {
    email: "customer@email.com",
    amount: total * 100,
    publicKey,
    text: "Pay Now",
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: "John Doe",
        },
      ],
    },
    onSuccess: () => {
      const newOrder: Order = {
        id: orderId,
        items: cart.map(i => ({
          ...i,
          quantity: i.quantity ?? 1, // ✅ default to 1 if missing
        })),
        total: cart.reduce(
          (sum, i) => sum + i.price * (i.quantity ?? 1),
          0
        ),
        date: new Date().toLocaleString(),
        status: "Paid",
      };

      setOrders((prev: Order[]) => [...prev, newOrder]);
      setCart([]);
      navigate("/success");
    },
    onClose: () => alert("Payment Closed"),
  };

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Checkout</h1>
        <button
          onClick={() => navigate("/cart")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition cursor-pointer"
        >
          ← Back to Cart
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {cart.map((item: CartItem, index: number) => (
          <div key={index} className="flex justify-between border-b py-2">
            <span>{item.name}</span>
            <span>₦{item.price * (item.quantity ?? 1)}</span>
          </div>
        ))}

        <div className="font-bold text-right mt-4">
          Total: ₦{total.toLocaleString()}
        </div>

        <PaystackButton
          {...componentProps}
          className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Checkout;