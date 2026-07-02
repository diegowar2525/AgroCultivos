import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import DeleteConfirmation from '../components/common/DeleteConfirmation';

/**
 * Lógica de datos y acciones de "Mis Cultivos": carga de cultivos
 * guardados (aún no iniciados), iniciar seguimiento y eliminar.
 * Usa la misma alerta de confirmación (toast + DeleteConfirmation)
 * que ya usa el panel de administración del proyecto.
 */
export function useMisCultivos() {
    const navigate = useNavigate();
    const [cultivos, setCultivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [iniciandoId, setIniciandoId] = useState(null);
    const [yaIniciadoIds, setYaIniciadoIds] = useState([]);
    const [eliminandoId, setEliminandoId] = useState(null);

    useEffect(() => {
        api.get('/api/cultivos/cultivo-usuario/?iniciado=false')
            .then((r) => setCultivos(r.data))
            .catch(() => setCultivos([]))
            .finally(() => setLoading(false));
    }, []);

    async function iniciarCultivo(cultivoUsuarioId) {
        setIniciandoId(cultivoUsuarioId);
        try {
            await api.post(`/api/cultivos/cultivo-usuario/${cultivoUsuarioId}/iniciar/`);
            setYaIniciadoIds((prev) => [...prev, cultivoUsuarioId]);
            setTimeout(() => {
                setCultivos((prev) => prev.filter((c) => c.id !== cultivoUsuarioId));
                navigate('/mis-cosechas');
            }, 800);
        } catch {
            toast.error('Error al iniciar el cultivo. Intenta de nuevo.');
        } finally {
            setIniciandoId(null);
        }
    }

    function eliminarCultivo(cultivoUsuarioId) {
        toast.info(
            ({ closeToast }) => (
                <DeleteConfirmation
                    closeToast={closeToast}
                    onConfirm={() => confirmarEliminar(cultivoUsuarioId)}
                    message="¿Eliminar este cultivo guardado? Esta acción no se puede deshacer."
                />
            ),
            {
                position: 'top-center',
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                theme: 'dark',
            }
        );
    }

    async function confirmarEliminar(cultivoUsuarioId) {
        setEliminandoId(cultivoUsuarioId);
        try {
            await api.delete(`/api/cultivos/cultivo-usuario/${cultivoUsuarioId}/`);
            setCultivos((prev) => prev.filter((c) => c.id !== cultivoUsuarioId));
            toast.success('Cultivo eliminado correctamente.');
        } catch {
            toast.error('No se pudo eliminar el cultivo. Intenta de nuevo.');
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
