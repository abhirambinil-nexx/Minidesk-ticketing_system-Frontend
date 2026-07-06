import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  console.log("ProtectedRoute");
  console.log("Token:", token);
  console.log("User:", user);

  if (!token) {
    console.log("Redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    console.log("Role not allowed");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("Access granted");
  return children;
}

export default ProtectedRoute;
