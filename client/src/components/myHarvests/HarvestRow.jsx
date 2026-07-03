import { ChevronDown, ChevronUp } from 'lucide-react';

import { calculateProgress } from '../../utils/harvestProgress';
import HarvestProgressBar from './HarvestProgressBar';
import HarvestStatusBadge from './HarvestStatusBadge';

export default function HarvestRow({ harvest, isExpanded, onToggle, onInfo }) {
    const progress = calculateProgress(
        harvest.fecha_siembra,
        harvest.fecha_cosecha_estimada,
        harvest.estado_nombre,
    );

    return (
        <tr className="my-harvests-row" onClick={onToggle}>
            <td>
                <span className="my-harvests-crop-name">
                    {harvest.cultivo_nombre || `Cultivo #${harvest.cultivo}`}
                </span>
            </td>

            <td className="my-harvests-muted-cell">{harvest.fecha_siembra}</td>

            <td>
                <HarvestStatusBadge status={harvest.estado_nombre || 'Activo'} />
            </td>

            <td>
                <div className="my-harvests-progress-cell">
                    <HarvestProgressBar value={progress} />
                    <span>{progress}%</span>
                </div>
            </td>

            <td className="my-harvests-date-cell">
                {harvest.fecha_cosecha_estimada}
            </td>

            <td>
                <button
                    type="button"
                    className="my-harvests-info-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onInfo();
                    }}
                >
                    Ver info
                </button>
            </td>

            <td>
                <button type="button" className="my-harvests-detail-button">
                    {isExpanded ? (
                        <>
                            <span>Cerrar</span>
                            <ChevronUp size={14} />
                        </>
                    ) : (
                        <>
                            <span>Ver</span>
                            <ChevronDown size={14} />
                        </>
                    )}
                </button>
            </td>
        </tr>
    );
}
