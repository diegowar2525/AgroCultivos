import api from './api';

export async function getStartedHarvests() {
    const response = await api.get('/api/cultivos/cultivo-usuario/?iniciado=true');
    return response.data.results || response.data;
}

export async function getTrackingRecords() {
    const response = await api.get('/api/cultivos/seguimientos/');
    return response.data.results || response.data;
}

export async function createTrackingRecord({ cultivoUsuarioId, altura, estadoFenologico, observaciones, foto }) {
    if (foto) {
        const form = new FormData();
        form.append('cultivo_usuario', cultivoUsuarioId);
        form.append('altura_planta', altura || '0');
        form.append('estado_fenologico', estadoFenologico);
        form.append('observaciones', observaciones || '');
        form.append('imagen', foto);

        return api.post('/api/cultivos/seguimientos/', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    return api.post('/api/cultivos/seguimientos/', {
        cultivo_usuario: cultivoUsuarioId,
        altura_planta: parseFloat(altura) || 0,
        estado_fenologico: estadoFenologico,
        observaciones: observaciones || '',
    });
}

export async function updateHarvestStatus(cultivoUsuarioId, estadoId) {
    return api.patch(`/api/cultivos/cultivo-usuario/${cultivoUsuarioId}/`, {
        estado: estadoId,
    });
}
