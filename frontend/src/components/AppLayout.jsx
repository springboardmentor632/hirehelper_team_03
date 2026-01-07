import Sidebar from "./Sidebar";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthHeader } from "../utils/auth";

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications`,
        {
          headers: getAuthHeader()
        }
      );

      if (response.ok) {
        const data = await response.json();
        const unread = data.notifications?.filter(n => !n.isRead).length || 0;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUnreadCount();
    })();
    // Poll for new notifications every 10 seconds
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#e9f2f4]">
      {/* Sidebar */}
      <Sidebar />

      {/* Page content */}
      <div className="flex-1 relative">
        {/* Notification Icon in Top Right */}
        <div className="fixed top-6 right-6 z-40">
          <button
            onClick={() => navigate("/notifications")}
            className={`relative p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white shadow-lg ${
              unreadCount > 0 ? "bell-blink" : "transition-colors"
            }`}
            title="View notifications"
          >
            <FiBell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}