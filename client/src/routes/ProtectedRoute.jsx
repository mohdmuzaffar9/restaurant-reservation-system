import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/localStorage";

function ProtectedRoute({ children }) {

  const { user } = useAuth();

  const token = getToken();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;