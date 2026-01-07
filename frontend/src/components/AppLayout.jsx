import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#e9f2f4]">
      {/* Sidebar */}
      <Sidebar />

      {/* Page content (scrollable) */}
      <div className="flex-1 overflow-auto max-h-screen">
        {children}
      </div>
    </div>
  );
}