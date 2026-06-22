import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-slate-200 mt-auto py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-indigo-900">EstudaAI</h3>
                    <p className="text-sm text-slate-500 max-w-xs">Plataforma inteligente desenvolvida para simplificar a jornada acadêmica de alunos e docentes.</p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-3">Navegação</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li><a href="#recursos" className="hover:text-indigo-900 transition-colors">Recursos principais</a></li>
                        <li><a href="#como-funciona" className="hover:text-indigo-900 transition-colors">Como funciona</a></li>
                        <li><Link to="/cadastro" className="hover:text-indigo-900 transition-colors">Criar conta</Link></li>
                    </ul>
                </div>

                <div className="flex flex-col justify-between md:items-end">
                    <div className="text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} EstudaAI. Todos os direitos reservados.
                    </div>
                    <div className="text-xs text-slate-400 mt-2 md:mt-0">
                        Desenvolvido para fins acadêmicos.
                    </div>
                </div>
            </div>
        </footer>
    )
}