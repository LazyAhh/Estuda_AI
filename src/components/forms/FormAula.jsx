import React, { useState } from "react";
import { useFormAula } from "../../hooks/useFormAula";
import { Geral } from "./formAulaComponents/Geral";
import { Conteudo } from "./formAulaComponents/Conteudo";
import { Topicos } from "./formAulaComponents/Topicos";
import { Extra } from "./formAulaComponents/Extra";

export const FormAula = ({ dadosIniciais, onSubmit, onCancelar, disabled }) => {
    const { states, actions } = useFormAula(dadosIniciais);
    const [secaoAtiva, setSecaoAtiva] = useState("geral");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            subjectLessonPlan: states.subjectLessonPlan,
            descriptionLessonPlan: states.descriptionLessonPlan,
            gradeLevelLessonPlan: states.gradeLevelLessonPlan,
            complexityLevelLessonPlan: states.complexityLevelLessonPlan,
            durationMinutesLessonPlan: Number(states.durationMinutesLessonPlan),
            generalObjective: states.generalObjective,
            specificObjectives: states.specificObjectives.map(o => ({
                titleObjetivesLessonPlan: o.titleObjetivesLessonPlan,
                contentObjetivesLessonPlan: o.contentObjetivesLessonPlan
            })),
            competencies: states.competencies.map(c => ({
                contentCompetenciesLessonPlan: c.contentCompetenciesLessonPlan
            })),
            themes: states.themes.map(t => ({
                titleThemesLessonPlan: t.titleThemesLessonPlan,
                contentThemesLessonPlan: t.contentThemesLessonPlan
            })),
            teachingMethodologies: states.teachingMethodologies.map(m => ({
                titleMethodologyLessonPlan: m.titleMethodologyLessonPlan,
                contentMethodologyLessonPlan: m.contentMethodologyLessonPlan
            })),
            topics: states.topics.map(t => ({
                titleTopicsLessonPlan: t.titleTopicsLessonPlan,
                contentTopicsLessonPlan: t.contentTopicsLessonPlan,
                detailed_explanation_topic_lesson_plan: t.detailed_explanation_topic_lesson_plan,
                examplesTopicLessonPlan: t.examplesTopicLessonPlan.map(ex => ({
                    titleExamplesTopicLessonPlan: ex.titleExamplesTopicLessonPlan,
                    contentExamplesTopicLessonPlan: ex.contentExamplesTopicLessonPlan
                })),
                activitiesTopicLessonPlan: t.activitiesTopicLessonPlan.map(act => ({
                    titleActivitiesTopicLessonPlan: act.titleActivitiesTopicLessonPlan,
                    contentActivitiesTopicLessonPlan: act.contentActivitiesTopicLessonPlan,
                    explicationActivitiesTopicLessonPlan: act.explicationActivitiesTopicLessonPlan
                })),
                connectionsTopicLessonPlan: t.connectionsTopicLessonPlan.map(con => ({
                    titleConnectionsTopics: con.titleConnectionsTopics,
                    contentConnectionsTopics: con.contentConnectionsTopics
                }))
            })),
            homework: {
                description: states.homework.description || "",
                objective: states.homework.objective || ""
            },
            inclusiveAdaptation: {
                visualImpairment: states.inclusiveAdaptation.visualImpairment || "",
                learningDifficulties: states.inclusiveAdaptation.learningDifficulties || "",
                highAbilities: states.inclusiveAdaptation.highAbilities || ""
            },
            references: states.references.map(r => ({
                contentReferencesLessonPlan: r.contentReferencesLessonPlan
            })),
            closure: {
                summary: states.closure.summary || "",
                reflection: states.closure.reflection || "",
                nextSteps: states.closure.nextSteps || ""
            }
        };

        onSubmit(payload);
    };

    const abas = dadosIniciais
        ? [{ id: "geral", label: "Dados Gerais & Objetivos" }]
        : [
            { id: "geral", label: "Dados Gerais & Objetivos" },
            { id: "conteudo", label: "Conteúdo & Metodologia" },
            { id: "topicos", label: "Tópicos Detalhados" },
            { id: "extra", label: "Tarefa, Inclusão & Referências" }
        ];

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-slate-100 pb-4 mb-2">
                <h2 className="text-lg font-bold text-slate-800">
                    {dadosIniciais ? "Editar Plano de Aula" : "Criar Novo Plano de Aula"}
                </h2>
                <span className="text-xs text-slate-500 block mt-1">Preencha as seções abaixo</span>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
                {abas.map(aba => (
                    <button
                        key={aba.id}
                        type="button"
                        onClick={() => setSecaoAtiva(aba.id)}
                        className={`px-4 py-2 text-xs border-b-2 transition-all cursor-pointer bg-transparent ${secaoAtiva === aba.id ? "border-indigo-900 text-indigo-900 font-bold" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-350 font-medium"}`}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>

            <div className="w-full">
                {secaoAtiva === "geral" && (
                    <Geral states={states} actions={actions}  disabled={disabled} 
                    dadosIniciais={dadosIniciais} />
                )}

                {secaoAtiva === "conteudo" && (
                    <Conteudo states={states} actions={actions} disabled={disabled} />
                )}

                {secaoAtiva === "topicos" && (
                    <Topicos states={states} actions={actions} disabled={disabled} />
                )}

                {secaoAtiva === "extra" && (
                    <Extra states={states} actions={actions} disabled={disabled} />
                )}
            </div>

            <div className="flex gap-3 justify-end border-t border-slate-100 pt-6 mt-4">
                {onCancelar && (
                    <button
                        type="button"
                        onClick={onCancelar}
                        disabled={disabled}
                        className="px-4 py-2 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer bg-white bg-opacity-100 shadow-sm"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    disabled={disabled}
                    className="px-4 py-2 rounded bg-indigo-900 hover:bg-indigo-950 text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                    {disabled ? "Salvando..." : dadosIniciais ? "Salvar Alterações" : "Criar Plano de Aula"}
                </button>
            </div>
        </form>
    );
};

export default FormAula;
