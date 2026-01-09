import { FiMapPin, FiClock, FiUser } from "react-icons/fi";
 
export default function TaskCard({ task, onRequestClick }) {
  const {
    title,
    description,
    location,
    start_time,
    end_time,
    picture,
    category,
    user_id,
  } = task;
 
  // Format readable time
  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
 
  // Format readable date (for the right-side badge)
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString([], { day: "2-digit", month: "short" });
  };
 
  return (
    <div
      className="
        bg-[var(--color-bg-card)]
        rounded-card
        shadow-card
        p-4
        w-full
        max-w-sm
      "
    >
      {/* Show image if exists */}
      {picture && (
        <img
          src={picture}
          alt="Task"
          className="w-full h-40 object-cover rounded-card"
        />
      )}
 
      {/* Category + date */}
      <div className="flex gap-2 mb-2">
        {category && (
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-app)]">
            {category}
          </span>
        )}
 
        <span className="ml-auto text-xs px-2 py-0.5 rounded bg-[var(--color-bg-app)]">
          {formatDate(start_time)}
        </span>
      </div>
 
      {/* Title */}
      <h3 className="font-semibold mb-1">{title}</h3>
 
      {/* Description */}
      <p className="text-xs text-text-muted mb-3">
        {description}
      </p>
 
      {/* Location & Time */}
      <div className="text-xs text-text-muted mb-3 space-y-1">
        <p className="flex items-center gap-1">
          <FiMapPin /> {location}
        </p>
        <p className="flex items-center gap-1">
          <FiClock /> {formatTime(start_time)} - {formatTime(end_time)}
        </p>
      </div>
 
      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs">
          <FiUser />
          {user_id ? `${user_id.first_name} ${user_id.last_name}` : "User"}
        </span>
 
        <button
          onClick={onRequestClick}
          className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
        >
          Request
        </button>
      </div>
    </div>
  );
}