import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import { FiMenu, FiBell } from "react-icons/fi";
import SearchInput from "../components/SearchInput";

export default function Feed() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // or "user"

    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-(--color-bg-app) flex">

      {/* ================= Desktop Sidebar ================= */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ================= Mobile Sidebar ================= */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ================= Main Content ================= */}
      <main className="flex-1 p-4 md:p-6 text-left text-text-main">

        {/* ================= Header ================= */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">

            <button
              className="md:hidden text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div className="flex-1">
              <h1 className="text-xl font-semibold">Feed</h1>
              <p className="text-sm text-text-muted">
                Find tasks that need help
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchInput />
              </div>

              <FiBell className="text-xl cursor-pointer text-text-muted hover:text-text-main" />
            </div>
          </div>

          <div className="md:hidden mt-4">
            <SearchInput fullWidth />
          </div>
        </div>

        {/* ================= Cards Grid ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
      </main>
    </div>
  );
}
