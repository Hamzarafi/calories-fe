import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/userContext";

const RequireAuth = ({ allowedRoles }: any) => {
  const context = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles?.includes(context?.auth?.role) ? (
    <Outlet />
  ) : context?.auth ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
