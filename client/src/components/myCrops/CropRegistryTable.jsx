import { ClipboardList, CircleCheck } from 'lucide-react';
import HarvestStatusBadge from '../myHarvests/HarvestStatusBadge';

/**
 * Registro histórico de todos los cultivos que el usuario ha guardado,
 * incluyendo los que ya completó su ciclo al 100%.
 */
export default function CropRegistryTable({ registro, loading }) {
    return (
        <div className="crop-registry">
            <div className="crop-registry-header">
                <ClipboardList size={16} />
                <h2>Registro de cultivos</h2>
            </div>
            <p className="crop-registry-subtitulo">
                Todos los cultivos que has guardado, incluidas las cosechas ya completadas.
            </p>

            {loading ? (
                <p className="crop-registry-mensaje">Cargando registro...</p>
            ) : registro.length === 0 ? (
                <p className="crop-registry-mensaje">Aún no tienes cultivos en tu registro.</p>
            ) : (
                <div className="crop-registry-table-card">
                    <table className="crop-registry-table">
                        <thead>
                            <tr>
                                <th>Cultivo</th>
                                <th>Fecha guardado</th>
                                <th>Estado</th>
                                <th>Cosecha estimada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registro.map((c) => {
                                const completado = c.estado_nombre === 'Completado';
                                return (
                                    <tr key={c.id} className={completado ? 'crop-registry-row--completado' : ''}>
                                        <td className="crop-registry-nombre">
                                            {completado && <CircleCheck size={13} />}
                                            {c.cultivo_nombre || `Cultivo #${c.cultivo}`}
                                        </td>
                                        <td>{c.fecha_siembra || '—'}</td>
                                        <td><HarvestStatusBadge status={c.estado_nombre || 'Activo'} /></td>
                                        <td>{c.fecha_cosecha_real || c.fecha_cosecha_estimada || '—'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}