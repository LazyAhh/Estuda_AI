import React from "react";

export const ObjetivosTemasExercicio = ({ states, actions, disabled }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-3">
                    <h3 className="text-sm font-bold text-slate-800">Objetivos Pedagógicos</h3>
                    <button
                        type="button"
                        onClick={actions.adicionarObjetivo}
                        disabled={disabled}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                    >
                        + Adicionar objetivo
                    </button>
                </div>

                {states.objectives.length === 0 ? (
                    <p className="text-slate-400 text-xs italic my-2">Nenhum objetivo pedagógico adicionado.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {states.objectives.map((obj, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="Título do objetivo"
                                        value={obj.titleObjectiveExercises || ""}
                                        disabled={disabled}
                                        onChange={(e) => actions.alterarObjetivo(i, "titleObjectiveExercises", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Descrição do objetivo"
                                        value={obj.contentObjectiveExercises || ""}
                                        disabled={disabled}
                                        onChange={(e) => actions.alterarObjetivo(i, "contentObjectiveExercises", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => actions.removerObjetivo(i)}
                                    disabled={disabled}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer w-full md:w-auto"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-3">
                    <h3 className="text-sm font-bold text-slate-800">Temas abordados</h3>
                    <button
                        type="button"
                        onClick={actions.adicionarTema}
                        disabled={disabled}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                    >
                        + Adicionar tema
                    </button>
                </div>

                {states.themes.length === 0 ? (
                    <p className="text-slate-400 text-xs italic my-2">Nenhum tema adicionado.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {states.themes.map((theme, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="Tema..."
                                        value={theme.titleThemeExercises || ""}
                                        disabled={disabled}
                                        onChange={(e) => actions.alterarTema(i, "titleThemeExercises", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Descrição do tema ou seus tópicos..."
                                        value={theme.contentThemeExercises || ""}
                                        disabled={disabled}
                                        onChange={(e) => actions.alterarTema(i, "contentThemeExercises", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => actions.removerTema(i)}
                                    disabled={disabled}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer w-full md:w-auto"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
