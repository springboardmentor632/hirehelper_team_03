import { Routes, Route } from "react-router-dom";
import OTPVerification from "./pages/otp"; // Your OTP page
import "./App.css";

function App() {
  return (
    <Routes>
      {/* OTP Verification Route */}
      <Route path="/" element={<OTPVerification />} />
    </Routes>
  );
}

export default App;
