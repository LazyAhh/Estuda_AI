import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const getDashboardRoute = () => {
        if (!user) return "/";
        return user.role_user === "teacher" ? "/professor/dashboard" : "/estudante/dashboard";
    };

    return (
        <nav className="w-full bg-white/95 backdrop-blur sticky top-0 z-50 border-b border-slate-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <div>
                    <Link to={"/"} className="text-xl font-bold tracking-tight text-indigo-900 hover:opacity-90 flex items-center gap-2">
                        🎓 EstudaAI
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <a href="#recursos" className="text-sm font-medium text-slate-600 hover:text-indigo-900 transition-colors">Recursos</a>
                    <a href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-indigo-900 transition-colors">Como funciona</a>
                    <a href="#sobre" className="text-sm font-medium text-slate-600 hover:text-indigo-900 transition-colors">Sobre</a>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link to={getDashboardRoute()} className="text-sm font-medium text-slate-600 hover:text-indigo-900 transition-colors">
                                Painel ({user?.name_user || "Usuário"})
                            </Link>

                            <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/login"} className="text-sm font-medium text-slate-600 hover:text-indigo-900 transition-colors">
                                Entrar
                            </Link>
                            <Link to={"/cadastro"} className="bg-indigo-900 hover:bg-indigo-950 text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-colors">
                                Criar conta
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};