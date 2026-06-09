import api from './api';

const authService = {
    login: (data) =>
        api.post('/api/usuarios/login/', data),

    register: (data) =>
        api.post('/api/usuarios/register/', data),

    profile: () =>
        api.get('/api/usuarios/profile/')
};

export default authService;