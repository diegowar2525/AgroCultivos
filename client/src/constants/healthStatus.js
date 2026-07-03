import { Bug, Eye, Leaf } from 'lucide-react';

export const HEALTH_STATUS_OPTIONS = [
    {
        key: 'bien',
        label: 'Bien',
        icon: Leaf,
    },
    {
        key: 'observacion',
        label: 'En observación',
        icon: Eye,
    },
    {
        key: 'plaga',
        label: 'Plaga',
        icon: Bug,
    },
];

export const HEALTH_NOTICE = {
    bien: {
        title: 'Cultivo en buen estado',
        lines: [
            'Continúa con el riego regular',
            'Revisa semanalmente por señales de plagas',
        ],
    },
    observacion: {
        title: 'Cultivo en observación',
        lines: [
            'Revisa diariamente las hojas y el suelo',
            'Si detectas plaga, cambia el estado a Plaga',
        ],
    },
};

export function getHealthBadgeClass(estado = '') {
    const lower = estado.toLowerCase();

    if (lower.includes('plaga')) return 'health-badge--danger';
    if (lower.includes('observaci')) return 'health-badge--warning';

    return 'health-badge--good';
}
