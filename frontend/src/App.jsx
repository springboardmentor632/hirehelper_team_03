import { Routes, Route } from "react-router-dom";
import OTPVerification from "./pages/otp";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* OTP Verification Page */}
      <Route path="/" element={<OTPVerification />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
