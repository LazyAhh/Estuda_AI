import axios from 'axios';

const API_URL = 'https://mentor-api-01kg.onrender.com';

const adminCredentials = {
    name_user: 'Administrador Compartilhado',
    email_user: 'admin_compartilhado@estuda.ai',
    cpf_user: '10000000019',
    password_user: 'admin123',
    role_user: 'admin'
};

export const getAdminToken = async () => {
    let token = localStorage.getItem('adminToken');
    if (token) return token;

    try {
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email_user: adminCredentials.email_user,
            password_user: adminCredentials.password_user
        });
        token = loginRes.data.tokens.accessToken;
        localStorage.setItem('adminToken', token);
        return token;
    } catch (error) {
        if (error.response?.status === 404 || error.response?.data?.message?.includes('encontrado')) {
            try {
                await axios.post(`${API_URL}/users/create`, adminCredentials);
            } catch (createError) {
                if (createError.response?.status !== 409) {
                    console.error(createError);
                }
            }
            
            try {
                const loginRes = await axios.post(`${API_URL}/auth/login`, {
                    email_user: adminCredentials.email_user,
                    password_user: adminCredentials.password_user
                });
                token = loginRes.data.tokens.accessToken;
                localStorage.setItem('adminToken', token);
                return token;
            } catch (secondLoginError) {
                console.error(secondLoginError);
                throw secondLoginError;
            }
        } else {
            console.error(error);
            throw error;
        }
    }
};

const getAdminConfig = async () => {
    const token = await getAdminToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const executeAdminRequest = async (requestFn) => {
    try {
        const config = await getAdminConfig();
        return await requestFn(config);
    } catch (error) {
        if (error.response?.status === 401 || (error.response?.status === 404 && error.response?.data?.message?.includes("encontrado"))) {
            localStorage.removeItem('adminToken');
            const config = await getAdminConfig();
            return await requestFn(config);
        }
        throw error;
    }
};

export const getUsersAdmin = async () => {
    const response = await executeAdminRequest(config =>
        axios.get(`${API_URL}/users/get-all`, config)
    );
    return response.data;
};

export const deleteUserAdmin = async (idUser) => {
    const response = await executeAdminRequest(config =>
        axios.delete(`${API_URL}/users/deleteAdmin/${idUser}`, config)
    );
    return response.data;
};

export const getLessonPlansAdmin = async (page = 1, limit = 50, search = '') => {
    const response = await executeAdminRequest(config =>
        axios.get(`${API_URL}/lesson-plans/get-lesson-plans/admin?page=${page}&limit=${limit}&search=${search}`, config)
    );
    return response.data;
};

export const deleteLessonPlanAdmin = async (idLessonPlan) => {
    const response = await executeAdminRequest(config =>
        axios.delete(`${API_URL}/lesson-plans/delete-lesson-plan-admin/${idLessonPlan}`, config)
    );
    return response.data;
};

export const getExercisesAdmin = async (page = 1, limit = 50, search = '') => {
    const response = await executeAdminRequest(config =>
        axios.get(`${API_URL}/exercises/get-exercises/admin?page=${page}&limit=${limit}&search=${search}`, config)
    );
    return response.data;
};

export const deleteExerciseAdmin = async (idExercise) => {
    const response = await executeAdminRequest(config =>
        axios.delete(`${API_URL}/exercises/delete-exercise-admin/${idExercise}`, config)
    );
    return response.data;
};
