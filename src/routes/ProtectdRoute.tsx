import { Navigate, Outlet } from "react-router";
import { loggedIn } from "@/utils/constants";

const ProtectedRoute = () => {
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
