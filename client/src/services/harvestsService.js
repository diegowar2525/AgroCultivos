import api from './api';

export async function getStartedHarvests() {
    const response = await api.get(
        '/api/cultivos/cultivo-usuario/?iniciado=true'
    );

    return response.data.results || response.data;
}

export async function getTrackingRecords() {
    const response = await api.get('/api/cultivos/seguimientos/');
    return response.data.results || response.data;
}

export async function createTrackingRecord({
    cultivoUsuarioId,
    altura,
    estadoFenologico,
    observaciones,
    foto,
}) {
    const form = new FormData();

    form.append('cultivo_usuario', cultivoUsuarioId);
    form.append('altura_planta', parseFloat(altura) || 0);
    form.append('estado_fenologico', estadoFenologico);
    form.append('observaciones', observaciones || '');

    if (foto instanceof File) {
        form.append('imagen', foto);
    }

    const response = await api.post(
        '/api/cultivos/seguimientos/',
        form
    );

    return response.data;
}

export async function updateHarvestStatus(
    cultivoUsuarioId,
    estadoId
) {
    const response = await api.patch(
        `/api/cultivos/cultivo-usuario/${cultivoUsuarioId}/`,
        {
            estado: estadoId,
        }
    );

    return response.data;
}

export async function predictThreatFromTrackingImage({
    cultivoUsuarioId,
    foto,
}) {
    const form = new FormData();

    form.append('imagen', foto);

    if (cultivoUsuarioId) {
        form.append('cultivo_usuario', cultivoUsuarioId);
    }

    const response = await api.post(
        '/api/cultivos/seguimientos/predecir-amenaza/',
        form
    );

    return response.data;
}