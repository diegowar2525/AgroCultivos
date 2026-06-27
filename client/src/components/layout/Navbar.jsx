import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <div className="navbar-logo">
                    <div className="logo-icon">
                        🌱
                    </div>
                    <span className="logo-text">
                        SI
                        <span className="logo-text-green">
                            GRA
                        </span>
                    </span>
                </div>

                <div className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'nav-item active' : 'nav-item'
                        }
                    >
                        Inicio
                    </NavLink>

                    {user?.is_staff && (
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? 'nav-item active' : 'nav-item'
                            }
                        >
                            Resumen del sistema
                        </NavLink>
                    )}
                    {user?.is_staff && (
                        <NavLink
                            to="/dashboard/panel"
                            className={({ isActive }) =>
                                isActive ? 'nav-item active' : 'nav-item'
                            }
                        >
                            Panel de administración
                        </NavLink>
                    )}
                </div>

                <div className="navbar-user-section">

                    {user ? (
                        <>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive ? 'user-badge active' : 'user-badge'
                                }
                            >
                                <div className="user-avatar">
                                    {user.first_name?.charAt(0) || 'U'}
                                </div>
                                <span className="user-name">
                                    {user.username || 'Usuario'}
                                </span>
                            </NavLink>

                            <button
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
                                className={({ isActive }) =>
                                    isActive ? 'nav-item active' : 'nav-item'
                                }
                            >
                                Iniciar Sesión
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="user-badge"
                                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--green-hover)' }}
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