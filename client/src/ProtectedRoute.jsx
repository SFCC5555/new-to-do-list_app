import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";

const ProtectedRoute = () => {
  const profile = useSelector((state) => state.profile);

  if (!profile.auth) return <Navigate to="/login" replace />;
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export { ProtectedRoute };
