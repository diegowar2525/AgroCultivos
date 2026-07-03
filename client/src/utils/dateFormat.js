export function formatDateTime(isoStr) {
    if (!isoStr) return '—';

    const date = new Date(isoStr);

    return `${date.toLocaleDateString('es-EC', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })} · ${date.toLocaleTimeString('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
    })}`;
}

export function toISODate(date) {
    return date.toISOString().split('T')[0];
}
