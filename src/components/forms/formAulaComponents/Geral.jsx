import React from "react";

export const Geral = ({ states, actions, disabled, dadosIniciais }) => {
    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Matéria / Disciplina</label>
                    <input
                        type="text"
                        placeholder="Ex: Estrutura de Dados"
                        value={states.subjectLessonPlan}
                        onChange={(e) => states.setSubjectLessonPlan(e.target.value)}
                        disabled={disabled}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Série / Ano</label>
                    <input
                        type="text"
                        placeholder="Ex: 3º Período Engenharia"
                        value={states.gradeLevelLessonPlan}
                        onChange={(e) => states.setGradeLevelLessonPlan(e.target.value)}
                        disabled={disabled}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        required
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold text-slate-700 select-none block">Descrição</label>
                <textarea
                    placeholder="Uma descrição do plano de aula..."
                    value={states.descriptionLessonPlan}
                    onChange={(e) => states.setDescriptionLessonPlan(e.target.value)}
                    disabled={disabled}
                    rows="3"
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Complexidade</label>
                    <select
                        value={states.complexityLevelLessonPlan}
                        onChange={(e) => states.setComplexityLevelLessonPlan(e.target.value)}
                        disabled={disabled}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all disabled:opacity-50 disabled:bg-slate-50"
                    >
                        <option value="facil">Fácil</option>
                        <option value="medio">Médio</option>
                        <option value="dificil">Difícil</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Duração Esperada (minutos)</label>
                    <input
                        type="number"
                        placeholder="Ex: 90"
                        value={states.durationMinutesLessonPlan}
                        onChange={(e) => states.setDurationMinutesLessonPlan(e.target.value)}
                        disabled={disabled}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        required
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-semibold text-slate-700 select-none block">Objetivo Geral</label>
                <input
                    type="text"
                    placeholder="Objetivo maior a ser alcançado"
                    value={states.generalObjective}
                    onChange={(e) => states.setGeneralObjective(e.target.value)}
                    disabled={disabled}
                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                    required
                />
            </div>

            {!dadosIniciais && (
                <div className="flex flex-col gap-6">
                    <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs">
                        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-3">
                            <h3 className="text-sm font-bold text-slate-800">Objetivos Específicos</h3>
                            <button
                                type="button"
                                onClick={actions.adicionarObjetivo}
                                disabled={disabled}
                                className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                            >
                                + Adicionar Objetivo
                            </button>
                        </div>
                        {states.specificObjectives.length === 0 ? (
                            <p className="text-slate-450 text-xs italic my-2">Nenhum objetivo específico adicionado.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {states.specificObjectives.map((obj, i) => (
                                    <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full">
                                            <input
                                                type="text"
                                                placeholder="Título do objetivo"
                                                value={obj.titleObjetivesLessonPlan || ""}
                                                onChange={(e) => actions.alterarObjetivo(i, "titleObjetivesLessonPlan", e.target.value)}
                                                className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Detalhamento do objetivo"
                                                value={obj.contentObjetivesLessonPlan || ""}
                                                onChange={(e) => actions.alterarObjetivo(i, "contentObjetivesLessonPlan", e.target.value)}
                                                className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => actions.removerObjetivo(i)}
                                            className="bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer w-full md:w-auto"
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
                            <h3 className="text-sm font-bold text-slate-800">Competências Desenvolvidas</h3>
                            <button
                                type="button"
                                onClick={actions.adicionarCompetencia}
                                disabled={disabled}
                                className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                            >
                                + Adicionar Competência
                            </button>
                        </div>
                        {states.competencies.length === 0 ? (
                            <p className="text-slate-450 text-xs italic my-2">Nenhuma competência mapeada.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {states.competencies.map((comp, i) => (
                                    <div key={i} className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                        <input
                                            type="text"
                                            placeholder="Descrição da competência"
                                            value={comp.contentCompetenciesLessonPlan || ""}
                                            onChange={(e) => actions.alterarCompetencia(i, e.target.value)}
                                            className="flex-1 w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => actions.removerCompetencia(i)}
                                            className="bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
