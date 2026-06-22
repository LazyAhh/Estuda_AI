import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mentor-api-01kg.onrender.com',

    headers: {
        "Content-Type": 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');

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
                const refreshToken = localStorage.getItem('refreshToken');

                if (refreshToken) {
                    const response = await axios.post('https://mentor-api-01kg.onrender.com/auth/refresh-token', {
                        refreshToken,
                    });

                    const { accessToken, refreshToken: novoRefreshToken } = response.data.tokens;

                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('refreshToken', novoRefreshToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return api(originalRequest);
                }
            } catch {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');

                window.location.href = 'login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;