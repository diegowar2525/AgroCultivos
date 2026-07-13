import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Lógica de la página de perfil: modo vista/edición, estadísticas de
 * actividad ("Mis actividades") y eliminación de cuenta.
 */
export function useProfile() {
    const { user, deleteAccount } = useAuth();
    const navigate = useNavigate();

    const [editando, setEditando] = useState(false);
    const [actividades, setActividades] = useState({
        consultas: 0,
        cultivos: 0,
    });
    const [eliminando, setEliminando] = useState(false);

    useEffect(() => {
        Promise.all([
            api
                .get('/api/recomendaciones/consultas/')
                .catch(() => ({ data: [] })),

            api
                .get('/api/cultivos/cultivo-usuario/')
                .catch(() => ({ data: [] })),
        ]).then(([consultas, cultivos]) => {
            const listaConsultas =
                consultas.data?.results || consultas.data || [];

            const listaCultivos =
                cultivos.data?.results || cultivos.data || [];

            setActividades({
                consultas: listaConsultas.length,
                cultivos: listaCultivos.length,
            });
        });
    }, []);

    async function handleEliminarCuenta() {
        if (eliminando) {
            return false;
        }

        setEliminando(true);

        try {
            await deleteAccount();

            toast.success(
                'Tu cuenta fue eliminada correctamente.'
            );

            navigate('/');

            return true;
        } catch {
            toast.error(
                'No se pudo eliminar la cuenta. Intenta de nuevo.'
            );

            setEliminando(false);

            return false;
        }
    }

    return {
        user,
        editando,
        setEditando,
        actividades,
        eliminando,
        handleEliminarCuenta,
    };
}