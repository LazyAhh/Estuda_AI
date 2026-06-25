import React from "react";
import { Link } from "react-router-dom";

export const HeaderProfessor = ({ user, logout }) => {
    return (
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <Link to="/" className="text-2xl font-bold text-indigo-900 hover:opacity-90 transition-opacity flex items-center gap-2">
                        🎓 EstudaAI
                    </Link>
                    <p className="text-sm text-slate-500 mt-1">
                        Olá, <strong className="font-semibold text-slate-755">{user?.name_user || user?.nome || "Professor"}</strong>! Esta é a sua área administrativa.
                    </p>
                </div>
                <button 
                    onClick={logout}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-medium px-4 py-2 rounded-md transition-colors shadow-sm cursor-pointer self-start md:self-auto"
                >
                    Desconectar
                </button>
            </div>
        </header>
    );
};

export default HeaderProfessor;