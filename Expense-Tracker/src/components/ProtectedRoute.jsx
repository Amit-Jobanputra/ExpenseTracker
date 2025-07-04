import { Navigate } from "react-router-dom";
import jscookie from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = jscookie.get("token"); // Check token directly here

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/" replace />;
  }

  // User is authenticated, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
