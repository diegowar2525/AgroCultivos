import { useEffect, useState } from 'react';
import {
    addCropToUser,
    findCropByName,
    requestRecommendations,
} from '../services/recommendationsService';

function getSessionKey() {
    try {
        const token = localStorage.getItem('token');
        return token ? `sigra_recomendaciones_${btoa(token).slice(0, 12)}` : 'sigra_recomendaciones';
    } catch {
        return 'sigra_recomendaciones';
    }
}

function readSessionValue(key, fallbackValue) {
    try {
        const saved = sessionStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallbackValue;
    } catch {
        return fallbackValue;
    }
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getHarvestDays(cicloCultivo) {
    if (cicloCultivo?.includes('corto')) return 75;
    if (cicloCultivo?.includes('medio')) return 105;
    return 150;
}

function parseApiError(error, fallbackMessage) {
    const detail = error.response?.data;

    if (typeof detail === 'object' && detail !== null) {
        return Object.entries(detail)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value[0] : value}`)
            .join(', ');
    }

    return error.message || fallbackMessage;
}

const SESSION_KEY = getSessionKey();
const ADDED_SESSION_KEY = `${SESSION_KEY}_agregados`;

export function useRecommendations() {
    const [espacio, setEspacio] = useState('Maceta');
    const [ciclo, setCiclo] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [resultado, setResultado] = useState(() =>
        readSessionValue(SESSION_KEY, null)
    );

    const [agregarExito, setAgregarExitoState] = useState(() =>
        readSessionValue(ADDED_SESSION_KEY, [])
    );

    const [agregarLoading, setAgregarLoading] = useState(null);
    const [agregarError, setAgregarError] = useState('');

    useEffect(() => {
        if (resultado) {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(resultado));
            return;
        }

        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(ADDED_SESSION_KEY);
    }, [resultado]);

    function setAgregarExito(lista) {
        setAgregarExitoState(lista);
        sessionStorage.setItem(ADDED_SESSION_KEY, JSON.stringify(lista));
    }

    async function buscar() {
        setError('');
        setLoading(true);

        try {
            const nuevoResultado = await requestRecommendations({
                espacio,
                ciclo,
                topN: 10,
            });

            setResultado(nuevoResultado);
            setAgregarExito([]);
        } catch (error) {
            setError(parseApiError(error, 'Error al obtener recomendaciones.'));
        } finally {
            setLoading(false);
        }
    }

    async function agregarCultivo(nombreCultivo, cicloCultivo) {
        setAgregarLoading(nombreCultivo);
        setAgregarError('');

        try {
            const cultivo = await findCropByName(nombreCultivo);

            if (!cultivo) {
                setAgregarError('Cultivo no encontrado en la base de datos.');
                return;
            }

            const hoy = new Date();
            const cosecha = new Date(hoy.getTime() + getHarvestDays(cicloCultivo) * 86400000);

            await addCropToUser({
                cultivoId: cultivo.id,
                fechaSiembra: formatDate(hoy),
                fechaCosechaEstimada: formatDate(cosecha),
            });

            setAgregarExito([...agregarExito, nombreCultivo]);
        } catch (error) {
            setAgregarError(parseApiError(error, 'Error al guardar el cultivo.'));
        } finally {
            setAgregarLoading(null);
        }
    }

    function nuevaConsulta() {
        setResultado(null);
        setAgregarExitoState([]);
        setAgregarError('');
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(ADDED_SESSION_KEY);
    }

    return {
        espacio,
        setEspacio,
        ciclo,
        setCiclo,
        loading,
        error,
        resultado,
        agregarExito,
        agregarLoading,
        agregarError,
        setAgregarError,
        buscar,
        agregarCultivo,
        nuevaConsulta,
    };
}
