import { useState, useEffect } from "react";
import axios from "axios"; //  API calls
import { useNavigate } from "react-router-dom"; // Navigation
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaBox,
  FaTruck,
  FaMusic,
  FaBook,
  FaChartBar,
  FaEye,
  FaEyeSlash,
  FaBriefcase,
} from "react-icons/fa";
import AuthBackground from "../components/AuthBackground";

export default function App() {
  const [formData, setFormData] = useState({
    first_name: "", //Must match backend: first_name
    last_name: "",
    phone_number: "",
    email_id: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Terms modal state
  const [showTerms, setShowTerms] = useState(false);
  const openTerms = () => setShowTerms(true);
  const closeTerms = () => setShowTerms(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowTerms(false);
    };
    if (showTerms) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showTerms]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      // API call
      const response = await axios.post("http://localhost:5000/api/signup", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        email_id: formData.email_id,
        password: formData.password,
        profile_picture: null,
      });

      // Signup success
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("email", response.data.user.email_id);
      localStorage.setItem(
        "name",
        `${formData.first_name} ${formData.last_name}`
      );

      alert(
        response.data.message || "Signup successful! Check your email for OTP."
      );
      navigate("/otp");
    } catch (error) {
      if (error.response) {
        const backendMessage = error.response.data.message || "Signup failed";

        // User exists but not verified
        if (
          backendMessage.includes("already exists") &&
          error.response.data.isVerified === false
        ) {
          alert("User already registered but not verified. Check OTP.");
          localStorage.setItem("email", formData.email_id); // for OTP resend
          navigate("/otp");
        }
        // User exists and verified
        else if (backendMessage.includes("already exists")) {
          alert("User already registered. Please login.");
          navigate("/login");
        }
        // Other backend errors
        else {
          alert(backendMessage);
        }
      } else if (error.request) {
        alert("No response from server. Check your connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //  Redirect to login page
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="relative h-screen max-h-screen bg-[var(--color-bg-app)] overflow-hidden flex items-center justify-center">
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
            REGISTER
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-5 xl:space-y-6"
          >
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="relative">
                <FaUser
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                  size={14}
                />
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
                />
              </div>
              <div className="relative">
                <FaUser
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                  size={14}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
                />
              </div>
            </div>

            {/* Phone field */}
            <div className="relative">
              <FaPhone
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7] transform scale-x-[-1]"
                size={14}
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <FaEnvelope
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                size={14}
              />
              <input
                type="email"
                name="email_id"
                placeholder="Email"
                value={formData.email_id}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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

            {/* Confirm Password field */}
            <div className="relative">
              <FaLock
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                size={14}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#2a85c7] hover:text-[#1582d0] transition-colors"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={14} />
                ) : (
                  <FaEye size={14} />
                )}
              </button>
            </div>

            {/* Terms and conditions */}
            <p className="text-[11px] sm:text-[14px] text-[#2a85c7] italic text-center sm:text-left pt-1">
              By signing up, You agree to our{" "}
              <span
                role="button"
                tabIndex={0}
                onClick={openTerms}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? openTerms() : null)}
                className="underline cursor-pointer hover:text-[#1582d0] transition-colors"
              >
                Terms & Conditions
              </span>
            </p>

            {/* Submit button */}
            <div className="flex justify-center pt-2 sm:pt-3 xl:pt-4">
              <button
                type="submit"
                className="bg-[#2a85c7] text-white px-8 sm:px-10 xl:px-12 py-2.5 sm:py-2.5 xl:py-3 rounded-xl hover:bg-[#1582d0] active:scale-95 transition-all flex justify-center shadow-lg hover:shadow-xl"
              >
                <span className="text-sm sm:text-base">Sign Up</span>
              </button>
            </div>
            <div className="text-center mt-4">
            <p className="text-sm text-[#2a85c7]">
              Already registered?{" "}
              <span
                onClick={() => navigate("/login")}
                className="underline cursor-pointer hover:text-[#1582d0] font-medium"
              >
                Login here
              </span>
            </p>
          </div>
          </form>

          {showTerms && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Terms and conditions"
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-transparent"
                onClick={closeTerms}
                aria-hidden="true"
              />

              <div className="relative bg-[var(--color-bg-card)] text-text-main rounded-2xl shadow-card p-6 w-full max-w-2xl z-10">
                <h3 className="text-2xl font-semibold text-center mb-4">Terms &amp; Conditions</h3>
                <div className="text-sm text-text-muted space-y-3 mb-6 max-h-64 overflow-auto">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>
                    Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeTerms}
                    className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
