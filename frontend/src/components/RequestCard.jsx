import React, { useState } from "react";
 
export default function RequestCard({ request, onDecline, onAccept }) {
  const [processing, setProcessing] = useState(false);
  const [acceptProcessing, setAcceptProcessing] = useState(false);

  const handleDecline = async () => {
    if (!onDecline) return;
    setProcessing(true);
    try {
      await onDecline();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to decline");
    } finally {
      setProcessing(false);
    }
  };

  const handleAccept = async () => {
    if (!onAccept) return;
    setAcceptProcessing(true);
    try {
      await onAccept();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to accept");
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

  return (
<div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all">
      {/* Header */}
<div className="flex justify-between items-start">
<div className="flex flex-col">
<h2 className="font-semibold text-lg">
            {requesterName}
</h2>
 
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Status: {request.status}
</p>
 
          <p className="text-sm text-[var(--color-text-main)] mt-2 line-clamp-3">
            Requested some help for this task.
</p>
</div>
 
        <div className="flex flex-col gap-2">
<button onClick={handleAccept} disabled={request.status !== 'pending' || acceptProcessing} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed">
            {request.status === 'accepted' ? 'Active' : acceptProcessing ? 'Activating...' : 'Accept'}
</button>
<button onClick={handleDecline} disabled={processing} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-60">
            {processing ? "Declining..." : "Decline"}
</button>
</div>
</div>
 
      <div className="mt-4 text-xs text-[var(--color-text-muted)] flex items-center gap-2">
<span>Requesting for:</span>
<span className="px-3 py-1 rounded-lg bg-[var(--color-bg-input)] w-fit">
          {taskTitle}
</span>
</div>
</div>
  );
}