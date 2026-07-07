import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Lógica del panel admin "Actividad de usuarios": lista de usuarios,
 * búsqueda, selección de un usuario y carga de sus cultivos/cosechas.
 */
export function useUserActivity() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSel, setUsuarioSel] = useState(null);
    const [cultivos, setCultivos] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(true);
    const [loadingDetalle, setLoadingDetalle] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const [tab, setTab] = useState('cultivos'); // 'cultivos' | 'cosechas'

    useEffect(() => {
        api.get('/api/usuarios/admin/usuarios/')
            .then((r) => {
                const todos = r.data?.results || r.data || [];
                setUsuarios(todos.filter((u) => !u.is_staff));
            })
            .catch(() => setUsuarios([]))
            .finally(() => setLoadingUsuarios(false));
    }, []);

    function seleccionarUsuario(usuario) {
        setUsuarioSel(usuario);
        setTab('cultivos');
        setLoadingDetalle(true);
        setCultivos([]);
        api.get(`/api/cultivos/cultivo-usuario/?usuario=${usuario.id}`)
            .then((r) => setCultivos(r.data?.results || r.data || []))
            .catch(() => setCultivos([]))
            .finally(() => setLoadingDetalle(false));
    }

    const usuariosFiltrados = usuarios.filter((u) =>
        `${u.first_name} ${u.last_name} ${u.username} ${u.email}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    const misCultivos = cultivos.filter((c) => !c.iniciado);
    const misCosechas = cultivos.filter((c) => c.iniciado);
    const completados = misCosechas.filter((c) => c.estado_nombre === 'Completado');

    return {
        usuarios,
        usuariosFiltrados,
        usuarioSel,
        loadingUsuarios,
        loadingDetalle,
        busqueda,
        setBusqueda,
        tab,
        setTab,
        seleccionarUsuario,
        misCultivos,
        misCosechas,
        completados,
    };
}