import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth, AuthProvider } from '../context/AuthContext';

import { Carregando } from "../components/estados/Carregando";

import { Cadastro } from "../pages/Cadastro";
import { DashboardEstudante } from "../pages/DashboardEstudante";
import { DashboardProfessor } from "../pages/DashboardProfessor";
import { DashboardAdmin } from "../pages/DashboardAdmin";
import { LandingPage } from "../pages/LandingPage";
import { Login } from "../pages/Login";

import { ProtectedRoute } from "./ProtectedRoutes";

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

                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}