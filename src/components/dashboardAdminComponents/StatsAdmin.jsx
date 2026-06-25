import React from "react";

export const StatsAdmin = ({ usuariosCount, aulasCount, exerciciosCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-1 bg-opacity-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total de Usuários</span>
                <strong className="text-3xl font-extrabold text-indigo-900">{usuariosCount}</strong>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-1 bg-opacity-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Planos de Aula</span>
                <strong className="text-3xl font-extrabold text-indigo-900">{aulasCount}</strong>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-1 bg-opacity-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bancos de Exercícios</span>
                <strong className="text-3xl font-extrabold text-indigo-900">{exerciciosCount}</strong>
            </div>
        </div>
    );
};

export default StatsAdmin;