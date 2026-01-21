import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FiMenu, FiSearch } from "react-icons/fi";
import SearchInput from "../components/SearchInput";
import MyRequestCard from "../components/MyRequestCard";
import NotificationBell from "../components/NotificationBell";

export default function MyRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [withdrawingId, setWithdrawingId] = useState(null);

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "http://localhost:5000/api/requests/sent",
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setMyRequests(res.data.requests || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load sent requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    if (!window.confirm("Withdraw this request?")) return;

    try {
      setWithdrawingId(id);
      await axios.delete(`http://localhost:5000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMyRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to withdraw request.");
    } finally {
      setWithdrawingId(null);
    }
  };

  const filteredRequests = myRequests.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.task?.title?.toLowerCase().includes(q) ||
      r.taskOwner?.first_name?.toLowerCase().includes(q) ||
      r.taskOwner?.last_name?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    fetchMyRequests();
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
              <h1 className="text-xl font-semibold text-[var(--color-text-main)]">My Requests</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Track the help requests you've sent
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
        ) : myRequests.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-[var(--color-text-muted)]">No requests sent yet</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Browse tasks and send your first request
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-[var(--color-text-muted)]">No matching requests</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Try a different search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRequests.map((r) => (
              <MyRequestCard
                key={r._id}
                request={r}
                onWithdraw={() => handleWithdraw(r._id)}
                isWithdrawing={withdrawingId === r._id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
