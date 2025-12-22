import { Routes, Route } from "react-router-dom";
import OTPVerification from "./pages/otp";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import AddTask from "./pages/AddTask";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTPVerification />} />

      {/* Dashboard routes */}
      <Route path="/" element={<Feed />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/add-task" element={<AddTask />} />

      {/* Catch-all redirect (optional for now) */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
