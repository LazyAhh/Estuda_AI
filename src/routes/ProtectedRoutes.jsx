import { useAuth } from "../context/AuthContext";
import { Carregando } from "../components/estados/Carregando";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <Carregando />
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role_user)) {
        if (user.role_user === 'student') return <Navigate to="/estudante/dashboard" replace />;
        if (user.role_user === 'teacher') return <Navigate to="/professor/dashboard" replace />;
        if (user.role_user === 'admin') return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}