import { useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../utils/auth";
import { useToast } from "./Toast";
 
export default function RequestPopup({ isOpen, task, onClose }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
 
  // Safety check
  if (!isOpen || !task) return null;
 
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        {
          taskId: task._id,
          text: message.trim() || "",
        },
        {
          headers: getAuthHeader(),
        }
      );
 
      setSuccess(true);
      setMessage("");
 
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };
 
  // Compact helpers
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
 
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });
  };
 
  return (
    <>
      {/* Success Toast */}
      {success && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 bg-green-600 text-white px-4 py-2 rounded-lg shadow text-sm">
          Request sent successfully
        </div>
      )}
 
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
        {/* Main Container - Compact and Responsive */}
        <div className="bg-[var(--color-bg-card)] rounded-xl shadow-card w-full max-w-[280px] sm:max-w-[340px] mx-auto">
          {/* HEADER - Compact */}
          <div className="bg-[var(--color-primary)] rounded-t-xl p-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Request Task</h2>
              <button
                onClick={onClose}
                className="text-white text-lg sm:text-xl hover:text-gray-200 transition-colors"
              >
                &times;
              </button>
            </div>
          </div>
 
          {/* CONTENT - Compact with reduced height */}
          <div className="p-3 sm:p-4">
            {/* Task Title & Description - Compact */}
            <div className="mb-3">
              <h3 className="font-medium text-[var(--color-text-main)] text-sm mb-1 line-clamp-1">
                {task.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                {task.description}
              </p>
            </div>
 
            {/* Date & Time - Compact */}
            <div className="flex gap-2 mb-3">
              {/* Date Compartment */}
              <div className="flex-1 bg-[var(--color-bg-input)] p-2 rounded-lg border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-[10px] text-[var(--color-text-muted)] font-medium mb-0.5">
                      DATE
                    </p>
                    <p className="text-xs font-medium text-[var(--color-text-main)]">
                      {formatDate(task.start_time)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Compartment */}
              <div className="flex-1 bg-[var(--color-bg-input)] p-2 rounded-lg border border-[var(--color-border)] shadow-sm">
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[var(--color-text-muted)] font-medium mb-0.5">
                      TIME
                    </p>
                    <p className="text-xs font-medium text-[var(--color-text-main)] whitespace-nowrap truncate">
                      {formatTime(task.start_time)} -{" "}
                      {formatTime(task.end_time)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Message Textarea - Compact */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-[var(--color-text-main)] mb-1">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full p-2 text-xs border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] focus:border-[var(--color-primary-hover)] focus:ring-0 focus:ring-transparent resize-none outline-none transition-colors text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] bg-[var(--color-bg-input)] min-h-[60px] sm:min-h-[70px]"
                rows={2}
                disabled={loading}
              />
            </div>
 
            {/* Buttons - Compact and Responsive */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-bg-input)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-50 text-[var(--color-text-main)] bg-[var(--color-bg-card)]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 py-2 text-xs sm:text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-1">
                    <svg
                      className="animate-spin h-3 w-3 sm:h-4 sm:w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="hidden sm:inline">Sending...</span>
                    <span className="sm:hidden">...</span>
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}