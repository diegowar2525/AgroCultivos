import { Sprout, Layers, Ban, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import HarvestStatusBadge from '../myHarvests/HarvestStatusBadge';
import HarvestProgressBar from '../myHarvests/HarvestProgressBar';
import ConfirmationToast from '../common/ConfirmationToast';
import { calculateProgress } from '../../utils/harvestProgress';

/**
 * Tabla de cultivos de un usuario. Con `mostrarProgreso`, agrega la
 * columna de progreso (usada para la pestaña "Cosechas"). El admin
 * puede suspender un cultivo activo, o reactivar uno ya suspendido,
 * directamente desde aquí.
 */
export default function UserCropManagementTable({
    cultivos,
    mostrarProgreso,
    mensajeVacio,
    onSuspender,
    onReactivar,
    suspendiendoId,
}) {
    if (cultivos.length === 0) {
        const Icon = mostrarProgreso ? Layers : Sprout;
        return (
            <div className="user-activity-vacio">
                <Icon size={32} />
                <p>{mensajeVacio}</p>
            </div>
        );
    }

    function solicitarSuspension(cultivo) {
        toast.info(
            ({ closeToast }) => (
                <ConfirmationToast
                    closeToast={closeToast}
                    onConfirm={() => onSuspender(cultivo.id)}
                    message={`¿Suspender ${cultivo.cultivo_nombre}? El usuario ya no podrá seguir su seguimiento hasta que se reactive.`}
                    confirmLabel="Suspender"
                    cancelLabel="Cancelar"
                    confirmClassName="btn-toast-delete"
                />
            ),
            {
                position: 'top-center',
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
                theme: 'dark',
            }
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
                        {onSuspender && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {cultivos.map((c) => {
                        const estaSuspendido = c.estado_nombre === 'Suspendido';
                        const estaCompletado = c.estado_nombre === 'Completado';
                        const procesando = suspendiendoId === c.id;

                        return (
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
                                {onSuspender && (
                                    <td>
                                        {estaCompletado ? (
                                            <span className="user-activity-sin-accion">—</span>
                                        ) : estaSuspendido ? (
                                            <button
                                                type="button"
                                                className="user-activity-btn-reactivar"
                                                onClick={() => onReactivar(c.id)}
                                                disabled={procesando}
                                            >
                                                <RotateCcw size={13} />
                                                {procesando ? 'Reactivando...' : 'Reactivar'}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="user-activity-btn-suspender"
                                                onClick={() => solicitarSuspension(c)}
                                                disabled={procesando}
                                            >
                                                <Ban size={13} />
                                                {procesando ? 'Suspendiendo...' : 'Suspender'}
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}