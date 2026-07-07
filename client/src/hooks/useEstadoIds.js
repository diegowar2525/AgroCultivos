import { useState, useEffect } from 'react';
import api from '../services/api';

export function useEstadoIds() {
    const [estadoIds, setEstadoIds] = useState({});

    useEffect(() => {
        api.get('/api/cultivos/estados/')
            .then((r) => {
                const lista = r.data?.results || r.data || [];
                const mapa = {};
                lista.forEach((estado) => { mapa[estado.nombre] = estado.id; });
                setEstadoIds(mapa);
            })
            .catch(() => {});
    }, []);

    return estadoIds;
}