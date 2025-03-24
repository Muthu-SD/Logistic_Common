import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "../store/UseStore";

const ProtectedRoute = ({ element, role }) => {
  const {isAuthenticated, user} = useStore();
if(!isAuthenticated && (role && user?.role !== role)){

  return <Navigate to="/login" />;
}
return element 
};

export default ProtectedRoute;
