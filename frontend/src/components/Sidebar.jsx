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

/* =======================
   Sidebar Component
======================= */

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
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
    <aside className="w-64 min-h-screen bg-(--color-primary) text-white flex flex-col justify-between">
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
      <div className="px-4 py-4 flex justify-between bg-cyan-300/20 rounded-md">
        <button
          onClick={() => navigate("/profile")}
          className="flex gap-3 text-left"
        >
          <div className="w-10 h-10 rounded-full bg-white/30" />
          <div>
            <p className="text-sm font-semibold">
              {user ? `${user.first_name} ${user.last_name}` : "User"}
            </p>
            <p className="text-xs opacity-80">
              {user?.email_id || "email not available"}
            </p>
          </div>
        </button>

        <FiLogOut
          onClick={() => setShowLogoutConfirm(true)}
          className="cursor-pointer"
        />
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white text-black p-6 rounded-lg z-10">
            <h3 className="font-semibold mb-2">Confirm Logout</h3>
            <p className="mb-4">Are you sure?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-cyan-600 px-4 py-2 text-white rounded"
              >
                Stay
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 text-white rounded"
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
          isActive ? "bg-(--color-primary-hover)" : "hover:bg-white/20"
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
  const [processing, setProcessing] = useState(false);

  const handleWithdraw = async () => {
    if (!onWithdraw) return;
    setProcessing(true);
    try {
      await onWithdraw();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to withdraw");
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
        <span className="px-3 py-1 bg-(--color-bg-input) rounded">
          {taskTitle}
        </span>
      </div>
    </div>
  );
}