import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FiMenu, FiSearch } from "react-icons/fi";
import SearchInput from "../components/SearchInput";
import RequestCard from "../components/RequestCard";
import NotificationBell from "../components/NotificationBell";

export default function Requests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionId, setActionId] = useState(null);

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "http://localhost:5000/api/requests/received",
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setRequests(res.data.requests || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (id) => {
    if (!window.confirm("Decline this request?")) return;

    try {
      setActionId(id);
      await axios.delete(`http://localhost:5000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRequests((prev) => prev.filter((r) => r._id !== id));
      window.dispatchEvent(
        new CustomEvent("requestUpdated", { detail: { id, action: "deleted" } })
      );
      window.dispatchEvent(new CustomEvent("notificationUpdated"));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to decline request.");
    } finally {
      setActionId(null);
    }
  };

  const handleAccept = async (id) => {
    try {
      setActionId(id);
      const res = await axios.put(
        `http://localhost:5000/api/requests/${id}/accept`,
        null,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      const updated = res.data.request;
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? updated : r))
      );
      window.dispatchEvent(
        new CustomEvent("requestUpdated", {
          detail: { id, action: "accepted", request: updated },
        })
      );
      window.dispatchEvent(new CustomEvent("notificationUpdated"));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to accept request.");
    } finally {
      setActionId(null);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.requester?.first_name?.toLowerCase().includes(q) ||
      r.requester?.last_name?.toLowerCase().includes(q) ||
      r.task?.title?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-app)] flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen">
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto max-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-[var(--color-text-main)]"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div className="flex-1">
              <h1 className="text-xl font-semibold text-[var(--color-text-main)]">Requests</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                People who want to help with your tasks
              </p>
            </div>

            <div className="hidden md:block">
              <SearchInput
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch />}
              />
            </div>

            <NotificationBell />
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <SearchInput
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              icon={<FiSearch />}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="h-40 flex items-center justify-center text-sm text-[var(--color-text-muted)]">
            Loading requests...
          </div>
        ) : error ? (
          <div className="h-40 flex items-center justify-center text-sm text-red-500">
            {error}
          </div>
        ) : requests.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-[var(--color-text-muted)]">No requests yet</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Requests for your tasks will appear here
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-[var(--color-text-muted)]">No matching requests</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Try a different search
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((r) => (
              <RequestCard
                key={r._id}
                request={r}
                onAccept={() => handleAccept(r._id)}
                onDecline={() => handleDecline(r._id)}
                isLoading={actionId === r._id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
