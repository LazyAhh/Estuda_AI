import api from "./api";

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

export const updateExercicio = async (idExercise, updateData) =>{
    try{
        const response = await api.patch(`/exercises/update/exercise/${idExercise}`, updateData);
        return {success: true, data: response.data}
    } catch (error){
        return {success: false, error: error.response?.data?.message || "Erro ao atualizar o exercício"};
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