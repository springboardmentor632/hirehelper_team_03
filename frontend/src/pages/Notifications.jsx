import { FiSearch, FiBell } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import { useState, useEffect } from "react";
import { getAuthHeader } from "../utils/auth";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/notifications`,
        {
          headers: getAuthHeader()
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/notifications/${id}`,
        {
          method: "DELETE",
          headers: getAuthHeader()
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      // Remove from local state
      setNotifications(notifications.filter(n => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
      alert("Failed to delete notification");
    }
  };

  const clearAllNotifications = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/notifications/clear`,
        {
          method: "DELETE",
          headers: getAuthHeader()
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear notifications");
      }

      setNotifications([]);
    } catch (err) {
      console.error("Error clearing notifications:", err);
      alert("Failed to clear notifications");
    }
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between px-10 py-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-gray-600">
            Stay updated with your network
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="flex items-center bg-white px-5 py-2 rounded-full border border-gray-400">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search notifications..."
              className="outline-none text-sm w-44 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bell */}
          <div className="bg-blue-400 p-3 rounded-full text-white">
            <FiBell />
          </div>
        </div>
      </div>

      {/* ===== NOTIFICATION CARDS ===== */}
      <div className="px-10 py-8 space-y-7">
        {loading && <p className="text-center text-gray-600">Loading notifications...</p>}

        {error && (
          <p className="text-center text-red-600">Error: {error}</p>
        )}

        {!loading && !error && notifications.length === 0 && (
          <p className="text-center text-gray-600">No notifications yet</p>
        )}

        {!loading && !error && filteredNotifications.length === 0 && searchTerm && (
          <p className="text-center text-gray-600">No notifications match your search</p>
        )}

        {filteredNotifications.map((item) => (
          <div
            key={item._id}
            className={`
              border-2 border-gray-600
              rounded-2xl
              px-8 py-6
              flex justify-between items-center
              ${item.isRead ? "bg-gray-200" : "bg-[#e4efef]"}
            `}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">
                {item.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <button
              onClick={() => deleteNotification(item._id)}
              className="
                bg-red-500 hover:bg-red-600
                text-white
                px-6 py-2
                rounded-full
                text-sm
                whitespace-nowrap
                ml-4
              "
            >
              Delete
            </button>
          </div>
        ))}

        {!loading && !error && filteredNotifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="
              bg-gray-600 hover:bg-gray-700
              text-white
              px-6 py-2
              rounded-full
              text-sm
              mt-6
            "
          >
            Clear All
          </button>
        )}
      </div>
    </AppLayout>
  );
}