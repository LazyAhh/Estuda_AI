import React from "react";

export const GridAulasEstudante = ({ aulas, onSelecionarAula }) => {
    if (aulas.length === 0) {
        return (
            <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                Nenhum plano de aula encontrado.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aulas.map((aula) => (
                <div key={aula.id_lesson_plan} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col justify-between gap-4 bg-opacity-100">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-indigo-200 bg-indigo-50 text-indigo-700">
                                {aula.complexityLevelLessonPlan || "Médio"}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">ID: {aula.id_lesson_plan}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-950 truncate">{aula.subjectLessonPlan}</h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{aula.descriptionLessonPlan}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                        <span className="text-xs text-slate-400 font-medium">
                            Série: {aula.gradeLevelLessonPlan} | Duração: {aula.durationMinutesLessonPlan} min
                        </span>
                        <button
                            onClick={() => onSelecionarAula(aula)}
                            className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-medium px-4 py-2 rounded shadow-sm transition-colors cursor-pointer"
                        >
                            Acessar Aula
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GridAulasEstudante;
