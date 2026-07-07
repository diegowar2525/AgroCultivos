import { useState, useEffect } from 'react';
import api, { resolveMediaUrl } from '../services/api';
import { getExtra } from '../data/infoCultivos';

/**
 * Carga el cultivo y su especificación agroclimática por id desde el
 * backend, y las combina con la ficha técnica estática (riego/abono/
 * enfermedades), buscada por nombre.
 */
export function useInfoCultivo(cultivoId) {
    const [cultivo, setCultivo] = useState(null);
    const [especificacion, setEspecificacion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelado = false;
        setLoading(true);
        setError('');

        Promise.all([
            api.get(`/api/cultivos/cultivos/${cultivoId}/`),
            api.get(`/api/cultivos/especificaciones/?cultivo=${cultivoId}`),
        ])
            .then(([rCultivo, rEspec]) => {
                if (cancelado) return;
                setCultivo(rCultivo.data);
                const lista = rEspec.data.results || rEspec.data;
                setEspecificacion(lista[0] || null);
            })
            .catch(() => {
                if (!cancelado) setError('No se pudo cargar la información de este cultivo.');
            })
            .finally(() => {
                if (!cancelado) setLoading(false);
            });

        return () => { cancelado = true; };
    }, [cultivoId]);

    const extra = cultivo ? getExtra(cultivo.nombre) : null;
    const imagenUrl = cultivo?.imagen ? resolveMediaUrl(cultivo.imagen) : null;

    return { cultivo, especificacion, extra, imagenUrl, loading, error };
}