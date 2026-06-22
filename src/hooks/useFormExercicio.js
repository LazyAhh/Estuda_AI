import { useState, useEffect } from "react";

export const useFormExercicio = (dadosIniciais) => {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [complexity, setComplexity] = useState("medio");
    const [duration, setDuration] = useState("");
    const [objectives, setObjectives] = useState([]);
    const [themes, setThemes] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (dadosIniciais) {
            setSubject(dadosIniciais.subjectExercises || "");
            setDescription(dadosIniciais.descriptionExercies || "");
            setGradeLevel(dadosIniciais.gradeLevelExercises || "");
            setComplexity(dadosIniciais.complexityLevelExercises || "");
            setDuration(dadosIniciais.durarionMinutesExercises || 30);
            setObjectives(dadosIniciais.objectiveExercises || []);
            setThemes(dadosIniciais.themesExercises || []);


            if (dadosIniciais.exerciseItems) {
                const itensMapeados = dadosIniciais.exerciseItems.map(item => ({
                    type_exercise: item.type_exercise,
                    title_exercise: item.title_exercise,
                    content_exercise: item.content_exercise,
                    correct_answer_exercise: item.correct_answer_exercise || "",
                    explanation_exercise: item.explanation_exercise || "",
                    bloom_level: item.bloom_level_exercise || "lembrar",
                    options_exercise_multipla_escolha: item.optionsMultiple || []
                }));
                setQuestions(itensMapeados);
            }
        }
    }, [dadosIniciais]);

    const adicionarObjetivo = () => {
        setObjectives([...objectives, { titleObjectiveExercises: "", contentObjectiveExercises: "" }]);
    };

    const alterarObjetivo = (index, campo, valor) => {
        const novos = [...objectives];
        novos[index][campo] = valor;
        setObjectives(novos)
    };

    const removerObjetivo = (index) => {
        setObjectives(objectives.filter((_, i) => i !== index));
    }

    const adicionarTema = () => {
        setThemes([...themes, { titleThemeExercises: "", contentThemeExercises: "" }]);
    };

    const alterarTema = (index, campo, valor) => {
        const novos = [...themes];
        novos[index][campo] = valor;
        setThemes(novos);
    };

    const removerTema = (index) => {
        setThemes(themes.filter((_, i) => i !== index));
    }

    const adicionarQuestao = () => {
        setQuestions([
            ...questions,
            {
                type_exercise: "multipla-escolha",
                title_exercise: "",
                content_exercise: "",
                correct_answer_exercise: "",
                explanation_exercise: "",
                bloom_level: "lembrar",
                options_exercise_multipla_escolha: [
                    { option: "A", content_option: "" },
                    { option: "B", content_option: "" },
                    { option: "C", content_option: "" },
                    { option: "D", content_option: "" },
                ]
            }
        ]);
    };

    const alterarQuestao = (index, campo, valor) => {
        const novas = [...questions];
        novas[index][campo] = valor;
        setQuestions(novas)
    };

    const alterarAlternativa = (qIndex, aIndex, valor) => {
        const novas = [...questions];
        novas[qIndex].options_exercise_multipla_escolha[aIndex].content_option = valor;
        setQuestions(novas);
    }

    const removerQuestao = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    return {
        states: {
            subject, setSubject,
            description, setDescription,
            gradeLevel, setGradeLevel,
            complexity, setComplexity,
            duration, setDuration,
            objectives,
            themes,
            questions
        },
        actions: {
            adicionarObjetivo, alterarObjetivo, removerObjetivo,
            adicionarTema, alterarTema, removerTema,
            adicionarQuestao, alterarQuestao, alterarAlternativa, removerQuestao
        }
    };
};