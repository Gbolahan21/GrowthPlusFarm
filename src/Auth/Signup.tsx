import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import GrowthPlusLogo from "../assets/images.jpeg";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.trim() !== confirm.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error("Server error. Try again later.");
      console.error(error);
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
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-xl shadow-md w-[400px]"
        >
          <h1 className="text-2xl font-bold text-green-700 mb-6">Sign Up</h1>

          <input
            type="text"
            placeholder="First Name"
            className="w-full border p-3 rounded mb-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-full border p-3 rounded mb-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

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

          <div className="relative mb-4">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border p-3 rounded mb-4"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                
                if (password && e.target.value !== password) {
                  setPasswordError("Passwords do not match");
                } else {
                  setPasswordError("");
                }
              }}
            />

            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-4.5 text-gray-500 cursor-pointer"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            {passwordError && (
              <p className="text-red-500 text-sm mb-2">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition cursor-pointer"
          >
            Sign Up
          </button>

          <p className="text-sm mt-4 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-bold cursor-pointer">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;