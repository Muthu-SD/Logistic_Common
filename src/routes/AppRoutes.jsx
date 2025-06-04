import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import useStore from "../store/UseStore";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword.jsx";
import SignUp from "../auth/SignUp.jsx";
import OtpVerification from "../auth/OtpVerification.jsx";

// Lazy loading components
const Login = lazy(() => import("../auth/Login"));
// const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const AppRoutes = () => {
  const { user } = useStore();
  return (

    <Routes>

      {/* Protected route for authenticated users */}
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading Main Layout...</div>}>
            <ProtectedRoute element={<MainLayout />} />
          </Suspense>
        }
      />
       
      {/* </Route> */}

{/* Route for signup */}
<Route
        path="/signup"
        element={
          <Suspense fallback={<div>Loading Signup...</div>}>
      <ProtectedRoute element={<SignUp />} requiredRole="Superadmin" />
    </Suspense>
        }
      />

<Route
        path="/verify-otp"
        element={
          <Suspense fallback={<div>Loading OtpVerification...</div>}>
      <ProtectedRoute element={<OtpVerification />} requiredRole="Superadmin" />
    </Suspense>
        }
      />


      {/* Route for login */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading Login...</div>}>
            <Login />
          </Suspense>
        }
      />

      {/* Route for ForgotPassword */}
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<div>Loading ForgotPassword...</div>}>
            <ForgotPassword />
          </Suspense>
        }
      />

      {/* Route for ResetPassword */}
      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<div>Loading ResetPassword ...</div>}>
            <ResetPassword />
          </Suspense>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
