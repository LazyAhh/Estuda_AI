import React from "react";

export const QuestoesExercicio = ({ states, actions, disabled }) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2 mb-4">
                    <h3 className="text-sm font-bold text-slate-800">Questões do exercício</h3>
                    <button
                        type="button"
                        onClick={actions.adicionarQuestao}
                        disabled={disabled}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer bg-white"
                    >
                        + Adicionar questão
                    </button>
                </div>

                {states.questions.length === 0 ? (
                    <p className="text-slate-400 text-xs italic my-2">Nenhuma questão adicionada ainda. Crie pelo menos uma.</p>
                ) : (
                    <div className="flex flex-col gap-5">
                        {states.questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-slate-55 p-4 rounded-lg border border-slate-200 relative bg-opacity-100 flex flex-col gap-4 bg-slate-50">
                                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                                    <h4 className="text-xs font-bold text-slate-700">Questão {qIndex + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => actions.removerQuestao(qIndex)}
                                        disabled={disabled}
                                        className="bg-red-50 hover:bg-red-105 text-red-600 border border-red-200 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer"
                                    >
                                        Remover Questão
                                    </button>
                                </div>

                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-700 select-none">Título da Questão</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: Questão 1: Encontre as raízes"
                                        value={q.title_exercise}
                                        onChange={(e) => actions.alterarQuestao(qIndex, "title_exercise", e.target.value)}
                                        disabled={disabled}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-700 select-none">Enunciado / Pergunta</label>
                                    <textarea
                                        placeholder="Escreva a pergunta completa..."
                                        value={q.content_exercise}
                                        onChange={(e) => actions.alterarQuestao(qIndex, "content_exercise", e.target.value)}
                                        disabled={disabled}
                                        rows="3"
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700 select-none">Tipo de Questão</label>
                                        <select
                                            value={q.type_exercise}
                                            onChange={(e) => actions.alterarQuestao(qIndex, "type_exercise", e.target.value)}
                                            disabled={disabled}
                                            className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        >
                                            <option value="multipla-escolha">Múltipla Escolha</option>
                                            <option value="verdadeiro-falso">Verdadeiro ou Falso</option>
                                            <option value="discursiva">Discursiva</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700 select-none">Nível da Taxonomia de Bloom</label>
                                        <select
                                            value={q.bloom_level}
                                            onChange={(e) => actions.alterarQuestao(qIndex, "bloom_level", e.target.value)}
                                            disabled={disabled}
                                            className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        >
                                            <option value="lembrar">Lembrar</option>
                                            <option value="compreender">Compreender</option>
                                            <option value="aplicar">Aplicar</option>
                                            <option value="analisar">Analisar</option>
                                            <option value="avaliar">Avaliar</option>
                                            <option value="criar">Criar</option>
                                        </select>
                                    </div>
                                </div>

                                {q.type_exercise === "multipla-escolha" && (
                                    <div className="border border-slate-200 rounded-md p-3 bg-white flex flex-col gap-3">
                                        <span className="text-xs font-semibold text-slate-700">Alternativas (A, B, C, D)</span>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {q.options_exercise_multipla_escolha?.map((opt, oIndex) => (
                                                <div key={oIndex} className="flex gap-2 items-center bg-slate-50 p-2 rounded border border-slate-200">
                                                    <span className="text-xs font-bold text-slate-700 w-5 text-center">{opt.option})</span>
                                                    <input
                                                        type="text"
                                                        placeholder={`Conteúdo da alternativa ${opt.option}`}
                                                        value={opt.content_option}
                                                        onChange={(e) => actions.alterarAlternativa(qIndex, oIndex, e.target.value)}
                                                        disabled={disabled}
                                                        className="flex-1 px-2.5 py-1 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {q.type_exercise === "multipla-escolha" && (
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700 select-none">Alternativa Correta</label>
                                        <select
                                            value={q.correct_answer_exercise}
                                            onChange={(e) => actions.alterarQuestao(qIndex, "correct_answer_exercise", e.target.value)}
                                            disabled={disabled}
                                            className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                            required
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                        </select>
                                    </div>
                                )}

                                {q.type_exercise !== "multipla-escolha" && (
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700 select-none">Resposta Esperada</label>
                                        <input
                                            type="text"
                                            placeholder={q.type_exercise === "verdadeiro-falso" ? "Ex: V, F, V, V, F" : "Gabarito esperado"}
                                            value={q.correct_answer_exercise}
                                            onChange={(e) => actions.alterarQuestao(qIndex, "correct_answer_exercise", e.target.value)}
                                            disabled={disabled}
                                            className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-700 select-none">Explicação da Resposta</label>
                                    <input
                                        type="text"
                                        placeholder="Por que essa resposta está correta?"
                                        value={q.explanation_exercise}
                                        onChange={(e) => actions.alterarQuestao(qIndex, "explanation_exercise", e.target.value)}
                                        disabled={disabled}
                                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-solid border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-900 focus:border-indigo-900 transition-all select-text"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
