import { Routes, Route, Navigate } from "react-router-dom";
import OTPVerification from "./pages/otp";
import ForgotPassword from "./pages/ForgotPassword";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import AddTask from "./pages/AddTask";
import Requests from "./pages/Requests";        
import MyRequests from "./pages/MyRequests";    
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
 
function App() {
  return (
<Routes>
      {/* Public Auth Pages */}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/otp" element={<OTPVerification />} />
 
      {/* Protected Pages */}
<Route
        path="/feed"
        element={
<ProtectedRoute>
<Feed />
</ProtectedRoute>
        }
      />
 
      <Route
        path="/requests"          
        element={
<ProtectedRoute>
<Requests />
</ProtectedRoute>
        }
      />
 
      <Route
        path="/my-requests"       
        element={
<ProtectedRoute>
<MyRequests />
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
 
      {/* Default → redirect to feed */}
<Route path="/" element={<Navigate to="/feed" replace />} />
 
      {/* Unknown route → Error page */}
<Route path="*" element={<ErrorPage />} />
</Routes>
  );
}
 
export default App;