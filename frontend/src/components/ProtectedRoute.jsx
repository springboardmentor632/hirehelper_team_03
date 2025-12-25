import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Accept token from localStorage (remember me) or sessionStorage (temporary session)
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
