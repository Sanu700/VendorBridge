import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

import { ProductsProvider } from "./context/ProductsContext";

import ProtectedRoute from "./components/ProtectedRoute";

import DashboardLayout from "./layouts/DashboardLayout";

/* PUBLIC PAGES */
import LandingPage from "./pages/LandingPage";

import AuthPage from "./pages/AuthPage";

import RoleSelector from "./pages/RoleSelector";

/* VENDOR */
import VendorHome from "./pages/vendor/VendorHome";

import SupplierDiscovery from "./pages/vendor/SupplierDiscovery";

import VendorProducts from "./pages/vendor/VendorProducts";

import VendorAnalytics from "./pages/vendor/VendorAnalytics";

/* SUPPLIER */
import SupplierHome from "./pages/supplier/SupplierHome";

import SupplierProducts from "./pages/supplier/SupplierProducts";

import AddProduct from "./pages/supplier/AddProduct";

import SupplierAnalytics from "./pages/supplier/SupplierAnalytics";

/* NEW */
import SupplierDetails from "./pages/supplier/SupplierDetails";

export default function App() {

  return (
    <BrowserRouter>

      <AuthProvider>

        <ProductsProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background:
                  "#16161f",
                color: "#f0f0f0",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                fontFamily:
                  "DM Sans, sans-serif",
                fontSize:
                  "0.88rem",
              },

              success: {
                iconTheme: {
                  primary:
                    "#10b981",
                  secondary:
                    "#16161f",
                },
              },

              error: {
                iconTheme: {
                  primary:
                    "#ef4444",
                  secondary:
                    "#16161f",
                },
              },
            }}
          />

          <Routes>

            {/* PUBLIC */}
            <Route
              path="/"
              element={
                <LandingPage />
              }
            />

            <Route
              path="/auth"
              element={
                <AuthPage />
              }
            />

            <Route
              path="/select-role"
              element={
                <RoleSelector />
              }
            />

            {/* VENDOR ROUTES */}
            <Route
              path="/vendor"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >

              <Route
                index
                element={
                  <VendorHome />
                }
              />

              <Route
                path="suppliers"
                element={
                  <SupplierDiscovery />
                }
              />

              <Route
                path="products"
                element={
                  <VendorProducts />
                }
              />

              <Route
                path="analytics"
                element={
                  <VendorAnalytics />
                }
              />

            </Route>

            {/* SUPPLIER ROUTES */}
            <Route
              path="/supplier"
              element={
                <ProtectedRoute requiredRole="supplier">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >

              <Route
                index
                element={
                  <SupplierHome />
                }
              />

              <Route
                path="products"
                element={
                  <SupplierProducts />
                }
              />

              <Route
                path="add"
                element={
                  <AddProduct />
                }
              />

              <Route
                path="analytics"
                element={
                  <SupplierAnalytics />
                }
              />

            </Route>

            {/* SUPPLIER DETAILS */}
            <Route
              path="/supplier/:id"
              element={
                <ProtectedRoute requiredRole="vendor">
                  <SupplierDetails />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </ProductsProvider>

      </AuthProvider>

    </BrowserRouter>
  );
}
