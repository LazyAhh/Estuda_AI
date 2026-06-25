import React from "react";

export const TabelaUsuarios = ({ usuarios, onDeletarUsuario }) => {
    const listaUsuarios = Array.isArray(usuarios) ? usuarios : (usuarios?.data || []);

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">CPF</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {listaUsuarios.map((usuario) => (
                        <tr key={usuario.id_user} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{usuario.name_user}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{usuario.email_user}</td>
                            <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{usuario.cpf_user}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${usuario.role_user === "admin" ? "bg-red-50 text-red-700 border-red-150" : usuario.role_user === "teacher" ? "bg-indigo-50 text-indigo-700 border-indigo-150" : "bg-emerald-50 text-emerald-700 border-emerald-150"}`}>
                                    {usuario.role_user === "admin" ? "Administrador" : usuario.role_user === "teacher" ? "Professor" : "Estudante"}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                <button
                                    onClick={() => onDeletarUsuario(usuario.id_user)}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer inline-flex items-center"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaUsuarios;