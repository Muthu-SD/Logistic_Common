import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/UseStore";

const ProtectedRoute = ({ element, requiredRole  }) => {
  const { token, user } = useStore();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtectedRoute;
