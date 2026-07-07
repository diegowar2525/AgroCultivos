export default function DashboardStats({ stats }) {
    const items = [
        { label: 'Cultivos guardados', valor: stats.guardados, tono: 'crema' },
        { label: 'En seguimiento', valor: stats.enSeguimiento, tono: 'ambar' },
        { label: 'Completados', valor: stats.completados, tono: 'azul' },
        { label: 'Consultas hechas', valor: stats.consultas, tono: 'violeta' },
    ];

    return (
        <div className="user-dash-stats">
            {items.map(({ label, valor, tono }) => (
                <div className="user-dash-stat" key={label}>
                    <p className="user-dash-stat-label">{label}</p>
                    <p className={`user-dash-stat-valor user-dash-stat-valor--${tono}`}>{valor}</p>
                </div>
            ))}
        </div>
    );
}