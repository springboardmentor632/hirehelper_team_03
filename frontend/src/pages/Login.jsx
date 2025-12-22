import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← ADD THIS IMPORT
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthBackground from "../components/AuthBackground";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate(); // ← ADD THIS LINE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email_id: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/", { replace: true }); // This will now work!
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        setError("Unable to connect to server.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#dbe9e6] flex items-center justify-center">
      <AuthBackground />

      <div className="relative z-30 w-[480px] h-[560px] bg-[#b9d9ea] rounded-[90px] px-16 shadow-lg">
        <h2 className="text-center font-extrabold text-[64px] uppercase text-[#1582D0] pt-10">
          LOGIN
        </h2>

        <form
          onSubmit={handleLogin}
          className="absolute top-1/2 left-0 w-full px-16 -translate-y-1/2"
        >
          {/* EMAIL */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[#2a85c7] text-sm mb-1">
              <FaEnvelope size={14} />
              <span>Email</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-0 border-b border-[#2a85c7]
                         py-1 text-[#2a85c7] focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[#2a85c7] text-sm mb-1">
              <FaLock size={14} />
              <span>Password</span>
            </div>

            <div className="flex items-center border-b border-[#2a85c7]">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="flex-1 bg-transparent border-0 py-1
                           text-[#2a85c7] focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-[#2a85c7]"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </span>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          {/* REMEMBER */}
          <div className="flex justify-between text-sm text-[#2a85c7] mb-10">
            <label className="flex gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="underline cursor-pointer">Forgot password?</span>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2a85c7] text-white px-14 py-3 rounded-xl disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* REGISTER LINK */}
          <div className="text-center mt-4">
            <p className="text-sm text-[#2a85c7]">
              New User?{" "}
              <span
                onClick={() => navigate("/register")}
                className="underline cursor-pointer hover:text-[#1582d0] font-medium"
              >
                Register here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}