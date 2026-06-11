import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo SIGRA */}
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

                {/* Links de Navegación */}
                <div className="navbar-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'nav-item active' : 'nav-item'
                        }
                    >
                        Inicio
                    </NavLink>

                    {/* Renderizado Condicional: Solo muestra el panel si el usuario es STAFF */}
                    {user?.is_staff && (
                        <NavLink
                            to="/AdminDashboard"
                            className={({ isActive }) =>
                                isActive ? 'nav-item active' : 'nav-item'
                            }
                        >
                            Panel de Administración
                        </NavLink>
                    )}
                </div>

                {/* Sección derecha de usuario */}
                <div className="navbar-user-section">

                    {user ? (
                        /* === VISTA PARA USUARIOS LOGUEADOS === */
                        <>
                            <NavLink
                                to="/Perfil"
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
                        /* === VISTA PARA VISITANTES (NO LOGUEADOS) === */
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? 'nav-item active' : 'nav-item'
                                }
                            >
                                Iniciar Sesión
                            </NavLink>

                            {/* Reutilizamos el estilo de user-badge para que el botón de registro destaque sutilmente */}
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