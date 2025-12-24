import { Routes, Route } from "react-router-dom";
import OTPVerification from "./pages/otp";
import ForgotPassword from "./pages/ForgotPassword";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import AddTask from "./pages/AddTask";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTPVerification />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-tasks"
        element={
          <ProtectedRoute>
            <MyTasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-task"
        element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        }
      />

      {/* 🚨 Undefined routes → Error Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
