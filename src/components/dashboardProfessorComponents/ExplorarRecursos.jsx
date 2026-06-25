import React, { useState } from "react";

export const ExplorarRecursos = ({
    todasAulas,
    todosExercicios,
    loading,
    onVisualizarPlano,
    onVisualizarExercicio
}) => {
    const [busca, setBusca] = useState("");
    const [abaExplorarAtiva, setAbaExplorarAtiva] = useState("aulas");

    const todasAulasFiltradas = todasAulas.filter(aula =>
        aula.subjectLessonPlan.toLowerCase().includes(busca.toLowerCase()) ||
        aula.descriptionLessonPlan.toLowerCase().includes(busca.toLowerCase())
    );

    const todosExerciciosFiltrados = todosExercicios.filter(ex =>
        ex.subjectExercises.toLowerCase().includes(busca.toLowerCase()) ||
        ex.descriptionExercises.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setAbaExplorarAtiva("aulas")}
                        className={`px-4 py-2 text-sm border-b-2 transition-all cursor-pointer ${abaExplorarAtiva === "aulas" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-75"}`}
                    >
                        Todos Planos de Aula
                    </button>
                    <button
                        onClick={() => setAbaExplorarAtiva("exercicios")}
                        className={`px-4 py-2 text-sm border-b-2 transition-all cursor-pointer ${abaExplorarAtiva === "exercicios" ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-75"}`}
                    >
                        Todos Exercícios
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Buscar no banco..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full md:max-w-xs px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                />
            </div>

            {loading ? (
                <div className="text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <p className="text-slate-500 text-sm font-medium animate-pulse">Buscando materiais...</p>
                </div>
            ) : abaExplorarAtiva === "aulas" ? (
                <div className="w-full">
                    {todasAulasFiltradas.length === 0 ? (
                        <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                            Nenhum plano de aula encontrado no banco global.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {todasAulasFiltradas.map((aula) => (
                                <div key={aula.id_lesson_plan} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col justify-between gap-4 bg-opacity-100">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-indigo-200 bg-indigo-50 text-indigo-700">
                                                Nível {aula.complexityLevelLessonPlan || "Médio"}
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
                                            onClick={() => onVisualizarPlano(aula)}
                                            className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-medium px-4 py-2 rounded shadow-sm transition-colors cursor-pointer"
                                        >
                                            Visualizar Material
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full">
                    {todosExerciciosFiltrados.length === 0 ? (
                        <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                            Nenhum exercício encontrado no banco global.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {todosExerciciosFiltrados.map((ex) => (
                                <div key={ex.id_exercise} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col justify-between gap-4 bg-opacity-100">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-indigo-200 bg-indigo-50 text-indigo-700">
                                                Nível {ex.complexityLevelExercises || "Médio"}
                                            </span>
                                            <span className="text-xs text-slate-400 font-mono">ID: {ex.id_exercise}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-955 truncate">{ex.subjectExercises}</h3>
                                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{ex.descriptionExercises}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                                        <span className="text-xs text-slate-400 font-medium">
                                            Série: {ex.gradeLevelExercises} | Questões: {ex.execiseItems?.length || 0}
                                        </span>
                                        <button
                                            onClick={() => onVisualizarExercicio(ex)}
                                            className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-medium px-4 py-2 rounded shadow-sm transition-colors cursor-pointer"
                                        >
                                            Resolver e Testar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExplorarRecursos;
