import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        {/* Route 1: The Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Route 2: The Home Page (localhost:5173/) */}
        <Route path="/" element={
          <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-3xl font-bold">Home Page</h1>
            <Link to="/register" className="text-blue-500 underline text-xl">
              Go to Register Page
            </Link>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;