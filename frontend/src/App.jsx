import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import MyTasks from "./pages/MyTasks";
import AddTask from "./pages/AddTask";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home / Feed */}
        <Route path="/" element={<Feed />} />

        {/* My Tasks */}
        <Route path="/my-tasks" element={<MyTasks />} />

        {/* Add Task */}
        <Route path="/add-task" element={<AddTask />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
