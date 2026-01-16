import { FiMapPin, FiClock, FiUser } from "react-icons/fi";
 
export default function MyTaskCard({ task, onDelete, isDeleting = false }) {
  const {
    title,
    description,
    location,
    category,
    start_time,
    end_time,
    status,
    picture,
    _id,
  } = task;
 
  // convert ISO datetime to readable time (HH:MM)
  const formatTime = (date) => {
    if (!date) return "Not set";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
 
  const handleDeleteClick = (e) => {
    e.stopPropagation();
 
    // Simple confirmation alert
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );
 
    if (isConfirmed) {
      onDelete(_id);
    }
  };
 
  return (
    <div
      className={`
        bg-[var(--color-bg-card)]
        rounded-card
        shadow-card
        p-4
        w-full
        max-w-sm
        flex flex-col
        ${isDeleting ? "opacity-50" : ""}
      `}
    >
      {/* Show image only if exists in database */}
      {picture && (
        <div className="relative mb-3">
          <img
            src={picture}
            alt="Task"
            className="w-full h-40 object-cover rounded-card"
          />
        </div>
      )}
 
      {/* Category + Status */}
      <div className="flex gap-2 mb-2">
        {category && (
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-app)]">
            {category}
          </span>
        )}
 
        <span
            className="
            ml-auto
            text-xs
            px-2 py-0.5
            rounded
            bg-[var(--color-bg-app)]
            text-text-main
          "
        >
          {status}
        </span>
      </div>
 
      {/* Title */}
      <h3 className="font-semibold mb-1">{title}</h3>
 
      {/* Description */}
      <p className="text-xs text-text-muted mb-3">{description}</p>
 
      {/* Location & Time */}
      <div className="text-xs text-text-muted space-y-1">
        <p className="flex items-center gap-1">
          <FiMapPin /> {location}
        </p>
        <p className="flex items-center gap-1">
          <FiClock /> {formatTime(start_time)} - {formatTime(end_time)}
        </p>
      </div>
 
      {/* Delete button at bottom */}
      {/* Delete button container */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="
      px-3 py-1
      text-xs
      bg-red-500
      text-white
      rounded
      hover:bg-red-600
      transition-colors
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
 