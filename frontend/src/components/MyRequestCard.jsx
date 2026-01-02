import React, { useState } from "react";
 
export default function MyRequestCard({ request, onWithdraw }) {
  const [processing, setProcessing] = useState(false);

  const handleWithdraw = async () => {
    if (!onWithdraw) return;
    setProcessing(true);
    try {
      await onWithdraw();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to withdraw");
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

  return (
<div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all">
<div className="flex justify-between items-start">
<div className="flex flex-col">
<h2 className="font-semibold text-lg">
            Sent To: {ownerName}
</h2>
 
          <p className="text-xs text-text-muted mt-1">
            Status: {request.status}
</p>
 
          <p className="text-sm text-text-main mt-2 line-clamp-3">
            You requested help for this task.
</p>
</div>
 
        <button onClick={handleWithdraw} disabled={processing} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg disabled:opacity-60">
          {processing ? "Withdrawing..." : "Withdraw"}
</button>
</div>
 
      <div className="mt-4 text-xs text-text-muted flex items-center gap-2">
<span>Requesting for:</span>
<span className="px-3 py-1 rounded-lg bg-(--color-bg-input) w-fit">
          {taskTitle}
</span>
</div>
</div>
  );
}