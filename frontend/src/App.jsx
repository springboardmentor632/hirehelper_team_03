import { Routes, Route } from "react-router-dom";
import OTPVerification from "./pages/otp"; // Import your OTP page

function App() {
  return (
    <Routes>
      <Route path="/" element={<OTPVerification />} />
      {/* You can add more routes here if needed */}
    </Routes>
  );
}

export default App;
