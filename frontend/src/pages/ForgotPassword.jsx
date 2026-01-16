import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaArrowLeft, FaLock } from "react-icons/fa";

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-64 h-64 bg-[#a8d5f2] rounded-full opacity-30 -top-20 -left-20 animate-pulse"></div>
      <div
        className="absolute w-96 h-96 bg-[#7ec8e3] rounded-full opacity-20 top-1/4 right-0 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute w-80 h-80 bg-[#5eb8d9] rounded-full opacity-25 bottom-0 left-1/4 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState("email"); // email | reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= SEND OTP ================= */
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:5000/api/forgot-password", { email_id:email });
      setStep("reset");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP HANDLERS ================= */
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/reset-password", {
        email_id: email,
        otp: otpValue,
        newPassword,
      });

      window.location.href = "/login";
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND OTP ================= */
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/forgot-password", { email });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="relative h-screen max-h-screen bg-[var(--color-bg-app)] overflow-hidden flex items-center justify-center">
      <AuthBackground />

      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] px-4 py-6">
        <div className="bg-[rgba(101,174,233,0.3)] backdrop-blur-sm rounded-4xl sm:rounded-[45px] md:rounded-[55px] xl:rounded-[65px] p-4 sm:p-6 md:p-6 xl:p-8 shadow-xl">
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-[#2a85c7] hover:text-[#1582d0] transition-colors mb-4 text-sm sm:text-base"
          >
            <FaArrowLeft size={14} />
            <span>Back to Login</span>
          </button>

          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-black text-[rgba(21,130,208,0.93)] mb-4 text-center">
            FORGOT PASSWORD
          </h2>

          {step === "email" ? (
            <>
              <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#2a85c7] text-center mb-6 px-2">
                Enter your email address to receive an OTP.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <FaEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                    size={14}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-2.5 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] focus:outline-none focus:border-[#1582d0]"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-xs text-center bg-red-50 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="flex justify-center pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2a85c7] text-white px-10 py-2.5 rounded-xl hover:bg-[#1582d0] transition-all shadow-lg disabled:opacity-60"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#2a85c7] text-center mb-6 px-2">
                Enter the OTP sent to your email and set a new password.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="flex justify-between gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOtpChange(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleOtpKeyDown(e, index)
                      }
                      className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 text-center text-lg font-semibold bg-transparent border-b-2 border-[#2a85c7] text-[#2a85c7] focus:outline-none focus:border-[#1582d0] transition-colors rounded-md"
                      required
                    />
                  ))}
                </div>

                <div className="relative">
                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                    size={14}
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-2.5 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] focus:outline-none focus:border-[#1582d0]"
                  />
                </div>

                <div className="relative">
                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]"
                    size={14}
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    className="w-full pl-12 pr-4 py-2.5 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] focus:outline-none focus:border-[#1582d0]"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-xs text-center bg-red-50 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <div className="flex justify-center pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2a85c7] text-white px-10 py-2.5 rounded-xl hover:bg-[#1582d0] transition-all shadow-lg disabled:opacity-60"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>

              <div className="text-center pt-4">
                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-sm text-[#2a85c7] hover:text-[#1582d0] underline transition-colors disabled:opacity-60"
                >
                  Resend OTP
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}