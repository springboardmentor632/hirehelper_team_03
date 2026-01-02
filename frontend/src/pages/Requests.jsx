import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
import SearchInput from "../components/SearchInput";
import RequestCard from "../components/RequestCard";
 
export default function Requests() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
 
    const getToken = () =>
        localStorage.getItem("token") || sessionStorage.getItem("token");
 
    const fetchRequests = async () => {
  try {
    setLoading(true);
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

  // Delete request (called when Decline pressed)
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 200) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
        // Broadcast update for other components/pages
        window.dispatchEvent(new CustomEvent("requestUpdated", { detail: { id, action: "deleted" } }));
      } else {
        const msg = res.data?.message || "Failed to delete request.";
        setError(msg);
        throw new Error(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to delete request.";
      setError(msg);
      // Rethrow so callers (RequestCard) can show an alert if needed
      throw err;
    }
  };

  // Accept a request (set to accepted / active)
  const handleAccept = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/requests/${id}/accept`, null, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 200) {
        const updated = res.data.request;
        setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
        // broadcast to other pages
        window.dispatchEvent(new CustomEvent("requestUpdated", { detail: { id, action: "accepted", request: updated } }));
      } else {
        const msg = res.data?.message || "Failed to accept request.";
        setError(msg);
        throw new Error(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to accept request.";
      setError(msg);
      throw err;
    }
  };
 
 
    const handleSearchChange = (value) => setSearchTerm(value);
 
    useEffect(() => {
        fetchRequests();
    }, []);
 
    return (
<div className="min-h-screen w-full bg-(--color-bg-app) flex overflow-hidden">
            {/* Sidebar Desktop */}
<div className="hidden md:block md:sticky md:top-0 md:h-screen md:flex-none">
<Sidebar />
</div>
 
            {/* Sidebar Mobile */}
            {sidebarOpen && (
<div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSidebarOpen(false)} />
            )}
            {sidebarOpen && (
<div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
<Sidebar onClose={() => setSidebarOpen(false)} />
</div>
            )}
 
            {/* Main */}
<main className="flex-1 p-4 md:p-6 text-left text-text-main overflow-auto max-h-screen">
                {/* Header */}
<div className="mb-6">
<div className="flex items-center justify-between gap-4">
<button className="md:hidden text-2xl" onClick={() => setSidebarOpen(true)}>
<FiMenu />
</button>
 
                        <div className="flex-1">
<h1 className="text-xl font-semibold">Requests</h1>
<p className="text-sm text-text-muted">
                                People who want to help with your tasks
</p>
</div>
 
                        <div className="hidden md:block">
<SearchInput
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                icon={<FiSearch />}
                            />
</div>
 
                        <FiBell className="text-xl cursor-pointer text-text-muted hover:text-text-main" />
</div>
 
                    {/* Mobile Search */}
<div className="md:hidden mt-4">
<SearchInput
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
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
                ) : requests.length === 0 ? (
<div className="flex justify-center items-center h-40">
<p className="text-text-muted">No requests yet.</p>
</div>
                ) : (
<div className="flex flex-col gap-6">
                        {requests.map((r) => (
<RequestCard key={r._id} request={r} onDecline={() => handleDelete(r._id)} onAccept={() => handleAccept(r._id)} />
                        ))}
</div>
 
                )}
</main>
</div>
    );
}