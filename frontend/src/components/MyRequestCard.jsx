import React, { useState } from "react";
import { FiCheck, FiX, FiAlertCircle, FiClock } from "react-icons/fi";

export default function MyRequestCard({ request, onWithdraw }) {
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleWithdraw = async () => {
    if (!onWithdraw) return;
    setProcessing(true);
    try {
      await onWithdraw();
      showToast("Request withdrawn successfully", "success");
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to withdraw request";
      showToast(errorMsg, "error");
    } finally {
      setProcessing(false);
    }
  };

  const ownerName = request.taskOwner?.first_name
    ? `${request.taskOwner.first_name} ${request.taskOwner.last_name}`
    : typeof request.taskOwner === "string"
    ? request.taskOwner
    : "User";

  const taskTitle = request.task?.title || request.task || "Task";
  const isPending = request.status === "pending";
  const isAccepted = request.status === "accepted";
  const isRejected = request.status === "rejected";

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
              {ownerName}
            </h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              isAccepted 
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                : isRejected 
                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
            }`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>

          {/* Description/Message */}
          <p className="text-sm text-[var(--color-text-main)] mb-3 line-clamp-2">
            {request.text ? request.text : "You requested help for this task."}
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
          {isPending && (
            <button
              onClick={handleWithdraw}
              disabled={processing}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {processing ? (
                <>
                  <span className="inline-block animate-spin">⏳</span>
                  Withdrawing...
                </>
              ) : (
                <>
                  <FiX size={16} />
                  Withdraw
                </>
              )}
            </button>
          )}
          {isAccepted && (
            <div className="py-2 rounded-lg font-medium text-white text-center text-sm bg-green-500">
              ✓ Accepted
            </div>
          )}
          {isRejected && (
            <div className="py-2 rounded-lg font-medium text-white text-center text-sm bg-red-500">
              ✗ Declined
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium shadow-lg animate-fade-in flex items-center gap-2 z-50 ${
          toast.type === "success" ? "bg-green-500" : "bg-red-500"
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