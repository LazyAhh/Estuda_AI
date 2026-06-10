import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mentor-api-01kg.onrender.com',

    headers: {
        "Content-Type": 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('@EstudaAI:token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('@EstudaAI:refreshToken');

                if (refreshToken) {
                    const response = await axios.post('https://mentor-api-01kg.onrender.com/auth/refresh-token', {
                        refreshToken,
                    });

                    const { accessToken, refreshToken: novoRefreshToken } = response.data.tokens;

                    localStorage.setItem('@EstudaAI:token', accessToken);
                    localStorage.setItem('@EstudaAI:refreshToken', novoRefreshToken);

                    originalRequest.headers.Authorization = `Bearer: ${accessToken}`;

                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('@EstudaAI:user');
                localStorage.removeItem('@EstudaAI:token');
                localStorage.removeItem('@EstudaAI:refreshToken');

                window.location.href = 'login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;