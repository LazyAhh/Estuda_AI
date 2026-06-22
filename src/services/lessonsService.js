import api from "./api"

const camposPermitidos = [
    "subjectLessonPlan",
    "descriptionLessonPlan",
    "gradeLevelLessonPlan",
    "complexityLevelLessonPlan",
    "durationMinutesLessonPlan",
    "generalObjective"
]

export const getAulas = async (pagina = 1, limite = 10, busca = "") => {
    const res = await api.get(`/lesson-plans/get-lesson-plans/user?page=${pagina}&limit=${limite}&search=${busca}`)
    return res.data
}

export const getAulaPorId = async (idPlano) => {
    const res = await api.get(`/lesson-plans/get-lesson-plans/id/${idPlano}`)
    return res.data
}

export const createAula = async (dadosPlano) => {
    const res = await api.post("/lesson-plans/create-lesson-plan", dadosPlano)
    return res.data
}

export const updateAula = async (idPlano, dadosAtualizar) => {
    const dadosFiltrados = {};
    Object.keys(dadosAtualizar).forEach(key => {
        if (camposPermitidos.includes(key) && dadosAtualizar[key] !== undefined) {
            dadosFiltrados[key] = dadosAtualizar[key];
        }
    });

    const res = await api.patch(`/lesson-plans/update/lesson-plan/${idPlano}`, dadosFiltrados)
    return res.data
}

export const deleteAula = async (idPlano) => {
    const res = await api.delete(`/lesson-plans/delete-lesson-plan/${idPlano}`);
    return res.data
}