import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import MyTaskCard from "../components/MyTaskCard";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import SearchInput from "../components/SearchInput";
import { getAuthHeader } from "../utils/auth";
 
export default function MyTasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
 
  // Fetch all "my" tasks (those created in AddTask.jsx)
  const fetchMyTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:5000/api/tasks/my", { headers: getAuthHeader() });
      // backend getAllTasks returns { message, currentPage, totalPages, totalTasks, tasks }
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(
        err.response?.data?.message || "Failed to load tasks. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
 
  // Search within "my" tasks using /api/tasks/my/search
  const searchMyTasks = async (query) => {
    if (!query || !query.trim()) {
      // Empty search → reload full list
      fetchMyTasks();
      return;
    }
    try {
      setSearchLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:5000/api/tasks/my/search?query=${encodeURIComponent(
          query.trim()
        )}`,
{ headers: getAuthHeader() }
      );
      // backend searchMyTasks returns an array of tasks directly
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error searching tasks:", err);
      setError(
        err.response?.data?.message || "Failed to search tasks. Please try again."
      );
    } finally {
      setSearchLoading(false);
    }
  };
 
  useEffect(() => {
    fetchMyTasks();
  }, []);
 
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
 
  const handleSearchSubmit = (e) => {
    e?.preventDefault?.();
    searchMyTasks(searchTerm);
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
              <h1 className="text-xl font-semibold">My Tasks</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Manage your posted tasks
              </p>
            </div>
 
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <form onSubmit={handleSearchSubmit}>
                  <SearchInput
                    placeholder="Search your tasks..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    icon={<FiSearch />}
                  />
                </form>
              </div>
 
              {/* Notification Bell (visible on all screens) */}
              <FiBell className="text-xl cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]" />
            </div>
          </div>
 
          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearchSubmit}>
              <SearchInput
                placeholder="Search your tasks..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                fullWidth
                icon={<FiSearch />}
              />
            </form>
          </div>
        </div>
 
        {/* Content: loading / error / grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-[var(--color-text-muted)]">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-[var(--color-text-muted)] mb-2">
              No tasks found.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Create a task on the Add Task page to see it listed here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <MyTaskCard key={task._id} task={task} loading={searchLoading} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}