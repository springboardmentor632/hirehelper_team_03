import { FiSearch, FiBell } from "react-icons/fi";
import AppLayout from "../components/AppLayout";

export default function Notifications() {
  const notifications = [
    { id: 1, title: "Notification Title", content: "Notification content" },
    { id: 2, title: "Notification Title", content: "Notification content" },
    { id: 3, title: "Notification Title", content: "Notification content" },
    { id: 4, title: "Notification Title", content: "Notification content" }
  ];

  return (
    <AppLayout>
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between px-10 py-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-gray-600">
            Stay updated with your network
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="flex items-center bg-white px-5 py-2 rounded-full border border-gray-400">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="outline-none text-sm w-44 bg-transparent"
            />
          </div>

          {/* Bell */}
          <div className="bg-blue-400 p-3 rounded-full text-white">
            <FiBell />
          </div>
        </div>
      </div>

      {/* ===== NOTIFICATION CARDS ===== */}
      <div className="px-10 py-8 space-y-7">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="
              bg-[#e4efef]
              border-2 border-gray-600
              rounded-2xl
              px-8 py-6
              flex justify-between items-center
            "
          >
            <div>
              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">
                {item.content}
              </p>
            </div>

            <button
              className="
                bg-red-500 hover:bg-red-600
                text-white
                px-6 py-2
                rounded-full
                text-sm
              "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}