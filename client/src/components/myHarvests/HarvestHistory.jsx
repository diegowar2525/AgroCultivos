import { Leaf, Ruler } from 'lucide-react';

import { resolveMediaUrl } from '../../services/api';
import useHarvestHistory from '../../hooks/useHarvestHistory';
import { getHealthBadgeClass } from '../../constants/healthStatus';
import { formatDateTime } from '../../utils/dateFormat';
import { PLAGAS_DEFAULT, PLAGAS_POR_CULTIVO, PROBLEMAS_COMUNES } from '../../data/plagasPorCultivo';

function findSolution(fenologicalStatus = '') {
    if (fenologicalStatus.startsWith('Plaga:')) {
        const pestName = fenologicalStatus.replace('Plaga: ', '').trim();
        const allPests = Object.values(PLAGAS_POR_CULTIVO).flat().concat(PLAGAS_DEFAULT);
        return allPests.find(pest => pest.nombre === pestName) || null;
    }

    if (fenologicalStatus.startsWith('Observación:')) {
        const problemName = fenologicalStatus.replace('Observación: ', '').trim();
        return PROBLEMAS_COMUNES.find(problem => problem.nombre === problemName) || null;
    }

    return null;
}

export default function HarvestHistory({ cultivoId, refresh }) {
    const { records, loading } = useHarvestHistory(cultivoId, refresh);

    if (loading) {
        return <p className="my-harvests-history-loading">Cargando historial...</p>;
    }

    return (
        <div className="my-harvests-history">
            <div className="my-harvests-history__divider" />

            <div className="my-harvests-history__header">
                <p>
                    <Leaf size={13} />
                    Historial de seguimiento
                </p>
                <span>{records.length} registro{records.length !== 1 ? 's' : ''}</span>
            </div>

            {records.length === 0 ? (
                <div className="my-harvests-history__empty">
                    Aún no hay registros. Guarda el primero arriba.
                </div>
            ) : (
                <div className="my-harvests-timeline">
                    <div className="my-harvests-timeline__line" />

                    {records.map((record, index) => {
                        const badgeClass = getHealthBadgeClass(record.estado_fenologico);
                        const pestSolution = findSolution(record.estado_fenologico);
                        const timelineClass = record.estado_fenologico?.toLowerCase().includes('plaga')
                            ? 'my-harvests-timeline__item--danger'
                            : record.estado_fenologico?.toLowerCase().includes('observaci')
                                ? 'my-harvests-timeline__item--warning'
                                : 'my-harvests-timeline__item--good';

                        return (
                            <article
                                key={record.id}
                                className={`my-harvests-timeline__item ${timelineClass} ${index === records.length - 1 ? 'is-last' : ''}`}
                            >
                                <div className="my-harvests-timeline__dot" />

                                <div className={`my-harvests-history-card ${badgeClass}`}>
                                    <p className="my-harvests-history-card__date">
                                        {formatDateTime(record.fecha_registro)}
                                    </p>

                                    <div className="my-harvests-history-card__meta">
                                        <span className={`my-harvests-health-badge ${badgeClass}`}>
                                            {record.estado_fenologico}
                                        </span>

                                        {record.altura_planta > 0 && (
                                            <span className="my-harvests-history-card__height">
                                                <Ruler size={11} />
                                                {record.altura_planta} cm
                                            </span>
                                        )}

                                        {record.imagen && (
                                            <img
                                                src={resolveMediaUrl(record.imagen)}
                                                alt="Foto del seguimiento"
                                                className="my-harvests-history-card__image"
                                                onClick={() => window.open(resolveMediaUrl(record.imagen), '_blank')}
                                                onError={event => { event.currentTarget.classList.add('is-hidden'); }}
                                            />
                                        )}
                                    </div>

                                    {record.observaciones && (
                                        <p className="my-harvests-history-card__observation">
                                            {record.observaciones}
                                        </p>
                                    )}

                                    {pestSolution && (
                                        <div className="my-harvests-history-solution">
                                            <p>Pasos de solución:</p>

                                            {pestSolution.pasos.map((step, stepIndex) => (
                                                <div key={`${step}-${stepIndex}`} className="my-harvests-history-solution__step">
                                                    <span>{stepIndex + 1}.</span>
                                                    <span>{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}