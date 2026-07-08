import { AlertTriangle, CircleCheck, Eye } from 'lucide-react';

export const HEALTH_STATUS_OPTIONS = [
    {
        key: 'bien',
        label: 'Bien',
        icon: CircleCheck,
    },
    {
        key: 'observacion',
        label: 'Observación',
        icon: Eye,
    },
    {
        key: 'amenaza',
        label: 'Amenaza',
        icon: AlertTriangle,
    },
];

export const HEALTH_NOTICE = {
    bien: {
        title: 'El cultivo se encuentra en buen estado',
        lines: [
            'Registra la altura actual de la planta.',
            'Agrega una observación si notas algún cambio importante.',
        ],
    },
    observacion: {
        title: 'El cultivo requiere observación',
        lines: [
            'Registra síntomas leves o cambios que aún no parecen graves.',
            'Haz seguimiento en los próximos días.',
        ],
    },
    amenaza: {
        title: 'Amenaza detectada o sospechada',
        lines: [
            'Puedes registrar una enfermedad, plaga u otro problema observado.',
            'También puedes usar la autodetección por imagen como apoyo.',
        ],
    },
};

export function getHealthBadgeClass(status = '') {
    const normalizedStatus = status.toLowerCase();

    if (
        normalizedStatus.includes('amenaza') ||
        normalizedStatus.includes('plaga')
    ) {
        return 'my-harvests-health-badge--danger';
    }

    if (normalizedStatus.includes('observaci')) {
        return 'my-harvests-health-badge--warning';
    }

    return 'my-harvests-health-badge--good';
}