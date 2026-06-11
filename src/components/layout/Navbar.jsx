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
        <nav>
            <div>
                <Link to={"/"}>Estuda_AI</Link>
            </div>

            <div>
                <a href="#recursos">Recursos</a>
                <a href="#como-funciona">Como funciona</a>
                <a href="#sobre">Sobre</a>
            </div>

            <div>
                {isAuthenticated ? (
                    <>
                        <Link to={getDashboardRoute()}>
                            Meu painel ({user?.name_user || "Usuário"})
                        </Link>

                        <button onClick={handleLogout}>Sair</button>
                    </>
                ) : (
                    <>
                        <Link to={"/login"}>Entrar</Link>
                        <Link to={"/cadastro"}>Criar conta</Link>
                    </>
                )}
            </div>
        </nav>
    );
};