import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import CustomerDashboard from "../pages/customer/CustomerDashboard";
import BookTable from "../pages/customer/BookTable";
import MyReservations from "../pages/customer/MyReservations";

import AdminDashboard from "../pages/admin/AdminDashboard";

import PublicLayout from "../layouts/PublicLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
    return (
        <Routes>

            {/* ---------- Public Routes ---------- */}

            <Route
                path="/"
                element={
                    <PublicLayout>
                        <Home />
                    </PublicLayout>
                }
            />

            <Route
                path="/login"
                element={
                    <PublicLayout>
                        <Login />
                    </PublicLayout>
                }
            />

            <Route
                path="/register"
                element={
                    <PublicLayout>
                        <Register />
                    </PublicLayout>
                }
            />

            {/* ---------- Customer Routes ---------- */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <CustomerLayout>
                            <CustomerDashboard />
                        </CustomerLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/book-table"
                element={
                    <ProtectedRoute>
                        <CustomerLayout>
                            <BookTable />
                        </CustomerLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-reservations"
                element={
                    <ProtectedRoute>
                        <CustomerLayout>
                            <MyReservations />
                        </CustomerLayout>
                    </ProtectedRoute>
                }
            />

            {/* ---------- Admin Route ---------- */}

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout>
                            <AdminDashboard />
                        </AdminLayout>
                    </AdminRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes;