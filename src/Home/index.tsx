import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "../helpers/notification";

import GrowthPlusLogo from "../assets/images.jpeg";

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
    { name: "Lemon", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Rice", price: 2500, img: "https://via.placeholder.com/150", type: "Grain" },
    { name: "Cassava", price: 800, img: "https://via.placeholder.com/150", type: "Root" },
    { name: "Tomatoes", price: 600, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Mango", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Habanero Pepper", price: 600, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Yam", price: 1500, img: "https://via.placeholder.com/150", type: "Root" },
    { name: "Peppers", price: 900, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Oranges", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Carrot", price: 1200, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Apples", price: 1200, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Chilli pepper", price: 1200, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Cucumber", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Bell pepper", price: 1200, img: "https://via.placeholder.com/150", type: "Vegetable" },
    { name: "Beans", price: 2500, img: "https://via.placeholder.com/150", type: "Grain" },
    { name: "Pawpaw", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
    { name: "Watermelon", price: 700, img: "https://via.placeholder.com/150", type: "Fruit" },
  ];

  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [itemsToShow, setItemsToShow] = useState(isMobile ? 2 : 4);

  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 769;
        setIsMobile(mobile);
        setItemsToShow(mobile ? 2 : 4); // reset items when screen resizes
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtered crops
  const filteredCrops = filter === "All" ? allCrops : allCrops.filter((crop) => crop.type === filter);
  const initialItems = isMobile ? 2 : 4;
  const visibleCrops = filteredCrops.slice(0, itemsToShow || initialItems);

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
    <nav className="bg-green-700 text-white p-4 sm:px-6 md:px-12 lg:px-20 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
        <img src={GrowthPlusLogo} alt="GrowthPlusFarm Logo" className="h-10 w-10 rounded-full" />
        <span className="font-bold text-lg sm:text-xl">GrowthPlusFarm</span>
        </div>
        <ul className="flex flex-wrap gap-4 sm:gap-6 items-center">
        <button
            onClick={navigateToCart}
            className="relative bg-white text-green-700 px-3 py-1 rounded cursor-pointer text-sm sm:text-base"
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
    <header className="bg-green-100 flex flex-col items-center justify-center text-center py-16 sm:py-20 px-4 sm:px-6 md:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-900 mb-4">
        Welcome to GrowthPlusFarm
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-green-800 mb-6 max-w-xl">
        At Growthplusfarms, we are into production of Market Garden crops and Agroforestry which are produced organically, and connecting farmers and buyers across Nigeria
        </p>
        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 cursor-pointer">
        Get Started
        </button>
    </header>

    {/* Marketplace Section */}
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-100">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-900 mb-6 sm:mb-8 text-center">
        Crops Marketplace
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        {["All", "Grain", "Vegetable", "Root", "Fruit"].map((type) => (
            <button
            key={type}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-sm sm:text-base cursor-pointer ${
                filter === type
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border border-green-700"
            } hover:bg-green-600 hover:text-white transition`}
            onClick={() => {
                setFilter(type);
               setItemsToShow(isMobile ? 2 : 4); // reset to 4
            }}
            >
            {type}
            </button>
        ))}
        </div>

        {/* Crop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-green-800">{crop.name}</h3>
                <p className="text-green-700 mt-1 sm:mt-2">₦{crop.price.toLocaleString()}</p>
                <p className="text-green-600 mt-1 mb-2 sm:mb-3 text-sm sm:text-base">{crop.type}</p>
                <button
                className="mt-auto w-full py-2 sm:py-3 bg-green-700 text-white rounded hover:bg-green-800 cursor-pointer text-sm sm:text-base"
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
        <div className="flex justify-center mt-6 gap-2">
        {visibleCrops.length < filteredCrops.length && (
            <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-green-700 text-white rounded hover:bg-green-800 transition cursor-pointer text-sm sm:text-base"
            onClick={() =>
                setItemsToShow((prev) => prev + (isMobile ? 2 : 4))
            }
            >
            See More
            </button>
        )}

        {visibleCrops.length > initialItems && (
            <button
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-400 text-white rounded hover:bg-gray-500 transition cursor-pointer text-sm sm:text-base"
            onClick={() => setItemsToShow(initialItems)}
            >
            Show Less
            </button>
        )}
        </div>
        )}
    </section>

    {/* Farming Tips Section */}
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-green-100">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-900 mb-4 sm:mb-6 text-center">
        Latest Farming Tips
        </h2>
        <p className="max-w-xl mx-auto text-green-800 text-center text-sm sm:text-base">
        Learn modern farming techniques, pest control methods, and market
        strategies to maximize your harvest and profits.
        </p>
    </section>

    {/* Footer */}
    <footer className="bg-green-700 text-white py-4 sm:py-6 text-center text-sm sm:text-base">
        <p>© {currentYear} GrowthPlusFarm. All rights reserved.</p>
        <p>
          <a href="tel:+2348051180767" target="_blank" rel="noopener noreferrer">📞 Call Us</a> &nbsp;&nbsp;&nbsp;
          <a href="https://wa.me/2348060945071" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a> &nbsp;&nbsp;&nbsp;
          <a href="mailto:growthplusfarms@gmail.com" target="_blank" rel="noopener noreferrer">📧 Email Us</a>
        </p>
    </footer>
   </div>
  );
};

export default Home;