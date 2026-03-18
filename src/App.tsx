/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Success from "./Checkout/Success";
import Orders from "./Checkout/Orders";
import { Toaster } from "react-hot-toast";

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

function App() {
  const [cart, setCart] = useState<any[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <>
      {/* Toaster must be outside Routes */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} setOrders={setOrders} />}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
      </Routes>
    </>
  );
}

export default App;