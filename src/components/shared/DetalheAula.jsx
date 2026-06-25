import React from "react";

export const DetalheAula = ({ aula, onVoltar }) => {
    if (!aula) return null;

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
                        Nível {aula.complexityLevelLessonPlan || "Médio"}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">ID: {aula.id_lesson_plan}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{aula.subjectLessonPlan}</h2>
                <p className="text-slate-600 leading-relaxed text-base">{aula.descriptionLessonPlan}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4 mt-2">
                    <span><strong>Série/Ano:</strong> {aula.gradeLevelLessonPlan}</span>
                    <span>|</span>
                    <span><strong>Duração:</strong> {aula.durationMinutesLessonPlan} minutos</span>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-6 bg-opacity-100">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Objetivo Geral</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{aula.generalObjective}</p>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Objetivos Específicos</h3>
                    {aula.objetives_lesson_plan?.length > 0 ? (
                        <ul className="list-disc pl-5 text-sm text-slate-600 flex flex-col gap-2">
                            {aula.objetives_lesson_plan.map((objetivo, indexObj) => (
                                <li key={indexObj} className="leading-relaxed">
                                    <strong className="font-semibold text-slate-800">{objetivo.titleObjetivesLessonPlan}:</strong> {objetivo.contentObjetivesLessonPlan}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-400 text-xs italic">Sem objetivos específicos</p>
                    )}
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Competências</h3>
                {aula.competencies_lesson_plan?.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-slate-600 flex flex-col gap-2">
                        {aula.competencies_lesson_plan.map((competencia, indexComp) => (
                            <li key={indexComp} className="leading-relaxed">{competencia.contentCompetenciesLessonPlan}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-400 text-xs italic">Sem competências</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Temas Abordados</h3>
                {aula.themes_lesson_plan?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aula.themes_lesson_plan.map((tema, indexTema) => (
                            <div key={indexTema} className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-900 mb-1.5 text-sm">{tema.titleThemesLessonPlan}</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">{tema.contentThemesLessonPlan}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-440 text-xs italic">Sem temas abordados</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Metodologia</h3>
                {aula.methodology_lesson_plan?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aula.methodology_lesson_plan.map((metodologia, indexMetodo) => (
                            <div key={indexMetodo} className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-900 mb-1.5 text-sm">{metodologia.titleMethodologyLessonPlan}</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">{metodologia.contentMethodologyLessonPlan}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400 text-xs italic">Sem metodologia descrita</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-6 bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Tópicos da Aula</h3>
                {aula.topics_lesson_plan?.length > 0 ? (
                    <div className="flex flex-col gap-8">
                        {aula.topics_lesson_plan.map((topico, indexTopico) => (
                            <div key={indexTopico} className="border border-slate-200 rounded-lg p-6 bg-slate-50/50 flex flex-col gap-4">
                                <div>
                                    <h4 className="text-base font-bold text-indigo-900 mb-1">
                                        {topico.titleTopicsLessonPlan}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium italic">{topico.contentTopicsLessonPlan}</p>
                                </div>

                                <p className="text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-3">{topico.detailed_explanation_topic_lesson_plan}</p>

                                {topico.examples_topics?.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exemplos Práticos</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {topico.examples_topics.map((exemplo, indexEx) => (
                                                <div key={indexEx} className="border-l-4 border-indigo-900 bg-white p-4 rounded-r-lg shadow-xs flex flex-col gap-1">
                                                    <strong className="text-sm font-semibold text-slate-900">{exemplo.titleExamplesTopicLessonPlan}</strong>
                                                    <p className="text-slate-600 text-xs leading-relaxed">{exemplo.contentExamplesTopicLessonPlan}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {topico.activities_topics?.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Atividades de Fixação</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {topico.activities_topics.map((atividade, indexAct) => (
                                                <div key={indexAct} className="border-l-4 border-emerald-600 bg-white p-4 rounded-r-lg shadow-xs flex flex-col gap-1.5">
                                                    <strong className="text-sm font-semibold text-slate-900">{atividade.titleActivitiesTopicLessonPlan}</strong>
                                                    <p className="text-slate-600 text-xs leading-relaxed">{atividade.contentActivitiesTopicLessonPlan}</p>
                                                    {atividade.explicationActivitiesTopicLessonPlan && (
                                                        <p className="text-xs text-emerald-800 bg-emerald-50/50 p-2 rounded border border-emerald-100">💡 Dica: {atividade.explicationActivitiesTopicLessonPlan}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {topico.connections_topics?.length > 0 && (
                                    <div className="flex flex-col gap-3 mt-2">
                                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conexões Interdisciplinares</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {topico.connections_topics.map((conexao, indexCon) => (
                                                <div key={indexCon} className="border-l-4 border-amber-500 bg-white p-4 rounded-r-lg shadow-xs flex flex-col gap-1">
                                                    <strong className="text-sm font-semibold text-slate-900">{conexao.titleConnectionsTopics}</strong>
                                                    <p className="text-slate-600 text-xs leading-relaxed">{conexao.contentConnectionsTopics}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-400 text-xs italic">Sem tópicos cadastrados</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-3 bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Tarefa de Casa</h3>
                {aula.homework_lesson_plan && aula.homework_lesson_plan.description ? (
                    <>
                        <p className="text-slate-700 text-sm leading-relaxed">
                            {aula.homework_lesson_plan.description}
                        </p>
                        {aula.homework_lesson_plan.objective && (
                            <p className="text-xs text-slate-500">
                                <strong>Objetivo pedagógico:</strong> {aula.homework_lesson_plan.objective}
                            </p>
                        )}
                    </>
                ) : (
                    <p className="text-slate-400 text-xs italic">Sem tarefa de casa</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">Adaptações Inclusivas</h3>
                {aula.inclusive_adaptation_lesson_plan &&
                    (aula.inclusive_adaptation_lesson_plan.visualImpairment ||
                        aula.inclusive_adaptation_lesson_plan.learningDifficulties ||
                        aula.inclusive_adaptation_lesson_plan.highAbilities) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aula.inclusive_adaptation_lesson_plan.visualImpairment && (
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                                <strong className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Deficiência Visual</strong>
                                <p className="text-slate-700 text-xs leading-relaxed">{aula.inclusive_adaptation_lesson_plan.visualImpairment}</p>
                            </div>
                        )}
                        {aula.inclusive_adaptation_lesson_plan.learningDifficulties && (
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                                <strong className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Dificuldade de Aprendizado</strong>
                                <p className="text-slate-700 text-xs leading-relaxed">{aula.inclusive_adaptation_lesson_plan.learningDifficulties}</p>
                            </div>
                        )}
                        {aula.inclusive_adaptation_lesson_plan.highAbilities && (
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                                <strong className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Altas Habilidades</strong>
                                <p className="text-slate-700 text-xs leading-relaxed">{aula.inclusive_adaptation_lesson_plan.highAbilities}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-slate-400 text-xs italic">Sem adaptações inclusivas</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm bg-opacity-100">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Referências</h3>
                {aula.references_lesson_plan?.length > 0 ? (
                    <ul className="list-disc pl-5 text-xs text-slate-500 font-mono flex flex-col gap-2">
                        {aula.references_lesson_plan.map((ref, indexRef) => (
                            <li key={indexRef} className="leading-relaxed">{ref.contentReferencesLessonPlan}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-400 text-xs italic">Sem referências bibliográficas</p>
                )}
            </div>
        </div>
    );
};

export default DetalheAula;