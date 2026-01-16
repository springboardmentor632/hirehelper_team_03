import { FiBell } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeader } from "../utils/auth";

export default function NotificationBell() {
  const navigate = useNavigate();
  const [newCount, setNewCount] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const seenIdsRef = useRef(new Set());

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications`,
        { headers: getAuthHeader() }
      );

      if (!res.ok) return;

      const data = await res.json();
      const unread = (data.notifications || []).filter(n => !n.isRead);

      const newUnread = unread.filter(n => !seenIdsRef.current.has(n._id));

      if (newUnread.length > 0) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 5000);
      }

      newUnread.forEach(n => seenIdsRef.current.add(n._id));
      // show current unread count (not cumulative seen count)
      setNewCount(unread.length);
    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotifications();
    }, 0);

    const interval = setInterval(fetchNotifications, 5000);

    window.addEventListener("notificationUpdated", fetchNotifications);
    window.addEventListener("notificationMarkedAsRead", fetchNotifications);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener("notificationUpdated", fetchNotifications);
      window.removeEventListener("notificationMarkedAsRead", fetchNotifications);
    };
  }, []);

  const openNotifications = () => {
    navigate("/notifications");
    setIsBlinking(false);
    setNewCount(0);
    seenIdsRef.current.clear();
  };

  return (
    <button
      onClick={openNotifications}
      className={`relative p-3 text-xl ${
        isBlinking ? "bell-blink" : ""
      }`}
    >
      <FiBell />
      {newCount > 0 && (
        <span className={`absolute -top-1 -right-1 bg-red-600 text-white
          text-xs w-5 h-5 rounded-full flex items-center justify-center
          ${isBlinking ? "badge-pulse" : ""}`}>
          {newCount > 9 ? "9+" : newCount}
        </span>
      )}
    </button>
  );
}
