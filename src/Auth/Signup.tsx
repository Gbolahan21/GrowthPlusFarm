import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

type SignupProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Signup = ({ setIsLoggedIn }: SignupProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoggedIn(true);
    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h1 className="text-2xl font-bold text-green-700 mb-6">Sign Up</h1>

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

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 rounded mb-4 cursor-pointer"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

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
  );
};

export default Signup;