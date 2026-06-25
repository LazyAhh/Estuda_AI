import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext";

export const DetalheExercicio = ({ exercicio, onVoltar }) => {
    const { showToast } = useNotification();
    const [respostasUsuario, setRespostasUsuario] = useState({});
    const [feedbacks, setFeedbacks] = useState({});

    if (!exercicio) return null;

    const handleOpcaoClick = (qIndex, opcao) => {
        setRespostasUsuario({
            ...respostasUsuario,
            [qIndex]: opcao
        });
    };

    const handleTextChange = (qIndex, texto) => {
        setRespostasUsuario({
            ...respostasUsuario,
            [qIndex]: texto
        });
    };

    const verificarQuestao = (qIndex, respostaCorreta, explicacao) => {
        const respostaEstudante = respostasUsuario[qIndex];
        if (!respostaEstudante) {
            showToast("Por favor, responda à questão antes de verificar.", "warning");
            return;
        }

        const correta = respostaEstudante.toString().trim().toLowerCase() === respostaCorreta.toString().trim().toLowerCase();

        setFeedbacks({
            ...feedbacks,
            [qIndex]: {
                verificado: true,
                correta,
                explicacao
            }
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <button
                onClick={onVoltar}
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-900 transition-colors self-start cursor-pointer bg-transparent border-none"
            >
                &larr; Voltar para a lista
            </button>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-4 bg-opacity-100">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase border border-indigo-200 bg-indigo-50 text-indigo-700">
                        Nível {exercicio.complexityLevelExercises || "Médio"}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">ID: {exercicio.id_exercise}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{exercicio.subjectExercises}</h2>
                <p className="text-slate-600 leading-relaxed text-base">{exercicio.descriptionExercises}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4 mt-2">
                    <span><strong>Série/Ano:</strong> {exercicio.gradeLevelExercises}</span>
                    <span>|</span>
                    <span><strong>Duração estimada:</strong> {exercicio.durationMinutesExercises} minutos</span>
                </div>
            </div>

            {exercicio.execiseItems?.length === 0 ? (
                <div className="text-slate-500 text-sm text-center py-12 bg-white border border-slate-200 rounded-lg shadow-sm">
                    Este exercício não contém questões cadastradas.
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {exercicio.execiseItems.map((questao, indexQuestao) => {
                        const retornoFeedback = feedbacks[indexQuestao];
                        return (
                            <div key={questao.id_exercise_item} className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-4 bg-opacity-100">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <h4 className="text-base font-bold text-slate-800">Questão {indexQuestao + 1}</h4>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                        Nível Bloom: {questao.bloom_level_exercise || "Lembrar"}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-bold text-slate-900 leading-relaxed">{questao.title_exercise}</p>
                                    <p className="text-sm text-slate-600 leading-relaxed">{questao.content_exercise}</p>
                                </div>

                                {questao.type_exercise === "multipla-escolha" && questao.optionsMultiple?.length > 0 && (
                                    <div className="flex flex-col gap-2.5 mt-2">
                                        {questao.optionsMultiple.map((opcaoMultiple) => {
                                            const selecionado = respostasUsuario[indexQuestao] === opcaoMultiple.option;
                                            return (
                                                <button
                                                    key={opcaoMultiple.id_optionsMultiple}
                                                    type="button"
                                                    disabled={retornoFeedback?.verificado}
                                                    onClick={() => handleOpcaoClick(indexQuestao, opcaoMultiple.option)}
                                                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${selecionado ? "border-indigo-900 bg-indigo-50/50 text-indigo-900" : "border-slate-200 hover:bg-slate-50 text-slate-700"} disabled:opacity-85 disabled:cursor-not-allowed`}
                                                >
                                                    <span className={`w-5 h-5 flex items-center justify-center rounded-full border text-xs font-bold ${selecionado ? "border-indigo-900 bg-indigo-900 text-white" : "border-slate-350 text-slate-500"}`}>
                                                        {opcaoMultiple.option}
                                                    </span>
                                                    <span>{opcaoMultiple.content_option}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}


                                {questao.type_exercise === "discursiva" && (
                                    <div className="mt-2">
                                        <textarea
                                            placeholder="Escreva sua resposta discursiva aqui..."
                                            disabled={retornoFeedback?.verificado}
                                            value={respostasUsuario[indexQuestao] || ""}
                                            onChange={(e) => handleTextChange(indexQuestao, e.target.value)}
                                            rows="4"
                                            className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-350 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all disabled:opacity-50 disabled:bg-slate-50"
                                        />
                                    </div>
                                )}

                                {!retornoFeedback?.verificado && (
                                    <button
                                        type="button"
                                        onClick={() => verificarQuestao(indexQuestao, questao.correct_answer_exercise, questao.explanation_exercise)}
                                        className="mt-3 bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer self-start disabled:opacity-50"
                                    >
                                        Verificar Resposta
                                    </button>
                                )}

                                {retornoFeedback?.verificado && (
                                    <div className={`p-4 rounded-lg border text-sm flex flex-col gap-2 mt-2 ${retornoFeedback.correta ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                                        <div className="font-bold flex items-center gap-1">
                                            {retornoFeedback.correta
                                                ? "Resposta Correta!"
                                                : questao.type_exercise === "discursiva"
                                                    ? "Gabarito de Referência"
                                                    : `Resposta Incorreta (A resposta correta era: ${questao.correct_answer_exercise})`
                                            }
                                        </div>
                                        {questao.type_exercise === "discursiva" && (
                                            <p className="text-xs text-slate-700 leading-relaxed bg-white/70 border border-slate-200/50 p-3 rounded-md mt-1 font-mono whitespace-pre-wrap">
                                                <strong>Resposta esperada:</strong><br />
                                                {questao.correct_answer_exercise}
                                            </p>
                                        )}
                                        <p className="text-xs leading-relaxed mt-1 whitespace-pre-wrap">
                                            <strong>Explicação:</strong><br />
                                            {retornoFeedback.explicacao || "Nenhuma explicação fornecida."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DetalheExercicio;
