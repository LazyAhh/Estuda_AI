import React from "react";

export const Extra = ({ states, actions, disabled }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs flex flex-col gap-4 bg-opacity-100">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-1">Tarefa de Casa</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-semibold text-slate-700 select-none block">Descrição do Trabalho</label>
                        <textarea
                            placeholder="Ex: Implementar lista duplamente encadeada..."
                            value={states.homework.description}
                            onChange={(e) => states.setHomework({ ...states.homework, description: e.target.value })}
                            disabled={disabled}
                            rows="2"
                            className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-semibold text-slate-700 select-none block">Objetivo da Tarefa</label>
                        <textarea
                            placeholder="Consolidar a teoria praticando..."
                            value={states.homework.objective}
                            onChange={(e) => states.setHomework({ ...states.homework, objective: e.target.value })}
                            disabled={disabled}
                            rows="2"
                            className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        />
                    </div>
                </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs flex flex-col gap-4 bg-opacity-100">
                <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-1">Adaptações Inclusivas (Atendimento Especial)</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-semibold text-slate-700 select-none block">Para Deficiência Visual</label>
                        <textarea
                            placeholder="Ex: Textos em Braille, leitores de tela..."
                            value={states.inclusiveAdaptation.visualImpairment}
                            onChange={(e) => states.setInclusiveAdaptation({ ...states.inclusiveAdaptation, visualImpairment: e.target.value })}
                            disabled={disabled}
                            rows="2"
                            className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-semibold text-slate-700 select-none block">Para Dificuldades de Aprendizagem</label>
                        <textarea
                            placeholder="Ex: Tempo extra, auxílio visual..."
                            value={states.inclusiveAdaptation.learningDifficulties}
                            onChange={(e) => states.setInclusiveAdaptation({ ...states.inclusiveAdaptation, learningDifficulties: e.target.value })}
                            disabled={disabled}
                            rows="2"
                            className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-xs font-semibold text-slate-700 select-none block">Para Altas Habilidades</label>
                        <textarea
                            placeholder="Ex: Atividades avançadas de pesquisa..."
                            value={states.inclusiveAdaptation.highAbilities}
                            onChange={(e) => states.setInclusiveAdaptation({ ...states.inclusiveAdaptation, highAbilities: e.target.value })}
                            disabled={disabled}
                            rows="2"
                            className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                        />
                    </div>
                </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-xs bg-opacity-100">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-3">
                    <h3 className="text-sm font-bold text-slate-800">Referências Bibliográficas</h3>
                    <button
                        type="button"
                        onClick={actions.adicionarReferencia}
                        disabled={disabled}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                    >
                        + Adicionar Referência
                    </button>
                </div>
                {states.references.length === 0 ? (
                    <p className="text-slate-455 text-xs italic my-2">Nenhuma referência adicionada.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {states.references.map((ref, i) => (
                            <div key={i} className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-150 relative bg-opacity-100">
                                <input
                                    type="text"
                                    placeholder="Ex: DEITEL, Paul. Java: Como Programar. 10. ed. Pearson, 2016."
                                    value={ref.contentReferencesLessonPlan || ""}
                                    onChange={(e) => actions.alterarReferencia(i, e.target.value)}
                                    className="flex-1 w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => actions.removerReferencia(i)}
                                    className="bg-red-50 hover:bg-red-100 text-red-655 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
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
