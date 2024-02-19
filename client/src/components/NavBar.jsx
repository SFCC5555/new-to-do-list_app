import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const NavBar = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  const logout = async () => {
    await axios.post("/logout");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full h-14 flex items-center justify-between dark-bg p-3 z-10">
      <Link
        className="main-bg opacity-75 hover:opacity-100 text-sm px-3 py-2 hover:scale-105 rounded-md"
        to="/"
      >
        <i className="bi bi-card-list" /> Tasks
      </Link>
      <div className="flex items-center justify-between gap-3">
        <Link
          className="main-bg opacity-75 hover:opacity-100 text-sm px-3 py-2 hover:scale-105 rounded-md"
          to="/profile"
        >
          <i className="bi bi-person-fill" /> @{user.username}
        </Link>
        <button
          onClick={logout}
          className="main-bg opacity-75 hover:opacity-100 text-sm px-3 py-2 hover:scale-105 rounded-md"
        >
          <i className="bi bi-door-closed-fill" /> Logout
        </button>
      </div>
    </nav>
  );
};

export { NavBar };
