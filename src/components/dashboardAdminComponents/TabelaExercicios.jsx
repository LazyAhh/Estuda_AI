import React from "react";

export const TabelaExercicios = ({ exercicios, onDeletarExercicio }) => {
    if (exercicios.length === 0) {
        return (
            <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                Nenhum exercício cadastrado no sistema.
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
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Código do Exercício</th>
                        <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {exercicios.map((exercicio) => (
                        <tr key={exercicio.id_exercise} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">{exercicio.subjectExercises}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{exercicio.descriptionExercises}</td>
                            <td className="px-6 py-4 text-sm text-slate-400 font-mono whitespace-nowrap">{exercicio.id_exercise}</td>
                            <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                <button
                                    onClick={() => onDeletarExercicio(exercicio.id_exercise)}
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

export default TabelaExercicios;