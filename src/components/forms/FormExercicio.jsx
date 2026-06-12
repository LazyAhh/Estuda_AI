import React, { useState, useEffect } from "react";
import { Input } from './Input';
import { useFormAction } from "react-router-dom";
import { useFormExercicio } from "../../hooks/useFormExercicio";

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
        <form onSubmit={handleSubmit}>
            <h2>{dadosIniciais ? "Editar exercício" : "Criar novo exercício"}</h2>

            <Input id="subject" label="Matéria / Disciplina" type="text" placeholder="Ex: Compliance, Química"
                value={states.subject} onChange={(e) => states.setSubject(e.target.value)} disabled={disabled} />

            <Input id="description" label="Descrição" type="text" placeholder="Ex: Exercícios para revisão..."
                value={states.description} onChange={(e) => states.setDescription(e.target.value)} disabled={disabled} />

            <Input id="grade" label="Série / Ano" type="text" placeholder="Ex: Ensino Superior, Quinto Ano Fundamental"
                value={states.gradeLevel} onChange={(e) => states.setGradeLevel(e.target.value)} disabled={disabled} />

            <div>
                <label htmlFor="complexity">Complexidade:</label>
                <select id="complexity" value={states.complexity} onChange={(e) => states.setComplexity(e.target.value)}
                    disabled={disabled}>
                    <option value="facil">Fácil</option>
                    <option value="medio">Médio</option>
                    <option value="dificil">Difícil</option>
                </select>
            </div>

            <Input id="duration" label="Duração esperada (minutos)" type="number" placeholder="Em minutos..."
                value={states.duration} onChange={(e) => states.setDuration(e.target.value)} disabled={disabled} />

            {!dadosIniciais && (
                <>
                    <hr />

                    <div>
                        <h3>Objetivos Pedagoógicos</h3>
                        <button type="button" onClick={actions.adicionarObjetivo} disabled={disabled}>+ Adicionar objetivo</button>

                        {states.objectives.map((obj, i) => (
                            <div key={i}>
                                <Input placeholder="Título do objetivo" value={obj.titleObjectiveExercises}
                                    disabled={disabled} onChange={(e) => actions.alterarObjetivo(i, "titleObjectiveExercises", e.target.value)} />

                                <Input placeholder="Descrição do objetivo" value={obj.contentObjectiveExercises}
                                    disabled={disabled} onChange={(e) => actions.alterarObjetivo(i, "contentObjectiveExercises", e.target.value)} />

                                <button type="button" onClick={() => actions.removerObjetivo(i)} disabled={disabled} >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>

                    <hr />

                    <div>
                        <h3>Temas abordados</h3>
                        <button type="button" onClick={actions.adicionarTema} disabled={disabled}>+ Adicionar tema</button>

                        {states.themes.map((theme, i) => (
                            <div key={i}>
                                <Input placeholder="Tema..." value={theme.titleThemeExercises}
                                    disabled={disabled} onChange={(e) => actions.alterarTema(i, "titleThemeExercises", e.target.value)} />

                                <Input placeholder="Descrição do tema ou seus tópicos..." value={theme.contentThemeExercises}
                                    disabled={disabled} onChange={(e) => actions.alterarTema(i, "contentThemeExercises", e.target.value)} />

                                <button type="button" onClick={() => actions.removerTema(i)} disabled={disabled} >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>

                    <hr />

                    <div>
                        <h3>Questões do exercício</h3>
                        <button type="button" onClick={actions.adicionarQuestao} disabled={disabled}>+ Adicionar questão</button>

                        {states.questions.map((q, qIndex) => (
                            <div key={qIndex}>
                                <h4>Questão {qIndex + 1}</h4>

                                <div>
                                    <label>Título da Questão:</label>
                                    <input type="text" placeholder="Ex: Questão 1: Encontre as raízes" value={q.title_exercise}
                                        onChange={(e) => actions.alterarQuestao(qIndex, "title_exercise", e.target.value)} disabled={disabled} />
                                </div>

                                <div>
                                    <label>Enunciado / Pergunta:</label>
                                    <textarea placeholder="Escreva a pergunta completa..." value={q.content_exercise}
                                        onChange={(e) => actions.alterarQuestao(qIndex, "content_exercise", e.target.value)} disabled={disabled} />
                                </div>

                                <div>
                                    <label>Tipo de Questão:</label>
                                    <select value={q.type_exercise} onChange={(e) => actions.alterarQuestao(qIndex, "type_exercise", e.target.value)} disabled={disabled}>
                                        <option value="multipla-escolha">Múltipla Escolha</option>
                                        <option value="verdadeiro-falso">Verdadeiro ou Falso</option>
                                        <option value="discursiva">Discursiva</option>
                                    </select>
                                </div>

                                {q.type_exercise === "multipla-escolha" && (
                                    <div>
                                        <h5>Alternativas (A, B, C, D):</h5>
                                        {q.options_exercise_multipla_escolha?.map((opt, oIndex) => (
                                            <div key={oIndex}>
                                                <span>{opt.option})</span>
                                                <input type="text" placeholder={`Conteúdo da alternativa ${opt.option}`} value={opt.content_option}
                                                    onChange={(e) => actions.alterarAlternativa(qIndex, oIndex, e.target.value)} disabled={disabled} />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {q.type_exercise === "multipla-escolha" && (
                                    <div>
                                        <label>Alternativa Correta:</label>
                                        <select value={q.correct_answer_exercise} onChange={(e) => actions.alterarQuestao(qIndex, "correct_answer_exercise", e.target.value)}
                                            disabled={disabled}
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
                                    <div>
                                        <label>Resposta Esperada:</label>
                                        <input type="text" placeholder={q.type_exercise === "verdadeiro-falso" ? "Ex: V, F, V, V, F" : "Gabarito esperado"} value={q.correct_answer_exercise}
                                            onChange={(e) => actions.alterarQuestao(qIndex, "correct_answer_exercise", e.target.value)} disabled={disabled} />
                                    </div>
                                )}

                                <div>
                                    <label>Explicação da Resposta:</label>
                                    <input type="text" placeholder="Por que essa resposta está correta?" value={q.explanation_exercise}
                                        onChange={(e) => actions.alterarQuestao(qIndex, "explanation_exercise", e.target.value)} disabled={disabled} />
                                </div>

                                <div>
                                    <label>Nível da Taxonomia de Bloom:</label>
                                    <select value={q.bloom_level} onChange={(e) => actions.alterarQuestao(qIndex, "bloom_level", e.target.value)} disabled={disabled}>
                                        <option value="lembrar">Lembrar</option>
                                        <option value="compreender">Compreender</option>
                                        <option value="aplicar">Aplicar</option>
                                        <option value="analisar">Analisar</option>
                                        <option value="avaliar">Avaliar</option>
                                        <option value="criar">Criar</option>
                                    </select>
                                </div>

                                <button type="button" onClick={() => actions.removerQuestao(qIndex)} disabled={disabled}>
                                    Remover Questão
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <hr />

            <div>
                <button type="submit" disabled={disabled}>
                    {dadosIniciais ? "Salvar Alterações" : "Criar Exercício"}
                </button>

                {onCancelar && (
                    <button type="button" onClick={onCancelar} disabled={disabled}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default FormExercicio;