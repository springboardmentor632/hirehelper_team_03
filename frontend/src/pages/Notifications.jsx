import { FiSearch, FiMenu } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SearchInput from "../components/SearchInput";
import { getAuthHeader } from "../utils/auth";

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications`,
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
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications/${id}`,
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
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications/clear`,
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

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: getAuthHeader()
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark as read");
      }

      // Update local state
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-app)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar slide-in */}
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 text-left text-[var(--color-text-main)] overflow-auto max-h-screen">
        {/* Header */}
        <div className="mb-6">
          {/* Top Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-2xl text-[var(--color-text-main)]"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            {/* Title */}
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Notifications</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Stay updated with your network
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <form>
                  <SearchInput
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<FiSearch />}
                  />
                </form>
              </div>

              <NotificationBell />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <form>
              <SearchInput
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                icon={<FiSearch />}
              />
            </form>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-4">
        {loading && <p className="text-center text-[var(--color-text-muted)]">Loading notifications...</p>}

        {error && (
          <p className="text-center text-red-600">Error: {error}</p>
        )}

        {!loading && !error && notifications.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)]">No notifications yet</p>
        )}

        {!loading && !error && filteredNotifications.length === 0 && searchTerm && (
          <p className="text-center text-[var(--color-text-muted)]">No notifications match your search</p>
        )}

        {filteredNotifications.map((item) => (
          <div
            key={item._id}
            onClick={() => !item.isRead && markAsRead(item._id)}
            className={`
              border rounded-lg
              p-4
              flex justify-between items-start
              cursor-pointer
              transition-all
              ${item.isRead ? "bg-gray-100 border-gray-300" : "bg-blue-50 border-blue-200"}
            `}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base">
                  {item.title}
                </h3>
                {!item.isRead && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                )}
              </div>
              <p className="text-gray-700 text-sm mt-1">
                {item.message}
              </p>
              <p className="text-xs text-text-muted mt-2">
                {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(item._id);
              }}
              className="
                bg-red-500 hover:bg-red-600
                text-white
                px-4 py-2
                rounded-lg
                text-sm
                whitespace-nowrap
                ml-4
                transition-colors
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
              rounded-lg
              text-sm
              mt-6
              transition-colors
            "
          >
            Clear All
          </button>
        )}
        </div>
      </main>
    </div>
  );
}