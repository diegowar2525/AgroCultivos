import { useEffect, useState } from 'react';
import api from '../services/api';

/**
 * Historial completo de cultivos del usuario: todos los guardados,
 * los que están en seguimiento y los ya completados. A diferencia de
 * useMyCrops (que solo trae los "guardados, sin iniciar" para la
 * grilla de tarjetas), este trae absolutamente todo, sin filtrar por
 * `iniciado`, para el "Registro de cultivos" de abajo.
 */
export function useCropRegistry() {
    const [registro, setRegistro] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/cultivos/cultivo-usuario/')
            .then((response) => {
                const lista = response.data?.results || response.data || [];
                // Más reciente primero.
                const ordenado = [...lista].sort(
                    (a, b) => new Date(b.fecha_siembra) - new Date(a.fecha_siembra)
                );
                setRegistro(ordenado);
            })
            .catch(() => setRegistro([]))
            .finally(() => setLoading(false));
    }, []);

    const completados = registro.filter((c) => c.estado_nombre === 'Completado');

    return { registro, completados, loading };
}