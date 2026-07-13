import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

export function useMyCrops() {
    const navigate = useNavigate();

    const [cultivos, setCultivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [iniciandoId, setIniciandoId] = useState(null);
    const [yaIniciadoIds, setYaIniciadoIds] = useState([]);
    const [eliminandoId, setEliminandoId] = useState(null);

    useEffect(() => {
        api.get('/api/cultivos/cultivo-usuario/?iniciado=false')
            .then((response) => {
                const listaCultivos =
                    response.data?.results || response.data || [];

                setCultivos(listaCultivos);
            })
            .catch(() => {
                setCultivos([]);
                toast.error('No se pudieron cargar tus cultivos.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    async function iniciarCultivo(cultivoUsuarioId) {
        setIniciandoId(cultivoUsuarioId);

        try {
            await api.post(
                `/api/cultivos/cultivo-usuario/${cultivoUsuarioId}/iniciar/`
            );

            setYaIniciadoIds((prev) => [...prev, cultivoUsuarioId]);

            setTimeout(() => {
                setCultivos((prev) =>
                    prev.filter(
                        (cultivo) => cultivo.id !== cultivoUsuarioId
                    )
                );

                navigate('/my-harvests');
            }, 800);
        } catch {
            toast.error('Error al iniciar el cultivo. Intenta de nuevo.');
        } finally {
            setIniciandoId(null);
        }
    }

    async function eliminarCultivo(cultivoUsuarioId) {
        setEliminandoId(cultivoUsuarioId);

        try {
            await api.delete(
                `/api/cultivos/cultivo-usuario/${cultivoUsuarioId}/`
            );

            setCultivos((prev) =>
                prev.filter(
                    (cultivo) => cultivo.id !== cultivoUsuarioId
                )
            );

            toast.success('Cultivo eliminado correctamente.');

            return true;
        } catch {
            toast.error(
                'No se pudo eliminar el cultivo. Intenta de nuevo.'
            );

            return false;
        } finally {
            setEliminandoId(null);
        }
    }

    return {
        cultivos,
        loading,
        iniciandoId,
        yaIniciadoIds,
        eliminandoId,
        iniciarCultivo,
        eliminarCultivo,
    };
}