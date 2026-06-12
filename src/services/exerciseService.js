import api from "./api";

const formatacao = {
    subject_exercises: "subjectExercises",
    description_exercises: "descriptionExercises",
    grade_level_exercises: "gradeLevelExercises",
    complexity_level_exercises: "complexityLevelExercises",
    duration_minutes_exercises: "durationMinutesExercises",
    objectives_exercises: "objectiveExercises",
    themes_exercises: "themeExercises",
    exercises: "exerciseItems"
};

const camposPermitidosPatch = [
    "subjectExercises",
    "descriptionExercises",
    "gradeLevelExercises",
    "complexityLevelExercises",
    "durationMinutesExercises"
];

export const getExercicios = async (page = 1, limit = 10, search = "") => {
    try {
        const response = await api.get(`/exercises/get-exercises/user?page=${page}&limit=${limit}&search=${search}`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data?.message || "Erro ao carregar exercícios" };
    }
};

export const getExercicioPorId = async (idExercise) => {
    try {
        const response = await api.get(`/exercises/get-exercises/exercise/${idExercise}`);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || "Erro ao buscar o exercício" };
    }
};

export const createExercicio = async (exerciseData) => {
    try {
        const response = await api.post("/exercises/create-exercises", exerciseData);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || "Erro ao criar o exercício" };
    }
};

export const updateExercicio = async (idExercise, updateData) => {
    try {
        const dataFormatada = {};
        Object.keys(updateData).forEach(key => {
            const mapKey = formatacao[key] || key;
            if (camposPermitidosPatch.includes(mapKey) && updateData[key] !== undefined) {
                dataFormatada[mapKey] = updateData[key];
            }
        });

        const response = await api.patch(`/exercises/update/exercise/${idExercise}`, dataFormatada);
        return { success: true, data: response.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || "Erro ao atualizar o exercício" };
    }
};

export const deleteExercicio = async (idExercise) => {
    try {
        await api.delete(`/exercises/delete-exercise/${idExercise}`);
        return { success: true }
    } catch (error) {
        return { success: false, error: error.response?.data?.message || "Erro ao deletar o exercício" };
    }
};