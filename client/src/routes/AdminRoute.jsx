import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/localStorage";

function AdminRoute({ children }) {

  const { user } = useAuth();

  const token = getToken();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;