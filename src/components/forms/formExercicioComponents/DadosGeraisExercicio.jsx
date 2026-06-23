import React from "react";
import { Input } from "../Input";

export const DadosGeraisExercicio = ({ states, disabled }) => {
    return (
        <div className="flex flex-col gap-4 w-full border border-slate-200 rounded-lg p-5 bg-white shadow-xs bg-opacity-100">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-1">Dados Gerais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    id="subject"
                    label="Matéria / Disciplina"
                    type="text"
                    placeholder="Ex: Compliance, Química"
                    value={states.subject}
                    onChange={(e) => states.setSubject(e.target.value)}
                    disabled={disabled}
                />

                <Input
                    id="grade"
                    label="Série / Ano"
                    type="text"
                    placeholder="Ex: Ensino Superior, Quinto Ano Fundamental"
                    value={states.gradeLevel}
                    onChange={(e) => states.setGradeLevel(e.target.value)}
                    disabled={disabled}
                />
            </div>

            <Input
                id="description"
                label="Descrição"
                type="text"
                placeholder="Ex: Exercícios para revisão..."
                value={states.description}
                onChange={(e) => states.setDescription(e.target.value)}
                disabled={disabled}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="complexity" className="text-xs font-semibold text-slate-700 select-none">Complexidade</label>
                    <select
                        id="complexity"
                        value={states.complexity}
                        onChange={(e) => states.setComplexity(e.target.value)}
                        disabled={disabled}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-solid border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:border-indigo-900 transition-all disabled:opacity-50 disabled:bg-slate-50"
                    >
                        <option value="facil">Fácil</option>
                        <option value="medio">Médio</option>
                        <option value="dificil">Difícil</option>
                    </select>
                </div>

                <Input
                    id="duration"
                    label="Duração esperada (minutos)"
                    type="number"
                    placeholder="Em minutos..."
                    value={states.duration}
                    onChange={(e) => states.setDuration(e.target.value)}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};
