import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import SearchInput from "../components/SearchInput";


export default function Feed() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-app)] flex">

      {/* ================= Desktop Sidebar ================= */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* ================= Mobile Sidebar ================= */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Slide-in Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 animate-slide-in">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ================= Main Content ================= */}
      <main className="flex-1 p-4 md:p-6 text-left text-[var(--color-text-main)]">

        {/* ================= Header ================= */}
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
                <SearchInput />
              </div>


              {/* Notification Bell */}
              <FiBell className="text-xl cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]" />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <SearchInput fullWidth />
          </div>

        </div>

        {/* ================= Cards Grid ================= */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>

      </main>
    </div>
  );
}
