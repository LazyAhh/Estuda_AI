import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function localStorageData() {
            const usuarioLogado = localStorage.getItem('user');
            const tokenLogado = localStorage.getItem('token');

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

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            return { success: true, role: userData.role_user };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Falha na conexão com o servidor'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
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