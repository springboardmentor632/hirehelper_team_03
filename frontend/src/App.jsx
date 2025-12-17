import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import AddTask from "./pages/AddTask";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Feed />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/add-task" element={<AddTask />} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
