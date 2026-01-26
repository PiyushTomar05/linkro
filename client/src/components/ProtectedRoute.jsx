import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect unwanted roles to their own dashboard or home
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'recruiter') return <Navigate to="/recruiter/dashboard" replace />;
        if (user.role === 'agent') return <Navigate to="/agent/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
