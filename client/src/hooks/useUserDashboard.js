import { useState, useEffect } from 'react';
import api from '../services/api';
import { getNivel, getSiguienteNivel } from '../data/gamificacion';
import { calculateDaysRemaining, calculateProgress } from '../utils/harvestProgress';

/**
 * Arma el detalle de un seguimiento para "Actividad reciente" mostrando
 * lo que el usuario realmente registró, no siempre la altura:
 * - Si marcó "En observación" o una plaga, eso es lo relevante (más el
 *   texto de observación si escribió algo).
 * - Si fue un chequeo normal ("Crecimiento") con altura real (> 0), se
 *   muestra la altura.
 * - Si no hay nada de eso, se muestra solo la observación si existe.
 */
function construirDetalleSeguimiento(seguimiento) {
    const { estado_fenologico: estado, observaciones, altura_planta: altura } = seguimiento;

    if (estado && estado !== 'Crecimiento') {
        return observaciones ? `${estado}: ${observaciones}` : estado;
    }

    if (altura > 0) {
        return `Altura: ${altura}cm`;
    }

    return observaciones || null;
}

/**
 * Datos del panel de resumen mostrado arriba de "Mis Cultivos": stats
 * rápidas, nivel de gamificación, próxima cosecha, distribución por
 * categoría y actividad reciente. Todo calculado a partir de endpoints
 * que ya existen (cultivo-usuario, seguimientos, consultas) — no
 * requiere ningún endpoint nuevo en el backend.
 */
export function useUserDashboard() {
    const [cultivos, setCultivos] = useState([]);
    const [seguimientos, setSeguimientos] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/api/cultivos/cultivo-usuario/'),
            api.get('/api/cultivos/seguimientos/'),
            api.get('/api/recomendaciones/consultas/'),
        ])
            .then(([rCultivos, rSeguimientos, rConsultas]) => {
                setCultivos(rCultivos.data?.results || rCultivos.data || []);
                setSeguimientos(rSeguimientos.data?.results || rSeguimientos.data || []);
                setConsultas(rConsultas.data?.results || rConsultas.data || []);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const guardados = cultivos.filter((c) => !c.iniciado);
    const enSeguimiento = cultivos.filter((c) => c.iniciado && c.estado_nombre !== 'Completado');
    const completados = cultivos.filter((c) => c.estado_nombre === 'Completado');

    const nivel = getNivel(completados.length);
    const siguienteNivel = getSiguienteNivel(completados.length);
    const rangoNivel = siguienteNivel ? siguienteNivel.min - nivel.min : 1;
    const progresoNivel = siguienteNivel
        ? Math.min(100, Math.round(((completados.length - nivel.min) / rangoNivel) * 100))
        : 100;

    const proximaCosecha = [...enSeguimiento]
        .filter((c) => c.fecha_cosecha_estimada)
        .sort((a, b) => new Date(a.fecha_cosecha_estimada) - new Date(b.fecha_cosecha_estimada))[0] || null;

    const diasRestantes = proximaCosecha
        ? calculateDaysRemaining(proximaCosecha.fecha_cosecha_estimada, proximaCosecha.estado_nombre)
        : null;

    const diasNumero = proximaCosecha
        ? Math.max(0, Math.ceil((new Date(proximaCosecha.fecha_cosecha_estimada) - new Date()) / 86400000))
        : null;

    const progresoCosecha = proximaCosecha
        ? calculateProgress(proximaCosecha.fecha_siembra, proximaCosecha.fecha_cosecha_estimada, proximaCosecha.estado_nombre)
        : 0;

    const conteoCategorias = {};
    cultivos.forEach((c) => {
        const nombre = c.categoria_nombre || 'Sin categoría';
        conteoCategorias[nombre] = (conteoCategorias[nombre] || 0) + 1;
    });
    const categorias = Object.entries(conteoCategorias)
        .sort((a, b) => b[1] - a[1])
        .map(([nombre, cantidad]) => ({ nombre, cantidad }));
    const maxCategoria = categorias[0]?.cantidad || 1;

    // Solo se arman entradas de actividad con fecha real (seguimientos y
    // consultas ya la tienen); no se inventan fechas de "inició"/"completó"
    // porque CultivoUsuario no guarda cuándo cambió de estado.
    const actividad = [
        ...seguimientos.map((s) => ({
            id: `seg-${s.id}`,
            fecha: s.fecha_registro,
            texto: `Registraste seguimiento de ${s.cultivo_nombre}`,
            detalle: construirDetalleSeguimiento(s),
        })),
        ...consultas.map((c) => ({
            id: `con-${c.id}`,
            fecha: c.fecha_consulta,
            texto: 'Nueva consulta de recomendación',
            detalle: null,
        })),
    ]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 6);

    return {
        loading,
        stats: {
            guardados: guardados.length,
            enSeguimiento: enSeguimiento.length,
            completados: completados.length,
            consultas: consultas.length,
        },
        nivel,
        siguienteNivel,
        progresoNivel,
        proximaCosecha,
        diasRestantes,
        diasNumero,
        progresoCosecha,
        categorias,
        maxCategoria,
        totalCultivos: cultivos.length,
        actividad,
    };
}