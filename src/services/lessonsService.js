import api from "./api";

export const getAulas = async (page = 1, limit = 10, search = "") => {
    try{
        const response = await api.get(`/lesson-plans/get-lesson-plans/user?page=${page}&limit=${limit}&search=${search}`);
        return { success: true, data: response.data}
    } catch (error) {
        return {success: false, error: error.response?.data?.message || "Erro ao carregar os planos de aula."};
    }
};

export const getAulaPorId = async (idLessonPlan) => {
    try{
        const response = await api.get(`/lesson-plans/get-lesson-plans/id/${idLessonPlan}`);
        return { success: true, data: response.data}
    } catch (error) {
        return {success: false, error: error.response?.data?.message || "Erro ao buscar o planos de aula."};
    }
};

export const createAula = async (lessonPlanData) => {
    try{
        const response = await api.post("/lesson-plans/create-lesson-plan", lessonPlanData);
        return { success: true, data: response.data}
    } catch (error) {
        return {success: false, error: error.response?.data?.message || "Erro ao criar o plano de aula."};
    }
};

export const updateAula = async (idLessonPlan, updateData) => {
    try{
        const response = await api.patch(`/lesson-plans/update/lesson-plan/${idLessonPlan}`, updateData);
        return { success: true, data: response.data}
    } catch (error) {
        return {success: false, error: error.response?.data?.message || "Erro ao atualizar o plano de aula."};
    }
};

export const deleteAula = async (idLessonPlan) => {
    try{
        const response = await api.delete(`/lesson-plans/delete-lesson-plan/${idLessonPlan}`);
        return { success: true, data: response.data}
    } catch (error) {
        return {success: false, error: error.response?.data?.message || "Erro ao deletear o plano de aula."};
    }
};