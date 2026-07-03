import { getHarvestStatusConfig } from '../../constants/harvestStatus';

export default function HarvestStatusBadge({ status = 'Activo' }) {
    const config = getHarvestStatusConfig(status);

    return (
        <span className={`harvest-status-badge ${config.className}`}>
            {config.label || status}
        </span>
    );
}
