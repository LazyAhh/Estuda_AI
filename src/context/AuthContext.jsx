import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function localStorageData() {
            const usuarioLogado = localStorage.getItem('@EstudaAI:user');
            const tokenLogado = localStorage.getItem('@EstudaAI:token');

            if (usuarioLogado && tokenLogado) {
                setUser(JSON.parse(usuarioLogado));
                api.defaults.headers.Authorization = `Bearer ${tokenLogado}`
            }

            setLoading(false);
        }
        localStorageData();
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await api.post('/auth/login', {
                email_user: email,
                password_user: senha,
            });

            const { tokens, user: userData } = response.data

            setUser(userData);

            api.defaults.headers.Authorization = `Bearer ${tokens.accessToken}`;

            localStorage.setItem('@EstudaAI:user', JSON.stringify(userData));
            localStorage.setItem('@EstudaAI:token', tokens.accessToken);
            localStorage.setItem('@EstudaAI:refreshToken', tokens.refreshToken);

            return { success: true, role: userData.role_user };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Falha na conexão com o servidor'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('@EstudaAI:user');
        localStorage.removeItem('@EstudaAI:token');
        localStorage.removeItem('@EstudaAI:refreshToken');
        setUser();
        delete api.defaults.headers.Authorization
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}