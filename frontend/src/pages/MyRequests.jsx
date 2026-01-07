import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiMenu, FiSearch } from "react-icons/fi";
import SearchInput from "../components/SearchInput";
import MyRequestCard from "../components/MyRequestCard";
import NotificationBell from "../components/NotificationBell";
 
export default function MyRequests() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
 
  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");
 
  const fetchMyRequests = async () => {
  try {
    setLoading(true);
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

  // Withdraw a sent request
  const handleWithdraw = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 200) {
        setMyRequests((prev) => prev.filter((r) => r._id !== id));
      } else {
        const msg = res.data?.message || "Failed to withdraw request.";
        setError(msg);
        throw new Error(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to withdraw request.";
      setError(msg);
      throw err;
    }
  };
 
 
  useEffect(() => {
    fetchMyRequests();

    // Listen for request updates (accepted/deleted) from other pages or components
    const handler = (e) => {
      const detail = e.detail || {};
      if (detail.id && detail.action === "accepted" && detail.request) {
        setMyRequests((prev) => prev.map((r) => (r._id === detail.id ? detail.request : r)));
      } else if (detail.id && detail.action === "deleted") {
        setMyRequests((prev) => prev.filter((r) => r._id !== detail.id));
      }
    };
    window.addEventListener("requestUpdated", handler);

    return () => window.removeEventListener("requestUpdated", handler);
  }, []);
 
  return (
<div className="min-h-screen w-full bg-[var(--color-bg-app)] flex overflow-hidden">
      {/* Desktop Sidebar */}
<div className="hidden md:block md:sticky md:top-0 md:h-screen md:flex-none">
<Sidebar />
</div>
 
      {/* Mobile Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} />}
      {sidebarOpen && (
<div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
<Sidebar onClose={() => setSidebarOpen(false)} />
</div>
      )}
 
      {/* Main */}
<main className="flex-1 p-4 md:p-6 text-left text-text-main overflow-auto max-h-screen">
        {/* Header */}
<div className="mb-6">
<div className="flex items-center justify-between">
<button className="md:hidden text-2xl mr-3" onClick={() => setSidebarOpen(true)}>
<FiMenu />
</button>
 
            <div className="flex-1">
<h1 className="text-xl font-semibold">My Requests</h1>
<p className="text-sm text-text-muted">
                Track the help requests you've sent
</p>
</div>
 
            <div className="hidden md:block mr-4">
<SearchInput
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<FiSearch />}
              />
</div>
 
            <NotificationBell />
</div>
 
          <div className="md:hidden mt-4">
<SearchInput
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              icon={<FiSearch />}
            />
</div>
</div>
 
        {/* Cards */}
        {loading ? (
<div className="flex justify-center items-center h-40">
<p className="text-text-muted">Loading...</p>
</div>
        ) : myRequests.length === 0 ? (
<div className="flex justify-center items-center h-40">
<p className="text-text-muted">No requests sent yet.</p>
</div>
        ) : (
<div className="flex flex-col gap-6">
            {myRequests.map((r) => (
<MyRequestCard key={r._id} request={r} onWithdraw={() => handleWithdraw(r._id)} />
            ))}
</div>
        )}
</main>
</div>
  );
}