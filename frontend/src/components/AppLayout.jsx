import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-app)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <div className="flex-1 relative">
        {children}
      </div>
    </div>
  );
}