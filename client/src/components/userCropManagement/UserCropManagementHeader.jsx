import { User } from 'lucide-react';

/** Cabecera del usuario seleccionado: identidad + estadísticas rápidas. */
export default function UserActivityHeader({ usuario, misCultivos, misCosechas, completados }) {
    const stats = [
        { label: 'Cultivos', value: misCultivos.length, tono: 'verde' },
        { label: 'Cosechas', value: misCosechas.length, tono: 'ambar' },
        { label: 'Completados', value: completados.length, tono: 'azul' },
    ];

    return (
        <div className="user-activity-header">
            <div className="user-activity-header-avatar">
                <User size={24} />
            </div>
            <div className="user-activity-header-texto">
                <h2>{usuario.first_name} {usuario.last_name}</h2>
                <p>@{usuario.username} · {usuario.email} · {usuario.profesion || 'Sin profesión'}</p>
            </div>
            <div className="user-activity-stats">
                {stats.map(({ label, value, tono }) => (
                    <div className="user-activity-stat" key={label}>
                        <p className={`user-activity-stat-valor user-activity-stat-valor--${tono}`}>{value}</p>
                        <p className="user-activity-stat-label">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}