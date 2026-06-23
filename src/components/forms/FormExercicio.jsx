import React from "react";
import { useFormExercicio } from "../../hooks/useFormExercicio";
import { DadosGeraisExercicio } from "./formExercicioComponents/DadosGeraisExercicio";
import { ObjetivosTemasExercicio } from "./formExercicioComponents/ObjetivosTemasExercicio";
import { QuestoesExercicio } from "./formExercicioComponents/QuestoesExercicio";

export const FormExercicio = ({ dadosIniciais, onSubmit, onCancelar, disabled }) => {
    const { states, actions } = useFormExercicio(dadosIniciais);

    const handleSubmit = (e) => {
        e.preventDefault();

        const objectivesFormatado = states.objectives.map(obj => ({
            titleObjectiveExercises: obj.titleObjectiveExercises,
            contentObjectiveExercises: obj.contentObjectiveExercises
        }));

        const themesFormatado = states.themes.map(theme => ({
            titleThemeExercises: theme.titleThemeExercises,
            contentThemeExercises: theme.contentThemeExercises
        }));

        const exercisesFormatado = states.questions.map(q => {
            const formatado = {
                type_exercise: q.type_exercise,
                title_exercise: q.title_exercise,
                content_exercise: q.content_exercise,
                correct_answer_exercise: q.correct_answer_exercise,
                explanation_exercise: q.explanation_exercise,
                bloom_level: q.bloom_level,
            };

            if (q.type_exercise === "multipla-escolha" && q.options_exercise_multipla_escolha) {
                formatado.options_exercise_multipla_escolha = q.options_exercise_multipla_escolha.map(opt => ({
                    option: opt.option,
                    content_option: opt.content_option
                }));
            }
            return formatado;
        });

        const payload = {
            subject_exercises: states.subject,
            description_exercises: states.description,
            grade_level_exercises: states.gradeLevel,
            complexity_level_exercises: states.complexity,
            duration_minutes_exercises: Number(states.duration),
            objectives_exercises: objectivesFormatado,
            themes_exercises: themesFormatado,
            exercises: exercisesFormatado,
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border-b border-slate-100 pb-4 mb-2">
                <h2 className="text-lg font-bold text-slate-800">
                    {dadosIniciais ? "Editar Exercício" : "Criar Novo Exercício"}
                </h2>
                <span className="text-xs text-slate-500 block mt-1">Preencha as seções abaixo</span>
            </div>

            <div className="flex flex-col gap-6">
                <DadosGeraisExercicio states={states} disabled={disabled} />

                {!dadosIniciais && (
                    <>
                        <ObjetivosTemasExercicio states={states} actions={actions} disabled={disabled} />
                        <QuestoesExercicio states={states} actions={actions} disabled={disabled} />
                    </>
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
                    {disabled ? "Salvando..." : dadosIniciais ? "Salvar Alterações" : "Criar Exercício"}
                </button>
            </div>
        </form>
    );
};

export default FormExercicio;