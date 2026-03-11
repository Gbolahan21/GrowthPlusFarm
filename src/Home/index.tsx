import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "../helpers/notification";

type HomeProps = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

const Home = ({ cart, setCart }: HomeProps) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  // Crop data
  const allCrops = [
    { name: "Maize", price: 1200, img: "https://via.placeholder.com/150", type: "Grain" },
    { name: "Rice", price: 2500, img: "https://via.placeholder.com/150", type: "Grain" },
    { name: "Cassava", price: 800, img: "https://via.placeholder.com/150", type: "Root" },
    { name: "Tomatoes", price: 600, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Yam", price: 1500, img: "https://via.placeholder.com/150", type: "Root" },
    { name: "Peppers", price: 900, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Oranges", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Apples", price: 1200, img: "https://via.placeholder.com/150", type: "Fruit" },
  ];

  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Filtered crops
  const filteredCrops = filter === "All" ? allCrops : allCrops.filter((crop) => crop.type === filter);
  const visibleCrops = showAll ? filteredCrops : filteredCrops.slice(0, 4);

  // Add to cart
const addToCart = (crop: any) => {
  const exists = cart.some((item) => item.name === crop.name);

  if (!exists) {
    setCart((prev) => [...prev, crop]);
    notification.success(`${crop.name} has been added to your cart!`);
  } else {
    notification.error(`${crop.name} is already in your cart!`);
  }
};

  const navigateToCart = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-green-700 text-white p-4 px-30 flex justify-between items-center">
        <div className="text-2xl font-bold">GrowthPlusFarm</div>
        <ul className="flex gap-6">
          <li className="hover:text-green-200 cursor-pointer">Home</li>
          <li className="hover:text-green-200 cursor-pointer">Crops</li>
          <li className="hover:text-green-200 cursor-pointer">Tips</li>
          <li className="hover:text-green-200 cursor-pointer">Contact</li>
          <button
                onClick={navigateToCart}
                className="relative bg-white text-green-700 px-3 py-1 rounded cursor-pointer"
            >
                🛒
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {cart.length}
                    </span>
                )}
          </button>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="bg-green-100 flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-bold text-green-900 mb-4">
          Welcome to GrowthPlusFarm
        </h1>
        <p className="text-lg text-green-800 mb-6">
          Connecting farmers and buyers across Nigeria
        </p>
        <button className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer">
          Get Started
        </button>
      </header>

      {/* Marketplace Section */}
      <section className="py-16 px-30 bg-green-100">
        <h2 className="text-3xl font-semibold text-green-900 mb-8 text-center">
        Crops Marketplace
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
        {["All", "Grain", "Vegetable", "Root", "Fruit"].map((type) => (
            <button
            key={type}
            className={`px-4 py-2 rounded-lg ${
                filter === type
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border border-green-700"
            } hover:bg-green-600 hover:text-white transition cursor-pointer`}
            onClick={() => {
                setFilter(type);
                setShowAll(false); // Reset to 4 when filter changes
            }}
            >
            {type}
            </button>
        ))}
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleCrops.map((crop) => (
            <div
            key={crop.name}
            className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden flex flex-col"
            >
            <img
                src={crop.img}
                alt={crop.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-green-800">{crop.name}</h3>
                <p className="text-green-700 mt-2">₦{crop.price.toLocaleString()}</p>
                <p className="text-green-600 mt-1 mb-3 text-sm">{crop.type}</p>
                <button
                className="mt-auto w-full py-2 bg-green-700 text-white rounded hover:bg-green-800 cursor-pointer"
                onClick={() => addToCart(crop)}
                >
                Add to Cart
                </button>
            </div>
            </div>
        ))}
        </div>

        {/* See More Button */}
        {filteredCrops.length > 4 && (
        <div className="flex justify-center mt-8">
            <button
            className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition cursor-pointer"
            onClick={() => setShowAll(!showAll)}
            >
            {showAll ? "Show Less" : "See More"}
            </button>
        </div>
        )}
      </section>

      {/* Farming Tips Section */}
      <section className="py-16 px-8 bg-green-100">
        <h2 className="text-3xl font-semibold text-green-900 mb-6 text-center">
          Latest Farming Tips
        </h2>
        <p className="max-w-3xl mx-auto text-green-800 text-center">
          Learn modern farming techniques, pest control methods, and market
          strategies to maximize your harvest and profits.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 text-center">
        <p>© {currentYear} GrowthPlusFarm. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;