/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import { FiMenu, FiSearch } from "react-icons/fi";
import SearchInput from "../components/SearchInput";
import RequestPopup from "../components/RequestPopup";
import NotificationBell from "../components/NotificationBell";
import { getAuthHeader } from "../utils/auth";
 
export default function Feed() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // 🔹 popup state
 
  const navigate = useNavigate();
 
  // Fetch feed tasks (everyone else's tasks via /api/tasks/feed)
  const fetchFeedTasks = async (page = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:5000/api/tasks/feed?page=${page}`,
        { headers: getAuthHeader() }
      );
      // Backend returns { tasks, pagination: { totalTasks, totalPages, currentPage } }
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load feed. Please log in and try again."
      );
    } finally {
      setLoading(false);
    }
  };
 
  // Search feed tasks using /api/tasks/search
  const searchFeedTasks = async (query) => {
    if (!query || !query.trim()) {
      // Empty search → reload full feed
      fetchFeedTasks();
      return;
    }
    try {
      setSearchLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:5000/api/tasks/search?query=${encodeURIComponent(
          query.trim()
        )}`,
        { headers: getAuthHeader() }
      );
      // Backend searchFeedTasks returns array of tasks directly
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error searching feed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to search tasks. Please try again."
      );
    } finally {
      setSearchLoading(false);
    }
  };
 
  useEffect(() => {
    fetchFeedTasks();
  }, []);

  // Listen for request updates to refresh feed
  useEffect(() => {
    const handleRequestUpdate = () => {
      // Refresh feed when a request is accepted
      fetchFeedTasks();
    };

    window.addEventListener('requestUpdated', handleRequestUpdate);
    return () => {
      window.removeEventListener('requestUpdated', handleRequestUpdate);
    };
  }, []);
 
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
 
  const handleSearchSubmit = (e) => {
    e?.preventDefault?.();
    searchFeedTasks(searchTerm);
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
              <h1 className="text-xl font-semibold">Feed</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Find tasks that need help
              </p>
            </div>
 
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <form onSubmit={handleSearchSubmit}>
                  <SearchInput
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    icon={<FiSearch />}
                  />
                </form>
              </div>
 
              {/* Notification Bell */}
              <NotificationBell />
            </div>
          </div>
 
          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearchSubmit}>
              <SearchInput
                placeholder="Search tasks..."
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
            <p className="text-[var(--color-text-muted)]">Loading feed...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-[var(--color-text-muted)] mb-2">
              No tasks available.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Check back later or create your own task.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onRequestClick={() => setSelectedTask(task)} // 🔹 Pass task to popup
              />
            ))}
          </div>
        )}
      </main>
      {selectedTask && (
        <RequestPopup
          isOpen={!!selectedTask}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}