import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#dce6ea" }}
    >
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <HiOutlineExclamationCircle
            size={90}
            style={{ color: "#5FA4E6" }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: "rgba(31, 41, 55, 1)" }}
        >
          Something went wrong
        </h1>

        {/* Message */}
        <p
          className="mb-8 text-lg"
          style={{ color: "rgba(31, 41, 55, 0.85)" }}
        >
          The page you’re looking for doesn’t exist or an unexpected error
          occurred.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGoBack}
            className="px-6 py-3 font-medium rounded-lg transition-all duration-200 bg-[#5FA4E6] text-white hover:bg-[#4A8AC4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5FA4E6]"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 font-medium rounded-lg transition-all duration-200 border border-[#5FA4E6] text-[#5FA4E6] hover:bg-[#5FA4E6] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5FA4E6]"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
