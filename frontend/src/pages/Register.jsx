import { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaBox, FaTruck, FaMusic, FaBook, FaChartBar, FaEye, FaEyeSlash, FaBriefcase } from 'react-icons/fa';
import AuthBackground from '../components/AuthBackground';

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
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear related validation errors while user types
    setFormErrors(prev => {
      const next = { ...prev };
      if (name === 'password' || name === 'confirmPassword') {
        delete next.password;
        delete next.confirmPassword;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    const pwd = formData.password || '';

    if (!pwd) {
      errors.password = 'Password is required';
    } else {
      const req = [];
      if (pwd.length < 8) req.push('at least 8 characters');
      if (!/[A-Z]/.test(pwd)) req.push('an uppercase letter');
      if (!/[a-z]/.test(pwd)) req.push('a lowercase letter');
      if (!/[0-9]/.test(pwd)) req.push('a number');
      if (!/[!@#$%^&*(),.?"':{}|<>\[\]\\/]/.test(pwd)) req.push('a special character');
      if (req.length) errors.password = 'Password must include ' + req.join(', ');
    }

    if (pwd !== (formData.confirmPassword || '')) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    // Validation passed — proceed with submission
    console.log('Form submitted:', formData);
    // TODO: replace with real submission (API call)
  };

  return (
    <div className="relative h-screen max-h-screen bg-[#d4e2e2] overflow-hidden flex items-center justify-center">
      <AuthBackground />

      {/* Main container - Responsive for all sizes */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] px-4 py-6">
        {/* Form card */}
        <div className="bg-[rgba(101,174,233,0.3)] backdrop-blur-sm rounded-4xl sm:rounded-[45px] md:rounded-[55px] xl:rounded-[65px] p-4 sm:p-6 md:p-6 xl:p-8 shadow-xl">
          <h2 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px] font-black text-[rgba(21,130,208,0.93)] mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 text-center">
            REGISTER
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5 xl:space-y-6">
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
              <FaPhone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7] transform scale-x-[-1]" size={14} />
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
                aria-invalid={!!formErrors.password}
                aria-describedby={formErrors.password ? 'password-error' : undefined}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 ${formErrors.password ? 'border-red-500' : 'border-[#2a85c7]'} rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none ${formErrors.password ? 'focus:border-red-500' : 'focus:border-[#1582d0]'} transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#2a85c7] hover:text-[#1582d0] transition-colors"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
              {formErrors.password && (
                <p id="password-error" className="text-sm text-red-600 mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Confirm Password field */}
            <div className="relative">
              <FaLock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-[#2a85c7]" size={14} />
              <input
                aria-invalid={!!formErrors.confirmPassword}
                aria-describedby={formErrors.confirmPassword ? 'confirm-error' : undefined}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-2.5 xl:py-3 bg-transparent border-b-2 ${formErrors.confirmPassword ? 'border-red-500' : 'border-[#2a85c7]'} rounded-lg text-[#2a85c7] placeholder-[#2a85c7] placeholder:text-sm sm:placeholder:text-base focus:outline-none ${formErrors.confirmPassword ? 'focus:border-red-500' : 'focus:border-[#1582d0]'} transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#2a85c7] hover:text-[#1582d0] transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
              {formErrors.confirmPassword && (
                <p id="confirm-error" className="text-sm text-red-600 mt-1">{formErrors.confirmPassword}</p>
              )}
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
