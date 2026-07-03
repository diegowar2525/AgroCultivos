import api from './api';

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Tu navegador no soporta geolocalización.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => {
                if (error.code === 1) {
                    reject(new Error('Permiso de ubicación denegado. Permite el acceso en tu navegador.'));
                } else {
                    reject(new Error('No se pudo obtener tu ubicación. Intenta de nuevo.'));
                }
            },
            {
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    });
}

export async function requestRecommendations({ espacio, ciclo, topN = 10 }) {
    const coords = await getCurrentPosition();

    const response = await api.post('/api/recomendaciones/recomendar-geo/', {
        latitud: parseFloat(coords.latitude.toFixed(6)),
        longitud: parseFloat(coords.longitude.toFixed(6)),
        top_n: topN,
        espacio,
        ciclo,
    });

    return {
        clima: response.data.clima,
        resultados: response.data.resultados,
        predicho: response.data.cultivo_predicho_arbol,
        total: response.data.total_evaluados,
        zona: response.data.zona || null,
    };
}

export async function findCropByName(nombreCultivo) {
    const response = await api.get(`/api/cultivos/cultivos/?search=${encodeURIComponent(nombreCultivo)}`);
    const crops = response.data.results || response.data;

    return crops.find(crop => crop.nombre === nombreCultivo) || crops[0] || null;
}

export async function addCropToUser({ cultivoId, fechaSiembra, fechaCosechaEstimada }) {
    return api.post('/api/cultivos/cultivo-usuario/', {
        cultivo: cultivoId,
        fecha_siembra: fechaSiembra,
        fecha_cosecha_estimada: fechaCosechaEstimada,
    });
}
