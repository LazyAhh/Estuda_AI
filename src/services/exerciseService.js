import api from "./api"

const formatacao = {
    subject_exercises: "subjectExercises",
    description_exercises: "descriptionExercises",
    grade_level_exercises: "gradeLevelExercises",
    complexity_level_exercises: "complexityLevelExercises",
    duration_minutes_exercises: "durationMinutesExercises",
    objectives_exercises: "objectiveExercises",
    themes_exercises: "themeExercises",
    exercises: "exerciseItems"
}

const camposValidos = [
    "subjectExercises",
    "descriptionExercises",
    "gradeLevelExercises",
    "complexityLevelExercises",
    "durationMinutesExercises"
]

export const getExercicios = async (pagina = 1, limite = 10, busca = "") => {
    const res = await api.get(`/exercises/get-exercises/user?page=${pagina}&limit=${limite}&search=${busca}`)
    return res.data
}

export const getExercicioPorId = async (idExercicio) => {
    const res = await api.get(`/exercises/get-exercises/exercise/${idExercicio}`)
    return res.data
}

export const createExercicio = async (dadosExercicio) => {
    const res = await api.post("/exercises/create-exercises", dadosExercicio)
    return res.data
}

export const updateExercicio = async (idExercicio, dadosNovos) => {
    const dadosFiltrados = {}
    Object.keys(dadosNovos).forEach(key => {
        const mapKey = formatacao[key] || key
        if (camposValidos.includes(mapKey) && dadosNovos[key] !== undefined) {
            dadosFiltrados[mapKey] = dadosNovos[key]
        }
    })

    const res = await api.patch(`/exercises/update/exercise/${idExercicio}`, dadosFiltrados)
    return res.data
}

export const deleteExercicio = async (idExercicio) => {
    const res = await api.delete(`/exercises/delete-exercise/${idExercicio}`)
    return res.data
}