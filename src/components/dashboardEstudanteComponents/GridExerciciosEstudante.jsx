import React from "react";

export const GridExerciciosEstudante = ({ exercicios, onSelecionarExercicio }) => {
    if (exercicios.length === 0) {
        return (
            <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                Nenhum exercício encontrado.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercicios.map((exercicio) => (
                <div key={exercicio.id_exercise} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col justify-between gap-4 bg-opacity-100">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-indigo-200 bg-indigo-50 text-indigo-700">
                                {exercicio.complexityLevelExercises || "Médio"}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">ID: {exercicio.id_exercise}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-955 truncate">{exercicio.subjectExercises}</h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{exercicio.descriptionExercises}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                        <span className="text-xs text-slate-400 font-medium">
                            Série: {exercicio.gradeLevelExercises} | Questões: {exercicio.execiseItems?.length || 0}
                        </span>
                        <button
                            onClick={() => onSelecionarExercicio(exercicio)}
                            className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-medium px-4 py-2 rounded shadow-sm transition-colors cursor-pointer"
                        >
                            Resolver Exercícios
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GridExerciciosEstudante;