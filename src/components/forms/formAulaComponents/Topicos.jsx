import React from "react";

export const Topicos = ({ states, actions, disabled }) => {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-3">
                <div>
                    <h3 className="text-sm font-bold text-slate-800">Tópicos e Explicações</h3>
                    <p className="text-xs text-slate-500 block mt-1">Adicione os blocos de conteúdo da sua aula contendo exemplos e atividades.</p>
                </div>
                <button
                    type="button"
                    onClick={actions.adicionarTopico}
                    disabled={disabled}
                    className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer"
                >
                    + Novo Tópico
                </button>
            </div>

            {states.topics.length === 0 ? (
                <div className="text-center py-8 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <p className="text-slate-450 text-xs italic">Nenhum tópico adicionado ainda. Crie pelo menos um.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    {states.topics.map((topic, tIndex) => (
                        <div key={tIndex} className="border border-slate-250 rounded-lg p-6 bg-white shadow-sm flex flex-col gap-5 bg-opacity-100">
                            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-1">
                                <h4 className="text-sm font-bold text-indigo-900">Tópico {tIndex + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => actions.removerTopico(tIndex)}
                                    className="bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Remover Tópico
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-700 select-none block">Título do Tópico</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Definição de Nó"
                                        value={topic.titleTopicsLessonPlan}
                                        onChange={(e) => actions.alterarTopico(tIndex, "titleTopicsLessonPlan", e.target.value)}
                                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-700 select-none block">Resumo Curto do Tópico</label>
                                    <input
                                        type="text"
                                        placeholder="Visão geral resumida"
                                        value={topic.contentTopicsLessonPlan}
                                        onChange={(e) => actions.alterarTopico(tIndex, "contentTopicsLessonPlan", e.target.value)}
                                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-xs font-semibold text-slate-700 select-none block">Explicação Detalhada do Conteúdo</label>
                                <textarea
                                    placeholder="Escreva a teoria, fórmulas ou código que compõem este tópico..."
                                    value={topic.detailed_explanation_topic_lesson_plan}
                                    onChange={(e) => actions.alterarTopico(tIndex, "detailed_explanation_topic_lesson_plan", e.target.value)}
                                    rows="4"
                                    className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text disabled:opacity-50 disabled:bg-slate-50"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-100 pt-4 mt-2">
                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/20">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-1 mb-3">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Exemplos Práticos</h5>
                                        <button
                                            type="button"
                                            onClick={() => actions.adicionarExemplo(tIndex)}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-750 border border-slate-200 px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer bg-white"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {topic.examplesTopicLessonPlan.map((ex, eIndex) => (
                                            <div key={eIndex} className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 relative bg-opacity-100">
                                                <input
                                                    type="text"
                                                    placeholder="Título do exemplo"
                                                    value={ex.titleExamplesTopicLessonPlan}
                                                    onChange={(e) => actions.alterarExemplo(tIndex, eIndex, "titleExamplesTopicLessonPlan", e.target.value)}
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-350 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                    required
                                                />
                                                <textarea
                                                    placeholder="Descrição do exemplo..."
                                                    value={ex.contentExamplesTopicLessonPlan}
                                                    onChange={(e) => actions.alterarExemplo(tIndex, eIndex, "contentExamplesTopicLessonPlan", e.target.value)}
                                                    rows="2"
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-355 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => actions.removerExemplo(tIndex, eIndex)}
                                                    className="bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer self-end"
                                                >
                                                    remover
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/20">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-1 mb-3">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Atividades de Fixação</h5>
                                        <button
                                            type="button"
                                            onClick={() => actions.adicionarAtividade(tIndex)}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-750 border border-slate-200 px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer bg-white"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {topic.activitiesTopicLessonPlan.map((act, aIndex) => (
                                            <div key={aIndex} className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 relative bg-opacity-100">
                                                <input
                                                    type="text"
                                                    placeholder="Título da atividade"
                                                    value={act.titleActivitiesTopicLessonPlan}
                                                    onChange={(e) => actions.alterarAtividade(tIndex, aIndex, "titleActivitiesTopicLessonPlan", e.target.value)}
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-350 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                    required
                                                />
                                                <textarea
                                                    placeholder="Enunciado..."
                                                    value={act.contentActivitiesTopicLessonPlan}
                                                    onChange={(e) => actions.alterarAtividade(tIndex, aIndex, "contentActivitiesTopicLessonPlan", e.target.value)}
                                                    rows="2"
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-355 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Explicação pedagógica"
                                                    value={act.explicationActivitiesTopicLessonPlan || ""}
                                                    onChange={(e) => actions.alterarAtividade(tIndex, aIndex, "explicationActivitiesTopicLessonPlan", e.target.value)}
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-350 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => actions.removerAtividade(tIndex, aIndex)}
                                                    className="bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer self-end"
                                                >
                                                    remover
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/20">
                                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-1 mb-3">
                                        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Conexões</h5>
                                        <button
                                            type="button"
                                            onClick={() => actions.adicionarConexao(tIndex)}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-750 border border-slate-200 px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer bg-white"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {topic.connectionsTopicLessonPlan.map((con, cIndex) => (
                                            <div key={cIndex} className="flex flex-col gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 relative bg-opacity-100">
                                                <input
                                                    type="text"
                                                    placeholder="Matéria / Contexto"
                                                    value={con.titleConnectionsTopics}
                                                    onChange={(e) => actions.alterarConexao(tIndex, cIndex, "titleConnectionsTopics", e.target.value)}
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-350 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                    required
                                                />
                                                <textarea
                                                    placeholder="Como se conecta com a aula?"
                                                    value={con.contentConnectionsTopics}
                                                    onChange={(e) => actions.alterarConexao(tIndex, cIndex, "contentConnectionsTopics", e.target.value)}
                                                    rows="2"
                                                    className="w-full px-2 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-355 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => actions.removerConexao(tIndex, cIndex)}
                                                    className="bg-red-50 hover:bg-red-100 text-red-650 border border-red-200 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer self-end"
                                                >
                                                    remover
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
