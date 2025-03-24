import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import MainLayout from "../layouts/MainLayout";
import useStore from "../store/UseStore";

// Lazy loading components
const Login = lazy(() => import("../auth/Login"));
const SignUp = lazy(() => import("../auth/SignUp"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const SupplierClearance = lazy(() => import("../pages/SupplierClearance"));
const ShippingStatus = lazy(() => import("../pages/ShippingStatus"));




const AppRoutes = () => {
  const { user } = useStore();
  return (

    <Routes>

      {/* Route for sign up */}
      <Route
        path="/signup"
        element={
          <Suspense fallback={<div>Loading Sign Up...</div>}>
            <SignUp />
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

      {/* Protected route for authenticated users */}
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading Main Layout...</div>}>
            <ProtectedRoute element={<MainLayout />} />
          </Suspense>
        }
      >
        {/* Route for dashboard */}
        <Route
          index
          element={
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              {user?.role === "SuperAdmin" ? (
                <ProtectedRoute element={<Dashboard />} role="SuperAdmin" />
              ) : (
                <ProtectedRoute element={<Dashboard />} role="Admin" />
              )}
            </Suspense>
          }
        />
        {/* Route for supplier-clearance */}
        <Route
          path="/supplier-clearance"
          element={
            <Suspense fallback={<div>Loading Supplier Clearance...</div>}>
              <ProtectedRoute element={<SupplierClearance />} role="SuperAdmin" />
              <SupplierClearance />
            </Suspense>
          }
        />
        {/* Route for shipping-status */}
        <Route
          path="/shipping-status"
          element={
            <Suspense fallback={<div>Loading Shipping Status...</div>}>
              <ProtectedRoute element={<ShippingStatus />} role="SuperAdmin" />
              <ShippingStatus />
            </Suspense>
          }
        />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
