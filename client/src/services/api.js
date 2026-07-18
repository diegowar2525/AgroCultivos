import axios from 'axios';

export const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    error => Promise.reject(error)
);

export function resolveMediaUrl(path) {
    if (!path) return '';

    return path.startsWith('http')
        ? path
        : `${API_BASE_URL}${path}`;
}

export default api;