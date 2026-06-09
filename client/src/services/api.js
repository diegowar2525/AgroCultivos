import axios from 'axios';

// Cambia el puerto si tu servidor de Django corre en otro distinto (ej. 8000)
const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAPI = {
    login: (credentials) => api.post('/api/usuarios/login/', credentials),
    register: (userData) => api.post('/api/usuarios/register/', userData),
    profile: (token) => api.get('/api/usuarios/profile/', {
        headers: { Authorization: `Bearer ${token}` }
    }),
};

export default api;