import { FiMapPin, FiClock, FiUser } from "react-icons/fi";

export default function TaskCard() {
  return (
    <div
      className="
        bg-[var(--color-bg-card)]
        rounded-[var(--radius-card)]
        shadow-[var(--shadow-card)]
        p-4
        w-full
        max-w-sm
      "
    >
      {/* Image placeholder */}
      <div
        className="
          h-32
          rounded-lg
          mb-3
          bg-[var(--color-bg-app)]
        "
      />

      {/* Tags + Date */}
      <div className="flex gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-app)]">
          tag 1
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-app)]">
          tag 2
        </span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded bg-[var(--color-bg-app)]">
          date
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold mb-1">Task Title</h3>

      {/* Description */}
      <p className="text-xs text-[var(--color-text-muted)] mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* Location & Time */}
      <div className="text-xs text-[var(--color-text-muted)] mb-3 space-y-1">
        <p className="flex items-center gap-1">
          <FiMapPin /> Bangalore, India
        </p>
        <p className="flex items-center gap-1">
          <FiClock /> 7:00 - 8:30
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs">
          <FiUser /> Sarah Johnson
        </span>
        <button
          className="
            bg-[var(--color-success)]
            text-white
            px-4
            py-1
            rounded-[var(--radius-button)]
            text-sm
            hover:opacity-90
          "
        >
          Request
        </button>
      </div>
    </div>
  );
}
