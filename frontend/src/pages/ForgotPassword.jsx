import { useState } from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

// Simple animated background component
const AuthBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-64 h-64 bg-[#a8d5f2] rounded-full opacity-30 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-[#7ec8e3] rounded-full opacity-20 top-1/4 right-0 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute w-80 h-80 bg-[#5eb8d9] rounded-full opacity-25 bottom-0 left-1/4 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, replace with actual API call:
      // const res = await axios.post("http://localhost:5000/api/forgot-password", {
      //   email_id: email,
      // });
      
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // In production, use: navigate("/login");
    window.location.href = "/login";
  };

  return (
    <div className="relative h-screen max-h-screen bg-[#d4e2e2] overflow-hidden flex items-center justify-center">
      <AuthBackground />

      {/* Main container - Responsive for all sizes */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] px-4 py-6">
        {/* Form card */}
        <div className="bg-[rgba(101,174,233,0.3)] backdrop-blur-sm rounded-4xl sm:rounded-[45px] md:rounded-[55px] xl:rounded-[65px] p-4 sm:p-6 md:p-6 xl:p-8 shadow-xl">
          
          {/* Back button */}
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-[#2a85c7] hover:text-[#1582d0] transition-colors mb-4 sm:mb-5 text-sm sm:text-base"
          >
            <FaArrowLeft size={14} />
            <span>Back to Login</span>
          </button>

          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-black text-[rgba(21,130,208,0.93)] mb-3 sm:mb-4 text-center">
            FORGOT PASSWORD
          </h2>

          <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#2a85c7] text-center mb-6 sm:mb-7 md:mb-8 px-2">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {!success ? (
            <form
              onSubmit={handleSubmit}
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

              {/* Error message */}
              {error && (
                <p className="text-red-600 text-xs sm:text-sm text-center bg-red-50 py-2 rounded-lg">
                  {error}
                </p>
              )}

              {/* Submit button */}
              <div className="flex justify-center pt-2 sm:pt-3 xl:pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2a85c7] text-white px-8 sm:px-10 xl:px-12 py-2.5 sm:py-2.5 xl:py-3 rounded-xl hover:bg-[#1582d0] active:scale-95 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaEnvelope size={14} />
                  <span className="text-sm sm:text-base">
                    {loading ? "Sending..." : "Send Reset Link"}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* Success message */
            <div className="text-center space-y-4 sm:space-y-5 py-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#1582d0]">
                  Check Your Email
                </h3>
                <p className="text-xs sm:text-sm text-[#2a85c7] px-2">
                  We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
              </div>

              <button
                onClick={handleBackToLogin}
                className="bg-[#2a85c7] text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-xl hover:bg-[#1582d0] active:scale-95 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Back to Login
              </button>

              <p className="text-xs sm:text-sm text-[#2a85c7] pt-2">
                Didn't receive the email?{" "}
                <span
                  onClick={() => setSuccess(false)}
                  className="underline cursor-pointer hover:text-[#1582d0] font-medium transition-colors"
                >
                  Resend
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}