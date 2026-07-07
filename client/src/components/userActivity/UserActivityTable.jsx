import { Sprout, Layers } from 'lucide-react';
import HarvestStatusBadge from '../myHarvests/HarvestStatusBadge';
import HarvestProgressBar from '../myHarvests/HarvestProgressBar';
import { calculateProgress } from '../../utils/harvestProgress';

/**
 * Tabla de cultivos de un usuario. Con `mostrarProgreso`, agrega la
 * columna de progreso (usada para la pestaña "Mis Cosechas").
 */
export default function UserActivityTable({ cultivos, mostrarProgreso, mensajeVacio }) {
    if (cultivos.length === 0) {
        const Icon = mostrarProgreso ? Layers : Sprout;
        return (
            <div className="user-activity-vacio">
                <Icon size={32} />
                <p>{mensajeVacio}</p>
            </div>
        );
    }

    return (
        <div className="user-activity-table-card">
            <table className="user-activity-table">
                <thead>
                    <tr>
                        <th>Cultivo</th>
                        <th>Fecha siembra</th>
                        <th>Estado</th>
                        {mostrarProgreso && <th>Progreso</th>}
                        <th>Cosecha estimada</th>
                    </tr>
                </thead>
                <tbody>
                    {cultivos.map((c) => (
                        <tr key={c.id}>
                            <td className="user-activity-cultivo-nombre">
                                {c.cultivo_nombre || `Cultivo #${c.cultivo}`}
                            </td>
                            <td>{c.fecha_siembra || '—'}</td>
                            <td><HarvestStatusBadge status={c.estado_nombre || 'Activo'} /></td>
                            {mostrarProgreso && (
                                <td className="user-activity-progreso-celda">
                                    <HarvestProgressBar
                                        value={calculateProgress(c.fecha_siembra, c.fecha_cosecha_estimada, c.estado_nombre)}
                                    />
                                </td>
                            )}
                            <td>{c.fecha_cosecha_estimada || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}