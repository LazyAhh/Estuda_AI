import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mentor-api-01kg.onrender.com',
    
    headers:{
        "Content-Type": 'application/json',
    },
});

export default api;