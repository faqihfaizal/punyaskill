import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
    });
    const [loading, setLoading] = useState(false);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Simpan ke localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Update state
            setAuth({
                token: data.token,
                user: data.user,
            });

            return { success: true, user: data.user };
        } catch (err) {
            console.error("Login error:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({
            token: null,
            user: null,
        });
    };

    // Check if user is authenticated and is admin
    const isAdmin = auth.user?.role === "admin";
    const isAuthenticated = !!auth.token;

    return (
        <AuthContext.Provider
            value={{
                auth,
                login,
                logout,
                isAuthenticated,
                isAdmin,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
