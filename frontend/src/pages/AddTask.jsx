import { useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchInput from "../components/SearchInput";
import {
  FiMenu,
  FiBell,
  FiUpload,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

export default function AddTask() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-(--color-bg-app) flex overflow-hidden">

      {/* Sidebar */}
      <div className="hidden md:block md:sticky md:top-0 md:h-screen md:flex-none">
        <Sidebar />
      </div>

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

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 text-left text-text-main overflow-auto max-h-screen">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <button
              className="md:hidden text-2xl"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu />
            </button>

            <div className="flex-1">
              <h1 className="text-xl font-semibold">Add Task</h1>
              <p className="text-sm text-text-muted">
                Create a task and find someone to help you
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchInput />
              </div>
              <FiBell className="text-xl cursor-pointer text-text-muted" />
            </div>
          </div>

          <div className="md:hidden mt-4">
            <SearchInput fullWidth />
          </div>
        </div>

        {/* Card */}
        <div className="flex justify-center">
          <div
            className="
              w-full
              max-w-3xl
              bg-(--color-bg-card)
              rounded-card
              shadow-(--shadow-card)
              p-8
            "
          >
            <form className="space-y-6">

              <Field label="Task Title">
                <Input placeholder="e.g. help fixing the computer" />
              </Field>

              <Field label="Description">
                <Textarea placeholder="Describe what help you require and what will you provide." />
              </Field>

              <Field label="Location">
                <Input placeholder="e.g. Downtown, Seattle, WA or any specific address" />
              </Field>

              {/* Dates & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Start Date">
                  <IconInput icon={<FiCalendar />} type="date" />
                </Field>

                <Field label="Start Time">
                  <IconInput icon={<FiClock />} type="time" />
                </Field>

                <Field label="End Date">
                  <IconInput icon={<FiCalendar />} type="date" />
                </Field>

                <Field label="End Time">
                  <IconInput icon={<FiClock />} type="time" />
                </Field>
              </div>

              {/* Category & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Category">
                  <select className="input">
                    <option>Select a category</option>
                  </select>
                </Field>

                <Field label="Task Image">
                  <label className="input flex items-center justify-center h-11 cursor-pointer">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <FiUpload className="shrink-0 text-text-muted" size={18} />
                      <span className="text-text-main">Upload Image</span>
                    </div>
                    <input type="file" hidden />
                  </label>
                </Field>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-(--color-primary) text-white px-6 py-2 rounded-xl hover:bg-(--color-primary-hover) transition-all shadow-lg"
                >
                  Add Task
                </button>
              </div>

            </form>
          </div>
        </div>

      </main>
    </div>
  );
}

/* ---------- Reusable atoms ---------- */

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Input(props) {
  return <input {...props} className="input" />;
}

function Textarea(props) {
  return <textarea {...props} rows="3" className="input resize-none" />;
}

function IconInput({ icon, type }) {
  return (
    <div className="relative">
      <input type={type} className="input pr-10" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
        {icon}
      </div>
    </div>
  );
}
