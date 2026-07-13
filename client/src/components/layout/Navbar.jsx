import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const navClass = ({ isActive }) =>
    isActive ? 'nav-item active' : 'nav-item';

const userBadgeClass = ({ isActive }) =>
    isActive ? 'user-badge active' : 'user-badge';

const homeLink = {
    to: '/',
    label: 'Inicio',
};

const userLinks = [
    { to: '/recommendations', label: 'Recomendaciones' },
    { to: '/my-crops', label: 'Mis Cultivos' },
    { to: '/my-harvests', label: 'Mis Cosechas' },
];

const adminLinks = [
    { to: '/dashboard', label: 'Resumen del sistema' },
    { to: '/dashboard/admin-panel', label: 'Panel de administración' },
    { to: '/dashboard/users', label: 'Gestión de cultivos de usuarios' },
];

export default function Navbar() {
    const { user, logout } = useAuth();

    const isAdmin = Boolean(user?.is_staff);

    const visibleLinks = isAdmin
        ? adminLinks
        : [
            homeLink,
            ...(user ? userLinks : []),
        ];

    const logoDestination = isAdmin ? '/dashboard' : '/';

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <NavLink to={logoDestination} className="navbar-logo">
                    <div className="logo-icon">
                        🌱
                    </div>

                    <span className="logo-text">
                        SI
                        <span className="logo-text-green">
                            GRA
                        </span>
                    </span>
                </NavLink>

                <div className="navbar-links">
                    {visibleLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end
                            className={navClass}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                <div className="navbar-user-section">
                    {user ? (
                        <>
                            <NavLink
                                to="/profile"
                                className={userBadgeClass}
                            >
                                <div className="user-avatar">
                                    {user.first_name?.charAt(0)
                                        || user.username?.charAt(0)
                                        || 'U'}
                                </div>

                                <span className="user-name">
                                    {user.username || 'Usuario'}
                                </span>
                            </NavLink>

                            <button
                                type="button"
                                className="btn-logout"
                                onClick={logout}
                            >
                                Salir
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className={navClass}
                            >
                                Iniciar Sesión
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="user-badge user-badge--register"
                            >
                                Registrarse
                            </NavLink>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}