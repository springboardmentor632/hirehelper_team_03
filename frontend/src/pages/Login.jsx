import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthBackground from "../components/AuthBackground";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#dbe9e6] flex items-center justify-center">
      {/* BACKGROUND */}
      <AuthBackground />

      {/* LOGIN CARD */}
      <div className="relative z-30 w-[480px] h-[560px] bg-[#b9d9ea] rounded-[90px] px-16 shadow-lg">
        <h2 className="text-center font-extrabold text-[64px] uppercase text-[#1582D0] pt-10">
          LOGIN
        </h2>

        <div className="absolute top-1/2 left-0 w-full px-16 -translate-y-1/2">
          {/* EMAIL */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-[#2a85c7] text-sm mb-1">
              <FaEnvelope size={14} />
              <span>Email</span>
            </div>
            <input
              type="email"
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

          {/* REMEMBER */}
          <div className="flex justify-between text-sm text-[#2a85c7] mb-10">
            <label className="flex gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="underline cursor-pointer">Forgot password?</span>
          </div>

          <div className="flex justify-center">
            <button className="bg-[#2a85c7] text-white px-14 py-3 rounded-xl">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
