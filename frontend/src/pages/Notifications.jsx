/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import AppLayout from "../components/AppLayout";
import { getAuthHeader } from "../utils/auth";
import { useToast } from "../components/Toast";

export default function Notifications() {
  const toast = useToast();
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
    <AppLayout>
      <div className="px-10 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-text-muted">Recent activity and alerts for your account</p>
          </div>

          <div />
        </div>
      </div>

      <div className="px-10 py-8 space-y-7">
        <div className="rounded-2xl border-2 border-[var(--color-border)] p-6 bg-[var(--color-bg-app)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">All Notifications</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="px-3 py-1 bg-[var(--color-primary)] text-white rounded"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                disabled={clearLoading}
                className={`px-3 py-1 text-white rounded ${clearLoading ? 'bg-[var(--color-bg-input)] opacity-60 cursor-not-allowed' : 'bg-[var(--color-danger)]'}`}
              >
                {clearLoading ? 'Clearing...' : 'Clear all'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-28">
              <p className="text-text-muted">Loading notifications...</p>
            </div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="text-text-muted">No notifications</div>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={`p-4 rounded border border-[var(--color-border)] ${n.isRead ? "bg-white" : "bg-[var(--color-bg-card)]"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-text-main">{n.message || n.title}</div>
                      <div className="text-xs text-text-muted">
                        {formatDistanceToNow(new Date(n.createdAt || Date.now()), { addSuffix: true })}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      {!n.isRead && (
                        <button
                          onClick={() => markAsRead(n._id)}
                          className="text-sm text-[var(--color-primary)]"
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n._id)}
                        className="text-sm text-[var(--color-danger)]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppLayout>
  );
}