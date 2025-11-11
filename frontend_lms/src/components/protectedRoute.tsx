import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // contoh: ["admin"] atau ["student"]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Belum login → lempar ke login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role tidak sesuai → redirect ke halaman default sesuai role-nya
  if (!allowedRoles.includes(role || "")) {
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "student") return <Navigate to="/lms/home" replace />;
    return <Navigate to="/login" replace />;
  }

  // Role cocok → tampilkan halaman
  return <>{children}</>;
}
