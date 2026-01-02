import { useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { getAuthHeader } from "../utils/auth";
import { FiMenu, FiBell, FiUpload, FiCalendar, FiClock } from "react-icons/fi";

export default function AddTask() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [picture, setPicture] = useState(null);

  const categories = [
    "AC Repair",
    "TV Installation",
    "Plumbing",
    "Electrical Work",
    "Home Cleaning",
    "Gardening",
    "Furniture Assembly",
    "Appliance Repair",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("category", category);

      // Send start and end date/time separately
      formData.append("start_date", startDate);
      formData.append("start_time", startTime);
      if (endDate) formData.append("end_date", endDate);
      if (endTime) formData.append("end_time", endTime);

      if (picture) formData.append("picture", picture);

      const response = await axios.post(
        "http://localhost:5000/api/tasks/my",
        formData,
        { headers: getAuthHeader() }
      );

      console.log("Task added:", response.data);
      alert("Task added successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setLocation("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setCategory("");
      setPicture(null);
    } catch (error) {
      console.error("Error adding task:", error);
      alert(error.response?.data?.message || "Failed to add task.");
    }
  };

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
              <FiBell className="text-xl cursor-pointer text-text-muted" />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-(--color-bg-card) rounded-card shadow-(--shadow-card) p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Field label="Task Title">
                <Input
                  placeholder="e.g. help fixing the computer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Field>

              <Field label="Description">
                <Textarea
                  placeholder="Describe what help you require and what will you provide."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Field>

              <Field label="Location">
                <Input
                  placeholder="e.g. Downtown, Seattle, WA or any specific address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Field>

              {/* Dates & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Start Date">
                  <IconInput
                    icon={<FiCalendar />}
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </Field>

                <Field label="Start Time">
                  <IconInput
                    icon={<FiClock />}
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </Field>

                <Field label="End Date">
                  <IconInput
                    icon={<FiCalendar />}
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Field>

                <Field label="End Time">
                  <IconInput
                    icon={<FiClock />}
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Field>
              </div>

              {/* Category & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Category">
                  <select
                    className="input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Task Image">
                  <label className="input flex items-center justify-center h-11 cursor-pointer">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <FiUpload
                        className="shrink-0 text-text-muted"
                        size={18}
                      />
                      <span className="text-text-main">
                        Upload Image
                      </span>
                    </div>
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setPicture(e.target.files[0])}
                    />
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

/* ---------- Reusable components ---------- */
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

function IconInput({ icon, type, value, onChange }) {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    const el = inputRef.current;
    if (!el) return;
    // Modern browsers expose showPicker() for date/time inputs
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch (e) {
        // ignore and fallback
      }
    }
    // Fallback: focus and dispatch click to trigger native picker where supported
    el.focus();
    try {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    } catch (e) {
      // noop
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={type}
        className="input pr-10"
        value={value}
        onChange={onChange}
      />
      <div
        onClick={handleIconClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted cursor-pointer select-none"
        role="button"
        aria-label={type === "date" ? "Open date picker" : "Open time picker"}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleIconClick();
        }}
      >
        {icon}
      </div>
    </div>
  );
}
