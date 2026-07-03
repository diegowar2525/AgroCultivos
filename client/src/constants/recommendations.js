export const SPACE_OPTIONS = ['Maceta', 'Tierra', 'Ambos'];

export const CYCLE_OPTIONS = [
    { label: '2 – 3 meses', tipo: 'corto' },
    { label: '3 – 4 meses', tipo: 'medio' },
    { label: 'Más de 4 meses', tipo: 'largo' },
];

export const LEVEL_CLASS = {
    Excelente: 'recommendations-level--excellent',
    Buena: 'recommendations-level--good',
    Compatible: 'recommendations-level--compatible',
    Baja: 'recommendations-level--low',
};

export const DEFAULT_LEVEL_CLASS = LEVEL_CLASS.Compatible;

export const GEOLOCATION_OPTIONS = {
    timeout: 10000,
    maximumAge: 60000,
};
