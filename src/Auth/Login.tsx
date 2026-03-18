import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

type LoginProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Logged in successfully!");
    navigate("/cart");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h1 className="text-2xl font-bold text-green-700 mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4 cursor-pointer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4 cursor-pointer"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
  );
};

export default Login;