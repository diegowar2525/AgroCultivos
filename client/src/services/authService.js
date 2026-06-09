import api from './api';

const authService = {
    login: (data) =>
        api.post('/api/usuarios/login/', data),

    register: (data) =>
        api.post('/api/usuarios/register/', data),

    profile: () =>
        api.get('/api/usuarios/profile/'),

    updateProfile: (data) =>
        api.put('/api/usuarios/profile/', data),
};

export default authService;