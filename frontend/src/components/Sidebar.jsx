import {
  FiHome,
  FiClipboard,
  FiInbox,
  FiPlusCircle,
  FiSettings,
  FiLogOut,
  FiX,
  FiList
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
 
export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
 
  // Read user from localStorage (set during login)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
 
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };
 
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
 
  const openLogoutConfirm = () => setShowLogoutConfirm(true);
  const closeLogoutConfirm = () => setShowLogoutConfirm(false);
 
  const confirmAndLogout = () => {
    setShowLogoutConfirm(false);
    handleLogout();
  };
 
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowLogoutConfirm(false);
    };
    if (showLogoutConfirm) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showLogoutConfirm]);
 
  return (
    <aside className="w-64 min-h-screen bg-(--color-primary) text-white flex flex-col justify-between">
      {/* Logo + Close */}
      <div>
        <div className="px-6 py-5 text-xl font-bold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FiClipboard />
            Hire-a-Helper
          </span>
 
          {onClose && (
            <button onClick={onClose} className="md:hidden text-2xl">
              <FiX />
            </button>
          )}
        </div>
 
        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-4">
          <NavItem to="/" icon={<FiHome />} label="Home" />
          <NavItem to="/my-tasks" icon={<FiClipboard />} label="My Tasks" />
          <NavItem to="/requests" icon={<FiInbox />} label="Requests" />
          <NavItem to="/my-requests" icon={<FiList />} label="My Requests" />
          <NavItem to="/add-task" icon={<FiPlusCircle />} label="Add Task" />
          <NavItem to="/settings" icon={<FiSettings />} label="Settings" />
        </nav>
      </div>
 
      {/* User */}
      <div className="px-4 py-4 flex items-center justify-between bg-cyan-300/20 hover:bg-cyan-300/30 transition-colors rounded-md">
        <button
          type="button"
          onClick={() => navigate("/profile")}
          title="Profile"
          aria-label="Open profile"
          className="flex items-center gap-3 text-left focus:outline-none hover:opacity-95 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white/30 cursor-pointer" />
 
          <div>
            <p className="text-sm font-semibold">
              {user ? `${user.first_name} ${user.last_name}` : "User"}
            </p>
            <p className="text-xs opacity-80">
              {user ? user.email_id : "email not available"}
            </p>
          </div>
        </button>
 
        {/* Logout */}
        <FiLogOut
          onClick={openLogoutConfirm}
          className="cursor-pointer opacity-80 hover:opacity-100"
          title="Logout"
        />
      </div>
 
      {showLogoutConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Logout confirmation"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeLogoutConfirm}
            aria-hidden="true"
          />
 
          <div className="relative bg-white text-slate-900 rounded-lg shadow-lg p-6 w-full max-w-sm z-10">
            <h3 className="text-lg font-semibold mb-1">Confirm Logout</h3>
            <p className="text-sm text-slate-600 mb-4">Are you sure you want to logout?</p>
 
            <div className="flex justify-end gap-3">
              <button
                onClick={closeLogoutConfirm}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded"
              >
                Stay
              </button>
 
              <button
                onClick={confirmAndLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
 
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-(--color-primary-hover)"
            : "hover:bg-white/20"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}