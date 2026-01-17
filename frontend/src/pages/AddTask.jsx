import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getAuthHeader } from "../utils/auth";
import { FiMenu, FiUpload, FiCalendar, FiClock } from "react-icons/fi";
import NotificationBell from "../components/NotificationBell";
import { useToast } from "../components/Toast";

export default function AddTask() {
  const navigate = useNavigate();
  const toast = useToast();
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
  const [pictureName, setPictureName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date and current time in the correct format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Calculate minimum values for date/time inputs
  const getMinStartDate = () => getTodayDate();
  const getMinStartTime = () => {
    if (startDate === getTodayDate()) {
      return getCurrentTime();
    }
    return "00:00";
  };

  const getMinEndDate = () => {
    if (startDate) {
      return startDate;
    }
    return getTodayDate();
  };

  const getMinEndTime = () => {
    if (endDate === startDate && startTime) {
      return startTime;
    }
    return "00:00";
  };

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

  // Validate date/time inputs
  const validateDateTime = () => {
    const newErrors = {};
    const today = getTodayDate();
    const currentTime = getCurrentTime();

    // Validate start date is today or later
    if (startDate && startDate < today) {
      newErrors.startDate = "Start date must be today or later";
    }

    // Validate start time if start date is today
    if (startDate === today && startTime) {
      if (startTime < currentTime) {
        newErrors.startTime = "Start time must be current time or later";
      }
    }

    // Validate end date/time is after start date/time
    if (startDate && endDate) {
      if (endDate < startDate) {
        newErrors.endDate = "End date must be on or after start date";
      } else if (endDate === startDate && startTime && endTime) {
        if (endTime <= startTime) {
          newErrors.endTime = "End time must be after start time";
        }
      }
    }

    if (startDate && endDate && startTime && !endTime) {
      newErrors.endTime = "End time is required when end date is set";
    }

    if (startDate && endDate && !startTime && endTime) {
      newErrors.startTime = "Start time is required when end time is set";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset end date/time if it becomes invalid when start date/time changes
  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setEndDate("");
      setEndTime("");
    }
    if (startDate && endDate === startDate && startTime && endTime && endTime <= startTime) {
      setEndTime("");
    }
  }, [startDate, startTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // Validate before submitting
    if (!validateDateTime()) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setIsSubmitting(true);
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
      toast.success("Task added successfully!");

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
      setPictureName('');
      setErrors({});
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error(error.response?.data?.message || "Failed to add task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg-app)] flex overflow-hidden">
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
              <NotificationBell />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-[var(--color-bg-card)] rounded-card shadow-card p-8">
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
                  <div>
                    <IconInput
                      icon={<FiCalendar />}
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setErrors({ ...errors, startDate: "" });
                      }}
                      min={getMinStartDate()}
                      required
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
                    )}
                  </div>
                </Field>

                <Field label="Start Time">
                  <div>
                    <IconInput
                      icon={<FiClock />}
                      type="time"
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        setErrors({ ...errors, startTime: "" });
                      }}
                      min={getMinStartTime()}
                      required
                    />
                    {errors.startTime && (
                      <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
                    )}
                  </div>
                </Field>

                <Field label="End Date">
                  <div>
                    <IconInput
                      icon={<FiCalendar />}
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setErrors({ ...errors, endDate: "" });
                        // Clear end time if end date is cleared
                        if (!e.target.value) {
                          setEndTime("");
                        }
                      }}
                      min={getMinEndDate()}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                    )}
                  </div>
                </Field>

                <Field label="End Time">
                  <div>
                    <IconInput
                      icon={<FiClock />}
                      type="time"
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        setErrors({ ...errors, endTime: "" });
                      }}
                      min={getMinEndTime()}
                      disabled={!endDate}
                    />
                    {errors.endTime && (
                      <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
                    )}
                  </div>
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
                      <span className="text-text-main truncate max-w-[200px]">
                        {pictureName || 'Upload Image'}
                      </span>
                    </div>
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setPicture(file);
                        setPictureName(file ? file.name : '');
                      }}
                      accept="image/*"
                    />
                  </label>
                </Field>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl hover:bg-[var(--color-primary-hover)] transition-all shadow-lg flex items-center justify-center gap-2 min-w-[120px] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : 'Add Task'}
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

function IconInput({ icon, type, value, onChange, min, disabled, ...props }) {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    const el = inputRef.current;
    if (!el || disabled) return;
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
        className={`input pr-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        value={value}
        onChange={onChange}
        min={min}
        disabled={disabled}
        {...props}
      />
      <div
        onClick={handleIconClick}
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-text-muted ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} select-none`}
        role="button"
        aria-label={type === "date" ? "Open date picker" : "Open time picker"}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) handleIconClick();
        }}
      >
        {icon}
      </div>
    </div>
  );
}
