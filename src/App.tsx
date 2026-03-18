/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Checkout from "./Cart/Checkout";
import Success from "./Cart/Success";
import Orders from "./Cart/Orders";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    return savedLogin === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

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
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
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