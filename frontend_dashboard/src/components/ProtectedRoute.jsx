import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../views/university/context/AuthContext"; // <=== BENER

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
