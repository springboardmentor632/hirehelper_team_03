import { useState } from "react";
import axios from "axios";
import { getAuthHeader } from "../utils/auth";
 
export default function RequestPopup({ isOpen, task, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
 
  // Safety check
  if (!isOpen || !task) return null;
 
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        { taskId: task._id },
        {
          headers: getAuthHeader(),
        }
      );
 
      setSuccess(true);
 
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request");
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
      {/* Success Toast - Updated message */}
      {success && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-green-600 text-white px-4 py-2 rounded-lg shadow text-sm">
          Request sent successfully
        </div>
      )}
 
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        {/* Main Container - Balanced size */}
        <div className="bg-white rounded-xl shadow-lg w-full max-w-[300px] sm:max-w-[340px] mx-auto">
          {/* HEADER */}
          <div className="bg-blue-600 rounded-t-xl p-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Request Task</h2>
              <button
                onClick={onClose}
                className="text-white text-xl hover:text-gray-200 transition-colors"
              >
                &times;
              </button>
            </div>
          </div>
 
          {/* CONTENT */}
          <div className="p-4">
            {/* Task Title & Description */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-1">
                {task.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                {task.description}
              </p>
            </div>
 
            {/* Date & Time - Two Separate Compartments */}
            <div className="flex gap-2 mb-5">
              {/* Date Compartment */}
              <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600 flex-shrink-0"
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
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">
                      DATE
                    </p>
                    <p className="text-xs font-medium text-gray-800">
                      {formatDate(task.start_time)}
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Time Compartment - Single line time */}
              <div className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600 flex-shrink-0"
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
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 font-medium">
                      TIME
                    </p>
                    <p className="text-xs font-medium text-gray-800 whitespace-nowrap">
                      {formatTime(task.start_time)} -{" "}
                      {formatTime(task.end_time)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-2.5 text-xs sm:text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 py-2.5 text-xs sm:text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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