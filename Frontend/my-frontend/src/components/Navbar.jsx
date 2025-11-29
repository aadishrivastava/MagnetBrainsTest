import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow">
      <h1
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        TASK MANAGER — <span className="font-normal">{userName}</span>
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-100"
      >
        Logout
      </button>
    </nav>
  );
}
