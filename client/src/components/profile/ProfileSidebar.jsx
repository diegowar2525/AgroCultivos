import Avatar from './Avatar';

const GENERO_LABELS = { M: 'Masculino', F: 'Femenino', O: 'Otro' };

/** Barra lateral del perfil: avatar, nombre, etiquetas, "miembro desde" y actividades. */
export default function ProfileSidebar({ user, actividades }) {
    const generoLabel = GENERO_LABELS[user.genero] || user.genero || '—';
    const nombreCompleto = user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.username;
    const miembroDesde = user.fecha_registro
        ? new Date(user.fecha_registro).toLocaleDateString('es-EC', { month: 'long', year: 'numeric' })
        : '—';

    return (
        <div className="profile-sidebar">
            <div className="profile-card profile-card--identity">
                <Avatar user={user} />
                <div className="profile-identity-text">
                    <div className="profile-name">{nombreCompleto}</div>
                    <div className="profile-username">@{user.username}</div>
                </div>
                <div className="profile-tags">
                    {[user.profesion, generoLabel].filter(Boolean).map((tag) => (
                        <span className="profile-tag" key={tag}>{tag}</span>
                    ))}
                </div>
                <div className="profile-member-since">
                    <span>Miembro desde {miembroDesde}</span>
                </div>
            </div>

            <div className="profile-card">
                <div className="profile-card-title">Mis actividades</div>
                <div className="profile-stats-grid">
                    <div className="profile-stat">
                        <span className="profile-stat-value">{actividades.consultas}</span>
                        <span className="profile-stat-label">Consultas</span>
                    </div>
                    <div className="profile-stat">
                        <span className="profile-stat-value">{actividades.cultivos}</span>
                        <span className="profile-stat-label">Cultivos</span>
                    </div>
                </div>
            </div>
        </div>
    );
}