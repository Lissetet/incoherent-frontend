import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  // If the user is authenticated, display the child components
  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
