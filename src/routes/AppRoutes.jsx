import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth, AuthProvider } from '../context/AuthContext';

import { Carregando } from "../components/estados/Carregando";

import { Cadastro } from "../pages/Cadastro";
import { DashboardEstudante } from "../pages/DashboardEstudante";
import { DashboardProfessor } from "../pages/DashboardProfessor";
import { LandingPage } from "../pages/LandingPage";
import { Login } from "../pages/Login";


function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <Carregando />
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/Login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role_user)) {
        if (user.role_user === 'student') return <Navigate to="/estudante/dashboard" replace />;
        if (user.role_user === 'teacher') return <Navigate to="/professor/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />

                    <Route element={<ProtectedRoute allowedRoles={['teacher', 'admin']} />}>
                        <Route path="/professor/dashboard" element={<DashboardProfessor />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
                        <Route path="/estudante/dashboard" element={<DashboardEstudante />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}