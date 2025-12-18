import {
  FiHome,
  FiClipboard,
  FiInbox,
  FiPlusCircle,
  FiSettings,
  FiLogOut,
  FiX
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Sidebar({ onClose }) {
  return (
    <aside className="w-64 min-h-screen bg-[var(--color-primary)] text-white flex flex-col justify-between">

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
          <NavItem to="/add-task" icon={<FiPlusCircle />} label="Add Task" />
          <NavItem to="/settings" icon={<FiSettings />} label="Settings" />
        </nav>
      </div>

      {/* User */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/30" />
          <div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-xs opacity-80">john@email.com</p>
          </div>
        </div>

        <FiLogOut className="cursor-pointer opacity-80 hover:opacity-100" />
      </div>
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
            ? "bg-[var(--color-primary-hover)]"
            : "hover:bg-white/20"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
