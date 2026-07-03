export const HARVEST_STATUS = {
    Activo: {
        label: 'Activo',
        className: 'harvest-status-badge--active',
    },
    Cosecha: {
        label: 'Cosecha',
        className: 'harvest-status-badge--harvest',
    },
    Completado: {
        label: 'Completado',
        className: 'harvest-status-badge--completed',
    },
    Suspendido: {
        label: 'Suspendido',
        className: 'harvest-status-badge--suspended',
    },
};

export function getHarvestStatusConfig(status = 'Activo') {
    return HARVEST_STATUS[status] || HARVEST_STATUS.Activo;
}
