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

    solicitarCodigo: (correo) =>
        api.post('/api/usuarios/solicitar-codigo/', { correo }),

    verificarCodigo: (correo, codigo) =>
        api.post('/api/usuarios/verificar-codigo/', { correo, codigo }),

    cambiarPassword: (data) =>
        api.post('/api/usuarios/cambiar-password/', data),

    deleteProfile: () =>
        api.delete('/api/usuarios/profile/'),
};

export default authService;