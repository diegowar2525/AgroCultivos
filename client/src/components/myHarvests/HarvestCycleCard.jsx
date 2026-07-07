import { CheckCircle, CircleCheck, Leaf } from 'lucide-react';

import { calculateDaysRemaining, calculateProgress } from '../../utils/harvestProgress';
import { useEstadoIds } from '../../hooks/useEstadoIds';
import HarvestProgressBar from './HarvestProgressBar';
import HarvestHistory from './HarvestHistory';

export default function HarvestCycleCard({
    harvest,
    refreshHistory,
    updatingStatus,
    onChangeStatus,
}) {
    const estadoIds = useEstadoIds();
    const progress = calculateProgress(
        harvest.fecha_siembra,
        harvest.fecha_cosecha_estimada,
        harvest.estado_nombre,
    );
    const daysRemaining = calculateDaysRemaining(harvest.fecha_cosecha_estimada, harvest.estado_nombre);
    const isNearHarvest = progress >= 90;

    return (
        <section className="my-harvests-expanded-card">
            <p className="my-harvests-expanded-title">Progreso del ciclo</p>

            <div className="my-harvests-expanded-progress">
                <HarvestProgressBar value={progress} />
                <span className={`my-harvests-expanded-percent ${isNearHarvest ? 'is-warning' : ''}`}>
                    {progress}%
                </span>
            </div>

            <div className="my-harvests-expanded-dates">
                {[
                    ['Sembrado', harvest.fecha_siembra],
                    ['Cosecha estimada', harvest.fecha_cosecha_estimada],
                ].map(([label, value]) => (
                    <div key={label} className="my-harvests-expanded-date-card">
                        <p>{label}</p>
                        <strong>{value || '—'}</strong>
                    </div>
                ))}
            </div>

            {daysRemaining && (
                <div className={`my-harvests-expanded-days ${isNearHarvest ? 'is-warning' : ''}`}>
                    <p>{daysRemaining}</p>
                </div>
            )}

            {harvest.estado_nombre === 'Activo' && (
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onChangeStatus(estadoIds.Cosecha);
                    }}
                    disabled={updatingStatus || !estadoIds.Cosecha}
                    className="my-harvests-status-button my-harvests-status-button--harvest"
                >
                    <Leaf size={15} />
                    {updatingStatus ? 'Actualizando...' : 'Iniciar cosecha'}
                </button>
            )}

            {harvest.estado_nombre === 'Cosecha' && (
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onChangeStatus(estadoIds.Completado);
                    }}
                    disabled={updatingStatus || !estadoIds.Completado}
                    className="my-harvests-status-button my-harvests-status-button--complete"
                >
                    <CheckCircle size={15} />
                    {updatingStatus ? 'Finalizando...' : 'Marcar como completado'}
                </button>
            )}

            {harvest.estado_nombre === 'Completado' && (
                <div className="my-harvests-completed-box">
                    <p>
                        <CircleCheck size={15} />
                        Cultivo completado
                    </p>
                </div>
            )}

            <HarvestHistory cultivoId={harvest.id} refresh={refreshHistory} />
        </section>
    );
}