import { FiMapPin, FiClock, FiUser } from "react-icons/fi";
 
export default function MyTaskCard({ task }) {
  const {
    title,
    description,
    location,
    category,
    start_time,
    end_time,
    status,
    picture
  } = task;
 
  // convert ISO datetime to readable time (HH:MM)
  const formatTime = (date) => {
    if (!date) return "Not set";
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
 
  return (
    <div
      className="
        bg-(--color-bg-card)
        rounded-card
        shadow-(--shadow-card)
        p-4
        w-full
        max-w-sm
      "
    >
      {/* Show image only if exists in database */}
      {picture && (
        <img
          src={picture}
          alt="Task"
          className="w-full h-40 object-cover rounded-card"
        />
      )}
 
      {/* Category + Status */}
      <div className="flex gap-2 mb-2">
        {category && (
          <span className="text-xs px-2 py-0.5 rounded bg-(--color-bg-app)">
            {category}
          </span>
        )}
 
        <span
          className="
            ml-auto
            text-xs
            px-2 py-0.5
            rounded
            bg-(--color-bg-app)
            text-text-main
          "
        >
          {status}
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
      <div className="flex items-center gap-2 text-xs">
        <FiUser />
        <span>You</span>
      </div>
    </div>
  );
}