export function calculateDaysRemaining(fechaCosecha, estadoNombre) {
    if (estadoNombre === 'Completado') return null;
    if (!fechaCosecha) return null;

    const millisecondsPerDay = 86400000;
    const diff = Math.ceil((new Date(fechaCosecha) - new Date()) / millisecondsPerDay);

    if (diff <= 0) return '¡Listo para cosechar!';

    return `${diff} días restantes`;
}

export function calculateProgress(fechaSiembra, fechaCosecha, estadoNombre) {
    if (estadoNombre === 'Completado') return 100;
    if (!fechaSiembra || !fechaCosecha) return 0;

    const start = new Date(fechaSiembra).getTime();
    const end = new Date(fechaCosecha).getTime();
    const now = Date.now();

    if (now >= end) return 100;
    if (now <= start) return 0;

    return Math.round(((now - start) / (end - start)) * 100);
}

export function getEstimatedHarvestDays(cicloCultivo = '') {
    if (cicloCultivo.includes('corto')) return 75;
    if (cicloCultivo.includes('medio')) return 105;
    return 150;
}
