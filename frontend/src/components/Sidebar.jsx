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
import { useToast } from "./Toast";

/* =======================
   Sidebar Component
======================= */

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("user") || sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'user') {
        const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
        setCurrentUser(stored ? JSON.parse(stored) : null);
      }
    };

    const onUserUpdate = (e) => {
      if (e?.detail === null) {
        setCurrentUser(null);
      } else if (e?.detail) {
        setCurrentUser(e.detail);
      } else {
        const stored = localStorage.getItem('user') || sessionStorage.getItem('user');
        setCurrentUser(stored ? JSON.parse(stored) : null);
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('user:update', onUserUpdate);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('user:update', onUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.dispatchEvent(new CustomEvent('user:update', { detail: null }));
    navigate("/login");
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowLogoutConfirm(false);
    };
    if (showLogoutConfirm) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showLogoutConfirm]);

  return (
    <aside className="w-64 bg-[var(--color-sidebar)] text-[var(--color-text-main)] flex flex-col justify-between md:sticky md:top-0 md:h-screen md:flex-none">
      {/* Logo */}
      <div>
        <div className="px-6 py-5 text-xl font-bold flex justify-between">
          <span className="flex gap-2 items-center">
            <FiClipboard /> Hire-a-Helper
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

      {/* User Section */}
      <div className="px-4 py-4 flex justify-between bg-[var(--color-sidebar-contrast)] rounded-md items-center gap-2">
        <button
          onClick={() => navigate("/settings")}
          className="flex gap-3 text-left items-center cursor-pointer min-w-0 flex-1"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
            {currentUser?.profile_picture && !currentUser.profile_picture.includes('demo/image') ? (
              <img
                src={currentUser.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-white">
                {currentUser ? `${currentUser.first_name?.[0] || ''}${currentUser.last_name?.[0] || ''}`.toUpperCase() : 'U'}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">
              {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : "User"}
            </p>
            <p className="text-xs opacity-80 truncate">
              {currentUser?.email_id || "email not available"}
            </p>
          </div>
        </button>

        <FiLogOut
          onClick={() => setShowLogoutConfirm(true)}
          className="cursor-pointer flex-shrink-0"
        />
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-[var(--color-bg-card)] text-text-main p-6 rounded-lg z-10">
            <h3 className="font-semibold mb-2">Confirm Logout</h3>
            <p className="mb-4">Are you sure you want to logout</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-[var(--color-primary)] px-4 py-2 text-white rounded"
              >
                Stay
              </button>
              <button
                onClick={handleLogout}
                className="bg-[var(--color-danger)] px-4 py-2 text-white rounded"
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
        `flex items-center gap-3 px-4 py-2 rounded-lg ${
          isActive ? "bg-[var(--color-primary-hover)]" : "hover:bg-[var(--color-sidebar-contrast)]"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

/* =======================
   MyRequestCard Component
======================= */

export function MyRequestCard({ request, onWithdraw }) {
  const toast = useToast();
  const [processing, setProcessing] = useState(false);

  const handleWithdraw = async () => {
    if (!onWithdraw) return;
    setProcessing(true);
    try {
      await onWithdraw();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to withdraw");
    } finally {
      setProcessing(false);
    }
  };

  const ownerName = request.taskOwner?.first_name
    ? `${request.taskOwner.first_name} ${request.taskOwner.last_name}`
    : "User";

  const taskTitle = request.task?.title || "Task";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg">
      <div className="flex justify-between">
        <div>
          <h2 className="font-semibold text-lg">Sent To: {ownerName}</h2>
          <p className="text-xs text-text-muted">
            Status: {request.status}
          </p>
          <p className="mt-2 text-sm">
            {request.text || "You requested help for this task."}
          </p>
        </div>

        <button
          onClick={handleWithdraw}
          disabled={processing}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          {processing ? "Withdrawing..." : "Withdraw"}
        </button>
      </div>

      <div className="mt-4 text-xs flex gap-2">
        <span>Requesting for:</span>
        <span className="px-3 py-1 bg-[var(--color-bg-input)] rounded">
          {taskTitle}
        </span>
      </div>
    </div>
  );
}