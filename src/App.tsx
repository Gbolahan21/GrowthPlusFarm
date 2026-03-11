import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import { Toaster } from "react-hot-toast";

function App() {
  const [cart, setCart] = useState<any[]>([]); // Cart lives here

  return (
    <Router>
      {/* Toaster must be outside Routes */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={<Home cart={cart} setCart={setCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;