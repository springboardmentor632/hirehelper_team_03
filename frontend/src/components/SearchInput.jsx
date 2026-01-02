import { FiSearch } from "react-icons/fi";
 
export default function SearchInput({
  value = "",
  onChange = () => {},
  fullWidth = false,
  placeholder = "Search tasks..."
}) {
  return (
    <div className={`relative ${fullWidth ? "w-full" : "w-64 md:w-72"}`}>
      <FiSearch
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-text-muted
        "
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          pl-11
          pr-4
          py-2.5
          rounded-full
          border
          border-text-muted
          bg-(--color-bg-app)
          text-sm
          text-text-main
          placeholder:text-text-muted
          focus:outline-none
        "
      />
    </div>
  );
}