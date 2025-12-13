import { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaBox, FaTruck, FaMusic, FaBook, FaChartBar, FaEye, FaEyeSlash, FaBriefcase } from 'react-icons/fa';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
          <h1 className="text-[80px] 2xl:text-[100px] font-black text-[rgba(21,130,208,0.93)] whitespace-nowrap">HIRE-A</h1>
        </div>

        {/* Right text - Desktop */}
        <div className="absolute right-[50px] top-[45%] -translate-y-1/2">
          <h1 className="text-[80px] 2xl:text-[100px] font-black text-[rgba(21,130,208,0.93)] whitespace-nowrap">HELPER</h1>
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

      {/* Main container - Responsive for all sizes */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] px-4 py-8">
        {/* Form card */}
        <div className="bg-[rgba(101,174,233,0.3)] backdrop-blur-sm rounded-[32px] sm:rounded-[45px] md:rounded-[55px] xl:rounded-[65px] p-6 sm:p-8 md:p-9 xl:p-12 shadow-xl">
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-black text-[rgba(21,130,208,0.93)] mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 text-center">
            REGISTER
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 xl:space-y-8">
            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="relative">
                <FaUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
                />
              </div>
            </div>

            {/* Phone field */}
            <div className="relative">
              <FaPhone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 border-[#2a85c7] rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none focus:border-[#1582d0] transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <FaLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
              <input
                type={showPassword ? 'text' : 'password'}
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
              <FaLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
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
                {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>

            {/* Terms and conditions */}
            <p className="text-[11px] sm:text-[12px] text-[#2a85c7] italic text-center sm:text-left pt-1">
              By signing up, You agree to our{' '}
              <span className="underline cursor-pointer hover:text-[#1582d0] transition-colors">Terms & Conditions</span>
            </p>

            {/* Submit button */}
            <div className="flex justify-center pt-2 sm:pt-3 xl:pt-4">
              <button
                type="submit"
                className="bg-[#2a85c7] text-white px-8 sm:px-10 xl:px-12 py-2.5 sm:py-2.5 xl:py-3 rounded-xl hover:bg-[#1582d0] active:scale-95 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FaUser size={14} />
                <span className="text-sm sm:text-base">Sign Up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
