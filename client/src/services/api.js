import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }

    // Al subir un archivo (FormData), el navegador debe fijar su propio
    // Content-Type con el "boundary" correcto — si se deja "application/json"
    // fijo, la subida del archivo se rompe silenciosamente en el backend.
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }

    return config;
});

export function resolveMediaUrl(path) {
    if (!path) return '';
    return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
}

export default api;