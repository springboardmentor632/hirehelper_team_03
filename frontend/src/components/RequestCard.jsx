import React, { useState } from "react";
import { FiCheck, FiX, FiAlertCircle, FiClock } from "react-icons/fi";

export default function RequestCard({ request, onDecline, onAccept }) {
  const [processing, setProcessing] = useState(false);
  const [acceptProcessing, setAcceptProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDecline = async () => {
    if (!onDecline) return;
    setProcessing(true);
    try {
      await onDecline();
      showToast("Request declined successfully", "success");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to decline request";
      showToast(errorMsg, "error");
    } finally {
      setProcessing(false);
    }
  };

  const handleAccept = async () => {
    if (!onAccept) return;
    setAcceptProcessing(true);
    try {
      await onAccept();
      showToast("Request accepted! Notification sent to the requester", "success");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to accept request";
      showToast(errorMsg, "error");
    } finally {
      setAcceptProcessing(false);
    }
  };

  const requesterName = request.requester?.first_name
    ? `${request.requester.first_name} ${request.requester.last_name}`
    : typeof request.requester === "string"
    ? request.requester
    : "User";

  const taskTitle = request.task?.title || request.task || "Task";
  const requestText = request.text || "No message provided";
  const isPending = request.status === "pending";
  const isAccepted = request.status === "accepted";

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="bg-[var(--color-bg-card)] rounded-xl shadow-sm border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow">
        {/* Header with Status Badge */}
        <div className="relative p-5 pb-0">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-[var(--color-text-main)]">
              {requesterName}
            </h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              isAccepted 
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                : isPending 
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
            }`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-main)] mb-3 line-clamp-2">
            {requestText}
          </p>

          {/* Task Title */}
          <p className="text-xs text-[var(--color-text-muted)] mb-1">
            Requesting for:
          </p>
          <p className="text-sm font-medium text-[var(--color-text-main)] mb-3">
            {taskTitle}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] py-3 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-1">
              <FiClock size={14} />
              <span>{formatTime(request.createdAt)}</span>
            </div>
            <div>
              {new Date(request.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-input)]">
          {isPending ? (
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                disabled={acceptProcessing}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {acceptProcessing ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Accepting...
                  </>
                ) : (
                  <>
                    <FiCheck size={16} />
                    Accept
                  </>
                )}
              </button>
              <button
                onClick={handleDecline}
                disabled={processing}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    Declining...
                  </>
                ) : (
                  <>
                    <FiX size={16} />
                    Decline
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className={`py-2 rounded-lg font-medium text-white text-center text-sm ${
              isAccepted ? "bg-green-500" : "bg-red-500"
            }`}>
              {isAccepted ? "✓ Accepted" : "✗ Declined"}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium shadow-lg animate-fade-in flex items-center gap-2 z-50 ${
          toast.type === "success" 
            ? "bg-green-500" 
            : "bg-red-500"
        }`}>
          {toast.type === "success" ? (
            <FiCheck size={20} />
          ) : (
            <FiAlertCircle size={20} />
          )}
          {toast.message}
        </div>
      )}
    </>
  );
}