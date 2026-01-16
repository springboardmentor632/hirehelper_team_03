/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Sidebar from "../components/Sidebar";
import { getAuthHeader } from "../utils/auth";
import { useToast } from "../components/Toast";
import { FiMenu } from "react-icons/fi";

export default function Notifications() {
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clearLoading, setClearLoading] = useState(false);
  const [deletingIds, setDeletingIds] = useState(new Set());

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/notifications`, {
        headers: getAuthHeader()
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await fetch(`${apiBase}/api/notifications/read-all`, {
        method: "PATCH",
        headers: getAuthHeader()
      });
      // refresh
      await fetchNotifications();
      // notify bell to refresh
      window.dispatchEvent(new Event("notificationMarkedAsRead"));
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${apiBase}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: getAuthHeader()
      });
      await fetchNotifications();
      window.dispatchEvent(new Event("notificationMarkedAsRead"));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id) => {
    if (!confirm("Delete this notification?")) return;
    setDeletingIds(prev => new Set(prev).add(id));
    try {
      const res = await fetch(`${apiBase}/api/notifications/${id}`, {
        method: "DELETE",
        headers: getAuthHeader()
      });
      if (!res.ok) {
        const e = await res.json().catch(() => null);
        throw new Error(e?.message || `Failed to delete (${res.status})`);
      }
      await fetchNotifications();
      window.dispatchEvent(new Event("notificationUpdated"));
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete notification");
    } finally {
      setDeletingIds(prev => {
        const copy = new Set(prev);
        copy.delete(id);
        return copy;
      });
    }
  };

  const clearAll = async () => {
    if (!confirm("Clear all notifications? This cannot be undone.")) return;
    setClearLoading(true);
    try {
      console.log("Clearing notifications...", { url: `${apiBase}/api/notifications/clear` });
      const res = await fetch(`${apiBase}/api/notifications/clear`, {
        method: "DELETE",
        headers: { ...getAuthHeader(), "Content-Type": "application/json" }
      });
      const text = await res.text();
      console.log("Clear response status", res.status, text);
      if (!res.ok) {
        // try to parse JSON message if possible
        let parsed = null;
        try { parsed = JSON.parse(text); } catch {
          // ignore
        }
        throw new Error(parsed?.message || text || `Failed to clear (${res.status})`);
      }
      await fetchNotifications();
      window.dispatchEvent(new Event("notificationUpdated"));
      toast.success("All notifications cleared");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to clear notifications");
    } finally {
      setClearLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-app)] flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen md:flex-none">
        <Sidebar />
      </div>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar slide-in */}
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto max-h-screen">
        <div className="p-4 md:p-6 lg:px-10 lg:py-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-2xl text-[var(--color-text-main)]"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-1">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Notifications</h1>
                <p className="text-xs md:text-sm text-text-muted">Recent activity and alerts for your account</p>
              </div>

              <div />
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:px-10 lg:py-8 space-y-7">
        <div className="rounded-2xl border-2 border-[var(--color-border)] p-4 md:p-6 bg-[var(--color-bg-app)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-base md:text-lg font-semibold">All Notifications</h2>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={markAllAsRead}
                className="px-3 py-1 bg-[var(--color-primary)] text-white rounded text-sm md:text-base"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                disabled={clearLoading}
                className={`px-3 py-1 text-white rounded text-sm md:text-base ${clearLoading ? 'bg-[var(--color-bg-input)] opacity-60 cursor-not-allowed' : 'bg-[var(--color-danger)]'}`}
              >
                {clearLoading ? 'Clearing...' : 'Clear all'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-28">
              <p className="text-text-muted text-sm md:text-base">Loading notifications...</p>
            </div>
          ) : error ? (
            <div className="text-red-600 text-sm md:text-base">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="text-text-muted text-sm md:text-base">No notifications</div>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={`p-3 md:p-4 rounded border border-[var(--color-border)] ${n.isRead ? "bg-[var(--color-bg-app)]" : "bg-[var(--color-bg-card)]"}`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm md:text-base text-text-main break-words">{n.message || n.title}</div>
                      <div className="text-xs md:text-sm text-text-muted mt-1">
                        {formatDistanceToNow(new Date(n.createdAt || Date.now()), { addSuffix: true })}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-4 flex-shrink-0">
                      {!n.isRead && (
                        <button
                          onClick={() => markAsRead(n._id)}
                          className="text-xs md:text-sm text-[var(--color-primary)] whitespace-nowrap"
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n._id)}
                        disabled={deletingIds.has(n._id)}
                        className={`text-xs md:text-sm text-[var(--color-danger)] whitespace-nowrap ${deletingIds.has(n._id) ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        {deletingIds.has(n._id) ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}