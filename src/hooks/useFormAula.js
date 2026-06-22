import { useState, useEffect } from "react";

export const useFormAula = (dadosIniciais) => {
    const [subjectLessonPlan, setSubjectLessonPlan] = useState("");
    const [descriptionLessonPlan, setDescriptionLessonPlan] = useState("");
    const [gradeLevelLessonPlan, setGradeLevelLessonPlan] = useState("");
    const [complexityLevelLessonPlan, setComplexityLevelLessonPlan] = useState("medio");
    const [durationMinutesLessonPlan, setDurationMinutesLessonPlan] = useState("");
    const [generalObjective, setGeneralObjective] = useState("");
    
    const [specificObjectives, setSpecificObjectives] = useState([]);
    const [competencies, setCompetencies] = useState([]);
    const [themes, setThemes] = useState([]);
    const [teachingMethodologies, setTeachingMethodologies] = useState([]);
    const [topics, setTopics] = useState([]);
    
    const [homework, setHomework] = useState({ description: "", objective: "" });
    const [inclusiveAdaptation, setInclusiveAdaptation] = useState({ visualImpairment: "", learningDifficulties: "", highAbilities: "" });
    const [references, setReferences] = useState([]);
    const [closure, setClosure] = useState({ summary: "", reflection: "", nextSteps: "" });

    useEffect(() => {
        if (dadosIniciais) {
            setSubjectLessonPlan(dadosIniciais.subjectLessonPlan || "");
            setDescriptionLessonPlan(dadosIniciais.descriptionLessonPlan || "");
            setGradeLevelLessonPlan(dadosIniciais.gradeLevelLessonPlan || "");
            setComplexityLevelLessonPlan(dadosIniciais.complexityLevelLessonPlan || "medio");
            setDurationMinutesLessonPlan(dadosIniciais.durationMinutesLessonPlan || "");
            setGeneralObjective(dadosIniciais.generalObjective || "");
            
            setSpecificObjectives(dadosIniciais.objetives_lesson_plan || dadosIniciais.specificObjectives || []);
            setCompetencies(dadosIniciais.competencies_lesson_plan || dadosIniciais.competencies || []);
            setThemes(dadosIniciais.themes_lesson_plan || dadosIniciais.themes || []);
            setTeachingMethodologies(dadosIniciais.methodology_lesson_plan || dadosIniciais.teachingMethodologies || []);
            
            if (dadosIniciais.topics_lesson_plan || dadosIniciais.topics) {
                const rawTopics = dadosIniciais.topics_lesson_plan || dadosIniciais.topics;
                const mappedTopics = rawTopics.map(t => ({
                    titleTopicsLessonPlan: t.titleTopicsLessonPlan || "",
                    contentTopicsLessonPlan: t.contentTopicsLessonPlan || "",
                    detailed_explanation_topic_lesson_plan: t.detailed_explanation_topic_lesson_plan || "",
                    examplesTopicLessonPlan: t.examples_topics || t.examplesTopicLessonPlan || [],
                    activitiesTopicLessonPlan: t.activities_topics || t.activitiesTopicLessonPlan || [],
                    connectionsTopicLessonPlan: t.connections_topics || t.connectionsTopicLessonPlan || []
                }));
                setTopics(mappedTopics);
            } else {
                setTopics([]);
            }

            setHomework(dadosIniciais.homework_lesson_plan || dadosIniciais.homework || { description: "", objective: "" });
            setInclusiveAdaptation(dadosIniciais.inclusive_adaptation_lesson_plan || dadosIniciais.inclusiveAdaptation || { visualImpairment: "", learningDifficulties: "", highAbilities: "" });
            setReferences(dadosIniciais.references_lesson_plan || dadosIniciais.references || []);
            setClosure(dadosIniciais.closure_lesson_plan || dadosIniciais.closure || { summary: "", reflection: "", nextSteps: "" });
        }
    }, [dadosIniciais]);

    const adicionarObjetivo = () => {
        setSpecificObjectives([...specificObjectives, { titleObjetivesLessonPlan: "", contentObjetivesLessonPlan: "" }]);
    };
    const alterarObjetivo = (index, campo, valor) => {
        const novos = [...specificObjectives];
        novos[index][campo] = valor;
        setSpecificObjectives(novos);
    };
    const removerObjetivo = (index) => {
        setSpecificObjectives(specificObjectives.filter((_, i) => i !== index));
    };

    const adicionarCompetencia = () => {
        setCompetencies([...competencies, { contentCompetenciesLessonPlan: "" }]);
    };
    const alterarCompetencia = (index, valor) => {
        const novos = [...competencies];
        novos[index].contentCompetenciesLessonPlan = valor;
        setCompetencies(novos);
    };
    const removerCompetencia = (index) => {
        setCompetencies(competencies.filter((_, i) => i !== index));
    };

    const adicionarTema = () => {
        setThemes([...themes, { titleThemesLessonPlan: "", contentThemesLessonPlan: "" }]);
    };
    const alterarTema = (index, campo, valor) => {
        const novos = [...themes];
        novos[index][campo] = valor;
        setThemes(novos);
    };
    const removerTema = (index) => {
        setThemes(themes.filter((_, i) => i !== index));
    };

    const adicionarMetodologia = () => {
        setTeachingMethodologies([...teachingMethodologies, { titleMethodologyLessonPlan: "", contentMethodologyLessonPlan: "" }]);
    };
    const alterarMetodologia = (index, campo, valor) => {
        const novos = [...teachingMethodologies];
        novos[index][campo] = valor;
        setTeachingMethodologies(novos);
    };
    const removerMetodologia = (index) => {
        setTeachingMethodologies(teachingMethodologies.filter((_, i) => i !== index));
    };

    const adicionarReferencia = () => {
        setReferences([...references, { contentReferencesLessonPlan: "" }]);
    };
    const alterarReferencia = (index, valor) => {
        const novos = [...references];
        novos[index].contentReferencesLessonPlan = valor;
        setReferences(novos);
    };
    const removerReferencia = (index) => {
        setReferences(references.filter((_, i) => i !== index));
    };

    const adicionarTopico = () => {
        setTopics([...topics, {
            titleTopicsLessonPlan: "",
            contentTopicsLessonPlan: "",
            detailed_explanation_topic_lesson_plan: "",
            examplesTopicLessonPlan: [],
            activitiesTopicLessonPlan: [],
            connectionsTopicLessonPlan: []
        }]);
    };
    const alterarTopico = (index, campo, valor) => {
        const novos = [...topics];
        novos[index][campo] = valor;
        setTopics(novos);
    };
    const removerTopico = (index) => {
        setTopics(topics.filter((_, i) => i !== index));
    };

    const adicionarExemplo = (tIndex) => {
        const novos = [...topics];
        novos[tIndex].examplesTopicLessonPlan.push({ titleExamplesTopicLessonPlan: "", contentExamplesTopicLessonPlan: "" });
        setTopics(novos);
    };
    const alterarExemplo = (tIndex, eIndex, campo, valor) => {
        const novos = [...topics];
        novos[tIndex].examplesTopicLessonPlan[eIndex][campo] = valor;
        setTopics(novos);
    };
    const removerExemplo = (tIndex, eIndex) => {
        const novos = [...topics];
        novos[tIndex].examplesTopicLessonPlan = novos[tIndex].examplesTopicLessonPlan.filter((_, i) => i !== eIndex);
        setTopics(novos);
    };

    const adicionarAtividade = (tIndex) => {
        const novos = [...topics];
        novos[tIndex].activitiesTopicLessonPlan.push({ titleActivitiesTopicLessonPlan: "", contentActivitiesTopicLessonPlan: "", explicationActivitiesTopicLessonPlan: "" });
        setTopics(novos);
    };
    const alterarAtividade = (tIndex, aIndex, campo, valor) => {
        const novos = [...topics];
        novos[tIndex].activitiesTopicLessonPlan[aIndex][campo] = valor;
        setTopics(novos);
    };
    const removerAtividade = (tIndex, aIndex) => {
        const novos = [...topics];
        novos[tIndex].activitiesTopicLessonPlan = novos[tIndex].activitiesTopicLessonPlan.filter((_, i) => i !== aIndex);
        setTopics(novos);
    };

    const adicionarConexao = (tIndex) => {
        const novos = [...topics];
        novos[tIndex].connectionsTopicLessonPlan.push({ titleConnectionsTopics: "", contentConnectionsTopics: "" });
        setTopics(novos);
    };
    const alterarConexao = (tIndex, cIndex, campo, valor) => {
        const novos = [...topics];
        novos[tIndex].connectionsTopicLessonPlan[cIndex][campo] = valor;
        setTopics(novos);
    };
    const removerConexao = (tIndex, cIndex) => {
        const novos = [...topics];
        novos[tIndex].connectionsTopicLessonPlan = novos[tIndex].connectionsTopicLessonPlan.filter((_, i) => i !== cIndex);
        setTopics(novos);
    };

    return {
        states: {
            subjectLessonPlan, setSubjectLessonPlan,
            descriptionLessonPlan, setDescriptionLessonPlan,
            gradeLevelLessonPlan, setGradeLevelLessonPlan,
            complexityLevelLessonPlan, setComplexityLevelLessonPlan,
            durationMinutesLessonPlan, setDurationMinutesLessonPlan,
            generalObjective, setGeneralObjective,
            specificObjectives,
            competencies,
            themes,
            teachingMethodologies,
            topics,
            homework, setHomework,
            inclusiveAdaptation, setInclusiveAdaptation,
            references,
            closure, setClosure
        },
        actions: {
            adicionarObjetivo, alterarObjetivo, removerObjetivo,
            adicionarCompetencia, alterarCompetencia, removerCompetencia,
            adicionarTema, alterarTema, removerTema,
            adicionarMetodologia, alterarMetodologia, removerMetodologia,
            adicionarReferencia, alterarReferencia, removerReferencia,
            adicionarTopico, alterarTopico, removerTopico,
            adicionarExemplo, alterarExemplo, removerExemplo,
            adicionarAtividade, alterarAtividade, removerAtividade,
            adicionarConexao, alterarConexao, removerConexao
        }
    };
};