import React from "react";

export const ListaAulasProfessor = ({ aulas, loading, onNovoPlano, onEditarPlano, onDeletarPlano, onVisualizarPlano }) => {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-6 bg-opacity-100">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-800">
                    Planos de Aula ({aulas.length})
                </h2>
                <button 
                    onClick={onNovoPlano}
                    className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer"
                >
                    + Novo Plano
                </button>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <p className="text-slate-500 text-sm font-medium animate-pulse">Buscando lista atualizada...</p>
                </div>
            ) : aulas.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-slate-500 text-sm">Nenhum plano de aula criado por você.</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-4 list-none pl-0 m-0">
                    {aulas.map((aula) => (
                        <li key={aula.id_lesson_plan} className="border border-slate-200 rounded-lg p-4 flex flex-col gap-2 hover:bg-slate-50/50 transition-colors bg-white bg-opacity-100">
                            <strong className="text-sm font-bold text-slate-900">{aula.subjectLessonPlan}</strong>
                            <span className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{aula.descriptionLessonPlan}</span>
                            <div className="flex gap-2 border-t border-slate-100 pt-3 mt-1 justify-end">
                                <button 
                                    onClick={() => onVisualizarPlano(aula)}
                                    className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Visualizar
                                </button>
                                <button 
                                    onClick={() => onEditarPlano(aula.id_lesson_plan)}
                                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-205 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => onDeletarPlano(aula.id_lesson_plan)}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-205 px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaAulasProfessor;