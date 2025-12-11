import React from 'react';
import { FaCalendarCheck, FaBriefcase, FaBoxOpen, FaMusic, FaTruck, FaChartBar } from 'react-icons/fa';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-300 relative overflow-hidden">
      {/* Large decorative circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-90"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full -translate-x-1/2 translate-y-1/2 opacity-90"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400 rounded-full translate-x-1/2 translate-y-1/2 opacity-90"></div>
      
      {/* Floating icons - Left side */}
      <div className="absolute top-36 left-6 text-blue-600 text-2xl opacity-80">
        <FaBriefcase />
      </div>
      <div className="absolute top-14 left-36 text-blue-500 opacity-70">
        <FaChartBar className="text-xs" />
      </div>
      <div className="absolute top-52 left-60 text-blue-600 text-3xl opacity-80">
        <FaCalendarCheck />
      </div>
      <div className="absolute top-[420px] left-14 text-blue-500 text-3xl opacity-70">
        <FaBoxOpen />
      </div>
      <div className="absolute bottom-24 left-6 text-blue-500 text-2xl opacity-70">
        <FaMusic />
      </div>
      
      {/* Floating icons - Right side */}
      <div className="absolute top-20 right-28 text-blue-600 text-2xl opacity-80">
        <FaBriefcase />
      </div>
      <div className="absolute top-10 right-20 text-blue-500 opacity-70">
        <FaChartBar className="text-xs" />
      </div>
      <div className="absolute top-48 right-16 text-blue-600 text-3xl opacity-80">
        <FaCalendarCheck />
      </div>
      <div className="absolute top-[440px] right-32 text-blue-500 text-2xl opacity-70">
        <FaMusic />
      </div>
      <div className="absolute bottom-44 right-40 text-blue-600 text-3xl opacity-80">
        <FaBoxOpen />
      </div>
      <div className="absolute bottom-20 right-24 text-blue-500 text-2xl opacity-70">
        <FaTruck />
      </div>
      
      {/* Main content card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-blue-200 bg-opacity-50 rounded-[40px] w-full max-w-[360px] h-[540px] shadow-xl">
          {/* Registration form content would go here */}
        </div>
      </div>
    </div>
  );
};

export default Register;