import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import GrowthPlusLogo from "../assets/images.jpeg";

type LoginProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Logged in successfully!");

      // store user (optional but recommended)
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsLoggedIn(true);

      navigate("/cart");
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    }
  };
  const navHome = () => {
    navigate('/')
  }

  return (
    <>
      <nav className="bg-green-700 text-white p-4 sm:px-6 md:px-12 lg:px-20 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={navHome}>
          <img src={GrowthPlusLogo} alt="GrowthPlusFarm Logo" className="h-10 w-10 rounded-full" />
          <span className="font-bold text-lg sm:text-xl">GrowthPlusFarm</span>
        </div>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-[400px]"
        >
          <h1 className="text-2xl font-bold text-green-700 mb-6">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-3 rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-4.5 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition cursor-pointer"
          >
            Log In
          </button>

          <p className="text-sm mt-4 text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-700 font-bold cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;