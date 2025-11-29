import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TaskDashboard from "./pages/TaskDashboard.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage.jsx";
import Navbar from "./components/Navbar.jsx";

const isAuthenticated = () => !!localStorage.getItem("token");

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <TaskDashboard />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <TaskDetailsPage />
              </>
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
