import { useState } from "react";
import {
  FaBox,
  FaTruck,
  FaMusic,
  FaBook,
  FaChartBar,
  FaBriefcase,
} from "react-icons/fa";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Empty OTP

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(
          `input[name="otp-${index + 1}"]`
        );
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="otp-${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length === 6) {
      console.log("OTP submitted:", otpString);
      // Handle OTP verification here
      alert(`OTP ${otpString} verified successfully!`);
    }
  };

  const handleResend = () => {
    console.log("Resending OTP...");
    // Handle OTP resend here
    setOtp(["", "", "", "", "", ""]); // Clear OTP boxes
    alert("New OTP sent to your email!");
  };

  return (
    <div className="relative min-h-screen bg-[#d4e2e2] overflow-hidden flex items-center justify-center">
      {/* DESKTOP VERSION - Only visible on xl screens and above */}
      <div className="hidden xl:contents">
        {/* Decorative circles - Desktop */}
        <div className="absolute left-[-150px] top-[-150px] w-[420px] h-[420px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute left-[-120px] bottom-[-150px] w-[420px] h-[420px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute right-[-150px] top-[50%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(101,174,233,0.93)]" />

        {/* Decorative icons - Desktop */}
        {/* Top area */}
        <div className="absolute left-[280px] top-[100px] text-[#2A85C7] opacity-90">
          <FaBox size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute left-[420px] top-[140px] text-[#2A85C7] opacity-90">
          <FaMusic size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[420px] top-[140px] text-[#2A85C7] opacity-90">
          <FaChartBar size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[280px] top-[100px] text-[#2A85C7] opacity-90">
          <FaTruck size={36} className="drop-shadow-md" />
        </div>

        {/* Middle left area */}
        <div className="absolute left-[100px] top-[65%] text-[#2A85C7] opacity-90">
          <FaBook size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute left-[220px] top-[70%] text-[#2A85C7] opacity-90">
          <FaBox size={36} className="drop-shadow-md" />
        </div>

        {/* Middle right area */}
        <div className="absolute right-[100px] top-[65%] text-[#2A85C7] opacity-90">
          <FaTruck size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[220px] top-[70%] text-[#2A85C7] opacity-90">
          <FaMusic size={36} className="drop-shadow-md" />
        </div>

        {/* Bottom area */}
        <div className="absolute left-[50%] -translate-x-1/2 bottom-[100px] text-[#2A85C7] opacity-90">
          <FaBook size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute left-[380px] bottom-[140px] text-[#2A85C7] opacity-90">
          <FaChartBar size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[380px] bottom-[140px] text-[#2A85C7] opacity-90">
          <FaBox size={36} className="drop-shadow-md" />
        </div>

        {/* Left text - Desktop */}
        <div className="absolute left-[50px] top-[45%] -translate-y-1/2">
          <h1 className="text-[80px] 2xl:text-[100px] font-black text-[rgba(21,130,208,0.93)] whitespace-nowrap">
            HIRE-A
          </h1>
        </div>

        {/* Right text - Desktop */}
        <div className="absolute right-[50px] top-[45%] -translate-y-1/2">
          <h1 className="text-[80px] 2xl:text-[100px] font-black text-[rgba(21,130,208,0.93)] whitespace-nowrap">
            HELPER
          </h1>
        </div>
      </div>

      {/* MOBILE/TABLET VERSION - Only visible below xl screens */}
      <div className="xl:hidden contents">
        {/* Decorative circles - Mobile/Tablet */}
        <div className="absolute left-[-100px] top-[-77px] w-[200px] h-[200px] sm:w-[227px] sm:h-[227px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute left-[-120px] sm:left-[-136px] bottom-[-80px] sm:bottom-[-100px] w-[200px] h-[200px] sm:w-[227px] sm:h-[227px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute right-[-100px] sm:right-[-120px] top-[35%] sm:top-[290px] w-[200px] h-[200px] sm:w-[227px] sm:h-[227px] rounded-full bg-[rgba(101,174,233,0.93)]" />

        {/* Decorative icons - Mobile/Tablet positioned like in Figma */}
        {/* Top right area */}
        <div className="absolute right-[20px] sm:right-[30px] top-[100px] sm:top-[98px] text-[#2A85C7] opacity-90">
          <FaBook size={32} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[80px] sm:right-[100px] top-[30px] sm:top-[0px] text-[#2A85C7] opacity-90">
          <FaChartBar size={32} className="drop-shadow-md" />
        </div>

        {/* Top left area */}
        <div className="absolute left-[20px] sm:left-[60px] top-[160px] sm:top-[190px] text-[#2A85C7] opacity-90">
          <FaBox size={32} className="drop-shadow-md" />
        </div>

        {/* Middle left */}
        <div className="absolute left-[10px] sm:left-[20px] top-[50%] text-[#2A85C7] opacity-90">
          <FaChartBar size={32} className="drop-shadow-md" />
        </div>

        {/* Upper left */}
        <div className="absolute left-[15px] sm:left-[30px] top-[30%] text-[#2A85C7] opacity-90">
          <FaTruck size={32} className="drop-shadow-md" />
        </div>

        {/* Bottom left */}
        <div className="absolute left-[30px] sm:left-[40px] bottom-[150px] sm:bottom-[180px] text-[#2A85C7] opacity-90">
          <FaMusic size={32} className="drop-shadow-md" />
        </div>
        <div className="absolute left-[80px] sm:left-[120px] bottom-[80px] sm:bottom-[100px] text-[#2A85C7] opacity-90">
          <FaBox size={32} className="drop-shadow-md" />
        </div>

        {/* Bottom right */}
        <div className="absolute right-[20px] sm:right-[30px] bottom-[100px] sm:bottom-[120px] text-[#2A85C7] opacity-90">
          <FaTruck size={32} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[100px] sm:right-[140px] bottom-[30px] sm:bottom-[40px] text-[#2A85C7] opacity-90">
          <FaBox size={32} className="drop-shadow-md" />
        </div>

        {/* Right middle area */}
        <div className="absolute right-[10px] sm:right-[15px] top-[65%] text-[#2A85C7] opacity-90">
          <FaBriefcase size={32} className="drop-shadow-md" />
        </div>

        {/* Center bottom */}
        <div className="absolute left-[50%] -translate-x-1/2 bottom-[30px] sm:bottom-[50px] text-[#2A85C7] opacity-90">
          <FaMusic size={32} className="drop-shadow-md" />
        </div>
      </div>

      {/* Main container - Slightly adjusted for 320px */}
      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] px-2 py-6 sm:py-8">
        {/* Form card - Smaller on 320px */}
        <div className="bg-[rgba(101,174,233,0.3)] backdrop-blur-sm rounded-[24px] sm:rounded-[45px] md:rounded-[55px] xl:rounded-[65px] p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl">
          <h2 className="text-[24px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[60px] font-black text-[rgba(21,130,208,0.93)] mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5 text-center">
            Verify
          </h2>

          {/* Welcome message */}
          <div className="text-center mb-2 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7">
            <p className="text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-bold text-[#2a85c7] mb-0.5 sm:mb-1">
              Welcome aboard!
            </p>
            <p className="text-[11px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] text-[#2a85c7]">
              We are almost through to the last step!
            </p>
          </div>

          {/* Instruction */}
          <p className="text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] text-[#2a85c7] text-center mb-4 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9">
            Enter the 6-digit verification code sent to your email ID:
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8"
          >
            {/* OTP Input Boxes - Smaller for 320px */}
            <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasteData = e.clipboardData
                      .getData("text")
                      .replace(/[^0-9]/g, "");
                    if (pasteData.length === 6) {
                      const otpArray = pasteData.split("");
                      setOtp(otpArray);
                      otpArray.forEach((digit, i) => {
                        const input = document.querySelector(
                          `input[name="otp-${i}"]`
                        );
                        if (input) input.value = digit;
                      });
                      document.querySelector(`input[name="otp-5"]`)?.focus();
                    }
                  }}
                  // Smaller OTP boxes for 320px
                  className="w-7 h-7 
                            min-[340px]:w-8 min-[340px]:h-8
                            sm:w-10 sm:h-10 
                            md:w-12 md:h-12 
                            lg:w-14 lg:h-14 
                            xl:w-16 xl:h-16
                            bg-[rgba(42,133,199,0.3)] border-none rounded-none text-center text-[#2a85c7] 
                            text-xs
                            min-[340px]:text-sm
                            sm:text-base
                            md:text-lg
                            lg:text-xl
                            xl:text-2xl
                            font-bold focus:outline-none focus:ring-2 focus:ring-[#1582d0]/50 transition-all
                            flex-shrink-0"
                  name={`otp-${index}`}
                />
              ))}
            </div>

            {/* Verify button - Adjusted for smaller card */}
            <div className="flex justify-center pt-2 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7">
              <button
                type="submit"
                className="bg-[#2a85c7] text-white 
                          px-6 sm:px-10 md:px-12 lg:px-14 xl:px-16
                          py-2 sm:py-3 md:py-3.5 lg:py-4
                          rounded-lg sm:rounded-xl 
                          hover:bg-[#1582d0] active:scale-95 transition-all 
                          shadow-lg hover:shadow-xl 
                          text-xs sm:text-base md:text-lg lg:text-xl
                          w-full max-w-[120px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[220px]
                          flex items-center justify-center"
              >
                <span className="text-center w-full">Verify</span>
              </button>
            </div>

            {/* Resend code option */}
            <div className="text-center pt-1 sm:pt-2 md:pt-3">
              <p className="text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] text-[#2a85c7]">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="underline cursor-pointer hover:text-[#1582d0] transition-colors font-medium text-[10px] sm:text-[11px]"
                >
                  Resend
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
