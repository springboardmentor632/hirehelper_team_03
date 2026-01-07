import { FiBell } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../utils/auth";

export default function NotificationBell() {
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
    <button
      onClick={() => navigate("/notifications")}
      className={`relative p-3 text-xl cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors ${
        unreadCount > 0 ? "bell-blink" : ""
      }`}
      title="View notifications"
    >
      <FiBell />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}
