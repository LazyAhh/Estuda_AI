import React from "react";

export const TabelaAulas = ({ aulas, onDeletarAula }) => {
    if (aulas.length === 0) {
        return (
            <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                Nenhum plano de aula no sistema.
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Disciplina</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Código da Aula</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {aulas.map((aula) => (
                        <tr key={aula.id_lesson_plan} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{aula.subjectLessonPlan}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{aula.descriptionLessonPlan}</td>
                            <td className="px-6 py-4 text-sm text-slate-400 font-mono whitespace-nowrap">{aula.id_lesson_plan}</td>
                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                <button
                                    onClick={() => onDeletarAula(aula.id_lesson_plan)}
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

export default TabelaAulas;
