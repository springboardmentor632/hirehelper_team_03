import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import AuthBackground from "../components/AuthBackground";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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

      // Persist auth based on "Remember me"
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }

      navigate("/", { replace: true });
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
    <div className="relative h-screen max-h-screen bg-[#d4e2e2] overflow-hidden flex items-center justify-center">
      <AuthBackground />

      {/* Main container - Responsive for all sizes */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] px-4 py-6">
        {/* Form card */}
        <div className="block md:hidden w-full text-center mb-4">
          <h1 className="text-lg sm:text-2xl font-extrabold text-(--color-primary) tracking-tight">
            Hire-A Helper
          </h1>
        </div>

        <div className="bg-[rgba(101,174,233,0.3)] backdrop-blur-sm rounded-4xl sm:rounded-[45px] md:rounded-[55px] xl:rounded-[65px] p-4 sm:p-6 md:p-6 xl:p-8 shadow-xl">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-black text-[rgba(21,130,208,0.93)] mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 text-center">
            LOGIN
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-3 sm:space-y-4 md:space-y-5 xl:space-y-6"
          >
            {/* Email field */}
            <div className="relative">
              <FaEnvelope
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                size={14}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <FaLock
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                size={14}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#2a85c7] hover:text-[#1582d0] transition-colors"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-600 text-xs sm:text-sm text-center bg-red-50 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Remember me & Forgot password */}
            <div className="flex justify-between items-center text-[11px] sm:text-[15px] text-[#2a85c7] pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <span
                onClick={() => navigate("/forgot-password")}
                className="underline cursor-pointer hover:text-[#1582d0] transition-colors"
              >
                Forgot password?
              </span>
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-2 sm:pt-3 xl:pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#2a85c7] text-white px-8 sm:px-10 xl:px-12 py-2.5 sm:py-2.5 xl:py-3 rounded-xl hover:bg-[#1582d0] active:scale-95 transition-all flex justify-center shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="text-sm sm:text-base">
                  {loading ? "Logging in..." : "Login"}
                </span>
              </button>
            </div>

            {/* Register link */}
            <div className="text-center mt-4">
              <p className="text-sm text-[#2a85c7]">
                New User?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="underline cursor-pointer hover:text-[#1582d0] font-medium transition-colors"
                >
                  Register here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}