import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type CartItem = {
  name: string;
  price: number;
  img?: string;
  type?: string;
  quantity?: number;
};

type Props = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Cart = ({ cart, setCart }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  // Add item when page receives one
  useEffect(() => {
    if (item) {
      setCart((prev) => {
        const exists = prev.find((i) => i.name === item.name);
        if (!exists) return [...prev, { ...item, quantity: 1 }];
        return prev;
      });
    }
  }, [item]);

  // Update quantity
  const updateQuantity = (index: number, delta: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) + delta) }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Total price
  const total = cart.reduce(
    (sum, item) => sum + (item.price * (item.quantity ?? 1)),
    0
  );

  return (
    <div className="min-h-screen bg-green-50 lg:px-30 p-3 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-900">Your Cart</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-green-700">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
            {cart.map((item, index) => (
            <div key={index} className="border-b py-4">
                
                {/* Row 1: Name + Remove */}
                <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-green-800">{item.name}</p>
                <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Remove item"
                >
                    🗑️
                </button>
                </div>

                {/* Row 2: Price + Quantity */}
                <div className="flex justify-between items-center">
                <p className="text-green-700">₦{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                    <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                    -
                    </button>
                    <span className="px-3 py-1 border rounded">{item.quantity ?? 1}</span>
                    <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                    +
                    </button>
                </div>
                </div>

            </div>
            ))}

          <div className="text-right font-bold mt-4 text-green-900">
            Total: ₦{total.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;