import { FaBox, FaTruck, FaMusic, FaBook, FaChartBar, FaBriefcase } from 'react-icons/fa';

export default function AuthBackground() {
  return (
    <>
      {/* DESKTOP VERSION - Only visible on xl screens and above */}
      <div className="hidden xl:contents">
        {/* Decorative circles - Desktop */}
        <div className="absolute left-[-150px] top-[-150px] w-[420px] h-[420px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute left-[-120px] bottom-[-150px] w-[420px] h-[420px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute right-[-150px] top-[50%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[rgba(101,174,233,0.93)]" />

        {/* Decorative icons - Desktop */}
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

        <div className="absolute left-[100px] top-[65%] text-[#2A85C7] opacity-90">
          <FaBook size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute left-[220px] top-[70%] text-[#2A85C7] opacity-90">
          <FaBox size={36} className="drop-shadow-md" />
        </div>

        <div className="absolute right-[100px] top-[65%] text-[#2A85C7] opacity-90">
          <FaTruck size={36} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[220px] top-[70%] text-[#2A85C7] opacity-90">
          <FaMusic size={36} className="drop-shadow-md" />
        </div>

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
        <div className="absolute left-[50px] xl:left-[120px] top-[45%] -translate-y-1/2">
          <h1 className="text-[80px] 2xl:text-[100px] font-black text-[rgba(21,130,208,0.93)] whitespace-nowrap">HIRE-A</h1>
        </div>

        {/* Right text - Desktop */}
        <div className="absolute right-[50px] xl:right-[120px] top-[45%] -translate-y-1/2">
          <h1 className="text-[80px] 2xl:text-[100px] font-black text-[rgba(21,130,208,0.93)] whitespace-nowrap">HELPER</h1>
        </div>
      </div>

      {/* MOBILE/TABLET VERSION - Only visible below xl screens */}
      <div className="xl:hidden contents">
        {/* Decorative circles - Mobile/Tablet */}
        <div className="absolute left-[-100px] top-[-77px] w-[200px] h-[200px] sm:w-[227px] sm:h-[227px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute left-[-120px] sm:left-[-136px] -bottom-20 sm:bottom-[-100px] w-[200px] h-[200px] sm:w-[227px] sm:h-[227px] rounded-full bg-[rgba(101,174,233,0.93)]" />
        <div className="absolute right-[-100px] sm:right-[-120px] top-[35%] sm:top-[290px] w-[200px] h-[200px] sm:w-[227px] sm:h-[227px] rounded-full bg-[rgba(101,174,233,0.93)]" />

        {/* Decorative icons - Mobile/Tablet positioned like in Figma */}
        <div className="absolute right-5 sm:right-[30px] top-[100px] sm:top-[98px] text-[#2A85C7] opacity-90">
          <FaBook size={32} className="drop-shadow-md" />
        </div>
        <div className="absolute right-20 sm:right-[100px] top-[30px] sm:top-0 text-[#2A85C7] opacity-90">
          <FaChartBar size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute left-5 sm:left-[60px] top-40 sm:top-[190px] text-[#2A85C7] opacity-90">
          <FaBox size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute left-2.5 sm:left-5 top-[50%] text-[#2A85C7] opacity-90">
          <FaChartBar size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute left-[15px] sm:left-[30px] top-[30%] text-[#2A85C7] opacity-90">
          <FaTruck size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute left-[30px] sm:left-10 bottom-[150px] sm:bottom-[180px] text-[#2A85C7] opacity-90">
          <FaMusic size={32} className="drop-shadow-md" />
        </div>
        <div className="absolute left-20 sm:left-[120px] bottom-20 sm:bottom-[100px] text-[#2A85C7] opacity-90">
          <FaBox size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute right-5 sm:right-[30px] bottom-[100px] sm:bottom-[120px] text-[#2A85C7] opacity-90">
          <FaTruck size={32} className="drop-shadow-md" />
        </div>
        <div className="absolute right-[100px] sm:right-[140px] bottom-[30px] sm:bottom-10 text-[#2A85C7] opacity-90">
          <FaBox size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute right-2.5 sm:right-[15px] top-[65%] text-[#2A85C7] opacity-90">
          <FaBriefcase size={32} className="drop-shadow-md" />
        </div>

        <div className="absolute left-[50%] -translate-x-1/2 bottom-[30px] sm:bottom-[50px] text-[#2A85C7] opacity-90">
          <FaMusic size={32} className="drop-shadow-md" />
        </div>
      </div>
    </>
  );
}
