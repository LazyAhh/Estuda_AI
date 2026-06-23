import React from "react";

export const Conteudo = ({ states, actions, disabled }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-3">
                    <h3 className="text-sm font-bold text-slate-800">Temas Abordados</h3>
                    <button
                        type="button"
                        onClick={actions.adicionarTema}
                        disabled={disabled}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                    >
                        + Adicionar Tema
                    </button>
                </div>
                {states.themes.length === 0 ? (
                    <p className="text-slate-450 text-xs italic my-2">Nenhum tema adicionado.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {states.themes.map((theme, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="Nome do tema principal"
                                        value={theme.titleThemesLessonPlan || ""}
                                        onChange={(e) => actions.alterarTema(i, "titleThemesLessonPlan", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Conteúdo descritivo do tema"
                                        value={theme.contentThemesLessonPlan || ""}
                                        onChange={(e) => actions.alterarTema(i, "contentThemesLessonPlan", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => actions.removerTema(i)}
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
                    <h3 className="text-sm font-bold text-slate-800">Metodologias de Ensino</h3>
                    <button
                        type="button"
                        onClick={actions.adicionarMetodologia}
                        disabled={disabled}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                    >
                        + Adicionar Metodologia
                    </button>
                </div>
                {states.teachingMethodologies.length === 0 ? (
                    <p className="text-slate-450 text-xs italic my-2">Nenhuma metodologia descrita.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {states.teachingMethodologies.map((meth, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 w-full">
                                    <input
                                        type="text"
                                        placeholder="Ex: Metodologia Ativa, Aula Expositiva"
                                        value={meth.titleMethodologyLessonPlan || ""}
                                        onChange={(e) => actions.alterarMetodologia(i, "titleMethodologyLessonPlan", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Explicação da aplicação metodológica"
                                        value={meth.contentMethodologyLessonPlan || ""}
                                        onChange={(e) => actions.alterarMetodologia(i, "contentMethodologyLessonPlan", e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => actions.removerMetodologia(i)}
                                    className="bg-red-50 hover:bg-red-100 text-red-655 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer w-full md:w-auto"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs flex flex-col gap-4">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-1">Fechamento da Aula</h3>
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Resumo da Aula</label>
                    <textarea
                        placeholder="Síntese dos tópicos principais..."
                        value={states.closure.summary}
                        onChange={(e) => states.setClosure({ ...states.closure, summary: e.target.value })}
                        disabled={disabled}
                        rows="2"
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                    />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Reflexão / Avaliação</label>
                    <textarea
                        placeholder="Perguntas reflexivas aos alunos..."
                        value={states.closure.reflection}
                        onChange={(e) => states.setClosure({ ...states.closure, reflection: e.target.value })}
                        disabled={disabled}
                        rows="2"
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                    />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700 select-none block">Próximos Passos</label>
                    <input
                        type="text"
                        placeholder="Assunto da próxima aula ou links de leitura..."
                        value={states.closure.nextSteps}
                        onChange={(e) => states.setClosure({ ...states.closure, nextSteps: e.target.value })}
                        disabled={disabled}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                    />
                </div>
            </div>
        </div>
    );
};
